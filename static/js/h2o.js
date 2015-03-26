//! author: liujianping
//! create: 2015-02-05
//! github: github.com/liujianping/h2object-js
//! related:
//! github: github.com/liujianping/h2object-ios
//! github: github.com/liujianping/h2object-andorid

///////

function H2Object(path) {
	//variables
	var url = new URL(path.toLowerCase())
	this.url = url.strip()
	this.source = null
	this.condition = null
	this.callbacks = {
		post: false,
		put: false,
		patch: false,
		delt: false,
		val: false
	}
}

H2Object.prototype.parent = function() {
	var p = new H2Object(this.url.toString())
	p.url.parent()	
	return p
}

H2Object.prototype.child = function(path) {
	var c = new H2Object(this.url.toString())
	c.url.child(path)	
	return c
}

H2Object.prototype.bind = function (caller, object) {
    return function() {
        return caller.apply(object, arguments);
    };
};

H2Object.prototype.getEventSource = function(){
	if (typeof(EventSource) == "undefined") {
		return false
	}
	if (this.source) {
		delete this.source
	}
	return new EventSource(this.url.toString())
}

//! H2Object base
H2Object.prototype.size = function(onComplete) {
	var ajax = new AJAX("get", this.url.suffix("size"), "", onComplete, arguments[1])
	ajax.do()
}

H2Object.prototype.total = function(onComplete) {
	var ajax = new AJAX("get", this.url.suffix("total"), "", onComplete, arguments[1])
	ajax.do()
	return this
}

H2Object.prototype.keys = function(onComplete) {
	var ajax = new AJAX("get", this.url.suffix("keys"), "", onComplete, arguments[1])
	ajax.do()
	return this
}
//! H2Object json object methods
H2Object.prototype.getObject = function(onComplete) {
	var ajax = new AJAX("get", this.url.suffix("json"), "", onComplete, arguments[1])
	ajax.do()
	return this
}

H2Object.prototype.postObject = function(obj) {
	if (!obj) return this
	var body;
	switch (typeof obj) {
		case "string":
			body = obj;
			break;
		case "object":
			body = JSON.stringify(obj);
			break;
		default:
			return this
	}
	var ajax = new AJAX("post", this.url.suffix("json"), JSON.stringify(obj), arguments[1], arguments[2])
	ajax.do()
	return this
}

H2Object.prototype.patchObject = function(obj) {
	if (!obj) return this
	var body;
	switch (typeof obj) {
		case "string":
			body = obj;
			break;
		case "object":
			body = JSON.stringify(obj);
			break;
		default:
			return this
	}
	var ajax = new AJAX("patch", this.url.suffix("json"), JSON.stringify(obj), arguments[1], arguments[2])
	ajax.do()
	return this
}

H2Object.prototype.putObject = function(obj) {
	if (!obj) return this
	var body;
	switch (typeof obj) {
		case "string":
			body = obj;
			break;
		case "object":
			body = JSON.stringify(obj);
			break;
		default:
			return this
	}
	var ajax = new AJAX("patch", this.url.suffix("json"), JSON.stringify(obj), arguments[1], arguments[2])
	ajax.do()
	return this
}

H2Object.prototype.deleteObject = function() {
	var ajax = new AJAX("delete", this.url.suffix("json"), "", arguments[0], arguments[1])
	ajax.do()
	return this
}

//! H2Object index
H2Object.prototype.createChildIndex = function(field, onComplete, onCancel) {
	if (!field) return this

	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	
	var ajax = new AJAX("post", this.url.suffix("index"), "", arguments[1], arguments[2])
	ajax.do()
	return this
}

H2Object.prototype.removeChildIndex = function(field, onComplete, onCancel) {
	if (!field) return this

	this.url.paramRemove("field")
	this.url.paramAppend("field", field)

	var ajax = new AJAX("delete", this.url.suffix("index"), "", arguments[0], arguments[1])
	ajax.do()
	return this
}

//! H2Object event 
H2Object.prototype.onEventMessage = function(e) {
	if (this.callbacks.message) {
		this.callbacks.message(e.data)	
	}
}

H2Object.prototype.onEventOpen = function(e) {
	if (this.callbacks.open) {
		this.callbacks.open(e.data)	
	}
}

H2Object.prototype.onEventError = function(e) {
	if (this.callbacks.err) {
		this.callbacks.err(e.data)	
	}
}

