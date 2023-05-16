---
title: Docker 安装 elasticsearch
tags:
  - Docker
categories: elasticsearch
cover: 'https://oss.yiki.tech/img/202304231145817.svg'
description: Elasticsearch 是位于 Elastic Stack 核心的分布式搜索和分析引擎。Logstash 和 Beats 有助于收集、聚合和丰富您的数据并将其存储在 *Elasticsearch* 中。Kibana 使您能够以交互方式探索、可视化和分享对数据的见解，并管理和监控堆栈。
abbrlink: 3efb73df
date: 2023-04-23 11:43:00
---

# Docker 安装 elasticsearch

> *Elasticsearch* 是位于 Elastic Stack 核心的分布式搜索和分析引擎。Logstash 和 Beats 有助于收集、聚合和丰富您的数据并将其存储在 *Elasticsearch* 中。Kibana 使您能够以交互方式探索、可视化和分享对数据的见解，并管理和监控堆栈。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231137996.mp4" type="video/mp4">
  </videos>
</div>


## 下载

```shell
docker pull elasticsearch:7.6.2
```

![](https://oss.yiki.tech/img/202304231135112.png)

## 启动

```shell
docker run --name elasticsearch7.6.2 -d -e ES_JAVA_OPTS="-Xms512m -Xmx512m" --net host -e "discovery.type=single-node" -p 9200:9200 -p 9300:9300 elasticsearch:7.6.2
```

![](https://oss.yiki.tech/img/202304231136210.png)

## 下载 ik 分词器 插件

```shell
// 创建目录
mkdir -p /mydata/es

// 进入目录
cd /mydata/es/

// 下载 ik 分词器
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.6.2/elasticsearch-analysis-ik-7.6.2.zip
```

![](https://oss.yiki.tech/img/202304231136585.png)

## 解压配置 ik 分词器 插件

```shell
// 解压
unzip elasticsearch-analysis-ik-7.6.2.zip -d ik-analyzer

// 拷贝
docker cp ./ik-analyzer elasticsearch7.6.2:/usr/share/elasticsearch/plugins
```

![](https://oss.yiki.tech/img/202304231136243.png)

## 重启配置开机自启

```shell
// 重启 es
docker restart elasticsearch7.6.2

// 设置开机自启
docker update elasticsearch7.6.2 --restart=always
```

![](https://oss.yiki.tech/img/202304231136966.png)

## 网页端地址

```shell
http://ip:9200/
```

![](https://oss.yiki.tech/img/202304231136980.png)
