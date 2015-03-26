{{template "header" .}}
<div class="padding"></div>
<div class="container">
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