H2Object.prototype.onEventPost = function(e) {
	if (this.callbacks.post) {
		this.callbacks.post(JSON.parse(e.data))
	}	
}
H2Object.prototype.onEventPut = function(e) {
	if (this.callbacks.put) {
		this.callbacks.put(e.data)	
	}
}
H2Object.prototype.onEventPatch = function(e) {
	if (this.callbacks.patch) {
		this.callbacks.patch(e.data)	
	}
}
H2Object.prototype.onEventDelete = function(e) {
	if (this.callbacks.delt) {
		this.callbacks.delt(e.data)	
	}
}
H2Object.prototype.onEventValue = function(e) {
	if (this.callbacks.val) {
		this.callbacks.val(JSON.parse(e.data))	
	}
}

H2Object.prototype.on = function(evt, callbackfn) {	
	this.url.suffix("event")
	this.url.paramAppend("flag",evt)
	switch (evt) {
		case "post":
			this.callbacks.post = callbackfn
			break
		case "put":
			this.callbacks.put = callbackfn
			break
		case "patch":
			this.callbacks.patch = callbackfn
			break
		case "delete":
			this.callbacks.delt = callbackfn
			break
		case "value":
			this.callbacks.val = callbackfn
			break
	}
	return this
}

H2Object.prototype.start = function() {	
	if (this.source) {
		this.source.close()
	}
	this.source = this.getEventSource()
	this.source.addEventListener("post", this.bind(this.onEventPost, this))
	this.source.addEventListener("put", this.bind(this.onEventPut, this))
	this.source.addEventListener("patch", this.bind(this.onEventPatch, this))
	this.source.addEventListener("delete", this.bind(this.onEventDelete, this))
	this.source.addEventListener("value", this.bind(this.onEventValue, this))
	return this	
}

H2Object.prototype.stop = function() {	
	if (this.source) {
		this.source.close()
	}
	return this	
}

//! H2Object query
H2Object.prototype.numberRangeQuery = function(field, min, max, inclusive_min, inclusive_max) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				min: min,
			}
		case 3:
			this.condition = {
				min: min,
				max: max,
			}
		case 4:
			this.condition = {
				min: min,
				max: max,
				inclusive_min: inclusive_min,
			}
		case 5:
			this.condition = {
				min: min,
				max: max,
				inclusive_min: inclusive_min,
				inclusive_max: inclusive_max,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.dateRangeQuery = function(field, start, end, inclusive_start, inclusive_end) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				start: start,
			}
		case 3:
			this.condition = {
				start: start,
				end: end,
			}
		case 4:
			this.condition = {
				start: start,
				end: end,
				inclusive_start: inclusive_start,
			}
		case 5:
			this.condition = {
				start: start,
				end: end,
				inclusive_start: inclusive_start,
				inclusive_end: inclusive_end,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.termQuery = function(field, term) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				term: term,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.prefixQuery = function(field, prefix) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				prefix: prefix,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.stringQuery = function(field, str) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				query: str,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.matchQuery = function(field, str) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				match: str,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}

H2Object.prototype.matchPhaseAllQuery = function(field, str) {
	if (arguments.length <= 1) return this
	switch (arguments.length) {
		case 2:
			this.condition = {
				match_phrase: str,
			}
	}
	this.url.paramRemove("field")
	this.url.paramAppend("field", field)
	this.url.paramRemove("query")
	this.url.paramAppend("query",JSON.stringify(this.condition))
	return this
}



H2Object.prototype.limit = function(size, offset) {
	this.url.paramRemove("limit")
	this.url.paramAppend("limit", size + "," + offset)
	return this
}

H2Object.prototype.orderByAsc = function(field) {
	this.url.paramRemove("order")
	this.url.paramAppend("order", field + ",asc");
	return this
}

H2Object.prototype.orderByDesc = function(field) {
	this.url.paramRemove("order")
	this.url.paramAppend("order", field + ",desc");
	return this
}

//! H2Object authorize
H2Object.prototype.getAuth = function() {
	var ajax = new AJAX("get")
	return ajax.get("/auth")
}

H2Object.prototype.onAuth = function(onComplete, onCancel) {
	var ajax = new AJAX("get", "/auth", "", onComplete, onCancel)
	ajax.do()
	return this
}
H2Object.prototype.auth = function(token, onComplete, onCancel) {
}
H2Object.prototype.authWithPassword = function(passwd, onComplete, onCancel) {
	if (!passwd) return this
	var body;
	switch (typeof passwd) {
		case "string":
			body = passwd;
			break;
		case "object":
			body = JSON.stringify(passwd);
			break;
		default:
			return this
	}
	var ajax = new AJAX("post", "/auth/password/signin", body, arguments[1], arguments[2])
	ajax.do()
	return this
}



