---
title: CentOS 7 安装 MySQL 8
tags:
  - Software
categories: MySQL
cover: 'https://oss.yiki.tech/img/202304231037977.svg'
description: MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统)应用软件之一。
abbrlink: b7ef3c6c
date: 2023-04-23 10:35:00
---

# CentOS 7 安装 MySQL 8

> *MySQL*是一个关系型数据库管理系统，由瑞典*MySQL* AB 公司开发，属于 Oracle 旗下产品。*MySQL* 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，*MySQL*是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件之一。

<div>
  <!-- mp4格式 -->
  <video id="video" controls="" width="800" height="500" preload="none" poster="封面">
        <source id="mp4" src="https://oss.yiki.tech/img/202304231030172.mp4" type="video/mp4">
  </videos>
</div>

## 卸载 mariadb

> CentOS 7 默认安装 mariadb 先执行查询

```shell
rpm -qa|grep mariadb
```

> 如果存在mariadb执行删除

```shell
rpm -e --nodeps  mariadb-libs
```

![](https://oss.yiki.tech/img/202304231031835.png)

## 下载安装

> 由于mysql安装过程中，会通过mysql用户在/tmp目录下新建tmp_db文件，所以请给/tmp较大的权限

```shell
chmod -R 777 /tmp
```

![](https://oss.yiki.tech/img/202304231031069.png)

> 进入指定目录并创建对应文件夹

```shell
cd /opt/

mkdir -p mysql
```

![](https://oss.yiki.tech/img/202304231031317.png)

> 进入创建目录并下载 MySQL 8

```shell
cd /opt/mysql/

wget https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.31-1.el7.x86_64.rpm-bundle.tar
```

![](https://oss.yiki.tech/img/202304231032635.png)

> 解压文件到指定目录

```shell
tar -xvf mysql-8.0.31-1.el7.x86_64.rpm-bundle.tar -C /opt/mysql
```

![](https://oss.yiki.tech/img/202304231032423.png)

> 安装

```shell
yum install -y perl.x86_64

rpm -ivh mysql-community-common-8.0.31-1.el7.x86_64.rpm

rpm -ivh mysql-community-client-plugins-8.0.31-1.el7.x86_64.rpm

rpm -ivh mysql-community-libs-8.0.31-1.el7.x86_64.rpm

rpm -ivh mysql-community-client-8.0.31-1.el7.x86_64.rpm

rpm -ivh mysql-community-icu-data-files-8.0.31-1.el7.x86_64.rpm

rpm -ivh mysql-community-server-8.0.31-1.el7.x86_64.rpm
```

![](https://oss.yiki.tech/img/202304231032272.png)

## 初始化

> 查看安装版本

```shell
mysqladmin --version
```

![](https://oss.yiki.tech/img/202304231033884.png)

```shell
// mysql 服务初始化. 安装成功后会生成一个密码, 我们可以通过这个密码进行连接
mysqld --initialize --user=mysql

// 启动 mysql 服务
systemctl start mysqld.service

// 查看密码
cat /var/log/mysqld.log

# 关闭：
systemctl stop mysqld.service
# 重启：
systemctl restart mysqld.service
# 查看状态：
systemctl status mysqld.service
```

![](https://oss.yiki.tech/img/202304231033617.png)

## 修改初始密码

```shell
// 首次登陆 mysql
mysql -hlocalhost -P3306 -uroot -p 回车,然后录入初始化密码
```

![](https://oss.yiki.tech/img/202304231033347.png)

> 修改密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

![](https://oss.yiki.tech/img/202304231033116.png)

## 远程连接

> 默认情况下，mysql不允许远程连接。只允许localhost连接

![](https://oss.yiki.tech/img/202304231033413.png)

```sql
// 查看远程连接权限
select host,user,select_priv,insert_priv from mysql.user;
```

![](https://oss.yiki.tech/img/202304231034790.png)

## 修改 root 账户的 host 地址

```sql
// 登陆后进入 mysql 库中
use mysql;

// 修改 root 账户的 host 地址
update user set host = '%' where user ='root';
```

![](https://oss.yiki.tech/img/202304231034050.png)

```sql
// 刷新, 并重新使用 可视化工具登陆
flush privileges;

exit
```

![](https://oss.yiki.tech/img/202304231034737.png)

![](https://oss.yiki.tech/img/202304231034072.png)