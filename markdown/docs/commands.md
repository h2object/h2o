{
   "key":"commands",
   "link":"/docs/commands.md",
   "title": "H2O命令",
   "active": "docs",
   "anchors":[["h2o http", "http"], ["h2o push", "push"],["h2o update", "update"], ["h2o upload","upload"],["h2o export","export"],["h2o bench","bench"]]
}

H2O命令
---

[上一章](/docs/configure.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/h2o.md)

### 1. H2O 命令

切换到H2O程序解压目录, 打开命令行工具, 进行如下操作:

````shell

$: ./bin/h2o -h
NAME:
   H2O - HTTP To Object, supporting object store & sync service

USAGE:
   H2O [global options] command [command options] [arguments...]

VERSION:
   0.0.1 (dev max.50.currency)

AUTHOR(S):
   support <support@h2object.io>

COMMANDS:
   bench performs a synthetic benchmark for H2O
   http     execute H2O http command on http service
   push     push application to the h2object.io platform
   update   update application change to the h2object.io platform
   upload   upload local file to H2O
   export   export objects from H2O
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --host, -l "127.0.0.1"  H2O http listenning host
   --port, -p "9000"    H2O http listenning port
   --conf, -c        H2O http starting configure
   --data, -d "data"    H2O objects data store path
   --index, -i "index"     H2O objects index store path
   --static, -s "static"   H2O http static files folder
   --markdown, -m "markdown"  H2O http server files folder
   --template, -t "template"  H2O http template files folder
   --verbose         H2O http verbose logging flag
   --help, -h        show help
   --version, -v     print the version

````

<a name="http"></a>

#### 1.1 http 命令

<a name="push"></a>

#### 1.2 push 命令

<a name="update"></a>

#### 1.3 update 命令

<a name="upload"></a>

#### 1.4 upload 命令

<a name="export"></a>

#### 1.5 export 命令

<a name="bench"></a>

#### 1.6 bench 命令



