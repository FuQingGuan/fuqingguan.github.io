---
title: CentOS 7 安装 Seata
tags:
  - Software
categories: Seata
cover: 'https://oss.yiki.tech/img/202304280330167.svg'
description: Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。
abbrlink: 228a6e54
date: 2023-04-23 18:40:00
---

## Seata

### 下载

```shell
cd /mydata/cloud/

wget https://github.com/seata/seata/releases/download/v1.4.2/seata-server-1.4.2.zip
```

![](https://oss.yiki.tech/img/202304280316389.png)

### 解压

```shell
unzip seata-server-1.4.2.zip
```

![](https://oss.yiki.tech/img/202304280317135.png)

### 启动

```shell
cd /mydata/cloud/seata/seata-server-1.4.2/bin/
 
nohup sh seata-server.sh -p 8091 -m file &> seata.log &
```

![](https://oss.yiki.tech/img/202304280317357.png)

