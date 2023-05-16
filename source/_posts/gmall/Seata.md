---
title: Seata
tags:
  - Java
categories: Seata
cover: 'https://oss.yiki.tech/img/202304280355734.svg'
description: Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。
abbrlink: 8d9a091c
date: 2023-04-28 03:54:00
---

# Seata

## 概念

![](https://oss.yiki.tech/img/202304280339932.png)

* 全局事务
    * 分布式事务就是一个全局事务, 由一系列的分支事务组成
* 分支事务
    * 本质就是一个本地事务

## 结构

![](https://oss.yiki.tech/img/202304280339052.png)

* Transaction Coordinator(TC)
    * 事务协调器，维护全局事务的运行状态，负责协调并驱动全局事务的提交或回滚。
    * 事务协调器,  监控全局及分支事务的状态, 驱动全局事务的提交或回滚
* Transaction Manager(TM)
    * 事务管理器，控制全局事务的边界，负责开启一个全局事务，并最终发起全局提交或全局回滚的决议。
    * 事务管理器, 控制全局事务的范围, 开启一个全局事务, 发起全局事务的提交或者回滚
* Resource Manager(RM)
    * 资源管理器，控制分支事务，负责分支注册、状态汇报，并接收事务协调器的指令，执行分支（本地）事务的提交和回滚
    * 资源管理器, 管理分支事务的工作资源. 向 TC 注册分支事务 并 汇报分支事务的执行状态, 驱动分支事务的提交或者回滚

## 安装 TC 事务协调器

[github & Seata 下载](https://github.com/seata/seata/releases)

[案例工程](https://github.com/seata/seata-samples/tree/master/springcloud-jpa-seata)

```shell
## 安装 Java
sudo yum -y install epel-release
	sudo rm -f /var/run/yum.pid
sudo yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel jq vim

## 下载 Seata
mkdir -p /mydata/cloud
cd /mydata/cloud/
wget https://github.com/seata/seata/releases/download/v1.4.2/seata-server-1.4.2.zip

## 解压
unzip seata-server-1.4.2.zip

## 启动 Seata
cd /mydata/cloud/seata/seata-server-1.4.2/bin/
nohup sh seata-server.sh -p 8091 -m file &> seata.log &
```

## 生命周期

![](https://oss.yiki.tech/img/202304280339725.png)

* TM 向 TC 申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的 XID。
* XID 在微服务调用链路的上下文中传播。
* RM 向 TC 注册分支事务，将其纳入 XID 对应全局事务的管辖。
* TM 向 TC 发起针对 XID 的全局提交或回滚决议。
* TC 调度 XID 下管辖的全部分支事务完成提交或回滚请求。TC 驱动 RM

## 功能实现

### 添加依赖

```xml
<!-- seata -->
<dependency>
	<groupId>com.alibaba.cloud</groupId>
 	<artifactId>spring-cloud-starter-alibaba-seata</artifactId>
	<version>2.0.0.RELEASE</version>
</dependency>
<dependency>
	<groupId>io.seata</groupId>
	<artifactId>seata-all</artifactId>
	<version>1.4.1</version>
</dependency>
```

![](https://oss.yiki.tech/img/202304280339533.png)

### undo_log 表

> 所有分布式事务相关的数据库都要有 undo_log 表

```sql
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for undo_log
-- ----------------------------
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

![](https://oss.yiki.tech/img/202304280339905.png)

![](https://oss.yiki.tech/img/202304280339508.png)

### 配置

#### registry.conf

> 所有分布式事务相关的服务都要指定 registry.conf 配置 注册中心与配置中心

```coffeescript
registry { # 注册中心
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"

  file {
    name = "file.conf"
  }
}

config { # 配置中心
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"

  file {
    name = "file.conf"
  }
}
```

![](https://oss.yiki.tech/img/202304280339676.png)

#### file.conf

```coffeescript
transport {
  # tcp udt unix-domain-socket
  type = "TCP"
  #NIO NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  # the client batch send request enable
  enableClientBatchSendRequest = true
  #thread factory for netty
  threadFactory {
    bossThreadPrefix = "NettyBoss"
    workerThreadPrefix = "NettyServerNIOWorker"
    serverExecutorThread-prefix = "NettyServerBizHandler"
    shareBossWorker = false
    clientSelectorThreadPrefix = "NettyClientSelector"
    clientSelectorThreadSize = 1
    clientWorkerThreadPrefix = "NettyClientWorkerThread"
    # netty boss thread size,will not be used for UDT
    bossThreadSize = 1
    #auto default pin or 8
    workerThreadSize = "default"
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}
service {
  #transaction service group mapping 事务服务组映射
;   vgroupMapping.my_test_tx_group = "default"
  # vgroupMapping.服务名_service_group
  vgroupMapping.gmall_tx_group = "default" # 配置 事务服务组映射
  #only support when registry.type=file, please don't set multiple addresses
  default.grouplist = "192.168.0.101:8091" # 配置 tc 服务 ip 与 port
  #degrade, current not support
  enableDegrade = false
  #disable seata
  disableGlobalTransaction = false
}

client {
  rm {
    asyncCommitBufferLimit = 10000
    lock {
      retryInterval = 10
      retryTimes = 30
      retryPolicyBranchRollbackOnConflict = true
    }
    reportRetryCount = 5
    tableMetaCheckEnable = false
    reportSuccessEnable = false
  }
  tm {
    commitRetryCount = 5
    rollbackRetryCount = 5
  }
  undo {
    dataValidation = true
    logSerialization = "jackson"
    logTable = "undo_log"
  }
  log {
    exceptionRate = 100
  }
}
```

![](https://oss.yiki.tech/img/202304280339334.png)

####  application.yml

```yaml
alibaba:
  seata:
    tx-service-group: gmall_tx_group
```

![](https://oss.yiki.tech/img/202304280340134.png)

### 修改数据源

```java
package com.atguigu.gmall.pms.config;

import com.zaxxer.hikari.HikariDataSource;
import io.seata.rm.datasource.DataSourceProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

/**
 * @Description: 数据源配置
 * @Author: Guan FuQing
 * @Date: 2023/4/17 00:06
 * @Email: moumouguan@gmail.com
 */
@Configuration
public class DataSourceConfig {
    /**
     * 需要将 DataSourceProxy 设置为主数据源，否则事务无法回滚
     */
    @Primary // 多个数据源 以 这个为主
    @Bean("dataSource")
    public DataSource dataSource(
            @Value("${spring.datasource.driver-class-name}") String driverClassName,
            @Value("${spring.datasource.url}") String url,
            @Value("${spring.datasource.username}") String username,
            @Value("${spring.datasource.password}") String password
    ) {
        HikariDataSource hikariDataSource = new HikariDataSource();
        hikariDataSource.setDriverClassName(driverClassName);
        hikariDataSource.setJdbcUrl(url);
        hikariDataSource.setUsername(username);
        hikariDataSource.setPassword(password);
        return new DataSourceProxy(hikariDataSource);
    }
}

```

![](https://oss.yiki.tech/img/202304280340697.png)

### 注解

```java
@GlobalTransactional
@Transactional
```

![](https://oss.yiki.tech/img/202304280340450.png)

## 注意

> 涉及分布式事务相关的各个表需要主键. seata 需要 主键 记录 undo_log 日志以便回滚

![](https://oss.yiki.tech/img/202304280340016.png)

![](https://oss.yiki.tech/img/202304280340988.png)