{
   "key":"configure",
   "link":"/docs/configure.md",
   "title": "系统配置",
   "active": "docs",
   "anchors":[["应用设置", "application"], ["事件设置","event"],["会话设置","session"],["认证设置","auth"],["邮件设置","smtp"],["邮件主题","subject"],["第三方接入","third"],["日志设置","log"]]
}

系统配置
---

[上一章](/docs/base.md)  |  [目录](/docs/index.md)  |  [下一章](/docs/commands.md)

H2O系统配置, 配置文件格式采用<code>toml</code>格式, 文件路径位于(<code>conf/h2o.toml</code>), 包括以下设置项:

*	[应用设置](#application) (<code>application</code>)
*	[事件设置](#event) (<code>event</code>)
*	[会话设置](#session) (<code>session</code>)
*	[认证设置](#auth) (<code>auth</code>)
*	[邮件设置](#smtp) (<code>smtp</code>)
*	[模板设置](#template) (<code>template</code>)
*	[邮件主题](#subject) (<code>subject</code>)
*	[第三方接入](#third) (<code>third</code>)
*	[日志设置](#log) (<code>log</code>)

<a name="application"></a>

### 1. 应用设置

H2O系统设置 => 应用设置, 包括以下设置属性:

*	应用ID (<code>appid</code>)

应用ID由[portal.h2object.io](http://portal.h2object.io)网站提供。用户通过注册账号, 免费获取。

*	应用Secret (<code>secret</code>)

应用Secret由[portal.h2object.io](http://portal.h2object.io)网站提供。用户通过注册账号, 免费获取。

*	默认路径 (<code>index</code>)

默认情形下, 该参数值为 <code>index.md?template=home</code>. 

主要作用就是在用户请求路径为 <code>"/"</code> 进行替换。

*	启用管理权限 (<code>admin</code>)

默认情形下, 该参数值为 <code>false</code>。

通过该配置启用管理员功能, 包括: 对象的验证、安全控制、频率控制等高级功能, 必须开启该功能提供。

开启该功能的前提是，已经设置正确的 <code>appid</code> 与 <code>secret</code> 才能正常开启。

*	启用缓存功能 (<code>cache</code>)

默认情形下, 该参数值为 <code>false</code>。

通过设置缓存功能, 对于<code>markdown</code>,<code>template</code>类型的文件启用内存缓存加速此类文件的加载速度。

*	默认分页大小 (<code>default_limit_size</code>)

该参数用于控制对象查询时, 对象所含子对象开启分页功能的阀值。一旦对象的的子键数超过该阀值, 

输出对象数据进行简化，防止子键数过多导致系统内存耗尽。

默认情况下, 该阀值大小为 <code>50</code>.

<a name="event"></a>

### 2. 事件设置

H2O系统设置 => 事件设置, 包括以下设置属性:

*	并发数 (<code>currency</code>)

该参数主要用于控制客户端监听对象变更的最大并发数, 系统默认值为(<code>50</code>)。

同时本地开版本对该参数进行限制, 最大并发数不能超过(<code>50</code>)。

<a name="session"></a>

### 3. 会话设置

H2O系统设置 => 会话设置, 包括以下设置属性:

*	持续时长 (<code>duration</code>)

该参数主要用于控制客户账号登录后服务端会话有效持续时长, 系统默认值为(<code>2h</code>), 即 **2** 个小时。

<a name="auth"></a>

### 4. 认证设置

H2O系统设置 => 认证设置, 认证设置又包括以下认证方式:

#### 4.1 手机认证

H2O系统设置 => 认证设置 => 手机认证, 包括以下设置属性:

* 	是否启用 (<code>enable</code>)

默认情形下, 本地开发版本不支持该功能, 故系统默认值为(<code>false</code>).

#### 4.2 邮箱认证

默认情形下, 系统默认值为(<code>false</code>).

如果启用该方式进行用户认证, 必须正确设置[邮箱设置](#smtp).

#### 4.3 QQ认证

默认情形下, 系统默认值为(<code>false</code>). 

如果要启用该功能, 需要部署H2O到正式的生产系统, 提供了正确的域名解析功能方可使用。

#### 4.4 新浪微博认证

默认情形下, 系统默认值为(<code>false</code>). 

如果要启用该功能, 需要部署H2O到正式的生产系统, 提供了正确的域名解析功能方可使用。

<a name="smtp"></a>

### 5. 邮箱设置

H2O系统设置 => 邮箱设置, 包括以下设置属性:

*	投递主机 (<code>host</code>)
*	投递端口 (<code>port</code>)
*	用户名 (<code>user</code>)
*	用户密码 (<code>password</code>)
*	发送邮箱 (<code>sender</code>)
*	回复邮箱 (<code>replyto</code>)

默认情况下, 所有设置为空。需要用户进行自定义设置, 方能正确投递邮件。

<a name="subject"></a>

### 6. 邮件主题

H2O系统设置 => 邮件主题, 包括以下系统邮件主题设置:

*	用户注册邮件主题 (<code>regist</code>)
*	密码重置邮件主题 (<code>forget</code>)
*	用户激活邮件主题 (<code>active</code>)

默认情况下, 所有设置为空。需要用户进行自定义设置, 方能正确投递邮件。

<a name="template"></a>

### 7. 模板设置

H2O系统设置 => 模板设置, 包括以下系统模板需要进行设置:

*	用户注册邮件模板 (<code>regist</code>)
*	密码重置邮件模板 (<code>forget</code>)
*	用户激活邮件模板 (<code>active</code>)
*	markdown文件默认模板 (<code>markdown</code>)

模板设置的值为模板存放在模板根目录下的相对路径。

<a name="third"></a>


### 8. 第三方接入

H2O系统设置 => 第三方接入, 目前第三方接入包括:

* 	七牛云存储 (<code>third.qiniu</code>)

具体七牛云存储配置如下:

*	启用(<code>enable</code>)
*	七牛云存储客户应用ID (<code>appid</code>)
*	七牛云存储客户应用Secret(<code>secret</code>)
*	七牛云存储域名(<code>domain</code>)
*	七牛云存储空间(<code>bucket</code>)

<a name="log"></a>

### 9. 日志设置

H2O系统设置 => 日志设置, 主要用于设置文件日志功能, 包括以下设置属性:

* 	日志启用 (<code>enable</code>)
* 	日志文件 (<code>filename</code>)
* 	日志级别 (<code>level</code>)
* 	启用切割 (<code>rotate</code>)
* 	按日切割 (<code>rotate_daily</code>)
* 	切割最大文件行数 (<code>rotate_max_line</code>)
* 	切割最大文件大小 (<code>rotate_max_size</code>)





