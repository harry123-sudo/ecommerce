;( function(){
	var lytedom = window.lyteDomObj,
	http_string = "ht" + "tp://",
	fakeContainerClass = "lyteConnectionFakeContainer",
	containerClass = "lyteConnectionContainer",
	targetElemClass = "lyteConnectionTargetElement",
	srcElemClass = "lyteConnectionSrcElement",
	connection_elements = 'connection_elements',
	connection_data_str = 'connection_data',
	lyteConnectionElement_str = 'lyteConnectionElement',
	evt_str = 'mousedown touchstart';

	if( lytedom ){

		function hover_fn( evt ){
			var elem = evt.target.closest( '.' + containerClass + ',.' + fakeContainerClass ),
			cls_name = 'lyteConnectionHover',
			is_enter = evt.type == 'mouseenter',
			name = ( is_enter ? 'add' : 'remove' ) + "Class",
			item = "lyte-connect-item",
			fn = function( $node ){
				return $node[ name ]( cls_name );
			},
			data = fn( $L( elem ) ).data(),
			connection_data = this.data( connection_data_str ),
			callback = connection_data[ "onConnection" + ( is_enter ? "Hover" : "Leave" ) ];

			fn( fn( data.src )[ name ]( cls_name + 'Src' ).closest( item ) );
			fn( fn( data.target )[ name ]( cls_name + 'Target' ).closest( item ) );

			if( callback ){
				callback( evt.originalEvent, elem );
			}
		}

		function createElement( id, _class, data, options ){

			var ns = http_string + "www.w3.org/2000/svg",
			g = document.createElementNS( ns, "g" ),
			path1 = document.createElementNS( ns, 'path' ),
			path2 = document.createElementNS( ns, 'path' ),
			fn = function( elem, name, value ){
				elem.setAttribute( name, value );
			},
			bind_fn = hover_fn.bind( this );

			options = options || {};

			g.id = id;

			fn( g, 'class', ( _class || fakeContainerClass ).trim() );

			fn( path1, 'class', 'lyteConnectionPath' );
			fn( path1, 'marker-end', options.markerEnd || data.markerEnd || '' );
			fn( path1, 'marker-start', options.markerStart || data.markerStart || '' );

			fn( path2, 'class', 'lyteConnectionFakePath' );

			g.appendChild( path1 );
			g.appendChild( path2 );

			$L( path2 ).on({
				mouseenter : bind_fn,
				mouseleave : bind_fn
			});

			return g;
		}

		function mouseup( evt ){
			var data = this.data(),
			connection_data = data[ connection_data_str ];

			$L( document ).off({
				mousemove : data.mousemove,
				mouseup : data.mouseup,
				touchmove : data.mousemove,
				touchend : data.mouseup
			});

			if( data.moved ){
				var tempElement = data.tempElement,
				module_name = connection_data.module || connection_data.parent,
				__target = evt.target,
				elem = __target.closest( module_name ),
				this_elem = this.get( 0 ),
				$temp = $L( tempElement ),
				target = $temp.data( 'target' );


				if( elem ){
					var callback;
					if( target ){

						callback = connection_data.onReconnect;

						if( callback ){
						  var exst_target = target.get( 0 ),
						  new_target = $L( callback( data.element, exst_target, elem, this_elem, evt, tempElement ) || exst_target ),
						  __id = 'target_' + tempElement.id,
						  obj = target.data( connection_elements ),
						  target_class = targetElemClass,
						  $_tar = $L( __target );

						  if( $_tar.hasClass( 'lyteConnectAnchorPoint' ) ){
						  	 $temp.data( 'target_position', {
						  	 	x : Number( $_tar.attr( 'left' ) ),
						  	 	y : Number( $_tar.attr( 'top' ) )
						  	 });
						  }

						  delete obj[ __id ];
						  $temp.data( 'target', new_target );

						  if( !Object.keys( obj ).length ){
						  	 target.removeClass( target_class );
						  }

						  var new_connection = new_target.data( connection_elements );
						  if( !new_connection ){
						  	 new_target.data( connection_elements, new_connection = {} );
						  }
						  new_connection[ __id ] = { connector : $temp };
						  new_target.addClass( target_class );
						}
					} else {
						if( callback = connection_data.onConnect ){
							callback( data.element, elem, this_elem, evt, data.pos, tempElement );
						}
					}
				}

				window.cancelAnimationFrame( this_elem._frame );
				delete this_elem._frame;

				if( target ){
					$temp.addClass( containerClass ).removeClass( fakeContainerClass );
					update_individual_connector.call( this, $temp );
				} else {
					tempElement.remove();
				}
			}

			delete connection_data.ignore_break;

			[ 'mousemove', 'mouseup', 'moved', 'clientY', 'clientX', 'tempElement', 'con_x', 'con_y', 'element', 'pos' ].forEach( function( item ){
				delete data[ item ];
			});
		}

		function draw_curve( svg, start, end, data ){
			var width = Math.abs( start.x - end.x ),
			height = Math.abs( start.y - end.y ),
			offset = data.offset,
			off_x1 = offset.left,
			off_y1 = offset.top,
			off_x2 = offset.right,
			off_y2 = offset.bottom,
			start_x = Math.min( start.x, end.x ),
			start_y = Math.min( start.y, end.y ),
			end_x = Math.max( start.x, end.x ),
			end_y = Math.max( start.y, end.y ),
			ref_x = start_x - off_x1,
			ref_y = start_y - off_y1,
			flipx = start.x > end.x,
			trans = '',
			path = '',
			type = data.connection_type,
			scroll = data.getScroll(),
			curve_offset = /*Math.min( */data.curve_offset/*, width / 3 )*/;

			if( type == 'line' ){
				path += "M " + ( start.x - ref_x ) + ' ' + ( start.y - ref_y ) + ' L ' + ( end.x - ref_x ) + ' ' + ( end.y - ref_y );
			} else if( type == 'curve' ){
				function fn( start, end ){
					var is_hgt = height <= curve_offset,
					is_wdt = width <= curve_offset * 3,
					_start_x = start.x - ref_x,
					_start_y = start.y - ref_y,
					_end_x = end.x - ref_x,
					_end_y = end.y - ref_y;

					if( is_hgt && !is_wdt && curve_offset ){
						path += "M " + _start_x + ' ' + _start_y + ' C ' + ( _start_x + width / 4 ) + ' ' + ( _start_y + curve_offset ) + ' ' + ( _start_x + width * 3 / 4 ) + ' ' + ( _end_y + curve_offset ) + ' ' + _end_x + ' ' + _end_y;
						curve_offset = 0;
					} else {
						if( is_wdt && !is_hgt && curve_offset ){
							var is_start_left = start.x == start.left,
							is_end_left = end.x == end.left;
							if( is_start_left == is_end_left ){
								if( !is_end_left ){
									path += "M " + _start_x + ' ' + _start_y + ' L ' +  ( _start_x + curve_offset ) + ' ' + _start_y + ' C ' + ( _end_x + curve_offset * 3 ) + " " + _start_y + " " + ( _end_x + curve_offset * 3 ) + " " + ( _end_y ) + " " + ( _end_x + curve_offset ) + ' ' + _end_y + " L " + _end_x + " " + _end_y;
								} else {
									path += "M " + _start_x + ' ' + _start_y + ' L ' +  ( _start_x - curve_offset ) + ' ' + _start_y + ' C ' + ( _start_x - curve_offset * 3 ) + " " + _start_y + " " + ( _start_x - curve_offset * 3 ) + " " + ( _end_y ) + " " + ( _end_x - curve_offset ) + ' ' + _end_y + " L " + _end_x + " " + _end_y;
								}
							} else {
								path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y  ) : "" ) + ' C ' + ( _start_x + curve_offset * 3 + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset * 3 - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
							}
						} else {
							path += "M " + _start_x + ' ' + _start_y + ( curve_offset ? ( ' L ' + ( _start_x + curve_offset ) + ' ' + _start_y  ) : "" ) + ' C ' + ( _start_x + curve_offset + width * 13 / 15 ) + ' ' + _start_y + ' ' + ( _end_x - curve_offset - width * 13 / 15 ) + ' ' + _end_y + ' ' + ( curve_offset ? ( ( _end_x - curve_offset ) + ' ' + _end_y + ' L '  ) : "" ) + _end_x + ' ' + _end_y;
						}
					}
				}
				if( flipx ){
					fn( end, start );

					// for fliped case need to switch start and end points. Because marker end and start will only apply for respective points

					var new_path = path.replace( /(M|C|L)\s/g, '' ),
					_split = new_path.split( ' ' ).reverse(),
					_len = _split.length;

					for( var i = 0; i < _len; i += 2 ){
						var _temp = _split[ i ];
						_split[ i ] = _split[ i + 1 ];
						_split[ i + 1 ] = _temp;
					}

					_split.splice( 0, 0, 'M' );
					if( curve_offset ){
						_split.splice( 3, 0, 'L' );
						_split.splice( 6, 0, 'C' );
						_split.splice( 13, 0, 'L' );
					} else {
						_split.splice( 3, 0, 'C' );
					}

					path = _split.join( ' ' );
				} else {
					fn( start, end );
				}
			} else if( type == "elbow" ){
				var avoid_line = data.avoid_line && !data.ignore_break,
				arc = data.check_break && !data.ignore_break;

				path = $L.elbow( svg, start, end, data, avoid_line || arc );

				if( avoid_line ){
					path = $L.elbow.avoidLine( svg, data, arc );
				}

				if( data.elbow_arc && arc ){
					$L.elbow.arc( svg, data );
				}
			}

			var fn = function( elem, name, value ){
				elem.setAttribute( name, value );
			};

			if( path ){
				var paths = svg.children;

				fn( paths[ 0 ], 'd', path );
				fn( paths[ 1 ], 'd', path );
			}

			fn( svg, 'transform', 'translate(' + ( ref_x - scroll.left ) + ' ' + ( ref_y - scroll.top ) + ')' );

			check_element_type( svg );
		}

		function check_element_type( svg ){
			var $svg = $L( svg ),
			data = $svg.data(),
			src_class = data.src_class,
			target_class = data.target_class,
			active_src = data.active_src,
			active_target = data.active_target,
			fn = function( elem ){
				return ( elem ? elem.tagName.toLowerCase() : "" ).replace(/\-(.)/g, function(){
				    return arguments[ 1 ].toUpperCase();
				});
			},
			src_tag = 'lyteConnectSrc_' + fn( active_src ),
			target_tag = 'lyteConnectTarget_' + fn( active_target );

			$svg.removeClass( ( src_class || "" ) + " " + ( target_class || "" ) );

			$svg.addClass( src_tag + ' ' + target_tag ).data({
				src_class : src_tag,
				target_class : target_tag	
			});
		}

		function getOriginalClient( data, elem, scale ){
			var clientX = data.clientX,
			clientY = data.clientY,
			wrap_bcr = elem.querySelector( '.lyteConnectWrapper' ).getBoundingClientRect(),
			left_diff = ( clientX - wrap_bcr.left ) / scale,
			top_diff = ( clientY - wrap_bcr.top ) / scale;

			return {
				clientX : left_diff,
				clientY : top_diff
			};
		}

		function mousemove( evt ){
			var data = this.data(),
			connection_data = data.connection_data,
			scale = connection_data.getScale(),
			ori_evt = evt,
			touches = evt.touches || [ evt ];

			if( touches.length > 1 ){
				return;
			}

			evt = touches[ 0 ];

			var clientX = evt.clientX,
			clientY = evt.clientY,
			_clientX = data.clientX,
			_clientY = data.clientY,
			tempElement = data.tempElement,
			elem = this.get( 0 ),
			boundary = connection_data.getBoundary(),
			scroll = connection_data.getScroll(),
			bcr = elem.getBoundingClientRect(),
			original_client = getOriginalClient( data, elem, scale ),
			xInc = ( clientX - _clientX ) / scale + scroll.left,
			yInc = ( clientY - _clientY ) / scale + scroll.top;

			window.cancelAnimationFrame( elem._frame );
			delete elem._frame;

			if( !data.moved ){
				data.moved = true;
				if( !tempElement ){
					data.tempElement = tempElement = createElement.call( this, 'some_random_id', void 0, connection_data );
					connection_data.wrapperElement.appendChild( tempElement );
				}
			}

			draw_curve( tempElement, { x : data.con_x , y : data.con_y, initial_angle : data.initial_angle }, { x : original_client.clientX + xInc, y : original_client.clientY + yInc }, connection_data );

			function fn( _left, _right, client, min, max, s_left ){
				if( client < bcr[ _left ] + 5 ){
					if( s_left + 5 > max ){
						return 0;
					}
					return 1;
				} else if( client > bcr[ _right ] - 5 ){
					if( s_left - 5 < min ){
						return 0;
					}
					return -1;
				}
			}

			var x_fact = fn( 'left', 'right', clientX, boundary.min_x, boundary.max_x, scroll.left ),
			y_fact = fn( 'top', 'bottom', clientY, boundary.min_y, boundary.max_y, scroll.top ),
			bool = x_fact || y_fact;

			if( x_fact ){
				connection_data.setScroll( 'Left', scroll.left + 5 * x_fact );
				clientX -= 5 * x_fact;
				data.con_x += 5 * x_fact;
			}

			if( y_fact ){
				connection_data.setScroll( 'Top', scroll.top + 5 * y_fact );
				clientY -= 5 * y_fact;
				data.con_y += 5 * y_fact;
			} 

			if( bool ){
				elem._frame = window.requestAnimationFrame( mousemove.bind( this, ori_evt ) );
			}

			data.clientX = clientX;
			data.clientY = clientY;
		}

		function get_group_off( _module ){
			var off_parent = _module.offsetParent;

			if( $L( off_parent ).hasClass( 'lyteConnectGroupShape' ) ){
				return {
					left : off_parent.offsetLeft,
					top : off_parent.offsetTop
				};
			}
			return {
				left : 0,
				top : 0
			};
		}

		function mousedown( evt ){
			var data = this.data( connection_data_str ),
			module_name = data.selector,
			elem = evt.target.closest( module_name ),
			tempElement,
			callback = data.onBeforeConnectionCreation,
			ori_evt = evt,
			touches = evt.touches || [ evt ],
			is_reselect;

			if( touches.length > 1 ){
				return;
			}

			evt = touches[ 0 ];

			if( !elem ){
				var class_name = containerClass,
				connector = evt.target.closest( '.' + class_name );
				if( connector ){
					elem = $L( connector ).removeClass( class_name ).addClass( fakeContainerClass ).data( 'active_src' );
					is_reselect = true;
				}
				tempElement = connector;
				callback = data.onBeforeReconnectSelect;
			}

			if( !elem || evt.buttons == 2 ){
				return;
			} 

			if( callback && callback( ori_evt.originalEvent, tempElement, this.get( 0 ) ) == false ){
				$L( tempElement ).addClass( class_name ).removeClass( fakeContainerClass );
				return;
			}

			var bcr = elem.getBoundingClientRect(),
			near = evt.clientX,
			move = mousemove.bind( this ),
			up = mouseup.bind( this ),
			obj = {
				mousemove : move,
				mouseup : up,
				touchmove : move,
				touchend : up
			},
			close_module = elem.closest( data.module ),
			close_com = close_module.component;

			if( close_module == elem ){
				close_module = {
					offsetLeft : 0,
					offsetTop : 0,
					offsetWidth : elem.offsetWidth,
					offsetHeight : elem.offsetHeight
				};
			}

			var scroll = data.getScroll(),
			group_off = get_group_off( close_module ),
			off_left = close_module.offsetLeft + group_off.left + elem.offsetLeft + scroll.left,
			off_top = close_module.offsetTop + group_off.top + elem.offsetTop + scroll.top,
			initial_angle,
			__pos = close_com ? {} : {
				x : elem.offsetLeft / close_module.offsetWidth,
				y : elem.offsetTop / close_module.offsetHeight
			},
			_height = off_top + elem.offsetHeight * 0.5;

			if( close_com ){
				if( !is_reselect ){
					close_com.update_from_evt( __pos, evt );
				}
			}

			if( close_com && is_reselect ){
				var src_position = $L( tempElement ).data( 'src_position' ),
				x_value = src_position.x;

				near = off_left + close_module.offsetWidth * x_value;
				_height = off_top + close_module.offsetHeight * src_position.y;

				if( x_value >= 0.5 ){
					initial_angle = 0;
				} else {
					initial_angle = 180;
				}
			} else{
				if( Math.abs( near - bcr.left ) > Math.abs( near - bcr.right ) ){
					near = off_left + elem.offsetWidth;
					initial_angle = 0;
				} else {
					near = off_left;
					initial_angle = 180;
				}
			}

			$L( document ).on( obj );

			this.data( obj ).data({
				clientX : evt.clientX,
				clientY : evt.clientY,
				con_x : near,
				con_y : _height,
				element : elem,
				tempElement : connector,
				initial_angle : initial_angle,
				pos : __pos
			});

			data.ignore_break = true;

			ori_evt.preventDefault();
		}

		function destroy(){
			var len = this.length;

			for( var i = 0; i < len; i++ ){
				var cur = this.eq( i ),
				data = cur.data( connection_data_str );

				if( data ){
					cur.removeData( connection_data_str );
					var elements = cur.find( '.' + srcElemClass ),
					_len = elements.length;

					for( var j = 0; j < _len; j++ ){
						delete_connection.call( this, elements.eq( j ) );
					}
				}
				cur.removeClass( lyteConnectionElement_str ).off( evt_str );
			}
		}

		function apply_connection( obj ){
			var len = this.length,
			fn1 = function(){
				return{
					left : 0,
					top : 0
				};
			},
			fn2 = function(){
				return 1;
			};

			for( var i = 0; i < len; i++ ){
				var cur = this.eq( i );

				var new_obj = $L.extend( true, { 
					connection_type : "curve", 
					connector_radius : 5,
					connectShortest : true, 
					offset : { 
						left : 2, 
						right : 2, 
						top : 2, 
						bottom : 2 
					},
					getScroll : fn1,
					getScale : fn2,
					curve_offset : 0
				}, obj );

				if( cur.data( connection_data_str ) ){
					destroy.call( cur );
				}

				if( !new_obj.wrapperElement ){
					var svg = document.createElementNS( http_string + "www.w3.org/2000/svg", 'svg' );
					svg.setAttribute( 'width', '100%' );
					svg.setAttribute( 'height', '100%' );

					new_obj.wrapperElement = svg;
					cur.get( 0 ).appendChild( svg );
				}

				cur.data( connection_data_str, new_obj ).addClass( lyteConnectionElement_str ).on( evt_str, mousedown.bind( cur ) );
			}
		}

		function delete_connection( element, id ){
			var $elem = $L( element ),
			exst = $elem.data( connection_elements ) || {},
			data = this.data( connection_data_str ),
			callback = data.onConnectionDisconnect;

			for( var key in exst ){
				var act_key = key.replace( 'src_', '' ).replace( 'target_', '' );

				if( id && id != act_key ){
					continue;
				} 

				var cur = exst[ key ],
				dom = cur.connector,
				src = dom.data( 'src' ).data( connection_elements ),
				target = dom.data( 'target' ).data( connection_elements ),
				con_elem = dom.get( 0 ),
				fastdom = $L.fastdom;

				if( data.connection_type == "elbow" && data.check_break ){
					$L.elbow.arc( con_elem, {}, true );
				}

				delete src[ 'src_' + act_key ];
				delete target[ 'target_' + act_key ];

				[ 'src', 'target', 'active_src', 'active_target' ].forEach( function( item ){
					dom.removeData( item );
				});

				dom.children().off( "mouseenter mouseleave" );

				fastdom.clear( con_elem._measure_fdom );
				fastdom.clear( con_elem._mutate_fdom );

				con_elem.remove(); 

				if( callback ){
					callback.call( this, dom.data() );
				}
			} 

			var keys = Object.keys( exst ).join( '' );
			if( !/src_/.test( keys ) ){
				$elem.removeClass( srcElemClass );
			}

			if( !/target_/.test( keys ) ){
				$elem.removeClass( targetElemClass );
			}
		}

		function adjust_bcr( _module, elem, bcr, scroll, scroll_elem, form_module ){

			if( _module == elem ){
				elem = {
					offsetLeft : 0,
					offsetTop : 0,
					offsetWidth : elem.offsetWidth,
					offsetHeight : elem.offsetHeight
				};
			}

			var group_off = get_group_off( _module ),
			obj = {
				width : elem.offsetWidth,
				height : elem.offsetHeight,
				left : _module.offsetLeft + group_off.left + elem.offsetLeft + scroll.left - ( scroll_elem ? scroll_elem.scrollLeft : 0 ),
				top : _module.offsetTop + group_off.top + elem.offsetTop + scroll.top - ( scroll_elem ? scroll_elem.scrollTop : 0 ),
				scroll : scroll
			};

			if( form_module ){
				$L.extend( true, obj, {
					_width : _module.offsetWidth,
					_height : _module.offsetHeight,
					_left : _module.offsetLeft + group_off.left + scroll.left,
					_top : _module.offsetTop + group_off.top + scroll.top
				});
				// obj._right = obj._left + obj._width;
				// obj._bottom = obj._top + obj._height;
			}

			// obj.right = obj.left + obj.width;
			// obj.bottom = obj.top + obj.height;

			return obj;
		}

		function adjust_position( obj, bcr, element, data ){

			var scroll_query = data.scroll_parent,
			elem = scroll_query ? element.closest( scroll_query ) : void 0,
			_module = element.closest( data.module ),
			x = obj.x,
			y = obj.y,
			avoid_module = data.avoid_with_module;

			if( elem ){
				var _bcr = elem.getBoundingClientRect(),
				top_hid = bcr.bottom < _bcr.top,
				bottom_hid = bcr.top > _bcr.bottom,
				query = top_hid ? data.default_top : data.default_bottom;
				
				if( top_hid || bottom_hid ){
					elem = _module.querySelector( query );
					if( elem ){
						bcr = elem.getBoundingClientRect();
						element = elem;
					}
				}
			}

			bcr = adjust_bcr( _module, element, bcr, data.getScroll(), elem, avoid_module );

			var width = bcr.width,
			height = bcr.height,
			_left = bcr.left,
			_top = bcr.top,
			fn = function( name ){
				if( avoid_module ){
					return bcr[ '_' + name ];
				}
				return bcr[ name ];
			};

			return{
				x : x * width + _left,
				y : y * height +_top,
				pos_x : x * width + ( avoid_module ? ( _left - bcr._left ) : 0 ),
				pos_y : y * height + ( avoid_module ? ( _top - bcr._top ) : 0 ),
				width : fn( "width" ),
				height : fn( "height" ),
				left : fn( "left" ),
				top : fn( "top" ),
				elem : element
			}
		}

		function find_position( bcr1, bcr2, options ){
			var fn = function( _bcr1, _bcr2, _left, _right, _x, obj ){
				var __value = obj[ _x ];
				if( __value != void 0 ){
					return __value;
				}

				var _left1 = _bcr1[ _left ],
				_right1 = _bcr1[ _right ],
				_left2 = _bcr2[ _left ],
				_right2 = _bcr2[ _right ];

				if( _left1 < _left2 || _left1 < _right2 ){
					return 1;
				} else {
					return 0;
				} 

			},
			src_position = options.src_position || {},
			target_position = options.target_position || {},
			src_x = fn( bcr1, bcr2, 'left', 'right', 'x', src_position ),
			src_y = fn( bcr1, bcr2, 'top', 'bottom', 'y', src_position ),
			target_x = fn( bcr2, bcr1, 'left', 'right', 'x', target_position ),
			target_y = fn( bcr2, bcr1, 'top', 'bottom', 'y', target_position );

			return {
				src_position : {
					x : src_x,
					y : src_y
				},
				target_position : {
					x : target_x,
					y : target_y
				}
			};
		} 

		function create( src, target, options ){
			options = options || {};

			$L.fastdom.measure( function(){
				var elem = this.get( 0 ),
				src_elem = $L( src, elem ).get( 0 ),
				target_elem = $L( target, elem ).get( 0 ),
				bcr1 = src_elem.getBoundingClientRect(),
				bcr2 = target_elem.getBoundingClientRect(),
				ret = find_position( bcr1, bcr2, options ),
				src_position = ret.src_position || {},
				target_position = ret.target_position || {},
				data = this.data( connection_data_str ),
				src_obj = adjust_position( src_position, bcr1, src_elem, data ),
				target_obj = adjust_position( target_position, bcr2, target_elem, data ),
				connectShortest = data.connectShortest;
				$L.fastdom.mutate( function(){
					
					var element = createElement.call( this, options.id || '', containerClass + " " + ( options.class || '' ), data, options ),
					$elem = $L( element ),
					$src = $L( src_elem ),
					$target = $L( target_elem );
					data.wrapperElement.appendChild( element );

					$elem.data({
						src : $src.addClass( srcElemClass ),
						target : $target.addClass( targetElemClass ),
						src_position : ( connectShortest ? options.src_position : src_position ) || {},
						target_position : ( connectShortest ? options.target_position : target_position ) || {},
						options : options,
						src_query : src,
						target_query : target,
						active_src : src_obj.elem,
						active_target : target_obj.elem,
						arcs : {},
						vert_arcs : {}
					});

					draw_curve( element, src_obj, target_obj, data );

					var data_fn = function( $_elem ){
						var __data = $_elem.data( connection_elements );
						if( !__data ){
							__data = {};
							$_elem.data( connection_elements, __data );	
						}

						return __data;
					},
					src_data = data_fn( $src ),
					target_data = data_fn( $target ),
					callback = data.onConnectionCreate;

					src_data[ 'src_' + options.id ] = { connector : $elem };
					target_data[ 'target_' + options.id ] = { connector : $elem };

					if( callback ){
						callback.call( this, element, src_elem, target_elem );
					}

				}, this );
			}, this );
		}

		function update( element ){
			var connection = get_connections( element );

			connection.src.concat( connection.target ).forEach( function( item ){
				update_individual_connector.call( this, item );
			}.bind( this ) );
		}

		function update_individual_connector( item ){
			var item_elem = item.get( 0 ),
			fastdom = $L.fastdom;

			if( item.hasClass( 'lyteConnectHiddenElem' ) ){
				return;
			}

			fastdom.clear( item_elem._measure_fdom );

			item_elem._measure_fdom = fastdom.measure( function(){
				delete item_elem._measure_fdom;
				var this_elem = this.get( 0 ),
				data = item.data(),
				src_elem = data.src.get( 0 ),
				bcr1 = src_elem.getBoundingClientRect(),
				target_elem = data.target.get( 0 ),
				bcr2 = target_elem.getBoundingClientRect(),
				ret = find_position( bcr1, bcr2, data ),
				src_position = ret.src_position,
				target_position = ret.target_position,
				_data = this.data( connection_data_str ),
				src_obj = adjust_position( src_position, bcr1, src_elem, _data ),
				target_obj = adjust_position( target_position, bcr2, target_elem, _data );

				data.active_src = src_obj.elem;
				data.active_target = target_obj.elem;

				fastdom.clear( item_elem._mutate_fdom );

				item_elem._mutate_fdom = fastdom.mutate( function(){
					delete item_elem._mutate_fdom;
					draw_curve( item_elem, src_obj, target_obj, _data );
				}, this );

			}, this );
		}

		function get_connections( element ){
			var data = $L( element ).data( connection_elements ) || {},
			src = [],
			target = [];

			for( var key in data ){
				( /src_/.test( key ) ? src : target ).push( data[ key ].connector );
			}

			return {
				src : src,
				target : target
			};
		}

		function is_connected( src, target ){
			var data = $L( src ).data( connection_elements ) || {};

			for( var key in data ){
				if( /src_/.test( key ) ){
					var value = data[ key ].connector,
					_target = value.data( 'target' ).get( 0 );

					if( _target == target ){
						return true;
					}
				}
			}
			return false;
		}

		function getSrc( elem, type ){
			return $L( elem ).data( type || 'src' );
		}

		lytedom.prototype.connection = function( arg1, arg2, arg3, arg4 ){
			if( !this.length ){
				return this;
			}
			switch( arg1 ){
				case 'update' : {
					update.call( this, arg2 );
				}
				break;
				case 'updateConnection' : {
					update_individual_connector.call( this, arg2 );
				}
				break;
				case 'delete' : {
					delete_connection.call( this, arg2, arg3 );
				}
				break;
				case 'destroy' : {
					destroy.call( this );
				}
				break;
				case 'create' : {
					create.call( this, arg2, arg3, arg4 );
				}	
				break;
				case 'getConnections' : {
					return get_connections( arg2 );
				}
				break;
				case 'hasConnected' : {
					return is_connected( arg2, arg3 );
				}
				break;
				case 'getSrc' : {
					return getSrc( arg2 );
				}
				break;
				case 'getTarget' : {
					return getSrc( arg2, 'target' );
				}
				break;
				default : {
					apply_connection.call( this, arg1 );
				}
			}
			return this;
		}
	}
})();