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
		<div class="panel panel-default">
            <div class="panel-body">
            	<!-- 多说评论框 start -->
				<div class="ds-thread" data-thread-key="{{.meta.key}}" data-title="{{.meta.title}}" data-url="{{.meta.link}}"></div>
				<!-- 多说评论框 end -->
				<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
				<script type="text/javascript">
				var duoshuoQuery = {short_name:"h2object"};
					(function() {
						var ds = document.createElement('script');
						ds.type = 'text/javascript';ds.async = true;
						ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
						ds.charset = 'UTF-8';
						(document.getElementsByTagName('head')[0] 
						 || document.getElementsByTagName('body')[0]).appendChild(ds);
					})();
					</script>
				<!-- 多说公共JS代码 end -->
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