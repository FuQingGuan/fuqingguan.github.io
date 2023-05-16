---
title: CentOS 7 安装 Redis 6
tags:
  - Software
categories: Redis
cover: 'https://oss.yiki.tech/img/202304231049357.svg'
description: Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSIC语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。
abbrlink: bc7c29d9
date: 2023-04-23 10:47:00
---

# CentOS 7 安装 Redis 6

> Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSIC语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231046140.mp4" type="video/mp4">
  </videos>
</div>


## 下载 GCC 与 Redis

```shell
cd /opt

# 安装gcc依赖
yum install -y gcc

# 下载
wget http://download.redis.io/releases/redis-6.0.8.tar.gz
```

![](https://oss.yiki.tech/img/202304231045961.png)

```shell
# 解压
tar xzf redis-6.0.8.tar.gz

# 进入指定目录
cd /opt/redis-6.0.8
```

![](https://oss.yiki.tech/img/202304231045187.png)

```shell
# 安装scl源
yum install centos-release-scl scl-utils-build

# 列出scl可用源
yum list all --enablerepo='centos-sclo-rh'

# 安装8版本的gcc、gcc-c++、gdb工具链（toolchian）
yum install -y devtoolset-8-toolchain

# 启用 devtoolset-8 软件集
scl enable devtoolset-8 bash
```

![](https://oss.yiki.tech/img/202304231045850.png)

```shell
# 进入解压目录
cd /opt/redis-6.0.8

# 安装并指定安装目录
make install PREFIX=/usr/local/redis

cd /usr/local/redis/bin/

# 从 redis 的源码目录中复制 redis.conf 到 redis 的安装目录
cp /opt/redis-6.0.8/redis.conf /usr/local/redis/bin/
```

![](https://oss.yiki.tech/img/202304231043113.png)

## 修改配置文件

```shell
# 修改配置文件
vim /usr/local/redis/bin/redis.conf 

protected-mode no
# bind 127.0.0.1
daemonize yes
```

![](https://oss.yiki.tech/img/202304231043877.png)

## 设置 Redis 开机自启

```shell
# 设置开机自启
vi /etc/systemd/system/redis.service

[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

![](https://oss.yiki.tech/img/202304231043397.png)

```shell
# 创建 redis 命令软链接
ln -s /usr/local/redis/bin/redis-cli /usr/bin/redis

# 服务操作命令
systemctl start redis.service   #启动redis服务

systemctl stop redis.service   #停止redis服务

systemctl restart redis.service   #重新启动服务

systemctl status redis.service   #查看服务当前状态

systemctl enable redis.service   #设置开机自启动

systemctl disable redis.service   #停止开机自启动

# 杀死 redis 重启 redis
pkill -9 redis
ps aux | grep redis
systemctl start redis

# 查看 redis 状态
systemctl status redis.service
```

![](https://oss.yiki.tech/img/202304231043211.png)

![](https://oss.yiki.tech/img/202304231042187.png)
