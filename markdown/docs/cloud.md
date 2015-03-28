{
	"key":"cloud",
	"link":"/docs/cloud.md",
	"title": "云端文件",
	"active": "docs",
	"anchors":[["文件上传","upload"],["文件访问","access"]]
}


云端文件
---

[上一章](/docs/file.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/template.md)

所谓云端文件服务, 即用户将任意本地文件上传到类似于七牛云存储等第三方服务上进行文件的存储.

通过H2O的云端文件服务进行路径的跳转操作, 操作形式上与静态文件非常相似，只是存储方式换到第三方云上了。

注: <code>当前H2O版本, 仅支持七牛云存储。</code>

<a name="upload"></a>

#### 1. 文件上传

文件上传, 用户指定具体上传文件的路径与文件名,即唯一资源标识(URI)。

````
// 上传本地 logo.png 文件到 http://127.0.0.1:9000/img/google.png 路径下
$: curl -X PUT -T logo.png http://127.0.0.1:9000/img/google.png?provider=qiniu

````
从上传命令可以看出, 与静态文件唯一不同的是, 增加了 provider 参数设置.

当然, 将文件上传到云存储上, 必须首先在云服务上进行注册, 并将相应的参数在H2O[系统配置](/docs/configure.md)中正确配置才能运行。

<a name="access"></a>

#### 2. 文件访问

文件访问，并需根据上传时设置的文件路径进行访问。

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png</code>

实际上, 在H2O服务中, 是进行了 Redirect 跳转操作, 跳转到七牛云存储具体的路径上。

所以, 在七牛云存储上相应的图片、多媒体等处理操作, 在H2O上同样适用。

例如, 设置图片宽度操作:

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png?imageView2/0/w/200</code>.

