+++
title = "系统概述"
active = "docs"
anchors = [["特点", "features"], ["应用场景","scenes"],["下载&安装","install"],["用例","example"]]
+++

H2O 概述
---

[上一章](/docs/index.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/install.md)

H2O是由h2object.io提供后端服务程序，通过 H2O 开发者可以轻松打造基于HTTP协议的网站应用、手机应用等各类应用。
不同于常规Baas服务, h2object.io提供了H2O做为本地开发版本,方便开发者开发调试。

<a name="features"></a>

## 特点

*	基于HTTP协议的对象服务
*	基于对象属性字段的 **[全文检索](/docs/h2o-index.md)**
*	基于对象变更的即时 **[同步通知](/docs/h2o-sync.md)**
*	基于用户认证的对象 **[安全控制](/docs/h2o-security.md)**
*	支持本地&云端**文件处理与映射**

<a name="scenes"></a>

## 应用场景

*	基于文件的纯静态网站应用 
*	基于<code>markdown</code>格式的网站应用<code>本站属于该类应用</code>
*	图片存储类应用, 快速实现云端文件到指定路径的映射
*	基于HTTP协议的纯后端服务
*	基于数据同步的会话聊天类应用
*	基于HTTP协议的游戏类应用
* 	基于业务数据的CDN服务

<a name="install"></a>

## 下载 & 安装

系统提供以下版本的本地开发程序下载:

*	mac版本:[h2o.osx.tar.gz](http://h2object.io/download/osx/h2o.tar.gz)
*	linux版本:[h2o.linux.beta.tar.gz](http://h2object.io/download/linux/h2o.tar.gz)

压缩包解压后，H2O程序是免安装的。

* 	启动服务
````shell
$: tar -xvzf h2o.linux.tar.gz
or
$: tar -xvzf h2o.osx.tar.gz
$: cd /h2o.osx
$: ./bin/h2o -c=./conf/h2o.conf http start
````
* 	停止服务
按住<code>ctrl+c</code>停止服务。

<a name="example"></a>

## 用例

<code>
本站由 **H2O** 提供的 markdown 文件处理服务提供, 压缩包解压启动后直接可以本地运行本站。
</code>