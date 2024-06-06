/*
 *  Mainly wrote for downloading lyte-shape rendered shapes as image
 *  For SVG  ---> Finished but not perfectly( now svgs are converted to images. If svg has postions in its css it will make problem )
 *  For Iframes( not yet handled )

 $L.screenGrab({ 
 	getDimension : function(){
	    return {
	        width : width,
	        height : height
	    }
	}, 
	dom : $0, 
	attributes : ['viewbox', 'viewBox'], 
	attributes_replace : ['0 0 ' + width + ' ' + height,'0 0 ' + width + ' ' + height ], 
	styles : ['width','height'], 
	styles_replace : [ width + 'px', height + 'px']
}).then( function( arg ){
	document.body.appendChild( arg.image )
})
*/


;( function( window ){

	var request_mapping = {};

	function screenGrab( options, _window ){

		var defaultOptions = {
			scale : _window.devicePixelRatio,
			dom : _window.document.body,
			revokeUrl : true,
			style : "",
			processing : {},
			fontFaceString : '',
			externalImport : true,
			stylesToCheck : [ 'counter-increment', 'counter-reset' ],
			validate_request : ( font, is_font ) =>{
				if( !is_font ){
					return true;
				}
				return font.indexOf( '.woff2' ) != -1;
			}
		},
		options = this.options = $L.extend( true, defaultOptions, options || {} ),
		dom,
		arr;

		dom = options.dom = $L( options.dom, _window.document ).get( 0 );

		if( !dom ){
			return this.console( 'error', 'Provide valid dom element' );
		}

		arr = dom.__lytescreengrab;

		if( !arr ){
			arr = dom.__lytescreengrab = _window.Array();
		} 
		arr.push( this );

		return new _window.Promise( ( resolve, reject ) => {
			options.resolve = resolve;
			options.reject = reject;

			var arr = _window.Array(),
			font_family_array = _window.Array(),
			font_family = _window.Array();

			arr.push( this.convertUrls( dom, font_family ) );

			arr.push( this.downloadFonts( font_family ) );

			this.promiseAll( arr ).then( this.processGrabbing.bind( this, options ) );
		});

	};
	
	screenGrab.prototype = {

		promiseAll : function( arr ){
			var len = -1,
			_length = arr.length;

			return new Promise( ( res ) => {
				var fn = () => {
					if( ++len == _length ){
						res();
					}
				};
				arr.forEach( ( item ) => {
					item.then( fn, fn );
				});

				fn();
			})
		},

		destroy : function(){
			var options = this.options,
			keys = this.window().Object.keys( options );
			
			keys.forEach( item =>{
				delete options[ item ];
			}); 
		},

		removeInstance : function(){
			var dom = this.options.dom,
			arr = dom.__lytescreengrab,
			index = this.index( arr, this );
			if( index != -1 ){
				arr.splice( index, 1 );
			}
			this.destroy();
		},

		document : function(){
			return this.options.dom.ownerDocument;
		},

		window : function(){
			return this.document().defaultView;
		},

		console : function( type, message ){
			this.window().console[ type ]( message );
		},

		processGrabbing : function( options ){
			if( options.dom ){
				this.constructHTML( options.dom, options ).then( ( newdom ) => {
					this.convertToCanvas( newdom, options );
				}, () => {
					this.removeInstance();
					options.reject( 'stopped at dom processing' );
				});
			}
		},

		get : function( dom, selector ){
			var arr = this.window().Array.from( dom.querySelectorAll( selector ) );
			if( dom.tagName.toLowerCase() == selector ){
				arr.push( dom );
			}
			return arr;
		},

		pushIfNot : function( arr, value ){
			if( this.index( arr, value ) == -1 ){
				arr.push( value );
			}
		},

		pushIntoArray : function( arr, value ){
			if( value.constructor != Array ){
				value = [ value ];
			}
			arr.push.apply( arr, value );
		},

		index : function( arr, value ){
			return arr.indexOf( value );
		},

		downloadFonts : function( font_family ){
			var _window = this.window(),
			promiseArr = _window.Array();

			_window.Array.from( this.document().styleSheets ).forEach( ( item ) => {
				var rules;
				try{
					rules = item.rules;
				} catch( e ){
					// this.console( 'log', 'external import present ' + item.href );
					if( this.options.externalImport ){
						promiseArr.push( this.download_rules( item.href, font_family ) );
					}
					return;
				}
				this.construct_rules( rules, promiseArr, font_family );
			});

			return this.promiseAll( promiseArr );
		},

		single_font : function( rule, font_family ){
			var _window = this.window(),
			p_array = _window.Array(),
			style = rule.style,
			src = style.src || '',
			matched = src.match( /https?:\/\/[^ \'|\"\)]+/g ),
			__options = this.options;

			if( !matched ){
				matched = ( src.match( /url\([^\)]+/g ) || [] ).map( ( item ) => {
					return item.replace( /"/g, '' ).replace( /url\(/g, '' );
				});
			}

			// if( this.index( font_family, style.fontFamily ) == -1 ){
			// 	return new Promise( ( res ) => {
			// 		res();
			// 	});
			// }

			matched.forEach( ( url ) => {
				if( /^data\:/.test( url ) ){
					return src;
				}
				p_array.push( this.makeFontRequest( url, true ) );
			});

			return this.promiseAll( p_array ).then( () => {
				var options = _window.Array.from( style );
				__options.fontFaceString += '@font-face {\n';

				options.forEach( ( item ) => {
					var value = style.getPropertyValue( item ),
					map = request_mapping;
					if( item == 'src' ){
						matched.forEach( ( url ) => {
							if( map[ url ] ){
								value = value.replace( new _window.RegExp( url, 'g' ), map[ url ] );
							}
						});
					}
					__options.fontFaceString += ( item + ':' + value + ';\n' );
				});

				__options.fontFaceString += '}\n';
			});
		},

		download_rules : function( href, font_family ){ 
			var _window = this.window();
			return new _window.Promise( ( res, rej ) => {
				if( request_mapping[ href ] ){
					return res();
				}
				request_mapping[ href ] = true;

				var success = ( evt ) => {
					var _document = this.document(),
					style = _document.createElement( 'style' );
					style.innerHTML = evt.target.response;
					_document.body.appendChild( style );

					_window.requestAnimationFrame( () => {
						var arr = _window.Array();
						this.construct_rules( style.sheet.rules, arr, font_family );
						style.remove();
						this.promiseAll( arr ).then( res );
					});
				}, 
				failure = ( evt ) => {
					this.console( 'warn', 'Error in reading response at download_rules processing ' + href );
					rej();
				};

				this.ajax( href, 'text', success, failure );
			});
		},

		construct_rules : function( rules, promiseArr, font_family ){
			var _window = this.window();
			_window.Array.from( rules ).forEach( ( rule ) => {
				if( rule.constructor.name == 'CSSFontFaceRule' ){
					promiseArr.push( this.single_font( rule, font_family ) );
				} else if( rule.constructor.name == 'CSSImportRule' ){
					promiseArr.push( this.download_rules( rule.href, font_family ) );
				}
			});
		},

		makeFontRequest : function( url, is_font ){
			var _window = this.window(),
			options = this.options,
			urlMap = request_mapping,
			processing = options.processing;

			return new _window.Promise( ( res, rej ) => {

				if( urlMap[ url ] || processing[ url ] || ( options.validate_request && options.validate_request( url, is_font ) == false ) ){
					return res();
				}

				processing[ url ] = 'in_progress';

				var success = ( evt ) => {
					var response = evt.target.response;

					if( response ){
						var file = new _window.FileReader();

						file.addEventListener( 'loadend', () => {
							processing[ url ] = 'success';
							urlMap[ url ] = file.result;
							res();
						});
						file.addEventListener( 'error', () => {
							delete processing[ url ];
							this.console( 'warn', 'Error at reading response at font-face processing ' + url );
							rej();
						});

						file.readAsDataURL( response );
					} else {
						delete processing[ url ];
						this.console( 'warn', 'Empty response at font-face processing ' + url );
						rej();
					}
				},
				failure = () => {
					delete processing[ url ];
					this.console( 'warn', 'error at font-face processing ' + url );
					rej();
				}; 

				this.ajax( url, 'blob', success, failure );
			});
		},

		ajax : function( url, type, success, failure ){

			var _window = this.window(),
			xhr = new _window.XMLHttpRequest();
			xhr.open( 'GET', url );
			xhr.responseType = type;
			xhr.addEventListener( 'loadend', success );
			xhr.addEventListener( 'error', failure );
			xhr.send();
		},

		convertUrls : function( dom, font_family, ignore ){
			var _window = this.window();
			try{
				var image = this.get( dom, 'img' ),
				all = this.get( dom, '*' ),
				use = this.get( dom, 'use' ),
				getStyle = _window.getComputedStyle,
				imageArr = _window.Array(),
				promiseArr = _window.Array(),
				tag = dom.tagName.toLowerCase();
				all.push( dom ),
				svg_image = this.get( dom, 'image' );

				if( tag == 'img' ){
					image.push( dom );
				}

				if( tag  == 'image' ){
					svg_image.push( dom );
				}

				all.forEach( ( item ) => {
					var style = getStyle( item ),
					before = getStyle( item, ':before' ),
					after = getStyle( item, ':after' ),
					isBefore = this.isPseudo( before ),
					isAfter = this.isPseudo( after );

					item._screenstyle = style;
					item._screenBeforeStyle = before;
					item._screenAfterStyle = after;
					item._screenoffsetparent = !item.offsetParent && item != this.document().body;
					item._scrollLeft = item.scrollLeft;
					item._scrollTop = item.scrollTop;

					 if( style.display == "none" || item._screenoffsetparent || ignore ){
		               return false;
		             }

		             if(  style.backgroundImage ){
		             	this.pushIfNot( imageArr, style.backgroundImage );
		             }
		             if( before.backgroundImage ){
		             	this.pushIfNot( imageArr, before.backgroundImage );
		             }
		             if( after.backgroundImage ){
		             	this.pushIfNot( imageArr, after.backgroundImage );
		             }

		             this.pushIfNot( font_family, style.fontFamily );

		             if( isBefore ){
		             	this.pushIfNot( font_family, before.fontFamily );
		             }

		             if( isAfter ){
		             	this.pushIfNot( font_family, after.fontFamily );
		             }

				});

				if( !ignore ){
					image.forEach( ( item ) => {
						if( item._screenstyle.display == 'none' || item._screenoffsetparent ){
							return;
						}
						promiseArr.push( this.download_images( item ) );
					} );

					svg_image.forEach( ( item ) => {
						// if( item._screenstyle.display == 'none' ){
						// 	return;
						// }
						promiseArr.push( this.download_images( item ) );
					});

					imageArr.forEach( ( item ) => {
						if( /^none$/i.test( item ) ){
							return;
						}
						this.pushIntoArray( promiseArr, this.parseBgUrl( item ) );
					});

					use.forEach( ( item ) =>{
						this.pushIntoArray( promiseArr, this.useTagDownload( item ) );
					} )
				}

			} catch( e ){
				this.console( 'warn', 'catched error at image url processing ' + e.message );
			}

			return this.promiseAll( promiseArr );
		},

		download_images : function( item ){
			var src,
			tagName = item.tagName;
			if( item.complete || /image/i.test( tagName ) ){
				var _window = this.window()
				return new _window.Promise( ( res ) =>{
					if( /img/i.test( tagName ) ){
						src = item.src;
						try{
							request_mapping[ src ] = this.simple_canvas_draw( item );
							return res();
						}catch( e ){
						}
					} else {
						src = item.href || '';
						src = src.baseVal || src;
					}
					this.makeFontRequest( src ).then( res, res );
				})
			} 

			return this.makeFontRequest( item.src );
		},

		parseBgUrl : function( str ){
			var arr = this.window().Array();

			if( /url\("(.+?)"\)/.test( str ) ){
				arr.push( this.makeFontRequest( str.match( /url\("(.+?)"\)/ )[ 1 ] ) );
				str = str.replace( /url\("(.+?)"\)/ , '' );
				if( str ){
					this.pushIntoArray( arr, this.parseBgUrl( str ) );
				}
			}

			return arr;
		},

		constructHTML : function( node, options ){

		      var __options = options ||this.options;
		      if( !__options.dom ){
		      	return this.promiseAll();
		      }
		      var _window = this.window(),
		      _Array = _window.Array,
		      promiseArr = _Array(),
		      stringArr = _Array(),
		      children = options ? [ node ] : _Array.from( node.childNodes ),
		      len = 0;

		      children.forEach( ( item, index ) => {
		      	  try{
		      	  	 var tagName = ( item.tagName || '' ).toLowerCase(),
		      	  	 originalTagName = tagName,
		     	 	 _attributes = $L.extend( true, [], ( options || {} ).attributes || [] ),
		      		 _attributes_replace = $L.extend( true, [], ( options || {} ).attributes_replace || [] ),
		      		 _styles = $L.extend( true, [], ( options || {} ).styles || [] ),
		      		 _styles_replace = $L.extend( true, [], ( options || {} ).styles_replace || [] );

			          if( /^(template|style|script|link|head)$/i.test( tagName ) || [ "[object Comment]" ].indexOf( item.toString() ) != -1 ){
			             return;
			          } else if( /^(body|iframe)$/i.test( tagName ) || ( item.hasAttribute && item.hasAttribute( 'lyte-rendered' ) ) ){
			             tagName = "div";
			          }

			          if( tagName ){
			             var style = item._screenstyle,
			             psuedoBefore = item._screenBeforeStyle,
			             psuedoAfter = item._screenAfterStyle,
			             sleft = item._scrollLeft,
			             stop = item._scrollTop,
			             randomClass = ( this.isPseudo( psuedoBefore ) || this.isPseudo( psuedoAfter ) ) ? this.randomClass() : "",
			             offset = item._screenoffsetparent;

			             delete item._screenstyle;
			             delete item._screenBeforeStyle;
			             delete item._screenAfterStyle;
			             delete item._screenoffsetparent;

			             if( style && style.display == "none" ){
			               return;
			             }

			             if( offset ){
			             	var svg = $L( item ).closest( 'svg' ).get( 0 ),
			             	foreignObject = $L( item ).closest( 'foreignObject' ).get( 0 );
			             	if( style.position == 'fixed' ){
			             		svg = true;
			             	}
			             	if( ( foreignObject && tagName != 'foreignobject' ) || !svg ){
			             		return;
			             	}
			             }

			             if( tagName == 'svg' ){
			             	promiseArr.push( new _window.Promise( function( len, stringArr, res ){
			             		this.constructHTML( item ).then( function( len, stringArr, string ){

				     				window.requestAnimationFrame( () => {
				     					string = string.trim();
				     					var urlEncode = _window.URL || _window.webkitURL || _window,
				     					url =  "data:image/svg+xml;charset=utf-8," + _window.encodeURIComponent( new XMLSerializer().serializeToString( this.convertStringToDom( '<' + tagName + this.getAttributes( item, _attributes, _attributes_replace ) +' class =\'' + randomClass + '\'>' + string + '</' + tagName + '>' ) ) ),
				     					img = new Image();

				     					__options.useTag = '';

				     					img.onerror = img.onload = () => {
				     						stringArr[ len ] = ( '<img src=' + url + ' style = \'' + this.getStyle( style, _styles, _styles_replace )	 + '\'/>' );
				     						res();	
				     					};
				     					img.src = url;
				     				});
				             	}.bind( this, len, stringArr ) );

			             	}.bind( this, len, stringArr ) ) );
			             } else if( tagName == 'canvas' ){
			             	stringArr[ len ] = ( '<img' + this.getAttributes( item, _attributes, _attributes_replace ) + ' src=' + item.toDataURL() + ' style = \'' + this.getStyle( style, _styles, _styles_replace )	 + '\'/>' );
			             } else if( /^(video)$/i.test( tagName ) ){
			             	stringArr[ len ] = ( '<img src=' + this.simple_canvas_draw( item, style ) + ' style = \'' + this.getStyle( style, _styles, _styles_replace )	 + '\'/>' );
			             } else if( tagName == 'img' ){
			             	stringArr[ len ] = ( '<img src=' + ( request_mapping[ item.src ] || item.src ) + ' style = \'' + this.getStyle( style, _styles, _styles_replace )	 + '\'/>' );
			             } else if( tagName == 'use' ){
			             	var href = item.href.baseVal;

			             	if( /^#/.test( href ) ){
			             		var elem = document.querySelector( href ),
			             		random = this.randomClass();

			             		_attributes.push( 'xlink:href' );

			             		if( elem ){
				             		promiseArr.push( new _window.Promise( function( len, res, rej ) {
				             			this.constructHTML( elem ).then( ( string ) => {
				             				var inner_tag = elem.tagName.toLowerCase();
				             				_attributes_replace.push( '#' + random );
				             				stringArr[ len ] = '<' + tagName + this.getAttributes( item, _attributes, _attributes_replace ) + '>' + ( '<' + inner_tag + this.getAttributes( elem, 'id', random ) +' class =\'' + randomClass + '\'>' + string + '</' + inner_tag + '>' ) + '</' + tagName + '>';
				             				res();
				             			});
				             		}.bind( this, len ) ) );
				             	}
			             	} else { 
				             	_attributes_replace.push( '#' + item.__screengrabid );
			             		stringArr[ len ] = '<' + tagName + this.getAttributes( item, _attributes, _attributes_replace ) + '>' + request_mapping[ href ] + '</' + tagName + '>';
			             		delete item.__screengrabid;
			             	}
			             } else if( originalTagName == 'iframe' ){
			             	var lent = len;
			             	promiseArr.push( new _window.Promise( ( res ) =>{
			             		try{

			             			_styles.push( 'display' );
			             			_styles_replace.push( 'inline-block' );

			             			var itemDoc = item.contentDocument,
			             			dom = itemDoc.body,
			             			dsLeft = itemDoc.documentElement.scrollLeft,
			             			dsTop = itemDoc.documentElement.scrollTop,
			             			dsStyle = item.contentWindow.getComputedStyle( dom ),
			             			str = '<div style=\"' + this.getStyle( style, _styles, _styles_replace ).replace( /\"/g, '&quot;' ) + ';overflow:hidden;\">';

				             		$L.screenGrab( {
				             			dom
				             		} ).then( ( arg ) =>{
				             			stringArr[ lent ] = ( str + this.getScrollWrapper( '<img' + this.getAttributes( arg.image ) + ' src=' + arg.image.src + '/>', dsLeft, dsTop ) + '</div>' );
				             			res();
				             		}, res );
				             	} catch( e ){
				             		stringArr[ lent ] = str + '</div>';
				             		res();
				             	}
			             	} ) );
			             } else {
		             	 	promiseArr.push( this.constructHTML( item ).then( function( lent, stringArr, string ){
		             	 		var _str, 
		             	 		_style = this.getStyle( style, _styles, _styles_replace );
		             	 			
		             	 		_attributes.push( 'class' );
		             	 		_attributes_replace.push( randomClass || '' );

		             	 		_str = '<' + tagName + this.getAttributes( item, _attributes, _attributes_replace );

		             	 		if( _style ){
		             	 			_str += ( ' style =\"' + _style.replace( /\"/g, '&quot;' ) + '\"' );
		             	 		}	

		             	 		if( /foreignobject/i.test( tagName ) ){
		             	 			string += ( '<style>' + __options.style + '</style>' );
		             	 			string += ( '<style>' + __options.fontFaceString + '</style>' );
		             	 		}

		             	 		_str +=  ( '>' + this.getScrollWrapper( string, sleft, stop ) + '</' + tagName + '>' );

			                	return stringArr[ lent ] = _str; 
			             	}.bind( this, len, stringArr ) ) );

				             __options.style += ( this.constructPsuedo( psuedoBefore, randomClass, 'before' ) + this.constructPsuedo( psuedoAfter, randomClass, 'after' ) );
				             if( options ){
				            	options.background = options.background || style.getPropertyValue( 'background-color' );
				             }
				         }
			           } else {
			              stringArr[ len ] = item.nodeValue.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
			           }

			           len++;
		      	  } catch( e ){
		      	  	this.console( 'warn', "catched error at html construction " + e.message );
		      	  }
		      });

		      return this.promiseAll( promiseArr ).then( () => {
		      	if( options ){
		      		if( options.style ){
		        		stringArr.push( '<style>' + options.style + '</style>' );
		        	}
		        	if( options.fontFaceString ){
		        		stringArr.push( '<style>' + options.fontFaceString + '</style>' );
		        	}
		      	}
		        return stringArr.join( '' )
		      });
		},

		useTagDownload : function( item ){
			var href = item.href.baseVal,
			_window = this.window();

			return new _window.Promise( ( res ) => {

				if( /^#/.test( href ) ){
					return res();
				}

				var __options = this.options,
				rej = () =>{
					request_mapping[ href ] = '';
					res();
				},
				success = ( evt ) =>{
					var response = evt.target.response,
					dom = this.convertStringToDom( response ),
					random = this.randomClass();

					item.__screengrabid = random;

					this.convertUrls( dom, [] ).then( () =>{
						this.constructHTML( dom ).then( ( string ) => {
							var tagName = dom.tagName.toLowerCase();
							request_mapping[ href ] = '<' + tagName + this.getAttributes( item, 'id', random ) + '>' + string + '</' + tagName + '>';
							res();
						} );
					}, rej);
				};
				
				this.ajax( href, 'text', success, rej ); 
			} );
		},

		getScrollWrapper : function( string, sleft, stop ){
			if( sleft || stop ){
				string = '<div style=\'display:inherit;margin-left:-' + sleft + 'px;margin-top:-' + stop + 'px;\'>' + string + '</div>';
			}
			return string;
		},

		simple_canvas_draw : function( item, __style ){
			var canvas = this.document().createElement( 'canvas' ),
         	ctx = canvas.getContext( '2d' ),
         	style = item._screenstyle || __style;

         	canvas.width = item.naturalWidth || parseFloat( style.width );
         	canvas.height = item.naturalHeight || parseFloat( style.height );
         	ctx.fillRect( 0, 0, canvas.width, canvas.height );

         	$L( canvas ).css( {
         		width : style.width,
         		height : style.height
         	});

			ctx.drawImage( item, 0, 0 );
			try{
				return canvas.toDataURL();
			} catch( e ){
				this.console( 'warn', e.message );
				return "";
			}
		},

		getStyle : function( style, replace, replace_value ){

			if( !style ){
				return '';
			}

			var len = style.length,
			str = '',
			cons = replace ? replace.constructor : void 0;

			for( var i = 0; i < len; i++ ){
				var name = style[ i ], value = style[ name ];

				if( name == 'background-image' && !/^none$/i.test( value ) ){
					value = this.constructBGUrl( value );
				}

				if( cons == String ){
					if( name == replace ){
						value = replace_value;
					}
				} else if( cons == Array ){
					var indx = replace.indexOf( name );
					if( indx != -1 ){
						value = replace_value[ indx ];
					}
				}

				str += ( name + ':' + value + ';' );
			}

			( this.options.stylesToCheck || [] ).forEach( ( item ) => {
				str += ( item + ':' + style.getPropertyValue( item ) + ';' );
			} )

			return str;
		},

		constructBGUrl : function( value ){
			var map = request_mapping;

			if( /url\("(.+?)"\)/.test( value ) ){
				var match = value.match( /url\("(.+?)"\)/ )[ 1 ],
				index = value.indexOf( match );
				return value.slice( 0, index ) + ( map[ match ] || match ) + this.constructBGUrl( value.slice( index + match.length ) );
			}
			return value;
		},

		getAttributes : function( item, replace, replace_value ){
			var attr = item.attributes,
			len = attr.length,
			str = '',
			ignore_empty = [ 'viewBox' ],
			cons = replace ? replace.constructor : void 0;

			if( len == 0 && replace ){
				len = replace.length;
				attr = replace;
			}

			for( var i = 0; i < len; i++ ){
				var name = attr[ i ],
				attrName = name.nodeName || name,
				attrValue = name.nodeValue;

				if( /^(style)$/i.test( attrName ) ){
					continue;
				} else if( attrName == 'src' ){
					attrValue = request_mapping[ item.src ] || attrValue;
				} else if( attrName == 'href' ){
					var href = item.href;
					if( href.baseVal ){
						href = href.baseVal;
					}

					attrValue = request_mapping[ href ] || attrValue;
				}
				if( !attrValue ){
					if( this.index( ignore_empty, attrName ) != -1 ){
						continue;
					}
				}
				if( cons == String ){
					if( attrName == replace ){
						attrValue = replace_value;
					}
				} else if( cons == Array ){
					var indx = replace.indexOf( attrName );
					if( indx != -1 ){
						attrValue = replace_value[ indx ];
					}
				}

				str += ( ' ' + attrName + '=\'' + attrValue.replace( /\"|\'/g, '&quot;' ) + '\'' );
			}
			return str;
		},

		convertToCanvas : function( string, options ){
			try{
				var _window = this.window(),
				_document = this.document(),
				canvas = $L( _document.createElement('canvas') ).addClass( 'LyteScreenGrabberCanvas' ).get( 0 ),
				ctx = canvas.getContext( '2d' ),
				dom = options.dom,
				scale = options.scale,
				bcr = options.bcr = dom.getBoundingClientRect();

				if( options.getDimension ){
					bcr = options.getDimension.call( this, bcr, dom ) || bcr;
				}

				var data   = '<svg width=\'' + bcr.width + '\' height=\'' + bcr.height + '\'>' +
			               '<foreignObject x = \'0\' y = \'0\' width=\'100%\' height=\'100%\' externalResourcesRequired = \'true\'>' +
			                 	string +
			               '</foreignObject>' +
			             '</svg>',
			    urlEncode = _window.URL || _window.webkitURL || _window,
			    svg = this.callBeforeCallback( this.convertStringToDom( data ), options ),
	    		img = new _window.Image(),
				// url = urlEncode.createObjectURL( new _window.Blob( [ data ], { type: "image/svg+xml" } ) );
				url = "data:image/svg+xml;charset=utf-8," + _window.encodeURIComponent( new XMLSerializer().serializeToString( svg ) ),

				fn = () => {
					img.onload = () => {
						canvas.width = bcr.width * scale;
						canvas.height = bcr.height * scale;
						ctx.fillStyle = options.background;
						ctx.fillRect( 0, 0, canvas.width, canvas.height );
						$L( canvas ).css( {
							width : bcr.width,
							height : bcr.height
						} );
						ctx.scale(  scale, scale );
						ctx.drawImage( img, 0, 0 );
						if( options.revokeUrl ){
							urlEncode.revokeObjectURL( url );
							for( var key in options.url ){
								urlEncode.revokeObjectURL( options.url[ key ] );
							}
						}
						options.done = true;
						options.resolve( { 
							canvas : canvas, 
							image : img, 
							svg : svg, 
							html : data 
						} );
					};

					img.onerror = () => {
						options.reject( 'failed at final image processing' );
					}

					img.src = url;
				};

				fn();

			} catch( e ){
				options.reject( 'stopped at canvas conversion error :' + e.message );
				this.removeInstance();
			}
		},

		convertStringToDom : function( string ){
			var div = this.document().createElement( 'div' );
			div.innerHTML = string;
			return div.children[ 0 ];
		},

		constructPsuedo : function( style, className, name ){
			if( !this.isPseudo( style ) ){
				return "";
			}
			var str = '.' + className + ':' + name + '{' + this.getStyle( style ) + '}';

			return str;
		},

		isPseudo : function( style ){
			if( style ){
				return style.getPropertyValue( 'content' ) != "none";
			}
			return false;
		},

		randomClass : function( ns ){
			var string = [], random,
			len = 20,
			namespace = ns || "LyteScreen";

			for( var i = 0; i < len; i++ ){
				random = 0 | Math.random() * 42;
				string[ i ] = String.fromCharCode( 48 + ( ( random > 9 && random < 18 ) ? ( 18 + random ) : random ) );
			}
			return namespace + string.join( '' );
		},

		callBeforeCallback : function( dom, options ){
			if( options.onBeforeConstruct ){
				options.onBeforeConstruct.call( this, dom );
			}	
			return dom;
		}
	}

	$L.screenGrab = function( options, _window ){
		return new screenGrab( options, _window || window );
	}

	lyteDomObj.prototype.screenGrab = function( arg, key ){

		switch( arg ){
			case 'stop' : {
				var len = this.length,
				fn = item => {
					if( !item.options.done ){
						item.options.reject( 'stopped from code' );
					}
					item.removeInstance();
				};
				for( var i = 0; i < len; i++ ){
					var instance = this.get( i ).__lytescreengrab || [];
					instance.forEach( fn );
				}
			}
			break;
			case 'isActive' : {
				return !!( this.get( 0 ).__lytescreengrab || [] ).length;
			}
			break;
			case 'remove' : {
				if( key ){
					delete request_mapping[ key ];
				} else {
					request_mapping = {};
				}
			}
			break;
		}
		return this;
	}

} )( window );