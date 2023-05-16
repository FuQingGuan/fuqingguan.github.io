---
title: Docker 安装 RabbitMQ
tags:
  - Docker
categories: RabbitMQ
cover: 'https://oss.yiki.tech/img/202304231126080.svg'
description: RabbitMQ是实现了高级消息队列协议（AMQP）的开源消息代理软件（亦称面向消息的中间件）。RabbitMQ服务器是用Erlang语言编写的，而集群和故障转移是构建在开放电信平台框架上的。所有主要的编程语言均有与代理接口通讯的客户端库。
abbrlink: 1d5dc80f
date: 2023-04-23 11:28:00
---

# Docker 安装 RabbitMQ

> *RabbitMQ*是实现了高级消息队列协议（AMQP）的开源消息代理软件（亦称面向消息的中间件）。*RabbitMQ*服务器是用Erlang语言编写的，而集群和故障转移是构建在开放电信平台框架上的。所有主要的编程语言均有与代理接口通讯的客户端库。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231126279.mp4" type="video/mp4">
  </videos>
</div>

## 下载

```shell
docker pull rabbitmq:management
```

![](https://oss.yiki.tech/img/202304231126462.png)

## 启动

```shell
docker run -d -p 5672:5672 -p 15672:15672 -p 25672:25672 --name rabbitmq rabbitmq:management
```

![](https://oss.yiki.tech/img/202304231126602.png)

## 设置开机自启

```shell
docker update rabbitmq --restart=always
```

![](https://oss.yiki.tech/img/202304231127129.png)

## 网页端地址

```shell
http://ip:15672/#/
```

![](https://oss.yiki.tech/img/202304231127411.png)
