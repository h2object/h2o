+++
title = "H2O 开发指南"
author = "刘建平"
active = "docs"
+++
开发指南
---

H2O 是 HTTP to Object 的英文缩写, 主要提供了基于HTTP协议的对象服务, 对象通过JSON格式的方式进行客户端与服务端间传输。

目录
----
- [概述](/docs/overview.md)
- [安装](/docs/install.md)
- [初始化](/docs/init.md)
- [关键概念](/docs/base.md)
- [系统配置](/docs/configure.md)
- [H2O命令](/docs/commands.md)
	- [http命令](/docs/commands.md#http)
	- [push命令](/docs/commands.md#push)
	- [update命令](/docs/commands.md#update)
	- [bench命令](/docs/commands.md#bench)
	- [upload命令](/docs/commands.md#upload)
	- [export命令](/docs/commands.md#export)
- [H2O服务](/docs/h2o.md)
	- [对象服务](/docs/object.md)
		-	[对象的增删改查](/docs/object-crud.md)
		-	[对象的同步监听](/docs/object-watch.md)
		-	[对象的属性验证](/docs/object-valid.md)
		-	[对象的属性索引](/docs/object-index.md)
		-	[对象的高级查询](/docs/object-query.md)
	- [文件服务](/docs/file.md)
		- [静态文件](/docs/static.md)
		- [云端文件](/docs/cloud.md)
		- [template文件](/docs/template.md)
		- [markdown文件](/docs/markdown.md)
	- [认证服务](/docs/auth.md)
		- [基于手机号码的用户认证](/docs/auth-mobile.md)
		- [基于邮件&密码的用户认证](/docs/auth-email.md)
		- [基于第三方认证平台的用户认证](/docs/auth-third.md)
			- [基于QQ的用户认证](/docs/auth-third.md#qq)
			- [基于Weibo的用户认证](/docs/auth-third.md#weibo)	
	- [系统服务](/docs/system.md)
		- [频率限制](/docs/ratelimits.md)
		- [安全控制](/docs/security.md)
- [API&SDK](/docs/api.md)
	- [HTTP API](/docs/api-http.md)
	- [Javascript](/docs/api-javascript.md)
	- [ObjectC](/docs/api-oc.md)
	- [Java](/docs/api-java.md)
	- [go](/docs/api-go.md)
- [性能指标](/docs/bench.md)
- [系统限制](/docs/limits.md)
	- [容量计算方法](/docs/limits.md#storage)
	- [流量计算方法](/docs/limits.md#network)
- [贡献代码](/docs/contribution.md)
- [许可证](/docs/license.md)



