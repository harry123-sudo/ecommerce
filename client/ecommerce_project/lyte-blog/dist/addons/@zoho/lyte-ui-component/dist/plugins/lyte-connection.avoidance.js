;( function(){
	if( window.$L ){

		function draw_line( item ){

		}

		function check_avoidance( points, connections, svg, i, redraw, offset, split, join, splitIndiv, stroke ){

			if( connections.length == 0 || i == 0 || i == points.length - 1 ){
				return;
			}

			var pt1 = points[ i ], 
			pt2 = points[ i + 1 ],
			is_hori = pt1.y == pt2.y,
			x = 'x',
			y = 'y',
			_left = 'left',
			_top = 'top',
			_width = 'width',
			_height = 'height',
			_right = 'right',
			_bottom = 'bottom',
			obj = {},
			inf = Infinity;

			if( !is_hori ){	
				x = 'y';
				y = 'x';
				_left = 'top';
				_right = 'bottom';
				_top = 'left';
				_width = 'height';
				_height = 'width';
				_bottom = "right";
			}
			

			obj[ _left ] = Math.min( pt1[ x ], pt2[ x ] );
			obj[ _right ] = Math.max( pt1[ x ], pt2[ x ] );
			obj[ _top ] = -inf;
			obj[ _bottom ] = inf;
			obj[ _width ] = obj[ _right ] - obj[ _left ];
			obj[ _height ] = Infinity;

			obj._left = [];
			obj._right = [];

			var ranges = [ obj ];
			split( ranges );

			if( is_hori ){
				ranges = join( ranges );
			}

			var exact_range = $L.elbow.find_exact_range( ranges, pt1, "0", true ) || {},
			position = [ exact_range ] ,
			exact_width = exact_range[ _width ];

			if( !exact_width ){
				return;
			}

			exact_range._left = [];
			exact_range._right = [];

			connections.forEach( function( item ){
				if( avoid_with_other( item, position, i, points, is_hori, x, y, _left, _top, _width, _height, splitIndiv ) ){
					var __elem = item.elem;
					if( redraw.indexOf( __elem ) == -1 ){
						redraw.push( __elem );
					}
				}
			});

			if( is_hori ){
				position = join( position, obj.width, stroke, { left : obj.left, right : obj.right, top : pt1.y - stroke, bottom : pt2.y + stroke } );
			}

			var final_ranges = position.filter( function( item ){
				return item[ _width ] == exact_width;
			}),
			new_pos,
			y1 = pt1[ y ] - stroke,
			y2 = pt1[ y ] + stroke,
			diff = Infinity;

			final_ranges.every( function( item ){
				var top_value = item[ _top ],
				bottom_value = item[ _bottom ],
				mid = ( top_value + bottom_value ) / 2;

				if( y1 > top_value && y2 < bottom_value ){
					new_pos = void 0;
					return false;
				} else if( y1 >= bottom_value || ( Math.abs( y1 - bottom_value ) < stroke / 2 ) ) {
					var _new = Math.max( bottom_value - offset, mid ),
					_diff = y1 - _new;
					if( _diff < diff ){
						diff = _diff;
						new_pos = _new;
					}
				} else if( y2 <= top_value || ( Math.abs( y2 - top_value ) < stroke / 2 ) ){
					var _new = Math.min( top_value + offset, mid ), 
					_diff = _new - y2;
					if( _diff < diff ){
						diff = _diff;
						new_pos = _new;
					}	
				}

				return true;
			});

			if( new_pos ){
				pt1[ y ] = pt2[ y ] = new_pos;
			}
		}

		function avoid_with_other( item, position, line_index, points, is_hori, x, y, _left, _top, _width, _height, splitIndiv ){
			var other_pts = item.points,
			stroke = item.stroke,
			len = other_pts.length - 1,
			start = ( other_pts[ 0 ].y == other_pts[ 1 ].y ) == is_hori ? 2 : 1;

			for( var i = start; i < len; i += 2 ){
				if( i + 1 == len ){
					continue;
				}
				var pt1 = other_pts[ i ],
				pt2 = other_pts[ i + 1 ],
				pos = {},
				dim = {};

				pos[ _left ] = Math.min( pt1[ x ], pt2[ x ] );
				pos[ _top ] = pt1[ y ];

				dim[ _width ] = Math.abs( pt1[ x ] - pt2[ x ] );
				dim[ _height ] = stroke;

				splitIndiv( position, {
					position : pos,
					dimension : dim
				} );
			}
		}

		$L.elbow.avoidLine = function( svg, data, ignore ){
			var points,
			connections = Array.from( svg.parentNode.getElementsByClassName( 'lyteConnectionContainer' ) ).map( function( item ){
				var $elem = $L( item ),
				data = $elem.data();

				if( $elem.hasClass( 'lyteConnectHiddenElem' ) ){
					return {};
				}

				return{
					elem : item,
					points : data.absolute_points,
					data : data,
					stroke : 2,
					dom : $elem
				}
			}).filter( function( item ){
				return item.points && ( item.elem == svg ? ( ( points = item.points ) && false ) : true );
			}),
			_len = points.length - 1,
			redraw = [],
			offset = 20,
			stroke = 2;

			for( var i = 0; i < _len; i++ ){
				check_avoidance( points, connections, svg, i, redraw, offset, data.splitRanges, data.join_ranges, data.splitIndiv, stroke );
			}

			if( ignore ){
				return;
			}

			redraw.forEach( function( item ){
				draw_line( item );
			});
		}
	}
})();