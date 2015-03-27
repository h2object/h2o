{
	"title": "认证服务",
	"active": "docs",
	"anchors":[]
}

认证服务
---

[上一章](/docs/h2o.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/system.md)

H2O根据认证方式不同可以分为以下基于以下方式的认证服务, 分别是:

- 	[手机认证](/docs/auth-email.md)
- 	[邮箱认证](/docs/auth-mobile.md)
- 	[第三方认证](/docs/auth-third.md)
	- 	[QQ认证](/docs/auth-third.md#qq)
	- 	[新浪微博认证](/docs/auth-third.md#weibo)

不论基于何种方式的认证, 系统提供了统一的认证接口:

<table class="table table-hover">
<thead>
	<td>功能</td>
	<td>method</td>
	<td>path</td>
	<td>data</td>
</thead>
<tr>
	<td>用户注册</td>
	<td>POST</td>
	<td>/auth/:provider/signup</td>
	<td>{"auth":"email&phone",<br/> "password":"secret","duration":"2h"}</td>
</tr>
<tr>
	<td>用户激活</td>
	<td>GET</td>
	<td>/auth/active/:token</td>
	<td></td>
</tr>
<tr>
	<td>用户激活</td>
	<td>*</td>
	<td>/任意路径?active=:token</td>
	<td></td>
</tr>

<tr>
	<td>用户登录</td>
	<td>POST</td>
	<td>/auth/:provider/signin</td>
	<td>{"auth":"email&phone",<br/> "password":"secret"}</td>
</tr>
<tr>
	<td>密码重置</td>
	<td>POST</td>
	<td>/auth/:provider/forget</td>
	<td>{"auth":"email&phone"}</td>
</tr>
<tr>
	<td>第三方登录回调</td>
	<td>POST</td>
	<td>/auth/:provider/callback</td>
	<td>暂不支持本地开发版</td>
</tr>
<tr>
	<td>用户登出</td>
	<td>POST</td>
	<td>/auth/signoff</td>
	<td></td>
</tr>
<tr>
	<td>认证信息</td>
	<td>GET</td>
	<td>/auth</td>
	<td></td>
</tr>
</table>

