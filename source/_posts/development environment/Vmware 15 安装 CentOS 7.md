---
title: Vmware 15 安装 CentOS 7
tags:
 - Software
categories: Linux
cover: 'https://oss.yiki.tech/img/202304230615297.svg'
description: CentOS 7是CentOS项目发布的开源类服务器操作系统，于2014年7月7日正式发布。CentOS 7是一个企业级的Linux发行版本，它源于RedHat免费公开的源代码进行再发行。
abbrlink: f7d25841
date: 2023-04-23 05:52:00
---

# Vmware 15 安装 CentOS 7

> CentOS 7是CentOS项目发布的开源类服务器操作系统，于2014年7月7日正式发布。CentOS 7是一个企业级的Linux发行版本，它源于RedHat免费公开的源代码进行再发行。[所需软件下载地址](https://pan.baidu.com/s/1bFGqIBzxpUbRq8WxeCVaDQ?pwd=qwer)

## 安装

![](https://oss.yiki.tech/img/202304230546157.png)

![](https://oss.yiki.tech/img/202304230545997.png)

![](https://oss.yiki.tech/img/202304230545775.png)

![](https://oss.yiki.tech/img/202304230545808.png)

![](https://oss.yiki.tech/img/202304230545496.png)

![](https://oss.yiki.tech/img/202304230545664.png)

![](https://oss.yiki.tech/img/202304230545634.png)

![](https://oss.yiki.tech/img/202304230544540.png)

![](https://oss.yiki.tech/img/202304230544926.png)

![](https://oss.yiki.tech/img/202304230544199.png)

![](https://oss.yiki.tech/img/202304230544392.png)

![](https://oss.yiki.tech/img/202304230544791.png)

![](https://oss.yiki.tech/img/202304230544241.png)

![](https://oss.yiki.tech/img/202304230543247.png)

![](https://oss.yiki.tech/img/202304230543765.png)

![](https://oss.yiki.tech/img/202304230543462.png)

![](https://oss.yiki.tech/img/202304230543273.png)

![](https://oss.yiki.tech/img/202304230543339.png)

![](https://oss.yiki.tech/img/202304230543474.png)

![](https://oss.yiki.tech/img/202304230543048.png)

![](https://oss.yiki.tech/img/202304230542530.png)

![](https://oss.yiki.tech/img/202304230542583.png)

![](https://oss.yiki.tech/img/202304230542907.png)

![](https://oss.yiki.tech/img/202304230542073.png)

![](https://oss.yiki.tech/img/202304230542608.png)

![](https://oss.yiki.tech/img/202304230541479.png)

![](https://oss.yiki.tech/img/202304230541065.png)

![](https://oss.yiki.tech/img/202304230541835.png)

![](https://oss.yiki.tech/img/202304230541825.png)

![](https://oss.yiki.tech/img/202304230541349.png)

![](https://oss.yiki.tech/img/202304230541081.png)

![](https://oss.yiki.tech/img/202304230541759.png)

![](https://oss.yiki.tech/img/202304230540756.png)

![](https://oss.yiki.tech/img/202304230540156.png)

![](https://oss.yiki.tech/img/202304230540661.png)

![](https://oss.yiki.tech/img/202304230540329.png)

![](https://oss.yiki.tech/img/202304230540571.png)

![](https://oss.yiki.tech/img/202304230540808.png)

![](https://oss.yiki.tech/img/202304230539526.png)

![](https://oss.yiki.tech/img/202304230539276.png)

![](https://oss.yiki.tech/img/202304230539421.png)

![](https://oss.yiki.tech/img/202304230539633.png)

![](https://oss.yiki.tech/img/202304230539203.png)

![](https://oss.yiki.tech/img/202304230539131.png)

![](https://oss.yiki.tech/img/202304230538504.png)

![](https://oss.yiki.tech/img/202304230538128.png)

## 配置固定 ip

```vim
// 修改虚拟机固定 ip
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

![](https://oss.yiki.tech/img/202304230538504.png)

```vim
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"                               # dhcp 自动获取修改为 静态
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="dc48a286-077d-4d19-b6b9-b0eafe7b4899"
DEVICE="ens33"
ONBOOT="yes"
IPADDR=192.168.0.101                    # 指定的固定 ip
NETMASK=255.255.255.0                   # 子网掩码
GATEWAY=192.168.0.1                     # 网关
DNS1=8.8.8.8                            # DNS 服务器
DNS2=114.114.114.114                    # DNS2 服务器
```

![](https://oss.yiki.tech/img/202304230538003.png)

```shell
// 重启网络
systemctl restart network.service

// 查看状态
firewall-cmd --state

// 停止防火墙
systemctl stop firewalld.service

// 禁止防火墙开机自启
systemctl disable firewalld.service 
```

![](https://oss.yiki.tech/img/202304230538003.png)

![](https://oss.yiki.tech/img/202304230538463.png)
