---
title: CentOS 7 安装 Alibaba Cloud 组件
tags:
  - Software
categories: Cloud
cover: 'https://oss.yiki.tech/img/202304251804586.svg'
description: Spring Cloud Alibaba致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过Spring Cloud编程模型轻松使用这些组件来开发分布式应用服务。
abbrlink: 78664a3c
date: 2023-04-23 18:27:00
---

> Spring Cloud Alibaba致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过Spring Cloud编程模型轻松使用这些组件来开发分布式应用服务。

## Java

### 安装

```shell
sudo yum -y install epel-release
	sudo rm -f /var/run/yum.pid # pid 卡顿使用该命令
sudo yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel jq vim
```

![](https://oss.yiki.tech/img/202304251748281.png)

### 查看 并 切换版本

```shell
sudo alternatives --config java

java -version
```

![](https://oss.yiki.tech/img/202304251748579.png)

## Alibaba Cloud 组件

### Nacos

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304251749041.mp4" type="video/mp4">
  </videos>
</div>


#### 创建对应文件夹

```shell
# 创建文件夹
mkdir -p /mydata/cloud

cd /mydata/cloud/
```

![](https://oss.yiki.tech/img/202304251749051.png)

#### 下载解压

```shell
wget https://github.com/alibaba/nacos/releases/download/1.4.1/nacos-server-1.4.1.zip

unzip nacos-server-1.4.1.zip
```

![](https://oss.yiki.tech/img/202304251749100.png)

#### 启动

```shell
cd /mydata/cloud/nacos/bin

# -bash: ./startup.sh: 权限不足
chmod u+x *.sh # 开启权限

./startup.sh -m standalone # 单机方式启动, 集群启动会报错启动不起来
```

![](https://oss.yiki.tech/img/202304251749037.png)

#### 网页进入

```shell
http://ip:8848/nacos
```

![](https://oss.yiki.tech/img/202304251749624.png)

### Sentinel

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304251750943.mp4" type="video/mp4">
  </videos>
</div>


#### 创建对应文件夹

```shell
# 创建文件夹
mkdir -p /mydata/cloud

cd /mydata/cloud/
```

#### 下载

```shell
wget https://github.com/alibaba/Sentinel/releases/download/1.8.2/sentinel-dashboard-1.8.2.jar
```

![](https://oss.yiki.tech/img/202304251750291.png)

#### 启动

````shell
nohup java -jar sentinel-dashboard-1.8.2.jar >sentinel.log &
````

![](https://oss.yiki.tech/img/202304251750947.png)

#### 网页进入

```shell
http://ip:8080/#/login
```

![](https://oss.yiki.tech/img/202304251750399.png)

### zipkin

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304251751290.mp4" type="video/mp4">
  </videos>
</div>


#### 创建对应文件夹

```shell
# 创建文件夹
mkdir -p /mydata/cloud

cd /mydata/cloud/
```

#### 下载

```shell
wget https://repo1.maven.org/maven2/io/zipkin/zipkin-server/2.20.2/zipkin-server-2.20.2-exec.jar
```

![](https://oss.yiki.tech/img/202304251751459.png)

#### 启动

````shell
nohup java -jar zipkin-server-2.20.2-exec.jar >zipkin.log &
````

![](https://oss.yiki.tech/img/202304251751140.png)

#### 网页进入

```shell
http://ip:9411/zipkin/
```

![](https://oss.yiki.tech/img/202304251751575.png)
