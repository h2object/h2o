{
   "key":"template",
   "link":"/docs/template.md",
  "title":"模板文件",
  "active":"docs",
  "anchors":[
  	["编辑模板","edit"],
  	["编辑markdown模板","edit-md"],
  	["编辑邮件模板","edit-email"],
  	["编辑短信模板","edit-sms"],
  	["编辑独立执行模板","edit-x"],
  	["上传模板","upload"],
  	["访问模板","access"],
  	["执行模板","execute"],
  	["markdown文件执行模板","md-execute"]
  ]
}

模板文件
---

[上一章](/docs/cloud.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/markdown.md)

不同于静态文件与云端文件处理, 在H2O中, 模板文件主要辅助markdown文件生成常规网页。

同时，模板文件也可以访问后缀<code>.x</code>的方式直接生成网页。

如果是直接通过模板生成网页, 一定要注意数据源的编辑。详见下节.


<a name="edit"></a>

#### 1. 编辑页面模板

根据页面模板的用途, 划分为四类模板。

<a name="edit-md"></a>

##### 1.1 markdown页面模板

此类模板主要用于通过markdown文件,生成页面。

通过访问markdown文件, 以后缀<code>.md</code>方式访问。H2O服务程序会自动解析markdown文件,

并将通过markdown内容生成的 **html** 内容,填充到模板对应参数位置上。

访问markdown文件方式, 是在浏览器中输入:

<code>http://host:port/docs/index.md?template=markdown</code>

参数template如果没有设置的话, 会调用系统配置的模板项中的markdown默认模板配置。

参数<code>template</code>设置说明如下:

````
	如上传 demo.html 到H2O上 作为模板文件使用
	curl -X PUT demo.html http://127.0.0.1:9000/xxx/yyy/zz/demo.tpl

	如果要设置该模板， 则:
	template = xxx/yyy/zz/demo
	或
	template = /xxx/yyy/zz/demo
````

H2O在处理markdown文件的过程中, 会解析mardown文件, 因为H2O中, 还会解析markdown头信息,如下:

例如, 以下markdown用例, demo.md

````markdown
+++
title = "测试"
author = "demo"
tags = ["测试", "demo", "文章"]
+++

文章标题
---

## 章节1

markdown正文

````
经过H2O对demo.md的解析, 该markdown文件包括:

*	meta 头信息
*	markdown 正文信息

所以在页面模板中可以通过如下方式访问相关信息:

*	<code>{{.meta.title}}</code>
*	<code>{{.meta.author}}</code>
*	<code>{{index .meta.tags 0}}</code>
*	<code>{{index .meta.tags 1}}</code>
*	<code>{{index .meta.tags 2}}</code>
*	<code>{{.markdown}}</code>

编辑针对该 demo.md, 编辑一个最简单的的页面模板情况如下:

````html
<html>
<head>
	<title>{{.meta.title}}</title>
</head>
<body>
	<div>
		{{.markdown}}
	</div>
</body>
</html>
````

如果服务程序找不到markdown文件生成页面的模板, 则会直接将markdown生成的html输出到网页上。

<a name="edit-email"></a>

##### 1.2 邮件内容页面模板

不同于markdown文件模板, 模板数据源来自于markdown文件本身。

邮件内容页面模板主要用于用户认证过程中, 包括:

*	用户注册
*	用户激活
*	密码重置

所以邮件内容模板数据源主要由系统在用户认证过程中提供, 包括:

*	<code>{{.provider}}</code>

	认证方式

*	<code>{{.auth}}</code>

	认证唯一标识,针对认证方式不同而不同。如email方式认证, 该参数提供 用户注册邮箱地址。

*	<code>{{.password}}</code>

	用户注册密码,用户注册过程中可以不提供密码, 此时可以通过该参数告诉用户系统生成的密码。

*	<code>{{.token}}</code>

	链接有效性令牌。通常用户认证过程中产生的令牌的有效次数为1次。

以用户激活邮件模板为例：
````

尊敬的用户{{.auth}},<br/>
<p>
	您的用户名是: {{.auth}} <br/>
	感谢您注册成为会员，请点击激活链接:<br/>
	http://127.0.0.1:9000/actived_success.x?active={{.token}}
</p>

====<br/>
h2object.io

````

<a name="edit-sms"></a>	

##### 1.3 短信内容页面模板

短信内容页码模板, 则主要提供验证码支持。通过以下参数表示验证码(6位数字):

*	<code>{{.token}}</code>

用例:

````
尊敬的用户，您的验证码是:{{.token}}.请及时激活验证码。

````

<a name="edit-x"></a>

##### 1.4 独立生成网页模板

不同于以上三类文件模板, 文件模板还可以通过后缀<code>.x</code>的访问方式，直接生成网页模板。

此时, 文件模板的数据源主要来源于，H2O服务本身提供的模板函数, 常见的提供数据源的模板函数有:

*	<code>{{markdown "md文件路径"}}</code>

	获取指定markdown文件内容html

*	<code>{{meta     "md文件路径"}}</code>

	获取指定markdown文件头信息结构体

*	<code>{{object    "请求路径"}}</code>		

	获取指定object对象值

其他，模板函数请参考golang.org网站[text/template](http://golang.org/pkg/text/template/)功能。


<a name="upload"></a>

#### 2. 上传页面模板

同静态文件处理方式相同，将本地模板文件上传到指定的模板文件路径上.

同样, 上传页面模板需要管理员权限。

需要注意的时, 模板文件路径的后缀必须是<code>.tpl</code>, 否则会按照静态文件处理。

````
// 上传本地 home.html 文件到 http://127.0.0.1:9000/home.tpl 路径下
// home.html 可以是纯html页面，也可以是包含 template 函数的模板文件。

$: curl -X PUT -T home.html http://127.0.0.1:9000/home.tpl

````

<a name="access"></a>

#### 3. 访问页面模板

访问页面模板, 同静态文件相同, 不过模板文件的访问需要管理员权限。

根据上传时设置的文件模板路径进行访问。

打开浏览器输入

<code>http://127.0.0.1:9000/home.tpl?appid=[your appid]&secret=[your secret]</code>

返回的将是模板的原始内容。

<a name="execute"></a>

#### 4. 执行页面模板

已知页码模板路径: /foo/bar.tpl

打开浏览器输入

<code>http://127.0.0.1:9000/foo/bar.x</code>

执行页面模板直接生成web页面。


<a name="md-execute"></a>

#### 5. 利用markdown文件, 执行页面模板

已知页码模板路径: /foo/bar.tpl

已知markdown文件路径: /demo.md

打开浏览器输入

<code>http://127.0.0.1:9000/demo.md?template=foo/bar</code>

利用demo.md文件执行页面模板直接生成web页面。