H2Object.prototype.authWithOAuthPopup = function(token, onComplete, onCancel) {
}
H2Object.prototype.authWithOAuthRedirect = function(token, onComplete, onCancel) {
}

H2Object.prototype.authWithOAuthToken = function(token, onComplete, onCancel) {
}



H2Object.prototype.offAuth = function(token, onComplete, onCancel) {
}

//! H2Object user
H2Object.prototype.createUser = function(user, onComplete, onCancel) {
}
H2Object.prototype.removeUser = function(user, onComplete, onCancel) {
}
H2Object.prototype.changeEmail = function(token, onComplete, onCancel) {
}
H2Object.prototype.changePassword = function(token, onComplete, onCancel) {
}
H2Object.prototype.resetPassword = function(token, onComplete, onCancel) {
}
H2Object.prototype.activeUser = function(token, onComplete, onCancel) {
}

function AJAX(method, url, body, onComplete, onCancel){
	this.request = this.getRequest();
	this.body = body;
    this.method = method.toUpperCase();
    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.url = url;
}

AJAX.prototype.get = function(url){
	var req = this.request;
	req.open("get", url, false);	
	req.send()
	var obj = JSON.parse(req.responseText)
    if (obj.code) {
    	return null
    }
    return obj
}

AJAX.prototype.bind = function (caller, object) {
    return function() {
        return caller.apply(object, [object]);
    };
};

AJAX.prototype.onStatusChange = function(object) {
	if (this.request.readyState == 4 && this.request.status == 200) {		
        var obj = JSON.parse(this.request.responseText)
        if (obj.code) {
        	if (this.onCancel)
        		this.onCancel(obj)
        } else {
        	if (this.onComplete)
        		this.onComplete(obj)
        }
	}
}

AJAX.prototype.getRequest = function() {
	if (window.ActiveXObject)
      	return new ActiveXObject('Microsoft.XMLHTTP');
    else if (window.XMLHttpRequest)
        return new XMLHttpRequest();
    return false;
}

AJAX.prototype.do = function() {
	if(this.request) {
        var req = this.request;
        req.onreadystatechange = this.bind(this.onStatusChange, this);
        req.open(this.method, this.url, true);	
        if (this.body!=="") {
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            req.setRequestHeader('Content-type', 'application/json');
            req.send(this.body);
        } else {
        	req.send()
        }
    }
}

