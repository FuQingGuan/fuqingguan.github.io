---
title: CentOS 7 安装 Docker
tags:
  - Software
categories: Docker
cover: 'https://oss.yiki.tech/img/202304231108200.svg'
description: Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
abbrlink: 8d51235e
date: 2023-04-23 11:06:00
---

# CentOS 7 安装 Docker

> *Docker* 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231110900.mp4" type="video/mp4">
  </videos>
</div>


## 卸载系统之前的 docker

```shell
sudo yum remove docker \
        docker-client \
        docker-client-latest \
        docker-common \
        docker-latest \
        docker-latest-logrotate \
        docker-logrotate \
        docker-engine
```

![](https://oss.yiki.tech/img/202304231106625.png)

## 安装

```shell
// 安装 Docker-CE
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

// 设置 docker repo 的 yum 源, 此处是阿里源
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

// 安装 docker, 以及docker-cli
sudo yum install docker-ce docker-ce-cli containerd.io
```

![](https://oss.yiki.tech/img/202304231105975.png)

## 常用命令

```shell
// 启动 docker
sudo systemctl start docker

// 查看 docker 状态
sudo systemctl status docker

// 设置 docker 开机自启
sudo systemctl enable docker

// 重启docker 
sudo systemctl restart docker
```

![](https://oss.yiki.tech/img/202304231105641.png)
