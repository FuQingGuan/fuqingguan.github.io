---
title: 跨域
tags:
  - Tips
categories: Cors
cover: 'https://oss.yiki.tech/img/202304270930089.svg'
description: 跨域（Cross-Origin Resource Sharing，缩写为CORS）是浏览器的一种安全机制，限制从一个域的网页发起对另一个域的资源请求。
abbrlink: 58add7e9
date: 2023-04-27 09:29:41
---

## 跨域

> 跨域（Cross-Origin Resource Sharing，缩写为CORS）是浏览器的一种安全机制，限制从一个域的网页发起对另一个域的资源请求。
>
> 比如说，在一个example1.com的网页中，不能发起对example2.com的资源请求，除非example2.com服务器上配置了允许该网页访问的CORS配置。
>
> 当网页发起对不同域的资源请求时，浏览器会发送一个“预检请求”，询问服务器是否允许该资源访问，服务器返回对应的配置信息，浏览器根据配置信息决定是否允许资源请求。这样可以保证客户端和服务端的安全性。

## 基础知识

> 浏览器对于 `javascript` 的同源策略的限制, `域名和端口都相同，但是请求路径不同，不属于跨域. 跨域不一定都会有跨域问题`, 因为`跨域问题是浏览器对于 ajax 请求的一种安全限制`：**一个页面发起的ajax请求，只能与当前页域名相同的路径**，这能有效的阻止跨站攻击
> 注意: 静态资源一般不存在跨域问题。因为静态资源，如图片、CSS、JavaScript等文件，在浏览器中是直接加载的，而不是通过JavaScript发起的请求。

| 跨域原因说明       | 示例                                   |
| ------------------ | -------------------------------------- |
| 域名不同           | `www.jd.com` 与 `www.taobao.com`       |
| 域名相同，端口不同 | `www.jd.com:8080` 与 `www.jd.com:8081` |
| 二级域名不同       | `item.jd.com` 与 `miaosha.jd.com`      |
| 协议不同           | `https://jd.com` 和 `http://jd.com`    |

```shell
Access to XMLHttpRequest at 'http://api.gmall.com/pms/brand?t=1673718671760&pageNum=1&pageSize=10&key=' from origin 'http://manager.gmall.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

CORS 策略已阻止从源“http://manager.gmall.com”访问位于“http://api.gmall.com/pms/brand?t=1673718671760&pageNum=1&pageSize=10&key=”处的 XMLHttpRequest：对预检请求的响应未通过访问控制检查：请求的资源上不存在“访问控制-允许源”标头。
```

![](https://oss.yiki.tech/img/202304270919285.png)

## 影响 以及 解决方案

> 在实际生产环境中, 肯定会有很多台服务器之间交互, 地址和端口都可能不同，就会发生跨域问题

* 解决方案
    * jsonp: 利用 html 标签解决跨域问题(动态数据两端添加标签)
        * 前后端开发人员协调好
        * 只能解决 get 请求的跨域问题(`因为 JSONP 原理是动态插入 `script` 标签，通过回调函数将数据返回给前端，而不是通过 XMLHttpRequest 对象进行网络请求。因此，只能通过 GET 请求获取数据，不能使用 POST、PUT、DELETE 等请求方式。`)
    * nginx: 代理为不跨域(逃避式的解决方案)
        * 配置 Cors 规范: 违背了 devops 思想
    * cors 规范: 增加服务器端的访问压力
        * 两次请求
            * 预检请求 OPTIONS
                * `Access-Control-Allow-Origin`：可接受的域，是一个具体域名或者*（代表任意域名）
                * `Access-Control-Allow-Credentials`：是否允许携带cookie，默认情况下，cors不会携带cookie，除非这个值是true
                * `Access-Control-Allow-Methods`：允许访问的方式
                * `Access-Control-Allow-Headers`：允许携带的头
                * `Access-Control-Max-Age`：本次许可的有效时长，单位是秒，**过期之前的ajax请求就无需再次进行预检了**
            * 真正的请求
        * 实现
            * 微服务系统中可以直接配置在网关中, 可以通过拦截器统一实现, 不必每次都去进行跨域判定的编写


```java
/**
 * @Description: 在微服务架构中，网关作为请求的入口，承担了请求路由和服务发现的功能。因此网关更加容易控制和管理请求的流量。
 *      把跨域配置放在网关中，可以统一管理跨域请求，避免每个服务都要单独配置的麻烦。并且，网关可以对跨域请求进行更细致的控制和限制，比如说限制来源域名、请求方法等，进一步增强系统的安全性。
 *      另外，在网关中配置跨域，还可以避免浏览器发送多余的预检请求，提高系统的性能。
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        // 初始化 一个 cors 配置类对象
        CorsConfiguration configuration = new CorsConfiguration();
        // 允许跨域访问的域名. * 代表所有域名. 不推荐 1. 存在安全问题 2. 不能携带 cookie
        configuration.addAllowedOrigin("http://manager.gmall.com"); // 可以填写多个
        configuration.addAllowedOrigin("http://192.168.0.121:1000"); // 可以填写多个
        // 允许那些请求方式跨域访问 * 允许所有
        configuration.addAllowedMethod("*");
        // 允许携带的头信息 * 允许所有
        configuration.addAllowedHeader("*");
        // 允许 cookie 跨域访问, 需要满足两点 1. AllowedOrigin 不能写 * 2. 此处需要设置为 true
        configuration.setAllowCredentials(true);

        // 初始化 cors 配置源
        UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
        // 注册 cors 配置. /** 针对所有路径 做 cors 配置验证.
        configurationSource.registerCorsConfiguration("/**", configuration);
        return new CorsWebFilter(configurationSource);
    }
}
```

![](https://oss.yiki.tech/img/202304270927309.png)

![](https://oss.yiki.tech/img/202304270922092.png)

![](https://oss.yiki.tech/img/202304270928143.png)