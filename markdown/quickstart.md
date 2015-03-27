{
  "title":"快速开始",
  "active":"quickstart",
  "anchors":[
    ["安装&启动", "install"], 
    ["对象服务","object"],
    ["对象的增删改查","curd"],
    ["对象的属性验证","valid"],
    ["对象的属性检索","index"],
    ["对象的查询&排序&分页","query"],
    ["对象的同步监听","sync"],
    ["文件服务","file"],
    ["认证服务","auth"]
  ]
}

快速开始
---

快速开始前, 强烈推荐首先阅读 [H2O关键概念](/docs/base.md) 文档。

<a name="install"></a>

### 1. 安装&启动

* **从github上获取最新版本**

````
$: git clone https://github.com/h2object/h2o.git
````

或者,

* **下载H2O压缩版本**

-  版本 v0.0.1: [h2o.v0.0.1.tar.gz](https://github.com/h2object/h2o/archive/v0.0.1.tar.gz)

* **启动服务**

````shell
$: tar -xvzf h2o.tar.gz
$: cd h2o
$: ./bin/h2o.osx -c=conf/h2o.toml -verbose http start
or
$: ./bin/h2o.linux -c=conf/h2o.toml -verbose http start
````

* **停止服务**

按住<code>ctrl+c</code>停止服务。

<a name="object"></a>

### 2. 对象服务

在H2O服务中,对象服务的操作方式是通过HTTP协议的method方法类型进行甄别:
<table clase="table">
	<tr>
		<td>GET</td>
		<td>表示对象的查询&获取操作</td>
		<td></td>
	</tr>
	<tr>
		<td>POST</td>
		<td>表示对象的创建操作</td>
		<td>可以通过url参数key设置创建对象的标识符(key)</td>
	</tr>
	<tr>
		<td>PATCH</td>
		<td>表示对象的修改操作</td>
		<td>前提是对象必须存在</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>表示对象的整体重置操作</td>
		<td>不可以直接对根目录"/"进行重置操作</td>
	</tr>
	<tr>
		<td>DELETE</td>
		<td>表示对象的删除操作</td>
		<td></td>
	</tr>
</table>

<a name="curd"></a>

#### 2.1 对象的增删改查

````shell
# 对象查询
# 打开浏览器, 输入: 
http://127.0.0.1:9000/users/james.json
{"code":10001,"error":"object not exists:/users/james"}

# 创建对象, 指定对象key
$: curl -X POST -d '{"name":"james","age":32}' http://127.0.0.1:9000/users.json?key="james"
{"created":"james"}

# 创建对象, 不指定对象key
$: curl -X POST -d '{"name":"unknown","age":32}' http://127.0.0.1:9000/users.json
{"created":"13cd1270cf903bc3"}

# 打开浏览器, 输入: 
http://127.0.0.1:9000/users.json?print=pretty
{
  "13cd1270cf903bc3": {
    "age": 32,
    "name": "unknown"
  },
  "james": {
    "age": 32,
    "name": "james"
  }
}

# 修改对象
$: curl -X PATCH -d '{"age":35}' http://127.0.0.1:9000/users/james.json
{"age":35}

# 重置对象(重置后原对象所有属性字段被清空)
$: curl -X PUT -d '{"sex":true,"age":30}' http://127.0.0.1:9000/users/james.json
{"age":30,"sex":true}

# 重置后, 对象name属性被清除
$: curl -X GET http://127.0.0.1:9000/users/james.json
{"age":30,"sex":true}

# 对象删除
$: curl -X DELETE http://127.0.0.1:9000/users/james.json
{"deleted":"/users/james"}

# 对象查询
# 打开浏览器, 输入: 
http://127.0.0.1:9000/users/james.json
{"code":10001,"error":"object not exists:/users/james"}
````
<a name="valid"></a>

#### 2.2 对象的属性验证

````shell
# 创建users路径下，对象属性字段的属性验证
# 对象必须包括 name 属性, 且不能为空
$: curl -X POST -d '{"required":true}' http://127.0.0.1:9000/users.valid?field=name
{"fields":["name"]}

# 对象age属性值在 (24, 36) 之间
$: curl -X POST -d '{"min":24, "max":36}' http://127.0.0.1:9000/users.valid?field=age
{"fields":["age"]}

# 验证测试
$: curl -X POST -d '{"sex":false}' http://127.0.0.1:9000/users.json
{"code":10001,"error":"name Required"}

$: curl -X POST -d '{"name":"","age":32}' http://127.0.0.1:9000/users.json
{"code":10001,"error":"name Required"}

$: curl -X POST -d '{"name":"tom","age":48}' http://127.0.0.1:9000/users.json
{"code":10001,"error":"age Maximum is 36"}

````
<a name="index"></a>

#### 2.3 对象的属性检索

在H2O服务中, 进行对象的检索查询是基于索引的。所以如需根据对象的属性字段进行对象的查询操作,必须首先针对查询字段进行索引的构建操作。

````shell
# 创建users路径下，对象属性字段的索引
$: curl -X POST http://127.0.0.1:9000/users.index?field=name
{"fields":["name"]}

$: curl -X POST http://127.0.0.1:9000/users.index?field=age
{"fields":["age"]}
````

* 	添加测试数据

````
# 删除原有users路径的对象
$: curl -X DELETE http://127.0.0.1:9000/users.json
{"deleted":"/users"}

# 根据以上创建的验证规则创建用户数据对象
$: curl -X POST -d '{"name":"tom","age":25}' http://127.0.0.1:9000/users.json?key=tom
{"created":"tom"}

$: curl -X POST -d '{"name":"kate","age":28}' http://127.0.0.1:9000/users.json?key=kate
{"created":"kate"}

$: curl -X POST -d '{"name":"james","age":32}' http://127.0.0.1:9000/users.json?key=james
{"created":"james"}

$: curl -X POST -d '{"name":"david","age":35}' http://127.0.0.1:9000/users.json?key=david
{"created":"david"}

$: curl -X POST -d '{"name":"bing","age":27}' http://127.0.0.1:9000/users.json?key=bing
{"created":"bing"}

# 查看对象
# 打开浏览器, 输入: 
http://127.0.0.1:9000/users.json?print=pretty
{
  "bing": {
    "age": 27,
    "name": "bing"
  },
  "david": {
    "age": 35,
    "name": "david"
  },
  "james": {
    "age": 32,
    "name": "james"
  },
  "kate": {
    "age": 28,
    "name": "kate"
  },
  "tom": {
    "age": 25,
    "name": "tom"
  }
}
````
<a name="query"></a>

#### 2.4 对象的查询&排序&分页

````shell
# 根据字段属性值进行检索查询
# 打开浏览器输入: 
http://127.0.0.1:9000/users.json?print=pretty&field=age&query={"min":28, "max":33}
{
  "count": 2,
  "data": [
    {
      "kate": {
        "age": 28,
        "name": "kate"
      }
    },
    {
      "james": {
        "age": 32,
        "name": "james"
      }
    }
  ],
  "total": 2
}

# 根据字段进行排序查询(如果不进行字段属性值进行检索无需创建相应索引)
# 打开浏览器输入: 
http://127.0.0.1:9000/users.json?print=pretty&order=age,asc
# order排序格式: (字段名, asc | desc)
{
  "count": 5,
  "data": [
    {
      "tom": {
        "age": 25,
        "name": "tom"
      }
    },
    {
      "bing": {
        "age": 27,
        "name": "bing"
      }
    },
    {
      "kate": {
        "age": 28,
        "name": "kate"
      }
    },
    {
      "james": {
        "age": 32,
        "name": "james"
      }
    },
    {
      "david": {
        "age": 35,
        "name": "david"
      }
    }
  ],
  "total": 5
}

# 分页查询
# 打开浏览器, 输入: 
http://127.0.0.1:9000/users.json?print=pretty&limit=4,0
# limit 格式为: (size, offset)
{
  "count": 3,
  "data": [
    {
      "bing": {
        "age": 27,
        "name": "bing"
      }
    },
    {
      "david": {
        "age": 35,
        "name": "david"
      }
    },
    {
      "james": {
        "age": 32,
        "name": "james"
      }
    }
  ],
  "total": 5
}

````
<a name="sync"></a>

#### 2.5 对象的同步监听

由于对象的同步功能, 需要创建长连接进行监听，使用curl工具无法操作。可以通过编辑前端页面,引入<code>h2object.js</code>脚本,

使用javascript sdk提供监控函数操作。详细方法参考[对象的同步监听](/docs/object-watch.md)。

<a name="file"></a>

### 3. 文件服务

#### 3.1 上传文件到服务端

````
// 上传本地 logo.png 文件到 http://127.0.0.1:9000/img/google.png 路径下
$: curl -X PUT -T logo.png http://127.0.0.1:9000/img/google.png

````
文件的访问:

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png</code>。

#### 3.2 上传文件到云端存储

上传本地 logo.png 文件到七牛云存储, 并映射到 <code>http://127.0.0.1:9000/img/google2.png</code> 路径下
````
$: curl -X PUT -T logo.png http://127.0.0.1:9000/img/google2.png?provider=qiniu
````

文件的访问方式不变:

打开浏览器输入<code>http://127.0.0.1:9000/img/google2.png</code>。

#### 3.3 文件访问

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png</code>

如果文件存在七牛云存储上，还可以通过指定参数，对文件进行相应的图片处理，和在七牛存储路径上操作相同。

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png?imageView2/0/w/200</code>

#### 3.4 markdown文件处理

编辑markdown文件，以并将markdown文件上传到指定路径并且以<code>.md</code>作为请求后缀。

打开浏览器输入<code>http://127.0.0.1:9000/demo.md</code>

即可打开生成后的markdown文件，此时采用系统配置设置的默认markdown模板。

或者，指定markdown文件使用的文件模板,

打开浏览器输入<code>http://127.0.0.1:9000/demo.md?template=test</code>

如何编辑 markdown 模板, 只需要在输出 markdown 内容的位置编辑 <code>{{.markdown}}</code> 即可。

具体markdown文件的编辑, 参见[markdown文件的编辑](/docs/markdown.md#edit).

#### 3.5 template文件处理

H2O服务中的模板包括四类:

* markdown页面模板
* 邮件内容页面模板
* 短信内容页面模板
* 直接生成网页页面模板

具体各模板如何编辑, 包括哪些具体可替换参数与函数。参见[template文件的编辑](/docs/template.md#edit).

编辑template模板完成后, 以并将template文件上传到指定路径并且以<code>.tpl</code>作为请求后缀。

<a name="auth"></a>

### 4. 认证服务

用户认证，是H2O服务提供的主要系统服务之一。通过用户认证接口，实现用户在H2O服务平台上的认证，通过认证，实现系统业务数据的安全控制。
同时，通过认证接口减少应用开发者在用户认证模块的开发工作量。

本地开发版本, 认证暂时仅支持: <code>provider = email</code>; 请设置好相应的SMTP投递参数设置(参见[系统配置](/docs/configure.md))。

<table class="table table-hover">
<tr>
	<td>功能</td>
	<td>method</td>
	<td>path</td>
	<td>data</td>
</tr>
<tr>
	<td>用户注册</td>
	<td>POST</td>
	<td>/auth/:provider/signup</td>
	<td>{"auth":"email&phone",<br/> "password":"secret","duration":"2h"}</td>
</tr>
<tr>
	<td>用户激活</td>
	<td>GET</td>
	<td>/auth/active/:token</td>
	<td></td>
</tr>
<tr>
	<td>用户激活</td>
	<td>*</td>
	<td>/any_uri?active=:token</td>
	<td></td>
</tr>

<tr>
	<td>用户登录</td>
	<td>POST</td>
	<td>/auth/:provider/signin</td>
	<td>{"auth":"email&phone",<br/> "password":"secret"}</td>
</tr>
<tr>
	<td>密码重置</td>
	<td>POST</td>
	<td>/auth/:provider/forget</td>
	<td>{"auth":"email&phone"}</td>
</tr>
<tr>
	<td>第三方登录回调</td>
	<td>POST</td>
	<td>/auth/:provider/callback</td>
	<td>暂不支持本地开发版</td>
</tr>
<tr>
	<td>用户登出</td>
	<td>POST</td>
	<td>/auth/signoff</td>
	<td></td>
</tr>
<tr>
	<td>认证信息</td>
	<td>GET</td>
	<td>/auth</td>
	<td></td>
</tr>
</table>


#### 4.1 用户注册

用户注册接口, 请求路径属于系统级服务路径, 不可以被对象服务使用。同时, 作为系统服务，已经对用户信息对象的格式以及有效性进行了必要的控制，保证数据的有效性。

一旦注册接口调用成功，对于<code>provider = email</code>方式注册的用户账号，H2O服务会自动发送一封激活邮件到注册邮箱中。

````shell

# 本地开发版仅支持 **provider = email** 方式进行用户注册
$: curl -X POST -d '{"auth":"your-email", "password":"secret"}' http://127.0.0.1:9000/auth/email/signup
{"code":403,"error":"auth require email format"}

# 请设置正确的邮箱地址测试。

````
H2O发送激活邮件，会采用激活邮件模板进行必要的参数替换，生成相应的邮件进行发送。以系统默认模板为例：

````
尊敬的用户{{.auth}},<br/>
<p>
	您的用户名是: {{.auth}} <br/>
	感谢您注册成为会员，请点击激活链接:<br/>
	http://127.0.0.1:9000/[激活完成后页面地址]?active={{.token}}
</p>

====<br/>
h2object.io
````

#### 4.2 用户激活

注册用户正确填写用户邮箱后，会收相应的激活邮件或者新用户通知邮件(如果用户注册时未提供密码)。通过邮件中提供的激活链接进行用户的激活操作。

#### 4.3 用户登录

完成用户状态激活的账号，才能够登录到系统。

#### 4.4 密码重置

注册用户如果忘记密码，通过<code>http://127.0.0.1:9000/auth/:provider/forget</code>设置好注册邮箱，就可以收到相应的重置密码页面。

H2O作为服务端只是提供重置密码有效<code>token</code>,前端开发人员实现密码重置页面的开发。

H2O服务通过<code>token</code>保证该页面仅被调用一次。

#### 4.5 用户认证信息

对于已经登录成功后的用户, 前端开发人员可以直接请求<code>http://127.0.0.1:9000/auth</code>获取登录用户认证信息。

#### 4.6 用户登出

前端开发人员调用用户登出请求，即可完成用户在H2O后端的登出操作。


