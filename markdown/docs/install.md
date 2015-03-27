{
   "title": "下载&安装",
   "active": "docs",
   "anchors":[["下载", "download"], ["安装","install"],["应用","application"]]
}

下载&安装
---

[上一章](/docs/quickstart.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/init.md)


### 1. 下载

系统提供以下版本的本地开发程序下载:

*	mac版本:[h2o.osx.tar.gz](http://h2object.io/download/osx/h2o.tar.gz)
*	linux版本:[h2o.linux.beta.tar.gz](http://h2object.io/download/linux/h2o.tar.gz)

### 2. 安装

压缩包解压后，H2O程序是免安装的。

### 3. 应用

#### 3.1启动服务

````shell
$: tar -xvzf h2o.linux.tar.gz
or
$: tar -xvzf h2o.osx.tar.gz
$: cd /h2o.osx
$: ./bin/h2o -c=./conf/h2o.conf http start
````
#### 3.2 停止服务

按住<code>ctrl+c</code>停止服务。