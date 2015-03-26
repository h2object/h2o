+++
title = "关键概念"
active = "docs"
anchors = [["请求", "http"], ["对象","object"],["映射","to"],["请求方法","method"],["请求后缀","suffix"],["处理流程","flow"]]
+++

关键概念
---

[上一章](/docs/init.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/configure.md)

H2O, 是 **HTTP to OBJECT** 的缩写, 包括 <code>HTTP</code> 与 <code>OBJECT</code> 两个关键概念。

<a name="http"></a>

### 1. 请求(HTTP) 

所有请求均是基于HTTP协议的。根据请求方式的不同, 包括以下属性:

*	请求方法 (<code>Method</code>)
*	请求路径 (<code>URI.Path</code>)
*	请求后缀 (<code>URI.Suffix</code>)
*	请求参数 (<code>URI.Params</code>)
*	请求数据 (<code>Data</code>)

例如,

**请求目的**: 

更新 <code>/users</code> 对象空间下, 对象键为 <code>james</code>的对象的属性值为 <code>age = 34</code>.

**请求发起**:

````shell
$: curl -X PATCH -d '{"age":34}' http://127.0.0.1:9000/Users/james.json
````
**请求分解**:

````
	HTTP.Host = "127.0.0.1"
	HTTP.Port = 9000
	HTTP.Method = PATCH
	HTTP.URI.Path = "/users/james" #H2O中所有对象服务的路径不区分大小写, 系统中以小写表示
	HTTP.URI.Suffix = "json"
	HTTP.URI.Params = [] #参数为数组类型
	HTTP.Data = '{"age":34}'
````

<a name="object"></a>

### 2. 对象(OBJECT)

对象包括三个属性, 分别是:

*	对象空间 	(<code>bucket</code>)
*	对象键  	(<code>key</code>)
*	对象值  	(<code>value</code>)

通过, 对象的空间与对象键的两属性可以标识出一个对象。

而对象值属性，则是存放了对象具体值的数据结构, 可能是整型、布尔型、字符串等基本类型, 也可以是数组、结构体、等复杂结构体。

<a name="to"></a>

### 3. 请求与对象的映射

映射关系, 可以通过以下公式进行描述:

<code>HTTP.URI.Path = OBJECT.bucket + "/" +  OBJECT.key<br/> HTTP.URI.Data = JSON(OBJECT.value)</code>

仍以以上列子说明, HTTP请求隐射到OBJECT中, OBJECT的属性值如下:

````
	OBJECT.bucket = "/users"
	OBJECT.key = "james"
	OBJECT.value = map[string]interface{}{"age":34}
````

<a name="method"></a>

### 4. 请求方法(HTTP.Method)

H2O服务中, 通过 *请求方法(HTTP.Method)* 甄别对象操作类型:

<table class="table">
	<tr>
		<td>创建操作</td>
		<td>POST</td>
	</tr>
	<tr>
		<td>修改操作</td>
		<td>PATCH</td>
	</tr>
	<tr>
		<td>重置操作</td>
		<td>PUT</td>
	</tr>
	<tr>
		<td>删除操作</td>
		<td>DELETE</td>
	</tr>
	<tr>
		<td>查询操作</td>
		<td>GET</td>
	</tr>
</table>

<a name="suffix"></a>

### 5. 请求后缀(HTTP.URI.Suffix)

H2O服务中, 通过请求后缀甄别请求内容。当前版本, 支持以下后缀服务:

<table class="table">
	<tr>
		<td>json</td>
		<td>常规对象操作(增删改查)</td>
	</tr>
	<tr>
		<td>event</td>
		<td>监听指定路径下对象的同步事件</td>
	</tr>
	<tr>
		<td>size</td>
		<td>获取指定对象大小</td>
	</tr>
	<tr>
		<td>keys</td>
		<td>获取指定对象空间所有子对象键</td>
	</tr>
	<tr>
		<td>total</td>
		<td>获取指定对象空间所有子对象个数统计</td>
	</tr>
	<tr>
		<td>valid</td>
		<td>设置指定对象空间子级对象的属性验证功能(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>index</td>
		<td>设置指定对象空间子级对象的属性索引功能(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>ratelimit</td>
		<td>设置指定HTTP请求路径访问频率(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>security</td>
		<td>设置指定HTTP请求路径安全控制(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>md</td>
		<td>markdown文件的上传与访问, 其中上传处理(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>tpl</td>
		<td>template文件的上传与访问(<code>必须具有管理员操作权限</code>)</td>
	</tr>
	<tr>
		<td>x</td>
		<td>访问由template文件直接生成的网页</td>
	</tr>
</table>

**后缀以外的请求, H2O服务将执行普通的文件服务进行处理**。

<a name="flow"></a>

### 6. 请求处理流程


