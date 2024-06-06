;(function(){
	if( window.$L ){

		/*
			Shape is considered as a rectangle and each face is considered as a quater part of 360 for convenient purpose
			* right face = 0 deg ( +ve )
			* left face = 180 deg ( -ve )
			* top face = 270 deg ( -ve )
			* bottom face = 90 deg ( +ve )
		*/

		function find_angle( _module ){
			var initial_angle = _module.initial_angle;

			if( initial_angle != void 0 ){
				return initial_angle;
			}

			if( _module.elem == void 0 ){
				return "_";
			}

			var width = _module.width,
			height = _module.height,
			pos_x = _module.pos_x,
			pos_y = _module.pos_y,
			fn = function( _x1, _x2, value, ignore ){
				if( _x1 == value ){
					return "1";
				} else if( _x2 == value ){
					return "2";
				} 

				if( ignore ){
					var mid = ( _x1 + _x2 ) * 0.5;

					if( value < mid ){
						return "1";
					}
					return "2";
				}

				return "0";
			},
			x_face = fn( 0, width, pos_x ),
			y_face = fn( 0, height, pos_y ),
			angle;

			if( x_face == "0" && y_face == "0" ){
				x_face = fn( 0, width, pos_x, true );
				y_face = fn( 0, height, pos_y, true );
			}

			switch( x_face ){
				case "1" : {
					angle = 180;
					if( y_face == '2' ){
						angle = 90;
					}
				}
				break;
				case "2" : {
					angle = 0;
					if( y_face == '1' ){
						angle = 270;
					}
				}
				break;
				case "0" : {
					switch( y_face ){
						case "1" : {
							angle = 270;
						}
						break;
						case "2" : {
							angle = 90;
						}
					}
				}
			}
			return angle;
		}

		/*
			Based on the start and end points type of elbow connection will be choosen.
			* angle diff 0, 180 => odd number elbows( three or five way )
			* angle diff 90, 270 => even number elbows( two or four way )
		*/

		function find_elbow_type( start_angle, end_angle, start, end ){
			var undef = void 0;

			if( end.elem == undef ){
				return "3";
			}

			var diff = Math.abs( start_angle - end_angle );

			if( /^(0|180)$/.test( diff ) ){
				if( start_angle == end_angle ){
					var is_hori = /^(0|180)$/.test( start_angle ),
					_height = is_hori ? 'height' : "width",
					y = is_hori ? "y" : "x",
					_top = is_hori ? "top" : "left";

					if( get_diff( _height, y, _top, start, end, true ) ){
						return "3";
					}
					return "5";
				} else{
					switch( start_angle ){
						case 180 : {
							if( start.x >= end.x ){
								return "3";
							} else{
								return "5";
							}
						}
						break;
						case 0 : {
							if( start.x <= end.x ){
								return "3";
							} else{
								return "5";
							}
						}
						break;
						case 90 : {
							if( start.y <= end.y ){
								return "3";
							} else{
								return "5";
							}
						}
						break;
						case 270 : {
							if( start.y >= end.y ){
								return "3";
							} else{
								return "5";
							}
						}
					}
				}
			} else{
				switch( start_angle ){
					case 0 : {
						if( end_angle == 270 ){
							if( start.x > end.x ){
								return "4";
							} else if( start.y <= end.y ){
								return "2";
							}
							return "4";
						} else{
							if( start.x > end.x ){
								return "4";
							} else if( start.y >= end.y ){
								return "2";
							}
							return "4";
						}
					}
					break;
					case 180 : {
						if( end_angle == 270 ){
							if( start.x < end.x ){
								return "4";
							} else if( start.y <= end.y ){
								return "2";
							}
							return "4";
						} else{
							if( start.x < end.x ){
								return "4";
							} else if( start.y >= end.y ){
								return "2";
							}
							return "4";
						}
					}
					break;
					case 270 : {
						if( end_angle ){
							if( start.x < end.x ){
								return "4";
							} else if( start.y >= end.y ){
								return "2";
							}
						} else{
							if( start.x > end.x ){
								return "4";
							} else if( start.y >= end.y ){
								return "2";
							}
						}
						return "4";
					}
					break;
					case 90 : {
						if( end_angle ){
							if( start.x < end.x ){
								return "4";
							} else if( start.y <= end.y ){
								return "2";
							}
						} else{
							if( start.x > end.x ){
								return "4";
							} else if( start.y <= end.y ){
								return "2";
							}
						}
						return "4";
					}
				}
			}
		}

		/* calls corresponding function */

		function find_common_modifier( start_angle, end_angle, start, end, type, ck ){
			var obj = {
				"2" : two_way_modifier,
				"3" : three_way_modifier,
				"4" : four_way_modifier,
				"5" : five_way_modifier
			};

			return obj[ type ]( start, end, ck, start_angle, end_angle );
		}

		/*
			returns path co-ordinate for a two way elbow connector
		*/

		function two_way_modifier( start, end, ck, start_angle ){
			var is_hori = /^(0|180)$/.test( start_angle );

			return [
				{
					x : start.x,
					y : start.y,
					name : "M"
				},
				{
					x : is_hori ? end.x : start.x,
					y : is_hori ? start.y : end.y
				},
				{
					x : end.x,
					y : end.y
				}
			]
		}

		/*
			returns path co-ordinate for a three way elbow connector
		*/

		function three_way_modifier( start, end, ck, start_angle, end_angle, _mid ){
			var is_hori = /^(0|180)$/.test( start_angle ),
			start = { x : start.x, y : start.y, name : "M" },
			end = { x : end.x, y : end.y },
			points = [ start ],
			x = is_hori ? 'x' : "y",
			y = is_hori ? "y" : "x",
			obj1 = {},
			obj2 = {};

			if( start_angle == end_angle ){
				var is_neg = /^(0|90)$/.test( start_angle ), 
				mid = _mid != void 0 ? _mid : Math[ is_neg ? 'max' : 'min' ]( start[ x ], end[ x ] ) + ck * ( is_neg ? 1 : -1 );

				obj2[ x ] = obj1[ x ] = mid;
				obj1[ y ] = start[ y ];
				obj2[ y ] = end[ y ];

			} else{
				var mid = ( start[ x ] + end[ x ] ) * 0.5;

				obj2[ x ] = obj1[ x ] = mid;
				obj1[ y ] = start[ y ];
				obj2[ y ] = end[ y ];
			}

			points.push( obj1, obj2, end );

			return points;
		}

		/*
			returns path co-ordinate for a four way elbow connector
		*/

		function four_way_modifier( start, end, ck, start_angle, end_angle ){
			var is_hori = /^(0|180)$/.test( start_angle ),
			_start = { x : start.x, y : start.y, name : "M" },
			_end = { x : end.x, y : end.y },
			points = [ _start ],
			x = is_hori ? 'x' : "y",
			y = is_hori ? "y" : "x",
			obj1 = {},
			obj2 = {},
			obj3 = {},
			is_neg = /^(0|90)$/.test( start_angle );

			obj1[ y ] = start[ y ];
			obj3[ x ] = end[ x ];

			obj1[ x ] = obj2[ x ] = _start[ x ] + ( is_neg ? 1 : -1 ) * ck;

			obj3[ y ] = obj2[ y ] = _end[ y ] + ( is_neg ? -1 : 1 ) * ck;

			points.push( obj1, obj2, obj3, _end );

			return points;
		}

		/*
			returns path co-ordinate for a five way elbow connector
		*/

		function five_way_modifier( start, end, ck, start_angle, end_angle ){
			var is_hori = /^(0|180)$/.test( start_angle ),
			_start = { x : start.x, y : start.y, name : "M" },
			_end = { x : end.x, y : end.y },
			points = [ _start ],
			x = is_hori ? 'x' : "y",
			y = is_hori ? "y" : "x",
			_top = is_hori ? 'top' : "left",
			height = is_hori ? 'height' : "width",
			obj1 = {},
			obj2 = {},
			obj3 = {},
			obj4 = {},
			height_diff = get_diff( height, y, _top, start, end, start_angle == end_angle ),
			is_neg = /^(0|90)$/.test( start_angle ),
			end_is_neg = /^(0|90)$/.test( end_angle ),
			new_y;

			obj1[ y ] = start[ y ];
			obj2[ x ] = obj1[ x ] = _start[ x ] + ( is_neg ? 1 : -1 ) * ck;
			obj4[ y ] = end[ y ];
			obj3[ x ] = obj4[ x ] = _end[ x ] + ( end_is_neg ? 1 : -1 ) * ck;

			if( height_diff ){
				new_y = height_diff;
			} else{

				var avg = ( start[ y ] + end[ y ] ) * 0.5,
				min_top = Math.min( start[ _top ], end[ _top ] ),
				max_bottom = Math.max( start[ _top ] + start[ height ], end[ _top ] + end[ height ] );

				if( avg - min_top < max_bottom - avg ){
					new_y = min_top - ck;
				} else{
					new_y = max_bottom + ck;
				}
			}

			obj2[ y ] = obj3[ y ] = new_y;

			points.push( obj1, obj2, obj3, obj4, _end );

			return points;
		}

		/*
			returns difference between two shapes
		*/

		function get_diff( height, y, _top, start, end, is_same_angle ){
			var start_y = start[ _top ],
			end_y = end[ _top ],
			start_bottom = start_y + start[ height ],
			end_bottom = end_y + end[ height ],
			value,
			final_pos,
			start_value = start[ y ];

			if( is_same_angle ){
				if( start_value < end_y || start_value > end_bottom ){
					return true;
				}
				return 0;
			} else{
				if( start_y < end_y ){
					value =  end_y - start_bottom;
					final_pos = start_bottom + value * 0.5;
				} else{
					value = start_y - end_bottom;
					final_pos = start_y - value * 0.5;
				}
			}

			if( value < 0 ){
				return 0;
			}

			return final_pos;
		}

		/*
			This function adds corner radius to each way of a elbow connectors
		*/

		function add_radius( modifier, radius ){

			if( !radius ){
				return modifier;
			}

			var len = modifier.length - 1,
			radius_arr = [],
			fn = function( first, second, x, _radius ){
				var is_increase = second[ x ] > first[ x ];

				if( is_increase ){
					second[ x ] -= _radius;
				} else{
					second[ x ] += _radius;
				}
			};

			for( var i = 1; i < len; i++ ){
				var cur = modifier[ i ],
				next = modifier[ i + 1 ],
				prev = modifier[ i - 1 ],
				is_hori = cur.y == prev.y,
				x = is_hori ? 'x' : "y",
				y = is_hori ? 'y' : 'x',
				exp_radius = Math.min( radius, Math.abs( cur[ x ] - prev[ x ] ), Math.abs( cur[ y ] - next[ y ] ) ),
				new_first = $L.extend( {}, cur ),
				new_second = $L.extend( {}, cur );

				new_second.radius = exp_radius;
				new_second.name = "A";

				fn( prev, new_first, x, exp_radius );
				fn( next, new_second, y, exp_radius );

				new_second.neg = find_arc_neg( prev, cur, next, x, y );

				modifier.splice( i++, 1, new_first, new_second );
				len++;
			}

			return modifier;
		}

		/*
			Finds arc direction => clockwise or anticlockwise
		*/

		function find_arc_neg( prev, cur, next, x, y ){
			var inc1 = cur[ x ] > prev[ x ],
			inc2 = next[ y ] > cur[ y ];

			if( x == 'x' ){
				if( inc1 == inc2 ){
					return "1";
				} 
				return "0";
			} else {
				if( inc1 == inc2 ){
					return "0";
				}
				return "1";
			}
		}

		/*
			Creates svg line from elbow line points
		*/

		function draw_line( modifier, radius, ref_x, ref_y, ignore ){
			var str = "";

			if( !ignore ){
				modifier = add_radius( modifier, radius );
			}

			modifier.forEach( function( item ){
				var pre = item.name || "L";

				if( pre == "A" ){
					str += ( "A " + item.radius + ' ' + item.radius + ' 0 0 ' + item.neg + ' ' + ( item.x - ref_x ) + " " + ( item.y - ref_y ) + ' ' );
				} else {
					str += ( pre + " " + ( item.x - ref_x ) + " " + ( item.y - ref_y ) + " " );
				}
			});	

			return str;
		}

		/*
			Position of start / end point in available range ==> for finding break path
		*/

		function find_exact_range( ranges, value, angle, ignore_buff ){
			var x = value.x,
			y = value.y,
			ret,
			buff = ignore_buff ? 0 : ( _lyteUiUtils.getScrollBarWidth() + 5 ),
			is_hori = /^(0|180)$/.test( angle ),
			hori_buff = is_hori ? buff : 0,
			vert_buff = is_hori ? 0 : buff;

			ranges.every( function( item ){
				var _left =  item.left - hori_buff,
				_right = item.right + hori_buff,
				_top = item.top - vert_buff,
				_bottom = item.bottom + vert_buff;

				if( _left <= x && x <= _right && _top <= y && y <= _bottom ){
					ret = item;
					return false;
				}

				return true;
			});

			return ret;
		}

		/*
			We can't find perfect accurate path with minimum ways due to long script running. 
			So unwanted paths are removed in each stage
		*/

		function eliminate_paths( paths, _start, _end, _prev ){
			var len = [],
			limit = 3;

			if( paths.length < limit ){
				return paths;
			}

			paths.forEach( function( item ){

				var _length = item.length - 1,
				sum = 0,
				prev,
				ref_y = ( _start.y + _end.y ) / 2,
				fn = function( value, __item ){
					if( !shares_common( __item, { top : value.y - 1, bottom : value.y + 1 } ) ){
						var val1 = Math.abs( __item.top - value.y ),
						val2 = Math.abs( __item.bottom - value.y );

						if( val1 == val2 && val1 == Infinity ){
							return;
						}

						ref_y = val1 > val2 ? __item.bottom : __item.top;

						sum += Math.min( val1, val2 );
					}
				}

				for( var i = _length; i >= 0; i-- ){
					var cur = item[ i ],
					_width = cur.width;

					if( _width == Infinity ){
						_width = 40;
					}

					sum += _width;

					if( prev ){
						if( i == _length - 1 ){
							fn( _end, cur );
						} else if( i == 0 && !_prev.length ){
							fn( _start, prev );
						} else{
							fn( { y : ref_y }, cur );
						}
					} 
					prev = cur;
				}

				len.push( sum );
			});

			var min = Math.min.apply( Math, len ),
			_length = len.length;

			paths = paths.slice().sort( function( a, b ){
				return len[ paths.indexOf( a ) ] - len[ paths.indexOf( b ) ];
			});

			len.sort( function( a, b ){
				return a - b;
			});

			for( var i = _length - 1; i >= 0 ; i-- ){
				var cur = len[ i ];
				if( cur != min ){
					paths.splice( i, 1 );
					
					len.splice( i, 1 )
					_length--;

					if( _length < limit ){
						break;
					}
				}
			}

			return paths;
		}

		/*
			It will return array of possible paths between start and end ranges
		*/

		function find_range_paths( start_range, end_range, _start, _end, prev, ck, from ){
			if( start_range == end_range ){
				return [ [ start_range ] ];
			}

			var possible_left = prev.slice(),
			possible_right = prev.slice(),
			possible_paths = [],
			index = function( item ){
				return prev.indexOf( item ) == -1;
			},
			is_left_failed = from == "left",
			is_right_failed = from == "right";

			if( !start_range._is_left_failed ){
				start_range._left.forEach( function( item ){
					if( index( item ) ){
						possible_left.push( item );
						
						var item_possible = item._possible_paths,
						ret = item_possible || find_range_paths( item, end_range, _start, _end, possible_left, ck, "left" );

						if( ( ret || [] ).length ){	
							is_left_failed = false;					
							ret.forEach( function( _item ){
								var new_arr = _item.slice();
								new_arr.unshift( start_range );
								possible_paths.push( new_arr );
							});
						}
					}
				});
				start_range._is_left_failed = is_left_failed;
			}

			if( !start_range._is_right_failed ){
				start_range._right.forEach( function( item ){
					if( index( item ) ){
						possible_right.push( item );
						
						var item_possible = item._possible_paths,
						ret = item_possible || find_range_paths( item, end_range, _start, _end, possible_right, ck, "right" );

						if( ( ret || [] ).length ){	
							is_right_failed = false;						
							ret.forEach( function( _item ){
								var new_arr = _item.slice();
								new_arr.unshift( start_range );
								possible_paths.push( new_arr );
							});
						}
					}
				});
				start_range._is_right_failed = is_right_failed;
			}

			var final = eliminate_paths( possible_paths, _start, _end, prev, ck );

			if( final.length == 0 && !index( start_range ) ){
				final = void 0;
			}

			if( is_left_failed && is_right_failed ){
				final = [];
			}

			return start_range._possible_paths = final;
		}

		/* 
			Returns common vertical positions between two points / ranges
		*/

		function common_pt( pt1, pt2 ){
			return {
				top : Math.max( pt1.top, pt2.top ),
				bottom : Math.min( pt1.bottom, pt2.bottom )
			};
		}

		/*
			To check if two points shares common area
		*/

		function shares_common( pt1, pt2 ){
			return !( pt1.top > pt2.bottom || pt1.bottom < pt2.top );
		}

		/*
			It will change range dimension for obtaining straight lines( avoiding multiple ways )
		*/

		function alter_path( path, start_angle, end_angle, start, end, ck ){
			var len = path.length - 1,
			is_start_hori = /^(0|180)$/.test( start_angle ),
			is_end_hori = /^(0|180)$/.test( end_angle ),
			count = 0,
			modify_mode;

			for( var i = 0; i < len; i++ ){
				var cur = path[ i ],
				next = path[ i + 1 ];


				// to prevent modifying same reference multiple times
				cur = {
					left : cur.left,
					right : cur.right,
					top : cur.top,
					bottom : cur.bottom,
					width : cur.width,
					height : cur.height,
					force : cur.force
				};

				path.splice( i, 1, cur );

				if( cur.force ){
					break;
				}

				if( shares_common( cur, next ) ){
					var common = common_pt( cur, next );

					// remove next path and alter current path if next completly consumes current range. need to do

					if( i + 1 == len && !is_end_hori ){
						var next_mid = next.top + next.height / 2;

						if( end_angle == 90 ){
							if( isNaN( next_mid ) ){
								next_mid = Infinity;
							}
							cur.top = Math.min( end.y + ck, next_mid );
						} else {
							if( isNaN( next_mid ) ){
								next_mid = -Infinity;
							}
							cur.top = Math.max( end.y - ck, next_mid );
						}

						cur.top = cur.top - 1;
						cur.height = 2;
						cur.bottom = cur.top + 2;
						break;
					}

					if( i + 1 == len && shares_common( cur, { top : end.y - 1, bottom : end.y + 1 } ) ){
						if( ( cur.top + cur.bottom ) * 0.5 == end.y ){
							continue;
						}
						cur.top = end.y - 1;
						cur.bottom = end.y + 1;
						cur.height = 2;
						i -= ( ++count );
						modify_mode = true;

						cur.force = true;
					} else{
						if( i == 0 && !is_start_hori ){
							continue;
						}
						cur.top = common.top;
						cur.bottom = common.bottom;

						cur.height = cur.bottom - cur.top;

						if( i == 0 && cur.width < 80 && shares_common( cur, { top : start.y - 1, bottom : start.y + 1 } ) ){
							var new_width = Math.min( 80 - cur.width, next.width / 2 );
							cur.width += new_width;

							// if( cur.right == next.left ){
							// 	cur.right += new_width;
							// } else{
							// 	cur.left -= new_width;
							// }
						}
					}

					count++;
				} else{
					count = 0;
				}
			}
		}

		/*
			It will convert range paths to line points
		*/

		function convert_path_to_line( path, start, end, start_angle, end_angle, ck, type ){

			alter_path( path, start_angle, end_angle, start, end, ck );

			var len = path.length,
			start_pt = { x : start.x, y : start.y, name : "M" },
			end_pt = { x : end.x, y : end.y },
			paths = [],
			ref = start_pt,
			ref_angle = start_angle,
			angle_diff = Math.abs( start_angle - end_angle );

			if( len == 1 ){
				return find_common_modifier( start_angle, end_angle, start, end, type, ck );
			} else if( len == 2 ){
				if( angle_diff == 0 ){
					return find_common_modifier( start_angle, end_angle, start, end, type, ck );
				}
			}

			for( var i = 0; i < len; i++ ){
				var end_angle,
				next = path[ i + 1 ],
				cur = path[ i ],
				_end_angle,
				new_pt = {},
				_points,
				new_pt,
				__ck = Math.min( ck, cur.width / 2 );

				if( next ){
					is_right = cur.right == next.left;
					var cur_top = cur.top,
					cur_bottom = cur.bottom,
					cur_height = cur.height;

					if( !/(90|270)/.test( ref_angle ) && shares_common( cur, { top : ref.y - 1, bottom : ref.y + 1 } ) ){
						new_pt.y = ref.y;
					} else {
						var next_mid = next.top + next.height * 0.5,
						next_top = next.top + ck,
						next_bottom = next.bottom - ck;

						if( cur_top == -Infinity ){
							if( cur_bottom == Infinity ){
								new_pt.y = ref.y;
							} else{
								// new_pt.y = Math.max( cur_bottom - ck, next_mid, next_bottom );
								new_pt.y = cur.bottom - ck;
							}
						} else{
							if( cur_bottom == Infinity ){
								// new_pt.y = Math.min( cur_top + ck, next_mid, next_top );
								new_pt.y = cur_top + ck;
							} else{
								var __mid = cur.top + cur.height * 0.5,
								top_mid = cur.top + ck,
								bottom_mid = cur.bottom - ck;

								new_pt.y = ref.y <= cur.top ? Math.min( __mid, top_mid ) : Math.max( __mid, bottom_mid );
							} 
						}
					}
					new_pt.x = is_right ? cur.right : cur.left;
					_end_angle = is_right ? 180 : 0;
				} else{
					new_pt = end_pt;
					_end_angle = end_angle;
				}

				angle_diff = Math.abs( ref_angle - _end_angle );

				if( /^(0|180)$/.test( angle_diff ) ){
					_points = three_way_modifier( ref, new_pt, ck, ref_angle, _end_angle, ref.x + ( /^(0|90)$/.test( ref_angle ) ? __ck : -__ck ) );
				} else{
					_points = two_way_modifier( ref, new_pt, __ck, ref_angle );
				}

				if( i != 0 ){
					delete _points[ 0 ].name;
				}

				paths.push.apply( paths, _points );

				ref = new_pt;
				ref_angle = is_right ? 0 : 180;				
			}

			return remove_duplicate( paths );
		}

		/* 
			It will reduce path string length
		 */

		function remove_duplicate( paths ){
			var len = paths.length - 2,
			__length = 0;

			for( var i = 0; i < len; i++ ){
				var cur = paths[ i ],
				next = paths[ i + 1 ],
				next_after = paths[ i + 2 ],
				is_hori = cur.y == next.y,
				is_hori_next = next.y == next_after.y,
				x = is_hori ? "x" : "y";

				if( is_hori == is_hori_next ){
					next[ x ] = next_after[ x ];
					len--;
					paths.splice( i-- + 2, 1 );
				} else{
					__length += Math.abs( cur[ x ] - next[ x ] );
				}
			}

			var $arr = $L( paths ),
			last = $arr.get( -1 ),
			last_before = $arr.get( -2 );

			__length += Math.abs( last.x - last_before.x + last.y - last_before.y );

			paths.__length = __length;

			return paths;
		}

		/*
			It will return best path points from possible paths
		*/

		function break_line( start_angle, end_angle, start, end, type, ck, ranges ){

			var fn = function(){
				return find_common_modifier( start_angle, end_angle, start, end, type, ck );
			};

			if( ranges.length == 1 ){
				return fn();
			}

			var start_range = find_exact_range( ranges, start, start_angle ),
			end_range = find_exact_range( ranges, end, end_angle );

			if( !start_range || !end_range ){
				console.warn( "ranges not present start_range - " + start_range + " end_range - " + end_range );
				return fn();
			}

			var  paths = find_range_paths( start_range, end_range, start, end, [ start_range ], ck );

			if( ( paths || [] ).length ){
				var arr = [],
				min_len = Infinity;

				paths.forEach( function( item ){
					var converted = convert_path_to_line( item, start, end, start_angle, end_angle, ck, type );
					arr.push( converted );

					min_len = Math.min( converted.length, min_len );
				});

				return arr.filter( function( item ){
					return item.length == min_len;
				}).sort( function( a, b ){
					return a.__length - b.__length;
				})[ 0 ];

			} else{
				return fn();
			}
		}

		function adjust_edge( obj ){
			var x = obj.x,
			y = obj.y,
			_left = obj.left;

			if( _left == void 0 ){
				return{
					x : 0,
					y : 0
				};
			}

			var _top = obj.top,
			_right = _left + obj.width,
			_bottom = _top + obj.height,
			mid_x = _left + obj.width / 2,
			mid_y = _top + obj.height / 2,
			ret = {
				x : 0,
				y : 0
			},
			hori_diff = Math.min( Math.abs( _left - x ), Math.abs( _right - x ) ),
			vert_diff = Math.min( Math.abs( _top - y ), Math.abs( _bottom - y ) );

			if( vert_diff > hori_diff ){
				if( x > mid_x ){
					ret.x = x - ( obj.x = _right );
				} else {
					ret.x = x - ( obj.x = _left );
				}
				obj.pos_x -= ret.x;
			} else {
				if( y > mid_y ){
					ret.y = y - ( obj.y = _bottom );
				} else {
					ret.y = y - ( obj.y = _top );
				}
				obj.pos_y -= ret.y;
			}

			return ret;
		}

		$L.elbow = function( svg, start, end, data, ignore ){
			var $svg = $L( svg ),
			start_adjust = adjust_edge( start ),
			end_adjust = adjust_edge( end ),
			start_adj_x = start_adjust.x,
			start_adj_y = start_adjust.y,
			end_adj_x = end_adjust.x,
			end_adj_y = end_adjust.y,
			offset = data.offset,
			off_x1 = offset.left,
			off_y1 = offset.top,
			off_x2 = offset.right,
			off_y2 = offset.bottom,
			start_x = Math.min( start.x + start_adj_x, end.x + end_adj_x ),
			start_y = Math.min( start.y + start_adj_y, end.y + end_adj_y ),
			end_x = Math.max( start.x + start_adj_x, end.x + end_adj_x ),
			end_y = Math.max( start.y + start_adj_y, end.y + end_adj_y ),
			ref_x = start_x - off_x1,
			ref_y = start_y - off_y1,
			modifier,
			type,
			ck = 40,
			start_angle = find_angle( start ),
			end_angle = find_angle( end ),
			radius = data.connector_radius,
			allow_break = data.check_break && !data.ignore_break;

			type = find_elbow_type( start_angle, end_angle, start, end );

			if( allow_break ){
				modifier = break_line( start_angle, end_angle, start, end, type, ck, data.getRanges() );
			} else{
				modifier = find_common_modifier( start_angle, end_angle, start, end, type, ck );
			}

			var first = modifier[ 0 ],
			last = $L( modifier ).get( - 1 );

			first.x += start_adj_x;
			first.y += start_adj_y;

			last.x += end_adj_x;
			last.y += end_adj_y;

			$svg.data({
				absolute_points : allow_break ? $L.extend( true, [], modifier ) : void 0,
				ref_x : ref_x,
				ref_y : ref_y,
				radius : radius
			});

			if( ignore ){
				return;
			}

			return draw_line( modifier, radius, ref_x, ref_y ).trim();
		};

		$L.elbow.draw_line = draw_line;
		$L.elbow.add_radius = add_radius;
		$L.elbow.find_exact_range = find_exact_range;
	}
})();