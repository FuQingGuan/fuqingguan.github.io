---
title: CentOS 7 安装 Nginx
tags:
  - Software
categories: Nginx
cover: 'https://oss.yiki.tech/img/202304231059402.svg'
description: Nginx (engine x)是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。*Nginx*是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，公开版本1.19.6发布于2020年12月15日。
abbrlink: caa6f64f
date: 2023-04-23 10:58:00
---

# CentOS 7 安装 Nginx

> *Nginx* (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。*Nginx*是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，公开版本1.19.6发布于2020年12月15日。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231055376.mp4" type="video/mp4">
  </videos>
</div>

## 下载 GCC 与 GCC-C++

```shell
cd /opt

yum -y install gcc

yum -y install gcc-c++
```

![](https://oss.yiki.tech/img/202304231054399.png)

## 下载解压编译 pcre

```shell
# 下载
wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz

tar -zxvf pcre-8.37.tar.gz
```

![](https://oss.yiki.tech/img/202304231055669.png)

```shell
cd /opt/pcre-8.37/

./configure

make && make install

pcre-config --version
```

![](https://oss.yiki.tech/img/202304231102529.png)

```shell
cd /opt

yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

![](https://oss.yiki.tech/img/202304231056804.png)

## 下载编译 nginx

```shell
wget http://nginx.org/download/nginx-1.16.1.tar.gz

tar -zxvf nginx-1.16.1.tar.gz

cd /opt/nginx-1.16.1/

./configure
```

![](https://oss.yiki.tech/img/202304231056324.png)

```shell
make && make install
```

![](https://oss.yiki.tech/img/202304231056144.png)

## 配置 Nginx 开机自启

```shell
vim /lib/systemd/system/nginx.service

/**
 * [Unit]:服务的说明
 * Description:描述服务
 * After:描述服务类别
 * [Service]服务运行参数的设置
 * Type=forking是后台运行的形式
 * ExecStart为服务的具体运行命令
 * ExecReload为重启命令
 * ExecStop为停止命令
 * PrivateTmp=True表示给服务分配独立的临时空间
 * 注意：[Service]的启动、重启、停止命令全部要求使用绝对路径
 * [Install]运行级别下服务安装的相关设置，可设置为多用户，即系统运行级别为3
 */
[Unit]
Description=nginx
After=network.target
  
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
  
[Install]
WantedBy=multi-user.target
```

![](https://oss.yiki.tech/img/202304231056943.png)

## 设置 Nginx 开机自启

```shell
# 设置开机自启
systemctl enable nginx.service

# 查看nginx状态
systemctl status nginx.service

# 杀死nginx重启nginx
pkill -9 nginx
ps aux | grep nginx
systemctl start nginx

# 查看nginx状态
systemctl status nginx.service
```

![](https://oss.yiki.tech/img/202304231056791.png)

## Nginx 常用命令

```shell
# 启动命令
cd /usr/local/nginx/sbin
./nginx 

# 关闭命令
cd /usr/local/nginx/sbin
./nginx  -s  stop 

# 重新加载命令 
cd /usr/local/nginx/sbin
./nginx  -s  reload
```

![](https://oss.yiki.tech/img/202304231057352.png)