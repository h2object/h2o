{{template "header" .}}
<div class="jumbotron">
	<div class="container">
	  <h1>h2object.io</h1>
	  <p>HTTP to OBJECT service, with Powerful API & SDK.</p>
	  <p><a class="btn btn-primary btn-lg" href="/download.md" role="button">下载 H2O</a></p>		
	</div>
</div>
<div class="container">
	<div class="padding"></div>
	{{if .meta.news}}
	<div class="panel panel-default">
		<div class="panel-head notification">
			<h5>
				<span class="glyphicon glyphicon-flag" aria-hidden="true">	
				{{index .meta.news 1}}
				<small>{{index .meta.news 0}}</small>
			</h5>
		</div>
	</div>
	{{end}}
	
	<div class="row">
	  <div class="col-md-9">
	  	<div class="panel panel-default">
			<div class="panel-body">					
				<article class="markdown-body entry-content" style="padding: 30px;">
				{{.markdown}}
				</article>
			</div>
		</div> 		
	  </div>
	  <div class="col-md-3">
	  	<div class="panel panel-default">
			<div class="panel-heading">
		      <h3 class="panel-title">联系我们</h3>
		    </div>
			<div class="panel-body">
				{{markdown "/contact.me.md"}}
			</div>
		</div>
	  	<div class="list-group">
	  		<a href="#" class="list-group-item disabled">{{.meta.title}}</a>
	  		{{range $key, $val := .meta.anchors}}
	  			 <a href="#{{index $val 1}}" class="list-group-item">{{index $val 0}}</a>
	  		{{end}}
	  	</div>
	  </div>
	</div>			
</div>

{{template "footer"}}