{
  "title":"静态文件",
  "active":"docs",
  "anchors":[["文件上传","upload"],["文件访问","access"]]
}

静态文件
---

[上一章](/docs/file.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/cloud.md)

所谓静态文件服务, 即用户将任意本地文件上传到H2O服务中, 通过H2O提供的HTTP文件服务对该文件进行访问。

<a name="upload"></a>

#### 1. 文件上传

文件上传, 用户指定具体上传文件的路径与文件名,即唯一资源标识(URI)。

````
// 上传本地 logo.png 文件到 http://127.0.0.1:9000/img/google.png 路径下
$: curl -X PUT -T logo.png http://127.0.0.1:9000/img/google.png

````
在服务端静态文件的存储路径是: <code>静态文件文件夹 + URI</code>。

<a name="access"></a>

#### 2. 文件访问

文件访问，并需根据上传时设置的文件路径进行访问。

打开浏览器输入<code>http://127.0.0.1:9000/img/google.png</code>
