+++
title = "文件服务"
active = "docs"
anchors = []
+++

文件服务
---

[上一章](/docs/h2o.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/auth.md)

H2O提供四类文件服务, 分别是:

-	[静态文件](/docs/static.md)
	通过对象服务, 可以实现后端业务数据的常规操作。

-	[云端文件](/docs/cloud.md)
	通过文件服务, 实现多媒体文件的的映射以及常规网站应用的实现。

-	[模板文件](/docs/template.md)
	通过认证服务, 实现会员账号的管理以及基于用户认证的安全控制。

-	[markdown文件](/docs/markdown.md)
	通过系统服务, 实现对H2O服务本身的管理与控制。

>   请求后缀(HTTP.URI.Suffix)

H2O服务中, 文件服务支持以下后缀服务:

|后缀       |功能      |备注     |
|----------|----------|--------|
|md        |Markdown上传&访问|<code>上传,必须具有管理员操作权限</code> |
|tpl       |Template上传&访问|<code>必须具有管理员操作权限</code> |
|x         |Template生成页面| |


具体文件服务，参考对应文档。
