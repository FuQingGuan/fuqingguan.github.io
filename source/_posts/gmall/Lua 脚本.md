---
title: Lua 脚本
tags:
  - Java
categories: Lua
cover: 'https://oss.yiki.tech/img/202305032332873.svg'
description: Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放， 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。Redis 中对 Lua 脚本提供了主动支持, 需要注意的是 打印的不是 lua 脚本的 print, 而是 lua 脚本的返回值
abbrlink: cdb398c1
date: 2023-05-03 23:29:00
---

# Lua

> Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放， 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。Redis 中对 Lua 脚本提供了主动支持, 需要注意的是 打印的不是 lua 脚本的 print, 而是 lua 脚本的返回值

```
eval script numkeys key [key ...] arg [arg ...]
	eval: 指令名称
	script: lua 脚本字符串
	numkeys: key 列表的元素数量。必须参数
	key: 传递的 key 列表, KEYS[index] 注 下标从 1 开始
	arg: 传递的 arg 列表, ARGV[index] 注 下标同上
```

![](https://oss.yiki.tech/img/202305032244868.png)

## 变量

| 变量     | 语法        | Redis 是否支持                          |
| -------- | ----------- | --------------------------------------- |
| 全局变量 | a = 5       | 不支持, 允许可能把 Redis 底层变量替换掉 |
| 局部变量 | local a = 5 | 支持                                    |

![](https://oss.yiki.tech/img/202305032245315.png)

![](https://oss.yiki.tech/img/202305032245799.png)

## 判断

```lua
if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end
```

![](https://oss.yiki.tech/img/202305032247710.png)

![](https://oss.yiki.tech/img/202305032250477.png)

## 数组

```lua
array = {"Lua", "Tutorial"}
```

![](https://oss.yiki.tech/img/202305032248887.png)

![](https://oss.yiki.tech/img/202305032251977.png)

## lua 脚本中执行 Redis 指令

> Redis 给 lua 脚本提供了一个类库: Redis.call(参数顺序和指令顺序一致)

![](https://oss.yiki.tech/img/202305032322687.png)

![](https://oss.yiki.tech/img/202305032328895.png)