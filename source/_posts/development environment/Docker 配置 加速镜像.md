---
title: Docker 配置 加速镜像
tags:
  - Software
categories: Docker
cover: 'https://oss.yiki.tech/img/202304231118747.svg'
description: Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行Linux或Windows操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
abbrlink: b661041d
date: 2023-04-23 11:19:00
---

# Docker 配置 加速镜像

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231117675.mp4" type="video/mp4">
  </videos>
</div>

[阿里云](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

![](https://oss.yiki.tech/img/202304231117197.png)

## 修改配置

```shell
vim /etc/docker/daemon.json
```

![](https://oss.yiki.tech/img/202304231119500.png)

## 配置加速地址

```shell
{
	"registry-mirrors": ["加速器地址"]
}
```

![](https://oss.yiki.tech/img/202304231119665.png)

## 重新加载文件和重启 docker

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

![](https://oss.yiki.tech/img/202304231119389.png)