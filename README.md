H2O
---

[中文说明](https://github.com/h2object/h2o/blob/master/README.cn.md)

H2O, simplified for HTTP to OBJECT service, the repository is the h2object.io service's local binary program.

And H2O also is the h2object.io website project, which is based on the H2O, using the H2O Markdown file service.

### Features

*	Object service based on http protocol, use json as object.
*	Using Http Request Suffix as the Object part attributes query.
*	File service support markdown & template rendering.
*	Authorization service use multiple authorize methods.
* 	System service to keep H2O services secure & stable.

### Install & Starting

*	download

	版本 v0.0.1: [h2o.v0.0.1.tar.gz](https://github.com/h2object/h2o/archive/v0.0.1.tar.gz)

*	github:

````
$: git clone https://github.com/h2object/h2o.git

$: cd h2o
$: ./bin/h2o.osx -c=conf/h2o.toml -verbose http start

or

$: ./bin/h2o.linux -c=conf/h2o.toml -verbose http start
````
open the explore, input <code>http://127.0.0.1:9000</code> to check the H2O service health.

### Snapshot

Example: 

![](https://github.com/h2object/h2o/blob/master/static/img/h2object-site.png)

### Enjoin it!
