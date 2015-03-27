{
   "title": "对象的属性验证",
   "active": "docs",
   "anchors":[["访问","access"],["新增","post"],["删除","delete"],["修改","patch"],["重置","put"]]
}

对象的属性验证
---

[上一章](/docs/object.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/object-index.md)

````
# 创建users路径下，对象属性字段的属性验证
# 对象必须包括 name 属性, 且不能为空
$: curl -X POST -d '{"required":true}' http://127.0.0.1:9000/users.valid\
   ?field=name&appid=[your app id]&secret=[your app secret]
或
$: curl -X POST -d '{"required":true}' \
   -H "X-H2O-AppID: Your Application ID" \
   -H "X-H2O-Secret: Your Application Secret" \ 
   http://127.0.0.1:9000/users.valid?field=name

{"fields":["name"]}

注:以下操作同样需要设置appid与secret,为方便阅读忽略。

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
