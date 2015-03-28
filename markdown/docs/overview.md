{
   "key":"overview",
   "link":"/docs/overview.md",
   "title": "系统概述",
   "active": "docs",
   "anchors":[["特点", "features"], ["应用场景","scenes"],["下载&安装","install"],["用例","example"]]
}

H2O 概述
---

[上一章](/docs/index.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/install.md)

**H2O** 是 [h2object.io](#) 云端服务的本地开发版本。

通过 **对象服务** 实现业务数据的管理与同步;

通过 **文件服务** 实现文件资源的上传与访问;

通过 **认证服务** 实现用户认证与安全控制;

**H2O** 实现了 **95%** 由**h2object.io**所提供的云端功能。

基于**H2O**开发完成的项目可以通过命令快速迁移或更新到 **h2object.io** 云服务或者私有服务器上。

<a name="features"></a>

## 特点

*	支持基于对象数据变更的实时监听
*	支持基于对象属性字段的全文检索
*	支持基于markdown格式的文档服务
*	支持基于第三方云存储的文档服务
*	支持多种方式的用户认证鉴权
*	多语言开发包支持,接口统一简单

<a name="scenes"></a>

## 应用场景

*	基于文件的纯静态网站应用 
*	基于<code>markdown</code>格式的网站应用<code>本站属于该类应用</code>
*	基于云储存服务的图片存储类应用, 快速实现云端文件到指定路径的映射
*	基于HTTP协议业务数据的纯后端服务
*	基于数据同步的会话聊天类应用
*	基于HTTP协议的游戏类应用
* 	基于业务数据的CDN服务

<a name="install"></a>

## 下载 & 安装

*	**从github上获取最新版本**

````
$: git clone https://github.com/h2object/h2o.git
````

或者,

*	**下载H2O压缩版本**

-	版本 v0.0.1: [h2o.v0.0.1.tar.gz](https://github.com/h2object/h2o/archive/v0.0.1.tar.gz)

* 	**启动服务**

````shell
$: tar -xvzf h2o.tar.gz
$: cd h2o
$: ./bin/h2o.osx -c=conf/h2o.toml http start
or
$: ./bin/h2o.linux -c=conf/h2o.toml http start
````

启动浏览器, 输入<code>http://127.0.0.1:9000</code>, 展示 h2object.io 网站本地版本说明服务运行正常。

* 	**停止服务**

按住<code>ctrl+c</code>停止服务。

<a name="example"></a>

## 用例

<code>
本站由 **H2O** 提供的 markdown 文件处理服务提供, 下载安装包解压后可直接本地运行本站(系统要求: mac osx 或 linux)。
</code>