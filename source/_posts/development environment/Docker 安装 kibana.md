---
title: Docker 安装 kibana
tags:
  - Docker
categories: kibana
cover: 'https://oss.yiki.tech/img/202304231145907.svg'
description: Kibana 是一款免费且开放的前端应用程序,其基础是 Elastic Stack,可以为 Elasticsearch 中索引的数据提供搜索和数据可视化功能。
abbrlink: 5b10cb77
date: 2023-04-23 11:45:00
---

# Docker 安装 kibana

> *Kibana* 是一款免费且开放的前端应用程序,其基础是 Elastic Stack,可以为 Elasticsearch 中索引的数据提供搜索和数据可视化功能。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231139140.mp4" type="video/mp4">
  </videos>
</div>


## 下载

```shell
docker pull kibana:7.6.2
```

![](https://oss.yiki.tech/img/202304231139873.png)

## 启动

```shell
docker run --name kibana7.6.2 -p 5601:5601 -d kibana:7.6.2
```

![](https://oss.yiki.tech/img/202304231139686.png)

## 配置

```shell
// 进入容器内部
docker exec -it kibana7.6.2 bash

// 设置 es 地址 以及中文
vi /opt/kibana/config/kibana.yml
elasticsearch.hosts: [ "http://ip:9200" ]
i18n.locale: "zh-CN"

// 退出
exit
```

![](https://oss.yiki.tech/img/202304231140257.png)

## 重启配置开机自启

```shell
// 重启 kibana
docker restart kibana7.6.2

// 设置开机自启
docker update kibana7.6.2 --restart=always
```

![](https://oss.yiki.tech/img/202304231140723.png)

## 网页端地址

```shell
http://ip:5601/
```

![](https://oss.yiki.tech/img/202304231140518.png)