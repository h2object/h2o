<html>
	<head>
	<meta charset="utf-8">
	   
	   <link href="/css/bootstrap.css" rel="stylesheet">
	   <link href="/css/h2o.css" rel="stylesheet">
	   <link href="/css/github_markdown.css" media="all" rel="stylesheet" type="text/css" />
	   <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	   <script src="/js/bootstrap.js"></script>
	<script type="text/javascript">
	function signup (argument) {
		alert("signup")
	}
	function signin (argument) {
		alert("signin")
	}
	</script>
	</head>
	<body>
		<nav class="navbar navbar-default">
		  <div class="container">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="/index.md?template=home">
		      	<img alt="Brand" src="/img/h2object-2p.png" style="height:40px" />
		      </a>
		    </div>
		    <div class="collapse navbar-collapse">
		     	 <ul class="nav navbar-nav navbar-left">
			        <li {{if eq .meta.active "home"}}class="active"{{end}}><a href="/index.md?template=home">首页</a></li>
			        <li {{if eq .meta.active "quickstart"}}class="active"{{end}}><a href="/quickstart.md">快速开始</a></li>
			        <li {{if eq .meta.active "docs"}}class="active"{{end}}><a href="/docs/index.md">开发文档<span class="sr-only">(current)</span></a></li>
			        <li {{if eq .meta.active "download"}}class="active"{{end}}><a href="/download.md">下载</a></li>
			        <li {{if eq .meta.active "release"}}class="active"{{end}}><a href="/release.md">更新日志<span class="sr-only">(current)</span></a></li>
			      </ul>
		      <div class="github-btn navbar-right" role="group">

				<iframe allowtransparency="true" frameborder="0" scrolling="0" src="//ghbtns.com/github-btn.html?user=h2object&amp;repo=h2o&amp;type=watch&amp;count=true&amp;size=small" height="20" width="80"></iframe>
				<iframe allowtransparency="true" frameborder="0" scrolling="0" src="//ghbtns.com/github-btn.html?user=h2object&amp;repo=h2o&amp;type=fork&amp;count=true&amp;size=small" height="20" width="80"></iframe>

			  <!-- <button type="button" class="btn btn-info navbar-btn" onclick="signup();">注&nbsp;&nbsp;册</button>
			  <button type="button" class="btn btn-success navbar-btn" onclick="signin();">登&nbsp;&nbsp;录</button> -->
		      </div>
		    </div>  
		  </div>
		</nav>		