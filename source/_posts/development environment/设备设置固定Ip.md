---
title: 各个设备设置固定 IP
tags:
  - Tips
categories: ip
cover: 'https://oss.yiki.tech/img/202304231755505.svg'
description: 静态IP地址（又称固定IP地址）是长期分配给一台计算机或网络设备使用的 IP 地址。
abbrlink: f891c661
date: 2023-04-23 17:54:00
---

> 静态IP地址（又称*固定IP*地址）是长期分配给一台计算机或网络设备使用的 IP 地址。

## Mac 设置固定 IP

![](https://oss.yiki.tech/img/202304231155075.png)

![](https://oss.yiki.tech/img/202304231156918.png)

![](https://oss.yiki.tech/img/202304231156276.png)

## Windows 设置固定 IP

![](https://oss.yiki.tech/img/202304231156475.png)

![](https://oss.yiki.tech/img/202304231156643.png)

![](https://oss.yiki.tech/img/202304231156978.png)

![](https://oss.yiki.tech/img/202304231156600.png)

![](https://oss.yiki.tech/img/202304231157279.png)

![](https://oss.yiki.tech/img/202304231157739.png)

## CentOS 设置固定 IP

```shell
// 修改虚拟机固定 ip
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

![](https://oss.yiki.tech/img/202304231157684.png)

```shell
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

![](https://oss.yiki.tech/img/202304231157178.png)

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

![](https://oss.yiki.tech/img/202304231158476.png)

![](https://oss.yiki.tech/img/202304231158809.png)
