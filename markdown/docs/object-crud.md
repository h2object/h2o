{
   "key":"object-crud",
   "link":"/docs/object-crud.md",
   "title": "对象的增删改查",
   "active": "docs",
   "anchors":[["访问","access"],["新增","post"],["删除","delete"],["修改","patch"],["重置","put"]]
}

对象的增删改查
---

[上一章](/docs/object.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/object-watch.md)



-	[对象的后缀属性](/docs/object-suffix.md)
	对象的部分属性可以通过http请求后缀的方式进行请求。


````
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