; var URL = (function() {
	"use strict";

	var
		// mapping between what we want and <a> element properties
		map = {
			protocol : 'protocol',
			host     : 'hostname',
			port     : 'port',
			path     : 'pathname',
			query    : 'search',
			hash     : 'hash'
		},

		/**
		 * default ports as defined by http://url.spec.whatwg.org/#default-port
		 * We need them to fix IE behavior, @see https://github.com/Mikhus/jsurl/issues/2
		 */
		defaultPorts = {
			"ftp"    : 21,
			"gopher" : 70,
			"http"   : 80,
			"https"  : 443,
			"ws"     : 80,
			"wss"    : 443
		},

		parse = function( self, url) {
			var
				d      = document,
				link   = d.createElement( 'a'),
				url    = url || d.location.href,
				auth   = url.match( /\/\/(.*?)(?::(.*?))?@/) || []
			;

			link.href = url;

			for (var i in map) {
				self[i] = link[map[i]] || '';
			}

			// fix-up some parts
			self.protocol = self.protocol.replace( /:$/, '');
			self.query    = self.query.replace( /^\?/, '');
			self.hash     = self.hash.replace( /^#/, '');
			self.user     = auth[1] || '';
			self.pass     = auth[2] || '';
			self.port     = (defaultPorts[self.protocol] == self.port || self.port == 0) ? '' : self.port; // IE fix, Android browser fix

			if (!self.protocol && !/^([a-z]+:)?\/\//.test( url)) { // is IE and path is relative
				var
					base     = new Url( d.location.href.match(/(.*\/)/)[0]),
					basePath = base.path.split( '/'),
					selfPath = self.path.split( '/')
				;

				basePath.pop();

				for (var i = 0, props = ['protocol','user','pass','host','port'], s = props.length; i < s; i++) {
					self[props[i]] = base[props[i]];
				}

				while (selfPath[0] == '..') { // skip all "../
					basePath.pop();
					selfPath.shift();
				}

				self.path = (url.substring(0, 1) != '/' ? basePath.join( '/') : '') + '/' + selfPath.join( '/');
			}

			else {
				// fix absolute URL's path in IE
				self.path = self.path.replace( /^\/?/, '/');
			}

			parseQs( self);
		},
		
		decode = function(s) {
			s = s.replace( /\+/g, ' ');

			s = s.replace( /%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2, hex3) {
					var
						n1 = parseInt( hex1, 16) - 0xE0,
						n2 = parseInt( hex2, 16) - 0x80
					;
	
					if (n1 == 0 && n2 < 32) {
						return code;
					}
	
					var
						n3 = parseInt( hex3, 16) - 0x80,
						n = (n1 << 12) + (n2 << 6) + n3
					;
	
					if (n > 0xFFFF) {
						return code;
					}
	
					return String.fromCharCode( n);
				}
			);

			s = s.replace( /%([cd][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2) {
					var n1 = parseInt(hex1, 16) - 0xC0;
	
					if (n1 < 2) {
						return code;
					}
	
					var n2 = parseInt(hex2, 16) - 0x80;
	
					return String.fromCharCode( (n1 << 6) + n2);
				}
			);

			s = s.replace( /%([0-7][0-9a-f])/gi,
				function( code, hex) {
					return String.fromCharCode( parseInt(hex, 16));
				}
			);

			return s;
		},

		parseQs = function( self) {
			var qs = self.query;

			self.query = new (function( qs) {
				var re = /([^=&]+)(=([^&]*))?/g, match;

				while ((match = re.exec( qs))) {
					var
						key = decodeURIComponent(match[1].replace(/\+/g, ' ')),
						value = match[3] ? decode(match[3]) : ''
					;

					if (this[key] != null) {
						if (!(this[key] instanceof Array)) {
							this[key] = [this[key]];
						}

						this[key].push( value);
					}

					else {
						this[key] = value;
					}
				}

				this.clear = function() {
					for (key in this) {
						if (!(this[key] instanceof Function)) {
							delete this[key];
						}
					}
				};

				this.toString = function() {
					var
						s = '',
						e = encodeURIComponent
					;

					for (var i in this) {
						if (this[i] instanceof Function) {
							continue;
						}

						if (this[i] instanceof Array) {
							var len = this[i].length;

							if (len) {
								for (var ii = 0; ii < len; ii++) {
									s += s ? '&' : '';
									s += e( i) + '=' + e( this[i][ii]);
								}
							}

							else { // parameter is an empty array, so treat as an empty argument
								s += (s ? '&' : '') + e( i) + '=';
							}
						}

						else {
							s += s ? '&' : '';
							s += e( i) + '=' + e( this[i]);
						}
					}

					return s;
				};
			})( qs);
		}
	;

	return function( url) {
		this.toString = function() {
			return (
				(this.protocol && (this.protocol + '://')) +
				(this.user && (this.user + (this.pass && (':' + this.pass)) + '@')) +
				(this.host && this.host) +
				(this.port && (':' + this.port)) +
				(this.path && this.path) +
				(this.query.toString() && ('?' + this.query)) +
				(this.hash && ('#' + this.hash))
			);
		};
		this.strip = function() {
			var pos = this.path.lastIndexOf(".")
			if (pos >= 0) {
				this.path = this.path.slice(0, pos)
			}
			return this
		}
		this.suffix = function(s) {
			this.strip()
			this.path = this.path.concat(".").concat(s)
			return this
		}
		this.child = function(s) {
			this.strip()
			var pos = this.path.lastIndexOf("/")
			if (pos != this.path.length - 1) {
				this.path = this.path.concat("/")
			}			
			this.path = this.path.concat(s) 
			return this.toString()
		}
		this.parent = function() {
			this.strip()
			var pos = this.path.lastIndexOf("/")
			if (pos > 0) {
				this.path = this.path.slice(0, pos)
			}
			return this.toString()
		}
		this.paramAppend = function(key,val) {
			if (this.query[key] != null) {
				if (!(this.query[key] instanceof Array)) {
					this.query[key] = [this.query[key]];
				}
				this.query[key].push( val);
			}
			else {
				this.query[key] = val;
			}
			return this
		}
		this.paramRemove = function(key) {
			delete this.query[key];
			return this
		}
		this.param = function(key) {
			return this.query[key]
		}
		parse( this, url);
	};
}());
