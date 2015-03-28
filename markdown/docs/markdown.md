{
   "key":"markdown",
   "link":"/docs/markdown.md",
   "title": "markdown文件",
   "active": "docs",
   "anchors":[["编辑","edit"],["上传","upload"],["访问","access"]]
}

markdown文件
---

[上一章](/docs/template.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/auth.md)


在H2O服务中, 支持直接将markdown转化成html的服务。

<a name="edit"></a>

### 1 编辑markdown文件

在H2O中, 除了支持常规的markdown文件格式, 同时还支持文件头信息的设置。

例如, 以下markdown用例, demo.md

````markdown
{
	"title":"测试",
	"author":"demo",
	"tags":["测试", "demo", "文章"]
}

文章标题
---

## 章节1

markdown正文

````

在<code>+++</code>间的文本就属于markdown文件的头信息。

具体markdown文件头信息与内容信息如何在模板文件中展示, 请参考[模板文件](/docs/template.md).

<a name="upload"></a>

### 2. 上传

同静态文件处理方式相同，将本地markdown文件上传到指定的markdown文件路径上.

同样, 上传markdown文件需要管理员权限。

需要注意的时, markdown文件路径的后缀必须是<code>.md</code>, 否则会按照静态文件处理。

````
// 上传本地 demo.md 文件到 http://127.0.0.1:9000/demo.md 路径下

$: curl -X PUT -T demo.md http://127.0.0.1:9000/demo.md

````

<a name="access"></a>

#### 3. 访问

访问页面模板, 同静态文件相同, 不同的是, 路径以<code>.md</code>后缀.

根据上传时设置的文件路径进行访问。

打开浏览器输入

<code>http://127.0.0.1:9000/demo.md</code>

返回的将是demo的原始内容生成的html。

### 4. 通过模板访问markdown文件

为了将生成的html更好的进行展示, H2O提供了页面模板的方式访问markdown文件。

例如:

访问markdown文件在浏览器中输入:

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

如果服务程序找不到markdown文件生成页面的模板, 则会直接将markdown生成的html输出到网页上。




