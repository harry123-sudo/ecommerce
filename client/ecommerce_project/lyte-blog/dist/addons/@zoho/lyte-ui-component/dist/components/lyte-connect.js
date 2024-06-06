/*
	Todo
	* rtl support ( ? )
	* keyboard navigation ( ? )
*/


Lyte.Component.register("lyte-connect", {
_template:"<template tag-name=\"lyte-connect\" onmousedown=\"{{action('mousedown',event)}}\" ontouchstart=\"{{action('mousedown',event)}}\" onscroll=\"{{action('scroll',event)}}\" onkeydown=\"{{action('keydown',event)}}\" tabindex=\"0\"> <div class=\"lyteConnectWrapper\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{item.children}}\"><template case=\"true\"> <lyte-connect-item id=\"{{ltPropIdPrefix}}{{item.id}}\" class=\"lyteConnectGroupShape {{item.class}}\" data-index=\"{{index}}\" lt-prop-item=\"{{details[item.id]}}\" style=\"{{construct_style(item.position)}}\"> <template is=\"for\" items=\"{{item.children}}\" item=\"_item\" index=\"_index\"> <lyte-connect-item id=\"{{ltPropIdPrefix}}{{_item.id}}\" class=\"lyteConnectInnerItem {{_item.class}}\" data-index=\"{{_index}}\" style=\"{{construct_style(_item.position)}}\" onmouseenter=\"{{action('mouseenter',this,event)}}\" onmouseleave=\"{{action('mouseleave',this,event)}}\" lt-prop-item=\"{{details[_item.id]}}\"> <lyte-yield yield-name=\"connection\" connection=\"{{_item}}\"></lyte-yield> </lyte-connect-item> </template> </lyte-connect-item> </template><template case=\"false\"> <lyte-connect-item id=\"{{ltPropIdPrefix}}{{item.id}}\" class=\"{{item.class}}\" data-index=\"{{index}}\" style=\"{{construct_style(item.position)}}\" onmouseenter=\"{{action('mouseenter',this,event)}}\" onmouseleave=\"{{action('mouseleave',this,event)}}\" lt-prop-item=\"{{details[item.id]}}\"> <lyte-yield yield-name=\"connection\" connection=\"{{item}}\"></lyte-yield> </lyte-connect-item> </template></template></template> <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"lyteConnectionMarker\" width=\"{{ltPropWidth}}\" height=\"{{ltPropHeight}}\" viewBox=\"{{viewBox}}\" style=\"{{styleValue}}\"> <defs> <marker id=\"lyteConnectionTailMarker\" markerUnits=\"strokeWidth\" markerWidth=\"12\" markerHeight=\"12\" refX=\"12\" refY=\"6\" orient=\"auto\"> <path d=\"M 12 6 L 6 6 12 0 M 6 6 L 12 12\" stroke=\"green\" fill=\"white\"></path> <ellipse cx=\"6\" cy=\"6\" rx=\"2\" ry=\"2\" fill=\"white\" stroke=\"green\"></ellipse> </marker> </defs> </svg> <template is=\"if\" value=\"{{ltPropSmartGuide}}\"><template case=\"true\"> <div class=\"lyteSmartGuides lyteConnectHorizontal lyteConnectHiddenElem\"></div> <div class=\"lyteSmartGuides lyteConnectVertical lyteConnectHiddenElem\"></div> </template></template> </div> <template is=\"if\" value=\"{{ltPropPreview}}\"><template case=\"true\"> <lyte-wormhole class=\"lyteConnectWormhole\" lt-prop-query=\"{{ltPropQuery}}\" on-before-append=\"{{method('wormhole')}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteConnectPreview\" onmousedown=\"{{action('preview_down',event)}}\" ontouchstart=\"{{action('preview_down',event)}}\" onclick=\"{{action('preview_click',event)}}\"> <svg class=\"lytePreviewSvg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 1848 606\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"> <foreignObject class=\"lytePreviewForeignObject\" width=\"100%\" height=\"100%\"> <template is=\"forIn\" object=\"{{details}}\" value=\"value\" key=\"key\"> <div id=\"preview_{{key}}\" class=\"lytePreviewElement {{value.data.class}}\" style=\"{{construct_style(value.position)}}\"> <template is=\"if\" value=\"{{expHandlers(value.data.type,'==',&quot;groupshape&quot;)}}\"><template case=\"true\"><template is=\"forIn\" object=\"{{value.children}}\" value=\"_value\" key=\"_key\"> <div id=\"preview_{{_key}}\" class=\"lytePreviewElement lyteChildPreview\" style=\"{{construct_style(_value.position)}}\"> <lyte-yield yield-name=\"preview\" data=\"{{_value.data}}\" module_id=\"{{_key}}\"></lyte-yield> </div> </template></template><template case=\"false\"> <lyte-yield yield-name=\"preview\" data=\"{{value.data}}\" module_id=\"{{key}}\"></lyte-yield> </template></template> </div> </template> </foreignObject> </svg> <div class=\"lyteConnectOverlay\"></div> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"construct_style","args":["item.position"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"construct_style","args":["_item.position"]}}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"construct_style","args":["item.position"]}}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","dynamicValue":"styleValue"}}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"forIn","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"construct_style","args":["value.position"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"forIn","position":[0],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"construct_style","args":["_value.position"]}}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropData","ltPropScrollLeft","ltPropScrollTop","ltPropScale","ltPropMinScale","ltPropMaxScale","ltPropWheelZoom","ltPropZoomControl","ltPropScrollHandling","ltPropOffset","ltPropMinDiff","ltPropWidth","ltPropHeight","ltPropPreview","ltPropQuery","ltPropOverlapCheck","ltPropIgnoreOverlapOnContextual","ltPropContextualZoom","ltPropContextualZoomLevel","ltPropContextualWheel","ltPropContextualBreakPoints","ltPropContextualZoomData","ltPropSelectMode","ltPropGroupArrange","ltPropLazyLoading","ltPropUndo","ltPropQueueLength","ltPropUpdateTime","ltPropSelectors","ltPropIdPrefix","ltPropConnectionType","ltPropConnectorRadius","ltPropAvoidWithModule","ltPropCheckLineBreak","ltPropElbowArc","ltPropCurveOffset","ltPropAvoidLine","ltPropArrangeType","ltPropArrangeOffset","ltPropDownwardPosition","ltPropSmartGuide","viewBox","styleValue","undoQueue","_undoQueue","redoQueue","details"],
	data : function(){
		return {

			/* Basic data */
			ltPropData : Lyte.attr( 'array', { default : [] } ),

			/* Scroll properties - here scroll means transform */

			ltPropScrollLeft : Lyte.attr( 'number', { default : 0 } ),
			ltPropScrollTop : Lyte.attr( 'number', { default : 0 } ),

			/* Scale zoom properties */

			ltPropScale : Lyte.attr( 'number', { default : 1 } ),
			ltPropMinScale : Lyte.attr( 'number', { default : 0.001 } ),
			ltPropMaxScale : Lyte.attr( 'number', { default : 1 } ),
			ltPropWheelZoom : Lyte.attr( 'boolean', { default : true } ),
			ltPropZoomControl : Lyte.attr( 'object', { default : { ctrlKey : true, metaKey : true } } ),
			ltPropScrollHandling : Lyte.attr( 'boolean', { default : true } ),
			// ltPropWheelDragControl : Lyte.attr( 'object', { default : { shiftKey : true } } ),

			/* Arrange offset */

			ltPropOffset : Lyte.attr( 'number', { default : 40 } ),
			ltPropMinDiff : Lyte.attr( 'number', { default : 40 } ),

			/*  SVG dimension. Change if number of connectors occupies more area*/

			ltPropWidth : Lyte.attr( 'number', { default : 200000 } ),
			ltPropHeight : Lyte.attr( 'number', { default : 200000 } ),

			/* Enables preview */

			ltPropPreview : Lyte.attr( 'boolean', { default : true } ),
			ltPropQuery : Lyte.attr( 'string' ),

			ltPropOverlapCheck : Lyte.attr( 'boolean', { default : true } ),
			ltPropIgnoreOverlapOnContextual : Lyte.attr( 'boolean', { default : false } ),

			/* Contextual zoom property. Either wheel zoom or contextual zoom can present at the same time*/

			ltPropContextualZoom : Lyte.attr( 'boolean', { default : true } ),
			ltPropContextualZoomLevel : Lyte.attr( 'number', { default : 100 } ),
			ltPropContextualWheel : Lyte.attr( 'boolean', { default : false } ),
			ltPropContextualBreakPoints : Lyte.attr( 'array', { default : [ 100, 75, 50, 25, 0 ] } ),
			ltPropContextualZoomData : Lyte.attr( 'object', { default : {
				90 : {
					left : 80,
					top : 80
				},
				80 : {
					left : 80,
					top : 80
				},
				70 : {
					left : 80,
					top : 80
				},
				60 : {
					left : 80,
					top : 80
				},
				50 : {
					left : 80,
					top : 80
				},
				40 : {
					left : 80,
					top : 80
				},
				30 : {
					left : 80,
					top : 80
				},
				20 : {
					left : 80,
					top : 80
				},
				10 : {
					left : 100,
					top : 100
				},
				0 : {
					left : 100,
					top : 100
				}
			} } ),

			ltPropSelectMode : Lyte.attr( 'boolean', { default : false } ),

			/* To adjust inner children position of a group shape*/
			
			ltPropGroupArrange : Lyte.attr( 'boolean', { default : false } ),

			ltPropLazyLoading : Lyte.attr( 'number', { default : 15 } ),

			ltPropUndo : Lyte.attr( 'boolean', { default : false } ),
			ltPropQueueLength : Lyte.attr( 'number', { default : 50 } ),
			ltPropUpdateTime : Lyte.attr( 'number', { default : 250 } ),

			ltPropSelectors : Lyte.attr( 'object', { default : {
				selector : "lyte-connection-footer,.lyteConnectAnchorPoint",
				markerEnd : "url(#lyteConnectionTailMarker)",
				markerStart : ""
			} } ),

			ltPropIdPrefix : Lyte.attr( 'string', { default : "" } ),

			/* Elbow connector properties */

			ltPropConnectionType : Lyte.attr( "string", { default : "curve" } ),
			ltPropConnectorRadius : Lyte.attr( 'number', { default : 5 } ),
			ltPropAvoidWithModule : Lyte.attr( 'boolean', { default : false } ),
			ltPropCheckLineBreak : Lyte.attr( "boolean", { default : false } ),
			ltPropElbowArc : Lyte.attr( "boolean", { default : false } ),
			ltPropCurveOffset : Lyte.attr( 'number', { default : 0 } ),
			ltPropAvoidLine : Lyte.attr( 'boolean', { default : false } ),


			ltPropArrangeType : Lyte.attr( 'string', { default : "default" } ),

			/* experimental props */
			ltPropArrangeOffset : Lyte.attr( 'number', { default : 0 } ),
			ltPropDownwardPosition : Lyte.attr( 'boolean', { default : false } ),
			/* experimental props */


			ltPropSmartGuide : Lyte.attr( 'boolean', { default : false } ),

			/* System data */

			viewBox : Lyte.attr( 'string', { default : '' } ),
			styleValue : Lyte.attr( 'string', { default : '' } ),

			undoQueue : Lyte.attr( 'array', { default : [] } ),
			_undoQueue : Lyte.attr( 'array', { default : [] } ),
			redoQueue : Lyte.attr( 'array', { default : [] } ),

			details : Lyte.attr( 'object', { default : {} } )
		}		
	},

	/* rendering a particular element which is not rendered in dom due to lazy loading. it returns a promise */

	render_module : function( module_data, parent_id, group_id ){
		var _this = this,
		details = this.data.details;

		if( group_id ){
			details = details[ group_id ].children;
		}

		var data = details[ parent_id ].data,
		fields = data.fields,
		index = typeof module_data == 'string' ? fields.findIndex( function( item ){
			return item.id == module_data;
		}) : fields.indexOf( module_data ),
		renderData = data.renderData;

		return new Promise( function( res ){
			if( index == -1 || index < renderData.length ){
				res();
			} else {
				_this.push_data_in_raf( renderData, fields, _this.get_element( parent_id, group_id ), index - renderData.length + 1, res )
			}
		});
	},

	/* Rendering a data in single shot in lazy loading causing frame loss. so rendering minimum data in RAF*/

	push_data_in_raf : function( renderData, fields, elem, ext_count, cb ){

		elem._frame_running = true;

		var len = renderData.length,
		cut_len = Math.min( len + ( ext_count || this.data.ltPropLazyLoading ), fields.length ),
		new_arr = fields.slice( len, cut_len ),
		__count = cut_len - len,
		raf = 'requestAnimationFrame',

		fn = function( count ){
			if( count > __count ){
				delete elem._frame_running;
				this.reroute_connectors( elem, new_arr, __count );
				this.add_more_data( elem );

				if( cb ){
					cb();
				}
				return;
			}
			Lyte.arrayUtils( renderData, 'push', new_arr.slice( count, count += 2 ) );
			window[ raf ]( fn.bind( this, count ) );
		};

		window[ raf ]( fn.bind( this, 0 ) );
	},

	/* For initial lazy load footer element will act as src / target element. After rendering original element connectors are drawn to its original elements*/

	reroute_connectors : function( elem, arr, count ){
		var modules = $L( elem.getElementsByTagName( 'lyte-connection-module' ) ),
		footer_elem = $L( this.data.ltPropSelectors.selector, elem ),
		footer_data = footer_elem.data( 'connection_elements' ) || {},
		list = [];

		for( var i = 0; i <= count; i++ ){
			var cur = modules.get( -1 - i );
			this.check_reroute( footer_data, cur, list, footer_elem );
		}

		this.update_position( void 0, void 0, list );
	},

	/* Changing element for a single connector*/

	check_reroute : function( footer_data, cur, list, footer_elem ){

		var src_class = 'lyteConnectionSrcElement',
		target_class = 'lyteConnectionTargetElement',
		contain_src,
		contain_target,
		connection_elements = "connection_elements";

		for( var key in footer_data ){
			var value = footer_data[ key ].connector,
			is_src = /^src_/i.test( key ),
			query = value.data( ( is_src ? 'src' : 'target' ) + '_query' );
			
			if( cur.matches( query ) ){ 
				var $elem = $L( cur ),
				ns = is_src ? 'src' : 'target',
				elem_data = $elem.data( connection_elements ),
				index = list.indexOf( cur );

				if( !elem_data ){
					$elem.data( connection_elements, elem_data = {} );
				}

				elem_data[ key ] = {
					connector : value
				};

				$elem.addClass( is_src ? src_class : target_class );

				value.data( ns, $elem );
				delete footer_data[ key ];

				if( index == -1 ){
					list.push( cur );
				}
			} else {
				if( is_src ){
					contain_src = true;
				} else {
					contain_target = true;
				}
				continue;
			}
		}

		if( !contain_src ){
			footer_elem.removeClass( src_class );
		}

		if( !contain_target ){
			footer_elem.removeClass( target_class );
		}
	},

	/* Checking scroll end*/

	add_more_data : function( elem ){

		if( this.data.ltPropLazyLoading == void 0 || elem._frame_running ){
			return true;
		}

		var prefix = this.data.ltPropIdPrefix, 
		id = elem.id.replace( prefix, '' ),
		is_nested = $L( elem ).hasClass( 'lyteConnectInnerItem' ),
		details,
		__details = this.data.details;

		if( is_nested ){
		   __details = __details[ elem.parentNode.id.replace( prefix, '' ) ].children;
		} 

		details = __details[ id ].data;

		var scroll_elem = elem.getElementsByTagName( 'lyte-connection-content' )[ 0 ],
		renderData = details.renderData,
		fields = details.fields;

		if( renderData.length == fields.length ){
			return true;
		}

		if( scroll_elem ){
			var sH = scroll_elem.scrollHeight,
			oH = scroll_elem.offsetHeight,
			sT = scroll_elem.scrollTop;

			if( sT + oH + 10 > sH ){
				this.push_data_in_raf( renderData, fields, elem );
				return false;
			}
		}

		return true;
	},

	/* constructing rendering elements for lazyloading */

	construct_lazy : function( item ){
		var children = item.children;
	
		if( children ){
			children.forEach( this.construct_lazy.bind( this ) );
		} else {
			Lyte.objectUtils( item, 'add', 'renderData', item.fields.slice( 0, this.data.ltPropLazyLoading ) );
		}
	},

	/* Finding elements not having positions and constructing lazy loading details*/

	data_obs : function(){
		var data = this.data.ltPropData,
		modules_without_position = {};

		data.forEach( function( item ){
			this.construct_lazy( item );
			var pos = item.position;
			if( !pos || Object.keys( pos ).length == 0 ){
				modules_without_position[ item.id ] = true;
			}
		}.bind( this ));

		this._position_find = modules_without_position;

	}.observes( 'ltPropData' ).on( 'init' ),

	/* Updating svg viewbox*/

	view_obs : function(){
		clearTimeout( this._viewtime );
		this._viewtime = setTimeout( this._view_obs.bind( this ), 0 );
	}.observes( 'ltPropBoundary' ),

	_view_obs : function(){
		var data = this.data,
		boundary = data.ltPropBoundary,
		_left = Math.min( 0, boundary.left ),
		_top = Math.min( 0, boundary.top );

		this.setData( 'viewBox', _left + ' ' + _top + ' ' + data.ltPropWidth + ' ' + data.ltPropHeight );
		this.setData( 'styleValue', "left:" + _left + 'px;top:' + _top + 'px' );

		if( this.__preview_grp ){
			this.setup_viewbox();
		}
	},

	/* Updating view box in every shape move*/

	update_viewbox : function(){
		var details = this.data.details,
		min_x = Infinity,
		min_y = min_x,
		boundary = this.data.ltPropBoundary;

		for( var key in details ){
			var cur = details[ key ].position;

			min_x = Math.min( cur.left, min_x );
			min_y = Math.min( cur.top, min_y );
		}

		boundary.left = min_x;
		boundary.top = min_y;

		this._view_obs();
	},

	__update_fn : function( cb, arg ){
		this.setTranslate();
		this.getMethods( cb ) && this.executeMethod( cb, arg, this.$node );
	},

	scroll_obs : function( arg ){
		this.__update_fn( 'onScroll', arg );
	}.observes( 'ltPropScrollTop', 'ltPropScrollLeft' ),

	zoom_obs : function( arg ){
		this.__update_fn( 'onZoom', arg );
		clearTimeout( this.__zoomtime );
		this.__zoomtime = setTimeout( this._boundary.bind( this, true ), 20 );
	}.observes( 'ltPropScale' ),

	setTranslate : function(){
		clearTimeout( this._transtime );
		this._transtime = setTimeout( this._setTranslate.bind( this ), 0 );
	},

	_setTranslate : function(){
		var data = this.data,
		sL = data.ltPropScrollLeft,
		sT = data.ltPropScrollTop,
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale;

		$L( this.__wrapper ).css({
			transform : "translate(" + sL + 'px,' + sT + 'px) scale(' + scale + ',' + scale + ')'
		});

		this.setup_viewbox();
	},

	didDestroy : function(){
		var _remove = "removeEventListener",
		fdom = this.___fdom;

		document[ _remove ]( 'click', this._click );

		if( fdom ){
			$L.fastdom.clear( fdom );
			delete this.___fdom;
		}

		delete this._click;
		delete this.__wrapper;
		delete this._horismart;
		delete this._vertsmart;
		if( this._preview ){
			this.__wormhole.remove();
			delete this._preview;
			delete this.__preview_grp;
			delete this.__wormhole;
			window[ _remove ]( 'resize', this._resize, true );
			window[ _remove ]( 'orientationchange', this._resize, true );
			clearTimeout( this._resize_time );
			delete this._resize;
		}
	},

	/* Zooms to given scale wrt given origin*/

	zoom_to : function( __scale, origin ){
		var data = this.data;
		if( data.ltPropContextualWheel ){
			return this.contextual_zoom_wheel( __scale, origin )
		}
		var elem = this.__wrapper,
		width = elem.offsetWidth * 0.01,
		height = elem.offsetHeight * 0.01,
		bcr = elem.getBoundingClientRect(),
		this_bcr = this.$node.getBoundingClientRect(),
		sl = 'ltPropScale',
		sL = 'ltPropScrollLeft',
		sT = 'ltPropScrollTop',
		new_scale = Math.max( data.ltPropMinScale, Math.min( __scale, data.ltPropMaxScale ) ),
		scale = data[ sl ],
		origin_x = origin == void 0 ? ( this_bcr.left + this_bcr.width * 0.5 ) : origin.left,
		origin_y = origin == void 0 ? ( this_bcr.top + this_bcr.height * 0.5 ) : origin.top,
		trans_origin = elem.style.transformOrigin,
		match = trans_origin.match( /(.+)% (.+)%/ ) || [ null, 50, 50 ],
		mid_x = parseFloat( match[ 1 ] ),
		mid_y = parseFloat( match[ 2 ] ),
		new_x = ( origin_x - bcr.left ) / bcr.width * 100,
		new_y = ( origin_y - bcr.top ) / bcr.height * 100;

		elem.style.transformOrigin = new_x + '% ' + new_y + '%';

		this.setData( sl, new_scale );
		this.setData( sL, data[ sL ] + ( scale - 1 ) * width * ( new_x - mid_x ) );
		this.setData( sT, data[ sT ] + ( scale - 1 ) * height * ( new_y - mid_y ) ); 
	},

	scroll_to : function( sL, sT ){
		this.setData( {
			ltPropScrollLeft : sL,
			ltPropScrollTop : sT
		});
	},

	click : function( evt ){

		if( this.__ignoreclick ){
			return;
		}

		var is_shift = evt.shiftKey,
		target = evt.target,
		elem = target.closest( 'lyte-connect-item' ),
		cls_name = "lyteConnectSelection";

		if( !is_shift ){
			$L( '.' + cls_name, this.$node ).removeClass( cls_name );

			if( this.$node.contains( target ) ){
				this.resetSelected();
			}
		}

		if( elem ){
			$L( elem ).addClass( cls_name );
		}	
	},

	/* Zoom by wheel*/

	wheel_zoom : function( evt ){

		if( $L( this.$node ).data( 'transition' ) ){
			evt.preventDefault();
			return;
		}

		var deltaX = evt.deltaX,
		deltaY = evt.deltaY,
		data = this.data,
		obj = data.ltPropZoomControl,
		// drag_ctrl = data.ltPropWheelDragControl,
		fn = function( key, _obj ){
			return !!_obj[ key ] == evt[ key ];
		},
		allow = ( fn( 'metaKey', obj ) || fn( 'ctrlKey', obj ) ) && fn( 'shiftKey', obj ) && fn( 'altKey', obj ),
		// allow_drag = ( fn( 'metaKey', drag_ctrl ) || fn( 'ctrlKey', drag_ctrl ) ) && fn( 'shiftKey', drag_ctrl ) && fn( 'altKey', drag_ctrl ),
		scale = data.ltPropScale,
		is_contextual = data.ltPropContextualWheel,
		should_prevent,
		seed_pinch = is_contextual ? 0.001 : 0.01,
		abs_x = Math.abs( deltaX ),
		abs_y = Math.abs( deltaY );

		if( is_contextual && scale < 0.2 ){
			seed_pinch = 0.01;
		}

		if( allow ){
			/* Basic concept taken from pinch zoom of zoho show */
			if( abs_x < abs_y ){

				var sign = deltaY > 0;

				if( abs_y > 120 ){
					if( sign ){
						deltaY = 120;
					} else{
						deltaY = -120;
					}
				}

				var delta = -deltaY * ( evt.deltaMode ? 120 : 1 ),
				newScale = Math.pow( 2, delta * seed_pinch ) * scale;

				this.zoom_to( newScale, { left : evt.clientX, top : evt.clientY } );
			}
			should_prevent = true;
		} else {
			var boundary = data.ltPropBoundary;

			if( evt.shiftKey ){
				if( abs_x < abs_y ){
					abs_x = abs_y;
					abs_y = 0;
					deltaX = deltaY;
				} else{
					abs_x = abs_y = 0;
				}
			}

			if( abs_x > abs_y ){
				var sl_str = "ltPropScrollLeft";
				this.setData( sl_str, Math.min( Math.max( data[ sl_str ] - deltaX, boundary.min_x ), boundary.max_x ) );
			} else {
				var st_str = "ltPropScrollTop",
				scroll_parent = evt.target.closest( 'lyte-connection-content' );

				if( scroll_parent ){
					var sH = scroll_parent.scrollHeight,
					oH = scroll_parent.offsetHeight,
					sT = scroll_parent.scrollTop,
					allow = deltaY > 0;

					if( !data.ltPropScrollHandling ){
						return;
					}

					if( allow && data.ltPropLazyLoading ){
						var act_elem = scroll_parent.closest( 'lyte-connect-item' ),
						parent = $L( act_elem ).hasClass( 'lyteConnectInnerItem' ) ? act_elem.closest( '.lyteConnectGroupShape' ) : void 0,
						details = data.details,
						act_data,
						replace_id = data.ltPropIdPrefix,
						child_id = act_elem.id.replace( replace_id, "" );

						if( parent ){
							act_data = details[ parent.id.replace( replace_id, "" ) ].children;
						} else{
							act_data = details;
						}

						act_data = act_data[ child_id ].data;

						allow = act_data.fields.length == act_data.renderData.length;
					}

					if( !( ( sT == 0 && deltaY < 0 ) || ( sT + oH == sH && allow ) ) ){
						return;
					}
				}

				this.setData( st_str, Math.min( Math.max( data[ st_str ] - deltaY, boundary.min_y ), boundary.max_y ) );
			}
			should_prevent = true;
		}

		if( should_prevent ){
			evt.preventDefault();
		}
		
	},

	didConnect : function(){

		var $node = $L( this.$node ),
		node = this.$node,
		data = this.data,
		contextual = data.ltPropContextualZoom,
		_add = 'addEventListener',
		callback_fn = function( callback ){
			return this.getMethods( callback ) && this.executeMethod.apply( this, arguments );
		},
		default_obj = data.ltPropSelectors;

		this.__wrapper = node.querySelector( '.lyteConnectWrapper' );

		this._click = this.click.bind( this );

		document[ _add ]( 'click', this._click );

		if( ( data.ltPropWheelZoom && !contextual ) || ( contextual && data.ltPropContextualWheel ) ){
			node[ _add ]( 'wheel', this.wheel_zoom.bind( this ), true );
		} 

		this.setTranslate();

		/* Connection plugin binding*/

		var obj = $L.extend({ 
			connection_type : data.ltPropConnectionType,
			connector_radius : data.ltPropConnectorRadius,
			avoid_with_module : data.ltPropAvoidWithModule,
			check_break : data.ltPropCheckLineBreak,
			elbow_arc : data.ltPropElbowArc,
			avoid_line : data.ltPropAvoidLine,
			module : "lyte-connect-item",
			default_top : "lyte-connection-header", 
			default_bottom : "lyte-connection-footer",
			scroll_parent : "lyte-connection-content",
			wrapperElement : $node.find( '.lyteConnectionMarker' ).get( 0 ),
			offset : {
				left : 12,
				top : 12,
				right : 12,
				bottom : 12
			},
			curve_offset : data.ltPropCurveOffset,

			setScroll : function( _left, value ){
				this.setData( 'ltPropScroll' + _left, value );
			}.bind( this ),

			getScroll : function(){
				var data = this.data;
				return{
					left : 0,
					top : 0
				};
				// return{
				// 	left : data.ltPropScrollLeft,
				// 	top : data.ltPropScrollTop
				// }
			}.bind( this ),

			getBoundary : function(){
				return data.ltPropBoundary;
			}.bind( this ),

			getScale : function(){
				return data.ltPropContextualWheel ? 1 : data.ltPropScale;
			}.bind( this ),

			getRanges : function(){
				return this.getRanges();
			}.bind( this ),

			splitRanges : function( ranges ){
				return this.split_ranges_with_shapes( ranges, [] );
			}.bind( this ),

			splitIndiv : this.split_ranges.bind( this ),

			join_ranges : this.join_ranges.bind( this )

		}, default_obj );

		[ "onConnect", "onReconnect", "onConnectionCreate", "onConnectionDisconnect", "onBeforeReconnectSelect", "onBeforeConnectionCreation", "onConnectionHover", "onConnectionLeave" ].forEach( function( item ){
			obj[ item ] = callback_fn.bind( this, item );
		}.bind( this ) );

		$node.connection( obj );


		/* Basic utils */

		node.connect = function( src, target, options ){
			$L( this.$node ).connection( 'create', src, target, options );
			if( !this.isUndo() ){
				this.pushToQueue({
					type : "renderConnections",
					data : this.stringify([ { src : src, target : target, options : options } ])
				});
			}
		}.bind( this );

		node.hasConnected = function( src, target ){
			return $L( this ).connection( 'hasConnected', src, target );
		}.bind( this );

		node.disConnect = function( item ){
			var ret = this.remove_connector( item );
			if( !this.isUndo() ){
				this.pushToQueue({
					type : "deleteConnections",
					data : this.stringify( [ ret ] )
				});
			}
			return ret;
		}.bind( this );

		node.arrange = this.arrange.bind( this );

		node.scroll_to = this.scroll_to.bind( this );

		node.deleteShape = this.delete.bind( this );
		node.insertShape = this.insert.bind( this );
		node.getSelected = function(){
			return this._data || [];
		}.bind( this );

		node.resetSelected = this.resetSelected.bind( this );

		node.groupSelected = this.group.bind( this );
		node.unGroup = this.ungroup.bind( this );
		node.addToGroup = this.addgroup.bind( this );
		node.removeFromGroup = this.removegroup.bind( this );
		node.moveToCenter = this.moveToCenter.bind( this );
		node.moveToShape = this.moveToShape.bind( this );
		node.resetQueue = this.resetQueue.bind( this );
		node.hideShape = this.hideShape.bind( this );
		node.showShape = this.showShape.bind( this );
		node.getConnections = this.getConnections.bind( this );
		node.getConnectionDetails = this.getConnectionDetails.bind( this );

		node.refreshConnectors = function( id, only_start ){
			var details = this.data.details;

			if( id ){
				this.update_position( this.get_element( id ), only_start );
			} else {
				for( var key in details ){
					this.update_position( this.get_element( key ), only_start );
				}
			}
		}.bind( this );

		node.renderModule = this.render_module.bind( this );

		node.resizeView = this.resize_fn.bind( this );

		if( data.ltPropPreview ){
			this._preview = $L( '.lyteConnectPreview', this.__wormhole ).get( 0 );
			this._resize = this.resize_fn.bind( this );
			$L.fastdom.mutate( this.initiate_preview.bind( this ) );
			window[ _add ]( 'resize', this._resize, true );
			window[ _add ]( 'orientationchange', this._resize, true );
		}

		if( data.ltPropSmartGuide ){
			var elems = $L( this.__wrapper ).children( '.lyteSmartGuides' );
			this._horismart = elems.eq( 0 );
			this._vertsmart = elems.eq( 1 );
		}

		$L.fastdom.measure( function(){
			$L.fastdom.mutate( function(){
				this._boundary();
				this.__cb = "afterRender";
				// this.getMethods( cb ) && this.executeMethod( cb, this.$node );
			}, this );
		}, this );
	},

	getConnections : function( elem ){
		var $node = $L( this.$node ),
		_this = this,
		fn = function( item ){
			var ret = $node.connection( 'getConnections', item ),
			src = [],
			target = [];

			ret.src.forEach( function( _item ){
				src.push( _this.getConnectionDetails( _item ) );
			});

			ret.target.forEach( function( _item ){
				target.push( _this.getConnectionDetails( _item ) );
			});

			return {
				src : src,
				target : target
			};

		};

		if( /lyte-connect-item/i.test( elem.tagName ) ){
			var elems = Array.from( elem.querySelectorAll( '.lyteConnectionSrcElement,.lyteConnectionTargetElement' ) ),
			ret = {
				src : [],
				target : []
			},
			LC = Lyte.arrayUtils;

			elems.forEach( function( item ){
				var indiv = fn( item );

				LC( ret.src, 'push', indiv.src );
				LC( ret.target, 'push', indiv.target );
			});

			return ret;
		} else{
			return fn( elem );
		}
	},

	getConnectionDetails : function( elem ){
		var $elem = $L( elem ),
		data = $elem.data(),
		active_src = data.active_src,
		active_target = data.active_target,
		query = 'lyte-connect-item';

		return {
			src : data.src.get( 0 ),
			target : data.target.get( 0 ),
			active_target : active_target,
			active_src : active_src,
			src_query : data.src_query,
			target_query : data.target_query,
			connection_elem : $elem.get( 0 ),
			src_module : active_src.closest( query ),
			target_module : active_target.closest( query )
		};
	},

	hideShape : function( id, parent_id, show ){
		var class_name = "lyteConnectHiddenElem",
		parentOrChild = parent_id || id,
		__detail = this.data.details[ parentOrChild ],
		elem = this.get_element( id, parent_id ),
		$node = $L( this.$node ),
		_break = this.data.ltPropCheckLineBreak,
		addClass = show ? 'removeClass' : "addClass";

		if( parent_id ){
			__detail = __detail.children[ id ];
		}

		__detail = __detail.data;

		var __class = __detail.class || "";

		if( show ){
			if( __class.indexOf( class_name ) == -1 ){
				return;
			}
			Lyte.objectUtils( __detail, 'add', 'class', ( __class.replace( class_name, '' ) ).trim() );
		} else {
			if( __class.indexOf( class_name ) + 1 ){
				return;
			}
			Lyte.objectUtils( __detail, 'add', 'class', ( __class + " " + class_name ).replace( /^\s+/g, "" ) );
		}

		var connector_elems = Array.from( elem.querySelectorAll( '.lyteConnectionSrcElement,.lyteConnectionTargetElement' ) );

		connector_elems.forEach( function( item ){
			var ret = $node.connection( 'getConnections', item );
			ret.src.concat( ret.target ).forEach( function( _item ){

				if( show ){
					var conn_data = _item.data();

					if( conn_data.src.get( 0 ).closest( '.' + class_name, $node ) || conn_data.target.get( 0 ).closest( '.' + class_name, $node ) ){
						return;
					}
				}

				_item[ addClass ]( class_name );
				if( _break && show ){
					$L.elbow.arc( _item.get( 0 ), {}, true );
				}
			});
		});

		if( show ){

			$L.fastdom.measure( function(){
				this.update_dimensions( parentOrChild );

				if( parent_id ){
					this.check_child_position( id, parent_id );
					this.reset_group( parent_id );
				}	

				this.check_position( parentOrChild );
			}.bind( this ));
		} else {
			if( parent_id ){
				this.reset_group( parent_id );
			}
			this._boundary();
			this.setup_viewbox();

			if( _break ){
				delete this._ranges;
				this.getRanges();
			}
		}
	},

	showShape : function( id, parent_id ){
		this.hideShape( id, parent_id, true );
	},

	resize_fn : function( evt ){
		clearTimeout( this._resize_time );
		this._resize_time = setTimeout( function(){
			this.setup_viewbox();
			this._boundary();
		}. bind( this ), ( evt || {} ).type == "resize" ? 100 : 500 );
	},

	/* To recreate connectors */

	render_connectors : function( arr ){
		var $node = $L( this.$node )
		arr.forEach( function( item ){
			$node.connection( 'create', item.src, item.target, item.options );
		});

		this.render_connection_queue( arr );
	},

	/* removes one module from grouped module */

	removegroup : function( group_id, id ){
		var _details = this.data.details,
		grp_detail = _details[ group_id ];

		if( !grp_detail ){
			return;
		}

		var children = grp_detail.children,
		shape_detail = children[ id ];

		if( !shape_detail ){
			return;
		}

		if( Object.keys( children ).length == 2 ){
			return this.ungroup( group_id );
		}

		var ret = this.delete( id, group_id ),
		shape_pos = ret.data.position,
		ref_pos = grp_detail.position;

		this.refresh_grp_position( grp_detail );

		shape_pos.left += ref_pos.left;
		shape_pos.top += ref_pos.top;

		this.insert( ret.data );
		this.render_connectors( ret.connections );

		this.check_position( id );
	},

	refresh_grp_position : function( grp_detail ){
		var ref_pos = grp_detail.position,

		offset = this.data.ltPropMinDiff,
		__left = Infinity,
		__top = __left,
		LC = Lyte.objectUtils,
		rendered_children = grp_detail.data.children,
		regx = /lyteConnectHiddenElem/i;

		rendered_children.forEach( function( item ){

			if( regx.test( item.class ) ){
				return;
			}

			var pos = item.position;
			__left = Math.min( __left, pos.left );
			__top = Math.min( __top, pos.top );
		});

		__left -= offset;
		__top -= offset;

		rendered_children.forEach( function( item ){

			if( regx.test( item.class ) ){
				return;
			}

			var pos = item.position;

			LC( item, 'add', 'position', {
				left : pos.left - __left,
				top : pos.top - __top
			});
		});

		LC( grp_detail.data, "add", 'position', {
			left : ref_pos.left + __left,
			top : ref_pos.top + __top
		});
	},

	/* Adds one module to a grouped module*/

	addgroup : function( group_id, id ){
		var _details = this.data.details,
		grp_detail = _details[ group_id ],
		shape_detail = _details[ id ];

		if( !shape_detail || !grp_detail ){
			return;
		}

		var grp_position = grp_detail.position,
		data = grp_detail.data,
		$node = $L( this.$node ),
		ext_data = shape_detail.position,
		ret = this.delete( id ),
		offset = this.data.ltPropMinDiff,
		grp_left = grp_position.left,
		grp_top = grp_position.top,
		ext_left = ext_data.left,
		ext_top = ext_data.top,
		_left = Math.min( grp_left, ext_left - offset ),
		_top = Math.min( grp_top, ext_top - offset ),
		_right = Math.max( grp_left + grp_position.width, ext_left + ext_data.width ),
		_bottom = Math.max( grp_top + grp_position.height, ext_top + ext_data.height ),
		left_diff = grp_left - _left,
		top_diff = grp_top - _top,
		children = grp_detail.data.children,
		LC = Lyte.objectUtils;

		ret.data.position = {
			left : ext_data.left - _left,
			top : ext_data.top - _top
		};

		LC( grp_detail.children, 'add', id, {
			data : ret.data,
			position : {
				left : ext_data.left - _left,
				top  : ext_data.top - _top,
				width : ext_data.width,
				height : ext_data.height
			},
			parent : group_id
		});

		if( left_diff || top_diff ){
			children.forEach( function( item ){
				var pos = item.position,
				_pos = {
					left : pos.left + left_diff,
					top : pos.top + top_diff
				};

				LC( item, 'add', 'position', _pos );
				LC( grp_detail.children[ item.id ], 'add', 'position', _pos );
			});
		}

		var final_pos = {
			left : _left,
			top : _top,
			width : _right - _left,
			height : _bottom - _top
		};

		LC( grp_detail, 'add', 'position', final_pos );
		LC( grp_detail.data, 'add', 'position', final_pos );

		this.construct_lazy( ret.data );

		Lyte.arrayUtils( children, 'push', ret.data );

		this.render_connectors( ret.connections );

		this.check_position( group_id )
	},

	ungroup : function( _id ){

		var data = this.delete( _id ),
		children = data.data.children,
		position = data.data.position,
		_left = position.left,
		_top = position.top,
		$node = this.$node;

		$node.resetSelected();

		children.forEach( function( item ){
			var pos = item.position;
			pos.left += _left;
			pos.top += _top;

			$node.insertShape( item );
		});

		this.render_connectors( data.connections );

		if( this.data.ltPropCheckLineBreak ){
			delete this._ranges;
			this.getRanges();
		}
	},

	render_connection_queue : function( arr ){
		if( !this.isUndo() ){
			this.pushToQueue({
				type : "renderConnections",
				data : this.stringify( arr )
			});
		}
	},

	group : function( __id,  fake ){
		var $node = this.$node,
		arg = ( fake || $node.getSelected() ).filter( function( item ){
			return !item.children;
		}),
		fields = this.data.ltPropData;

		if( arg.length > 1 ){

			var obj = {
				children : arg,
				id : __id || ( "LyteConnect" + Date.now() )
			},
			left = Infinity,
			top = left,
			right = -left,
			bottom = -left,
			connection_arr = [],
			off = this.data.ltPropMinDiff * this.offset_fact(),
			__$node = $L( $node );

			$node.resetSelected();
			arg.forEach( function( item ){

				var position = item.position,
				ret = this.delete( item.id );
				left = Math.min( left, position.left );
				top = Math.min( top, position.top );

				Lyte.arrayUtils( connection_arr, 'push', ret.connections );

			}.bind( this ));

			left -= off;
			top -= off;

			arg.forEach( function( item ){
				var position = item.position;

				position.left -= left;
				position.top -= top;
			});

			obj.position = {
				left : left,
				top : top
			};

			$node.insertShape( obj );

			this.check_position( obj.id );

			this.render_connectors( connection_arr );

		} else {
			console.warn( "Can't form group with one shape" )
		}
	},

	resetSelected : function(){
		var _item = this._item,
		down_class = "lyteConnectionSelected";

		if( _item ){
			_item.forEach( function( item ){
				item.removeClass( down_class ).removeData( 'position' );
			});
			delete this._item;
			delete this._data;
		}
	},

	initiate_preview : function(){
		var elem = this._preview;

		var details = this.data.details,
		overlay = elem.children[ 1 ],
		cb = 'onCreate';

		this.__preview_grp = elem.children[ 0 ].children[ 0 ];

		for( var key in details ){
			var __data = details[ key ];

			this.getMethods( cb ) && this.executeMethod( cb, key, void 0, __data.data, false, this.$node );
		}

		this.setup_viewbox();
	},

	preview_down : function( evt ){
		var cb = 'onPreviewDragSelect',
		ori_evt = evt;

		if( evt.buttons == 3 || evt.target.closest( '.lytePreviewForeignObject' ) || ( evt.touches || [] ).length > 1 || this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node ) == false ){
			return;
		}

		evt = ( evt.touches || [ evt ] )[ 0 ];

		this._clientX = evt.clientX;
		this._clientY = evt.clientY;

		this._move = this.preview_drag.bind( this );
		this._up = this.preview_up.bind( this );

		this.bind_evt( 'addEventListener', ori_evt );

		this.stopevt( ori_evt );
	},

	preview_click : function( evt ){
		if( $L( evt.target ).hasClass( 'lyteConnectOverlay' ) ){
			return;
		}
		var preview = this._preview,
		svg = preview.children[ 0 ].viewBox.baseVal,
		overlay = preview.children[ 1 ],
		preview_bcr = preview.getBoundingClientRect(),
		bcr = overlay.getBoundingClientRect(),
		data = this.data,
		boundary = data.ltPropBoundary,
		clientX = evt.clientX,
		clientY = evt.clientY,
		mid_x = bcr.left + bcr.width / 2,
		mid_y = bcr.top + bcr.height / 2,
		sL = "ltPropScrollLeft",
		sT = "ltPropScrollTop",
		diff_x = clientX - mid_x,
		diff_y = clientY - mid_y,

		fn = function( ns, diff, width, min, max ){
			return Math.min( Math.max( data[ ns ] - ( diff / preview_bcr[ width ] * svg[ width ] ), boundary[ min ] ), boundary[ max ] );
		};


		this.setData( sL, fn( sL, diff_x, 'width', 'min_x', 'max_x' ) );
		this.setData( sT, fn( sT, diff_y, 'height', 'min_y', 'max_y' ) );
	},

	preview_drag : function( evt ){

		if( ( evt.touches || [] ).length > 1 ){
			return;
		}

		var ori_evt = evt;
		evt = ( evt.touches || [ evt ] )[ 0 ];

		this._moved = true;

		var clientX = evt.clientX,
		clientY = evt.clientY,
		data = this.data,
		boundary = data.ltPropBoundary,
		svg = this._preview.children[ 0 ],
		bcr = svg.getBoundingClientRect(),
		viewBox = svg.viewBox.baseVal,
		xInc = ( this._clientX - clientX ) / ( bcr.width / viewBox.width ),
		yInc = ( this._clientY - clientY ) / ( bcr.height / viewBox.height ),
		cb = "onPreviewDragMove",
		sL = "ltPropScrollLeft",
		sT = "ltPropScrollTop",
		__left = data[ sL ],
		__top = data[ sT ],
		fn = function( value, inc, min, max ){
			if( inc > 0 ){
				if( value + inc > max ){
					return max;
				}
			} else if( inc < 0 ) {
				if( value + inc < min ){
					return min;
				}
			}
			return value + inc;
		};

		this.setData( sL, fn( __left, xInc, boundary.min_x, boundary.max_x ) );
		this.setData( sT, fn( __top, yInc, boundary.min_y, boundary.max_y ) );

		this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node );

		this._clientX = clientX;
		this._clientY = clientY;

		if( ori_evt.touches ){
			ori_evt.preventDefault();
		}
	},

	preview_up : function( evt ){
		if( this._moved ){
			var cb = "onPreviewDragEnd";
			this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node );
		}

		this.bind_evt( 'removeEventListener', evt );

		[ "_move", "_up", "_clientX", "_clientY", "_move", "_moved", "_up" ].forEach( function( item ){
			delete this[ item ];
		}.bind( this ));
	},

	scale_bcr : function( bcr ){
		var data = this.data,
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale,
		width_diff = bcr.width * ( 1 - scale ),
		height_diff = bcr.height * ( 1 - scale ),
		half_width = width_diff * 0.5,
		half_height = height_diff * 0.5;

		bcr.left += half_width;
		bcr.right -= half_width;
		bcr.top += half_height;
		bcr.bottom -= half_height;

		bcr.width -= width_diff;
		bcr.height -= height_diff;

		return bcr;
	},

	fit_to_scale : function( scaled_output, wrap_bcr, this_bcr ){

		var data = this.data,
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale, 
		fn = function( bcr, _left, _width ){
			return bcr[ _left ] + bcr[ _width ] * 0.5;
		},
		diff = function( width ){
			return Math.min( 0, scaled_output[ width ] - wrap_bcr[ width ] ) * 0.5;
		},
		left_diff = fn( scaled_output, 'left', 'width' ) - fn( wrap_bcr, 'left', 'width' ) - diff( 'width' ),
		top_diff = fn( scaled_output, 'top', 'height' ) - fn( wrap_bcr, 'top', 'height' ) - diff( 'height' );

		scaled_output.left -= left_diff;
		scaled_output.right -= left_diff;

		scaled_output.top -= top_diff;
		scaled_output.bottom -= top_diff;
	},

	setup_viewbox : function(){
		var _this = this,
		data = _this.data,
		fastdom = $L.fastdom;

		fastdom.clear( this.___fdom );

		this.___fdom =  fastdom.measure( function(){

			delete _this.___fdom;

			var boundary = data.ltPropBoundary;

			if( !boundary ){
				return;
			}

			var offset = data.ltPropOffset,
			b_left = boundary.left - offset,
			b_right = boundary.right + offset,
			b_top = boundary.top - offset,
			b_bottom = boundary.bottom + offset,
			b_width = b_right - b_left,
			b_height = b_bottom - b_top,
			preview = _this.__preview_grp,
			svg = preview.parentNode,
			this_bcr = _this.$node.getBoundingClientRect(),
			wrap_bcr = _this.get_wrap_bcr( _this.__wrapper.getBoundingClientRect() ),
			width = Math.max( this_bcr.width, b_right - b_left ),
			height = Math.max( this_bcr.height, b_bottom - b_top ),
			_left = Math.min( 0, b_left ),
			_top = Math.min( 0, b_top ),
			mid_x = b_left + b_width * 0.5,
			mid_y = b_top + b_height * 0.5,
			act_x = _left + width * 0.5,
			act_y = _top + height * 0.5,
			left_off = act_x - mid_x,
			top_off = act_y - mid_y,
			scale = data.ltPropContextualWheel ? 1 : data.ltPropScale,
			overlay = svg.nextElementSibling,
			scaled_output = _this.scale_bcr({
				left : _left,
				top : _top,
				width : width,
				height : height,
				right : _left + width,
				bottom : _top + height
			});

			_this.fit_to_scale( scaled_output, wrap_bcr, this_bcr );

			fastdom.mutate( function(){
				$L( overlay ).css({
					width : ( this_bcr.width / scaled_output.width * 100 ) + '%',
					height : ( this_bcr.height / scaled_output.height * 100 ) + '%',
					left : ( ( this_bcr.left - scaled_output.left ) / scaled_output.width * 100 ) + '%',
					top : ( ( this_bcr.top - scaled_output.top ) / scaled_output.height * 100 ) + '%'
				});

				svg.setAttribute( 'viewBox', _left + ' ' + _top + ' ' + width + ' ' + height );

				$L( preview ).css( 'transform', 'translate(' + left_off + 'px,' + top_off + 'px)' );
			});
		});
	},

	_boundary : function( ignore ){
		$L.fastdom.clear( this._bmeasure );
		this._bmeasure = $L.fastdom.measure( this.setup_boundary.bind( this, ignore ) );
	},

	update_position : function( elem, only_start, elements ){

		var $item = $L( this.$node ),
		src = 'lyteConnectionSrcElement',
		target = 'lyteConnectionTargetElement',
		$elem = $L( elem );

		if( $elem.hasClass( 'lyteConnectHiddenElem' ) ){
			return;
		}

		Array.from( elements || elem.querySelectorAll( '.' + src + ( only_start ? '' : ',.' + target ) ) ).forEach( function( item ){
			$item.connection( 'update', item );
		});

		if( $elem.hasClass( src ) || ( !only_start && $elem.hasClass( target ) ) ){
			$item.connection( 'update', elem );
		}
	},

	release_connectors : function( id ){
		var elem = $L( '#' + this.data.ltPropIdPrefix + id ),
		connected = elem.find( '.lyteConnectionSrcElement,.lyteConnectionTargetElement' ),
		arr = [];

		$L.each( connected, function( index, item ){
			Lyte.arrayUtils( arr, 'push', this.release_for( item ) );
		}.bind( this ));

		return arr;
	},

	remove_connector : function( item ){
		var $item = $L( item ),
		data = $item.data(),
		options = data.options,
		src = data.src_query,
		target = data.target_query;

		$L( this.$node ).connection( 'delete', data.src, $item.attr( 'id' ) );

		return {
			options : options,
			src : src,
			target : target
		};
	},

	release_for : function( item ){
		var arr = [],
		connections = $L( this.$node ).connection( 'getConnections', item ),
		_this = this,
		fn = function( _arr ){
			_arr.forEach( function( _item  ){
				Lyte.arrayUtils( arr, 'push', _this.remove_connector( _item ) );
			});
		};

		fn( connections.src );
		fn( connections.target );

		return arr;
	},

	stringify : function( json ){
		return JSON.stringify( json );
	},

	delete : function( id, group_id ){

		var data = this.data,
		_details = data.details,
		details = _details[ group_id || id ],
		__data = group_id ? ( details.children[ id ].data ) : details.data,
		arr = group_id ? details.data.children : data.ltPropData,
		index = arr.indexOf( __data ),
		cb = 'onDelete',
		isUndo = this.isUndo(),

		deleted_connectors = this.release_connectors( id );
		
		Lyte.arrayUtils( arr, 'removeAt', index );
		Lyte.objectUtils(  group_id ? details.children : _details, 'delete', id );

		this._boundary();
		this.setup_viewbox();

		this.$node.resetSelected();

		if( !isUndo ){
			this.pushToQueue({
				type : "deleteConnections",
				data : this.stringify( deleted_connectors )
			});

			this.pushToQueue({
				type : "deleteShape",
				index : index,
				data : this.stringify( __data ),
				group_id : group_id
			});
		}

		this.getMethods( cb ) && this.executeMethod( cb, id, group_id, __data, isUndo, this.$node );

		if( this.data.ltPropCheckLineBreak ){
			delete this._ranges;
			this.getRanges();
		}

		return {
			data : __data,
			connections : deleted_connectors
		};
	},

	insert : function( data, index, group_id ){
		this._boundary();
		this.setup_viewbox();

		var details = this.data.details,
		arr = group_id ? details[ group_id ].data.children : this.data.ltPropData,
		cb = 'onCreate',
		isundo = this.isUndo();

		if( index == void 0 ){
			index = arr.length;
		}

		this._position_find[ data.id ] = true;

		this.construct_lazy( data );

		Lyte.arrayUtils( arr, 'insertAt', index, data );

		if( !isundo ){
			this.pushToQueue({
				type : "insertShape",
				index : index,
				data : this.stringify( data ),
				group_id : group_id
			});
		}

		$L.fastdom.mutate( function(){
			var id = data.id;

			this.getMethods( cb ) && this.executeMethod( cb, id, group_id, data, isundo, this.$node );

		}.bind( this ));
	},

	setup_boundary : function( ignore_min ){

		delete this._bmeasure;

		var data = this.data, 
		off = data.ltPropMinDiff * this.offset_fact(),
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale,
		this_bcr = this.$node.getBoundingClientRect(),
		min_x,
		max_x,
		min_y,
		max_y,
		wrapper = this.__wrapper,
		children = wrapper.children,
		fn = function( value, other, fn ){
			return Math[ fn ]( value, other );
		},
		details = this.data.details,
		obj = {},
		LC = Lyte.objectUtils,
		is_same = function( obj1, obj2 ){
			var keys1 = Object.keys( obj1 ),
			keys2 = Object.keys( obj2 ),
			is_same_;

			if( keys1.length != keys2.length ){
				return false;
			}

			keys1.every( function( item ){
				return is_same_ = ( obj1[ item ] == obj2[ item ] );
			});

			return is_same_;
		},
		to_check = [],
		check_obj = this._position_find || {},
		fastdom = $L.fastdom;

		this.data.ltPropData.forEach( function( item, index ){

			if( /lyteConnectHiddenElem/i.test( item.class ) ){
				return;
			}

			var ___fn = function( item, index, children, __width, __height, ignore ){
				var elem = children[ index ],
				position = $L.extend( { left : 0, top : 0 }, item.position ),
				_left = position.left,
				_top = position.top,
				cur = details[ item.id ],
				cur_pos = ( cur || {} ).position || {},
				width = ( __width || elem.offsetWidth ),
				height = ( __height || elem.offsetHeight ),
				position_obj = {
					left : _left,
					top : _top,
					width : width,
					height : height
				},
				shape_id = item.id;

				if( ignore ){
					return position_obj;
				}

				if( check_obj[ shape_id ] ){
					to_check.push( {
						item : item,
						index : index,
						children : children,
						width : width,
						height : height,
						ignore : ignore,
						fn : ___fn
					});
					delete check_obj[ shape_id ];
				}

				if( cur ){
					if( !is_same( position_obj, cur_pos ) ){
						fastdom.mutate( function(){
							LC( cur, 'add', 'position', position_obj );
						});
					}
				} else {
					fastdom.mutate( function(){
						LC( details, 'add', item.id, {
							position : position_obj,
							data : item
						});
					});
				}

				if( min_x == void 0 ){
					min_x = -( _left + width );
					max_x = -_left;
					min_y = -( _top + height );
					max_y = -_top;
				} else {
					max_x = fn( max_x, -_left, 'max' );
					min_x = fn( min_x, -( _left + width ), 'min' );
					max_y = fn( max_y, -_top, 'max' );
					min_y = fn( min_y, -( _top + height ), 'min' );
				}
			}

			if( item.children ){
				var elem = children[ index ],
				__children = elem.children,
				_left = Infinity,
				_right = -_left,
				_top = _left,
				_bottom = _right,
				pos = item.position,
				group_id = item.id,
				grp_data = details[ group_id ],
				final_obj = {},
				allow = false;

				item.children.forEach( function( __item, __index ){

					if( /lyteConnectHiddenElem/i.test( __item.class ) ){
						return;
					}

					var ret = ___fn( __item, __index, __children, 0, 0, true ),
					cur_id = __item.id;

					_left = Math.min( _left, ret.left );
					_top = Math.min( _top, ret.top );
					_right = Math.max( _right, ret.left + ret.width );
					_bottom = Math.max( _bottom, ret.top + ret.height );

					if( details[ cur_id ] ){
						LC( details, 'delete',cur_id );
					}

					if( grp_data ){
						var grp_children = grp_data.children;
						if( grp_children ){
							var is_exist = grp_children[ cur_id ]
							if( is_exist ){
								if( !is_same( ret, is_exist.position ) ){
									LC( is_exist, 'add', 'position', ret );
								}
							} else {
								LC( grp_children, 'add', cur_id, {
									position : ret,
									data : __item,
									parent : group_id
								});
							}
						} else{
							allow = true;
						}
					} else {
						allow = true;
					}

					if( allow ){
						final_obj[ cur_id ] = { position : ret, data : __item, parent : group_id };
					}

				});

				_left -= off;
				_top -= off;
				_right += off;
				_bottom += off;

				fastdom.mutate( function(){
					LC( item, 'add', 'position', {
						left : pos.left,
						top : pos.top,
						width : _right - _left,
						height : _bottom - _top
					});
				});

				___fn( item, index, children, _right - _left,  _bottom - _top );

				if( allow ){
					fastdom.mutate( function(){
						LC( details[ group_id ], 'add', 'children', final_obj );
					});
				}
			} else {
				___fn( item, index, children );
			}

		}.bind( this ));

		if( to_check.length ){
			fastdom.mutate( function(){
				this.arrange( to_check );
				this.resetQueue();
			}.bind( this ));
		} 

		if( min_x == void 0 ){
			min_x = min_y = max_x = max_y = 0;
		}

		this.setData( 'ltPropBoundary', $L.extend( true, obj,{
			left : -max_x,
			right : -min_x,
			top : -max_y,
			bottom : -min_y
		}));

		var wrap_bcr = this.get_wrap_bcr( wrapper.getBoundingClientRect() ),
		mid_x = this_bcr.left + this_bcr.width * 0.5,
		mid_y = this_bcr.top + this_bcr.height * 0.5,
		wrap_mid_x = wrap_bcr.left + wrap_bcr.width * 0.5,
		wrap_mid_y = wrap_bcr.top + wrap_bcr.height * 0.5,
		x_diff = mid_x - wrap_mid_x,
		y_diff = mid_y - wrap_mid_y,
		sL_ns = 'ltPropScrollLeft',
		sT_ns = 'ltPropScrollTop',
		cb = this.__cb,

		fn2 = function( wrap_bcr, _left, _width, _right, minx, maxx, scroll ){
			var this_width = this_bcr[ _width ],
			wrap_width = wrap_bcr[ _width ];

			if( this_width >= wrap_width ){
				var mid = this_bcr[ _left ] + this_width * 0.5,
				wrap_mid = wrap_bcr[ _left ] + wrap_width * 0.5;

				obj[ minx ] = obj[ maxx ] = scroll + mid - wrap_mid;
			} else {
				obj[ maxx ] = - ( wrap_bcr[ _left ] - this_bcr[ _left ] ) + scroll;
				obj[ minx ] = - ( wrap_bcr[ _right ] - this_bcr[ _right ] ) + scroll;
			}
		};

		fn2( wrap_bcr, 'left', 'width', 'right', 'min_x', 'max_x', data[ sL_ns ] );
		fn2( wrap_bcr, 'top', 'height', 'bottom', 'min_y', 'max_y', data[ sT_ns ] );

		if( !ignore_min ){
			this.setData( sL_ns, Math.min( Math.max( obj.min_x, data[ sL_ns ] ), obj.max_x ) );
			this.setData( sT_ns, Math.min( Math.max( obj.min_y, data[ sT_ns ] ), obj.max_y ) );
		}

		if( cb ){
			delete this.__cb;
			$L.fastdom.mutate( function(){
				if( this.getMethods( cb ) ){
					setTimeout( function(){
						this.executeMethod( cb, this.$node );
					}.bind( this ), 0 );
				}
			}.bind( this ))
		}
	},

	get_wrap_bcr : function( bcr ){
		var data = this.data,
		offset = data.ltPropOffset,
		boundary = data.ltPropBoundary || { left : offset, right : -offset, top : offset, bottom : -offset },
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale,
		_left = boundary.left - offset,
		_right = boundary.right + offset,
		_top = boundary.top - offset,
		_bottom = boundary.bottom + offset,
		_width = _right - _left,
		__height = _bottom - _top,
		obj = { 
			width : _width * scale,
			height : __height * scale
		};

		obj.left = bcr.left + _left * scale;
		obj.top = bcr.top + _top * scale;
		obj.right = obj.left + obj.width;
		obj.bottom = obj.top + obj.height;

		return obj;
	},

	dragmove : function( evt ){

		if( ( evt.touches || [] ).length > 1 ){
			return this.perform_pinch( evt );
		}

		var ori_evt = evt;
		evt = ( evt.touches || [ evt ] )[ 0 ];

		if( !this._moved ){
			this._moved = true;
		}

		var clientX = evt.clientX,
		clientY = evt.clientY,
		xInc = clientX - this._clientX,
		yInc = clientY - this._clientY,
		data = this.data,
		sL = 'ltPropScrollLeft',
		sT = 'ltPropScrollTop',
		cb = 'onDrag',
		__sL = data[ sL ] + xInc,
		__sT = data[ sT ] + yInc,
		boundary = this.data.ltPropBoundary,
		fn = function( inc, value, max, min ){
			var _new = value + inc;
			if( inc > 0 ){
				if( _new >= max ){
					if( value >= max ){
						return value;
					}
					return max;
				}
			} else if( inc < 0 ){
				if( _new <= min ){
					if( value <= min ){
						return value;
					}
					return min;
				}
			}
			return _new;
		}

		this.setData( sL, fn( xInc, data[ sL ], boundary.max_x, boundary.min_x ) );
		this.setData( sT, fn( yInc, data[ sT ], boundary.max_y, boundary.min_y ) );

		this.getMethods( cb ) && this.executeMethod( cb, ori_evt, this.$node );

		this._clientX = clientX;
		this._clientY = clientY;

		ori_evt.preventDefault();

	},

	mousemove : function( evt ){

		if( ( evt.touches || [] ).length > 1 ){
			return this.perform_pinch( evt );
		}

		var ori_evt = evt;
		evt = ( evt.touches || [ evt ] )[ 0 ];

		this._moved = true;

		var clientX = evt.clientX,
		clientY = evt.clientY,
		data = this.data,
		scale = data.ltPropContextualWheel ? 1 : data.ltPropScale,
		xInc = ( clientX - this._clientX ) / scale,
		yInc = ( clientY - this._clientY ) / scale,
		_this_node = this.$node,
		this_bcr = _this_node.getBoundingClientRect(),
		sL = 'ltPropScrollLeft',
		sT = 'ltPropScrollTop',
		x = 0,
		y = 0,
		moving = this._item,
		moving_length = moving.length,
		prevent;

		if( ori_evt.touches ){
			if( moving_length == 1 ){
				var elem = evt.target.closest( 'lyte-connection-content' );
				if( elem && yInc ){
					var sT = elem.scrollTop,
					sH = elem.scrollHeight,
					oH = elem.offsetHeight;

					if( !( ( yInc > 0 && Math.round( sT ) == 0 ) || ( yInc < 0 && Math.round( sT + oH ) == sH ) ) ){
						yInc = 0;
						xInc = 0;
					} else {
						prevent = true;
					}
				}
			}
		}

		window.cancelAnimationFrame( this._frame );
		delete this._frame;

		moving.forEach( function( item ){
			var bool = this.individual_move( ori_evt, item, xInc, yInc, this_bcr, moving_length );
			x = x || bool.x;
			y = y || bool.y;
		}.bind( this ));

		if( x || y ){

			if( x ){
				this.setData( sL, data[ sL ] + x );
				clientX += x;
			}
			if( y ){
				this.setData( sT, data[ sT ] + y );
				clientY += y;
			}

			this._frame = window.requestAnimationFrame( this.mousemove.bind( this, ori_evt ) );
		}
		this._clientY = clientY;
		this._clientX = clientX;

		if( prevent ){
			ori_evt.preventDefault();
		}
	},

	smart_guide : function( id, xInc, yInc ){
		var details = this.data.details,
		mov_detail = details[ id ],
		position = mov_detail.position,
		hori = this.smart_hori( position, details, xInc,yInc,  'left', 'right', 'top', 'bottom', 'hori_mid', 'width', 'height' ),
		vert = this.smart_hori( position, details, yInc, xInc, 'top', 'bottom', 'left', 'right', 'vert_mid', 'height', 'width' ),
		addClass1 = 'addClass',
		addClass2 = addClass1,
		class_name = 'lyteConnectHiddenElem',
		style1 = {},
		style2 = {},
		fn = function( vert, lt, wd, tp, hgt, xInc, style2 ){
			var item = vert.item,
			top_to_be,
			inner_item = item.item,
			mid1x = position[ lt ] + position[ wd ] / 2 + xInc,
			mid2x = inner_item[ lt ] + inner_item[ wd ] / 2;

			
			style2[ wd ] = Math.abs( mid2x - mid1x ) + 'px';
			style2[ hgt ] = '1px';
			style2[ lt ] = Math.min( mid2x, mid1x ) + 'px';

			switch( item.prop ){
				case 'vert_mid' : 
				case "hori_mid" : {
					top_to_be = inner_item[ tp ] + inner_item[ hgt ] / 2;
				}
				break;
				case 'top' : 
				case "left" : {
					top_to_be = inner_item[ tp ];
				}
				break;
				case 'bottom' : 
				case "right" : {
					top_to_be = inner_item[ tp ] + inner_item[ hgt ];
				}
			}

			style2[ tp ] = top_to_be + 'px';
		}

		if( vert ){
			fn( vert, 'left', 'width', 'top', 'height', xInc, style2 );
			yInc -= vert.dist;
			addClass2 = 'removeClass';
		} 

		if( hori ){
			fn( hori, 'top', 'height', 'left', 'width', yInc, style1 );
			xInc -= hori.dist;
			addClass1 = 'removeClass';
		} 

		this._horismart[ addClass1 ]( class_name ).css( style1 );
		this._vertsmart[ addClass2 ]( class_name ).css( style2 );

		return {
			xInc : xInc,
			yInc : yInc
		}
	},

	smart_hori : function( position, details, xInc, yInc, lt, rgt, tp, btm, mt, wd, hgt ){
		var inf = Infinity,
		obj = ( function(){
			var obj = {};
			[ lt, rgt, mt ].forEach( function( item ){
				obj[ item ] = {
					dist : inf
				};
			});
			return obj;
		})(),
		ori_top = position[ tp ] + yInc,
		ori_bottom = ori_top + position[ hgt ] + yInc,
		ori_left = position[ lt ] + xInc,
		ori_right = ori_left + position[ wd ] + xInc,
		ori_mid = ori_left + position[ wd ] / 2 + xInc,
		inc = xInc > 0,
		buff = 20,
		fn = function( _left, _top, _bottom, value, _pos ){
			if( inc ){
				if( value > _left || ( _left - buff ) > value ){
					return inf;
				}
			} else {
				if( value < _left || ( value - buff ) > _left ){
					return inf;
				}
			}
			return Math.min( Math.abs( _top - ori_bottom ), Math.abs( _bottom - ori_top ) );
		},
		best_point = function(){
			var __dist = inf,
			vert_dist = inf,
			selected,
			__fn = function( __value, ns ){
				var act_val = __value[ ns ],
				prop = act_val.prop,
				item = act_val.item;

				if( act_val.dist < __dist ){
					var val1 = ns == lt ? ori_left : ( ns == rgt ? ori_right : ori_mid ),
					val2 =  prop == lt ? item[ lt ] : ( prop == rgt ? item[ lt ] + item[ wd ] : ( item[ lt ] + item[ wd ] / 2 ) ),
					diff = val1 - val2;

					if( diff < vert_dist ){
						vert_dist = diff;
						__dist = act_val.dist;
						selected = act_val;
					}
				}
			};

			__fn( obj, mt );
			__fn( obj, lt );
			__fn( obj, rgt );

			if( selected ){
				return {
					item : selected,
					dist : vert_dist
				};
			}
		},
		check_function = function( obj, lt, _left, _top, _bottom, ori_left, cur, to_set ){
			var dist;
			if( obj[ lt ].dist > ( dist = fn( _left, _top, _bottom, ori_left, cur ) ) ){
				$L.extend( obj[ lt ],{
					dist : dist,
					item : cur,
					prop : to_set
				});
			}
		};

		if( xInc == 0 ){
			return;
		}

		for( var key in details ){
			var cur = details[ key ].position;

			if( cur == position ){
				continue;
			}

			var _left = cur[ lt ],
			_right = _left + cur[ wd ],
			_mid = _left + cur[ wd ] / 2,
			_top = cur[ tp ],
			_bottom = _top + cur[ hgt ];

			if( _left > ( ori_right + ( inc ? buff : 0  ) ) || _right < ( ori_left - ( inc ? buff : 0 ) ) ){
				continue;
			}

			check_function( obj, lt, _left, _top, _bottom, ori_left, cur, lt );
			check_function( obj, lt, _mid, _top, _bottom, ori_left, cur, mt );
			check_function( obj, lt, _right, _top, _bottom, ori_left, cur, rgt );

			check_function( obj, rgt, _right, _top, _bottom, ori_right, cur, rgt );
			check_function( obj, rgt, _mid, _top, _bottom, ori_right, cur, mt );
			check_function( obj, rgt, _left, _top, _bottom, ori_right, cur, lt );

			check_function( obj, mt, _mid, _top, _bottom, ori_mid, cur, mt );
			check_function( obj, mt, _right, _top, _bottom, ori_mid, cur, rgt );
			check_function( obj, mt, _left, _top, _bottom, ori_mid, cur, lt );
		}

		return best_point();
	},

	individual_move : function( evt, _item, xInc, yInc, this_bcr, moving_length ){
		var elem = _item.get( 0 ),
		position = _item.data( 'position' ),
		bcr = elem.getBoundingClientRect(),
		data = this.data,
		group_arrange = data.ltPropGroupArrange,
		__detail,
		details,
		id = elem.id.replace( data.ltPropIdPrefix, '' ),
		x = 0,
		y = 0;

		if( group_arrange ){
			__detail = data.details[ this.get_parent_id( id ) ].children[ id ];
		} else {
			__detail = data.details[ id ];
		}

		if( moving_length == 1 && data.ltPropSmartGuide && !group_arrange ){
			var ret = this.smart_guide( id, xInc, yInc );
			if( ret ){
				x = ret.xInc - xInc;
				y = ret.yInc - yInc;
			}
		}

		details = __detail.position;

		position.left += ( xInc + x );
		position.top += ( yInc + y );

		_item.css( position );

		position.left -= x;
		position.top -= y;

		_item.data({
			buff_x : x,
			buff_y : y
		});

		Lyte.objectUtils( __detail, 'add', 'position', $L.extend( true, $L.extend( {}, details ), position ) );

		this.update_viewbox();
		this.update_position( elem );

		function fn( _left, _right, inc ){
			if( this_bcr[ _left ] >= bcr[ _left ] && inc < 0 ){
				return 1;
			} else if( this_bcr[ _right ] <= bcr[ _right ] && inc > 0 ){
				return -1;
			}
		}

		var x_fact = fn( 'left', 'right', xInc ),
		y_fact = fn( 'top', 'bottom', yInc ),
		bool = { 
			x : 0,
			y : 0
		};

		if( x_fact ){
			bool.x += 5 * x_fact;
		}

		if( y_fact ){
			bool.y += 5 * y_fact;
		} 

		return bool;
	},

	dragup : function( evt ){
		var cb = 'onDragEnd';

		if( this._moved ){
			this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node );
		}
		this.bind_evt( 'removeEventListener', evt );

		$L( this.$node ).removeClass( 'lyteDragSelection' );

		[ '_move', '_moved', '_up', '_clientX', '_clientY', '_frame', '_cache' ].forEach( function( item ){
			delete this[ item ];
		}.bind( this ));
	},

	check_overlap : function( obj, cur_id, ranges, __detail, store_in ){
		var details = __detail || this.get_details( cur_id )[ cur_id ].position,
		__width = details.width,
		__height = details.height,
		dimension = {
			width : __width,
			height : __height
		},
		new_pos =  this.find_position( ranges, {
						x : obj.left + __width * 0.5,
						y : obj.top + __height * 0.5
					}, dimension, true ),
		changed = !( obj.left == new_pos.left && obj.top == new_pos.top );

		$L.extend( true, obj, new_pos );

		if( store_in ){
			this._split_indiv( cur_id, ranges, new_pos );
			this._ranges = ranges;
		}

		return changed;
	},

	_split_indiv : function( key, ranges, __obj, __detail ){
		var cur = __detail || this.get_details( key )[ key ].position,
		obj =  {
			position : __obj || {
				left : cur.left,
				top : cur.top
			},
			dimension : {
				width : cur.width,
				height : cur.height
			}
		};

		this.split_ranges( ranges, obj );
	},

	get_parent_id : function( id ){
		var prefix = this.data.ltPropIdPrefix;

		return $L( '#' + prefix + id, this.$node ).parent().attr( 'id' ).replace( prefix, '' );
	},

	get_details : function( id ){
		var data = this.data, 
		details = data.details;

		if( id && data.ltPropGroupArrange ){
			if( !details[ id ] ){
				details = details[ this.get_parent_id( id ) ].children;
			}
		}
		return details;
	},

	split_ranges_with_shapes : function( ranges, ignoreList ){
		var details = this.get_details( ( ignoreList || [] ) [ 0 ] );

		for( var key in details ){
			if( ignoreList.indexOf( key ) != -1 ||  $L( '#' + this.data.ltPropIdPrefix + key, this.$node ).hasClass( 'lyteConnectHiddenElem' ) ){
				continue;
			}
			this._split_indiv( key, ranges );
		}
	},

	check_child_position : function( id, parent_id ){
		var data = this.data,
		ns = "ltPropGroupArrange",
		old_value = data[ ns ],
		ranges,
		details = data.details[ parent_id ].children[ id ],
		_pos = details.position,
		position = {
			left : _pos.left,
			top : _pos.top
		};

		data[ ns ] = true;
		ranges = this.overall_split( [ id ] );
		
		if( this.check_overlap( position, id, ranges ) ){
			var LC = Lyte.objectUtils;

			LC( details.data, 'add', 'position', position );
			LC( details, 'add', 'position', {
				left : position.left,
				top : position.top,
				width : _pos.width,
				height : _pos.height
			});
		}

		data[ ns ] = old_value;
	},

	check_position : function( id ){
		var _this = this,
		fastdom = $L.fastdom;

		if( !_this.data.ltPropOverlapCheck ){
			return;
		}

		fastdom.measure( function(){
			fastdom.mutate( function(){
				var ranges = _this.overall_split( [ id ] ),
				details = _this.data.details[ id ],
				__pos = details.position,
				position = {
					left : __pos.left,
					top : __pos.top
				},
				pos_str = "position",
				fn = function( obj ){
					Lyte.objectUtils( obj, 'add', pos_str,  $L.extend( !0, $L.extend( !0, {}, obj[ pos_str ] ), position )  )
				};
				
				_this.check_overlap( position, id, ranges, void 0, _this.data.ltPropCheckLineBreak );
				_this.update_position( $L( '#' + _this.data.ltPropIdPrefix + id, _this.$node ).get( 0 ) );

				fn( details );
				fn( details.data );
				_this._boundary();
			})
		});
	},

	overall_split : function( ignore ){

		var inf = Infinity, 
		ranges = [ { _left : [], _right : [], left : -inf, right : inf, top : -inf, bottom : inf, width : inf, height : inf } ];

		this.split_ranges_with_shapes( ranges, ignore );

		this._ranges = ranges;

		return ranges;
	},

	reset_group : function( id ){
		this.refresh_grp_position( this.data.details[ id ] );
		this.check_position( id );
	},

	buff_check : function( $elem, new_position ){
		var data = $elem.data(),
		buff_x = data.buff_x,
		buff_y = data.buff_y;

		new_position.left += buff_x;
		new_position.top += buff_y;
	},

	/*Shape move mouseup*/

	mouseup : function( evt ){
		var _item = this._item || [],
		lineBreak = this.data.ltPropCheckLineBreak;

		if( this._moved ){
			var callback = 'onDrop',
			overlap = this.data.ltPropOverlapCheck,
			ranges,
			call_list = [];

			if( overlap ){
				ranges = this.overall_split( this._data.map( function( item ){ 
					return item.id;
				} ) );
			}

			this._data.forEach( function( data, index ){
				var old_position = data.position,
				$elem = _item[ index ],
				elem = $elem.get( 0 ),
				new_position = $elem.data( 'position' ),
				__id = data.id,
				final,
				call_update = false;
				 
				this.buff_check( $elem, new_position );

				if( overlap ){
					call_update = this.check_overlap( new_position, __id, ranges );
				}

				if( this.getMethods( callback ) && this.executeMethod( callback, elem, old_position, new_position, this.$node ) == false ){
					$elem.css( final = old_position );
					call_update = true;
				} else {
					Lyte.objectUtils( data, 'add', 'position', final = new_position );
				}
				if( call_update ){
					this.update_position( elem );
				} else {
					this.pushToQueue({
						type : "positionUpdate",
						id : __id,
						oldValue : this.stringify( old_position ),
						newValue : this.stringify( new_position )
					});
					call_list.push( elem );
				}
				if( overlap ){
					this._split_indiv( __id, ranges, final );
				}
			}.bind( this ));

			this._boundary( true );

			if( lineBreak ){
				this._ranges = ranges;
				call_list.forEach( function( item ){
					this.update_position( item );
				}.bind( this ));

				this.refresh_other_connectors( this._data.map( function( item ){
					return item.id;
				}) );
			}

			if( this.data.ltPropGroupArrange ){
				this.reset_group( this.get_parent_id( this._data[ 0 ].id ) );
			}

			window.cancelAnimationFrame( this._frame ); 
		}

		this.resetSelected();

		this.bind_evt( 'removeEventListener', evt );

		[ '_move', '_moved', '_up', '_clientX', '_clientY', '_frame', '_cache' ].forEach( function( item ){
			delete this[ item ];
		}.bind( this ));

		if( lineBreak ){
			this.update_ignore( false );
		}

		if( this.data.ltPropSmartGuide ){
			var class_name = 'lyteConnectHiddenElem',
			addClass = 'addClass';

			[ 'hori', 'vert' ].forEach( function( item ){
				this[ '_' + item + 'smart' ][ addClass ]( class_name );
			}.bind( this ));
		}
	},

	refresh_other_connectors : function( arr ){
		var _this = this,
		details = _this.data.details,
		connectors = Array.from( _this.$node.getElementsByClassName( 'lyteConnectionContainer' ) ).map( function( item ){
			return {
				id : item.id,
				elem : item,
				data : $L( item ).data()
			}
		}),
		to_refresh = [],
		$node = $L( _this.$node );

		arr.forEach( function( item ){
			connectors.forEach( function( __item ){
				if( to_refresh.indexOf( __item.elem ) + 1 || $L( __item.elem ).hasClass( 'lyteConnectHiddenElem' ) ){
					return;
				}
				if( _this.is_overlap( details[ item ].position, arr, __item.data ) ){
					to_refresh.push( __item.elem );
				}
			});			
		});

		to_refresh.forEach( function( item ){
			$node.connection( 'updateConnection', $L( item ) );
		});
	},

	is_overlap : function( detail, arr, data ){
		var prefix = this.data.ltPropIdPrefix, 
		src = data.active_src.closest( 'lyte-connect-item' ).id.replace( prefix, '' ),
		target = data.active_target.closest( 'lyte-connect-item' ).id.replace( prefix, '' ),
		points = data.absolute_points;

		if( ( arr.indexOf( src ) + 1 ) || ( arr.indexOf( target ) + 1 ) ){
			return;
		}

		var _len = points.length - 1,
		ck = 40 / 2,
		_left = detail.left - ck,
		_top = detail.top - ck,
		_right = _left + detail.width + ck * 2,
		_bottom = _top + detail.height + ck * 2,
		fn = function( a, b, c ){
			return a <= c && c <= b;
		}

		for( var i = 0; i < _len; i++ ){
			var cur = points[ i ],
			next = points[ i + 1 ],
			start_x = Math.min( cur.x, next.x ),
			end_x = Math.max( cur.x, next.x ),
			start_y = Math.min( cur.y, next.y ),
			end_y = Math.max( cur.y, next.y );

			if( ( fn( _left, _right, start_x ) || fn( _left, _right, end_x ) || fn( start_x, end_x, _left ) || fn( start_x, end_x, _right ) ) && ( fn( _top, _bottom, start_y ) || fn( _top, _bottom, end_y ) || fn( start_y, end_y, _top ) || fn( start_y, end_y, _bottom ) ) ){
				return true;
			}
		}
	},

	/*Event binding and removal*/

	bind_evt : function( name, evt ){
		var doc = document,
		mm = "mousemove",
		mu = "mouseup";

		if( /touch/i.test( evt.type ) ){
			mm = "touchmove";
			mu = "touchend";
		}

		doc[ name ]( mm, this._move, true );
		doc[ name ]( mu, this._up, true );
	},

	stopevt : function( evt ){
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
	},

	hover_fn : function( _this, evt, addClass, cb, fn_name ){
		var $node = $L( _this ),
		class_name = "lyteShapeHover",
		elems = $node.find( '.lyteConnectionSrcElement,.lyteConnectionTargetElement' ),
		len = elems.length,
		ns = "lyteConnectionHover",
		to_call = _this[ fn_name ];

		if( to_call ){
			to_call( evt );
		}

		$node[ addClass ]( class_name );

		for( var i = 0; i < len; i++ ){
			var cur = elems.eq( i ),
			connections = cur.data( 'connection_elements' );
			cur[ addClass ]( class_name );

			for( var key in connections ){
				var value = connections[ key ];
				value.connector[ addClass ]( class_name + ' ' + ns + ( /^src_/.test( key ) ? 'Src' : 'Target' ) );
			}
		}

		if( this.getMethods( cb ) ){
			this.executeMethod( cb, evt, _this );
		}
	},

	methods : {
		wormhole : function( elem ){
			this.__wormhole = elem;
			return !!this.data.ltPropQuery
		}
	},

	actions : {

		keydown : function( evt ){
			this.keydown( evt );
		},

		mouseenter : function( _this, evt ){
			this.hover_fn( _this, evt, 'addClass', 'onShapeHover', '_hovered' );
		},

		mouseleave : function( _this, evt ){
			this.hover_fn( _this, evt, 'removeClass', 'onShapeLeave', '_left' );
		},

		/*Preview drag*/

		preview_down : function( evt ){
			this.preview_down( evt );
			return false;
		},

		preview_click : function( evt ){
			this.preview_click( evt );
			return false;
		},

		/* entire component scroll*/

		scroll : function( evt ){
			var target = evt.target,
			element = target.closest( 'lyte-connect-item' );

			if( element ){
				if( this.add_more_data( element ) ){
					this.update_position( element );	
				}
			}
		},

		/* Main mousedown action for shape move, selection and entire area drag*/

		mousedown : function( evt ){
			var target = evt.target,
			group_arrange = this.data.ltPropGroupArrange,
			element = target.closest( 'lyte-connect-item' + ( group_arrange ? '.lyteConnectInnerItem' : ':not(.lyteConnectInnerItem)' ) ),
			not_right = evt.buttons != 2,
			is_shift = evt.shiftKey && !group_arrange,
			select_mode = this.data.ltPropSelectMode,
			ori_evt = evt;

			evt = ( evt.touches || [ evt ] )[ 0 ];

			if( this._preview.contains( target ) ){
				return;
			}

			if( ( ori_evt.touches || [] ).length > 1 || target.closest( '.lyteConnectionContainer' ) ){
				return;
			}

			if( element && not_right && ( !select_mode || group_arrange ) ){

				var $elem = $L( element ),
				index = Number( $elem.attr( 'data-index' ) ),
				callback = 'onSelect',
				selected_class = 'lyteConnectionSelected';

				if( ( this.getMethods( callback ) && this.executeMethod( callback, ori_evt, element, this.$node ) == false ) ){
					return;
				}

				var fn = function( ns ){
					var value = this[ ns ];
					if( !value ){
						value = this[ ns ] = [];
					}
					return value;
				}.bind( this ),

				selected = fn( '_data' ),
				item = fn( '_item' ),
				cur_data,
				ltPropData = this.data.ltPropData;

				if( group_arrange ){
					cur_data = ltPropData[ Number( $elem.parent().attr( 'data-index' ) ) ].children[ index ];
				} else{
					cur_data = ltPropData[ index ];
				}

				if( is_shift ){
					this.stopevt( ori_evt );
				}

				if( $elem.hasClass( selected_class ) ){
					var __index = this._data.indexOf( cur_data );

					selected.splice( __index, 1 );
					item.splice( __index, 1 );

					if( is_shift ){
						$elem.removeClass( selected_class ).removeData( 'position' );
						return;
					}
				} else {
					$elem.addClass( selected_class );
				}

				$elem.data( 'position', $L.extend( true, {}, cur_data.position ) );

				this._clientX = evt.clientX;
				this._clientY = evt.clientY;
				selected.push( cur_data );
				item.push( $elem );

				if( !is_shift ){
					this._move = this.mousemove.bind( this );
					this._up = this.mouseup.bind( this );

					this.bind_evt( 'addEventListener', ori_evt );

					var scroll_content = evt.target.closest( 'lyte-connection-content' );

					if( /touch/i.test( ori_evt.type ) ){
						if( !scroll_content ){
							ori_evt.preventDefault();
						}
					} else {
						ori_evt.preventDefault();
					}

					// if( ori_evt.touches ){
						// ori_evt.preventDefault();
					// }
					// this.stopevt( evt );
				}

				if( this.data.ltPropCheckLineBreak ){
					this.update_ignore( true );
				}

			} else if( !element && ( ( !this._data  && !is_shift ) || select_mode ) ){

				var class_name;

				if( select_mode && !group_arrange ){
					var callback = 'onClickSelect';
					class_name = 'lyteClickSelection';

					if( this.getMethods( callback ) && this.executeMethod( callback, ori_evt, this.$node ) == false ){
						return;
					}

					this._move = this.selectmove.bind( this );
					this._up = this.selectup.bind( this );
				} else {

					var callback = 'onDragStart';
					class_name = 'lyteDragSelection';

					if( ( this.getMethods( callback ) && this.executeMethod( callback, ori_evt, this.$node ) == false ) ){
						return;
					}

					this._move = this.dragmove.bind( this );
					this._up = this.dragup.bind( this );
				}

				if( ori_evt.touches ){
					ori_evt.preventDefault();
				}

				this._clientX = evt.clientX;
				this._clientY = evt.clientY;
				this.bind_evt( 'addEventListener', ori_evt );
				$L( this.$node ).addClass( class_name );
			}
		}
	},

	/*Pushes a value if its not exist*/

	pushIfNot : function( arr, value ){
		var index = arr.indexOf( value );
		if( index == -1 ){
			arr.push( value );
		}
	},

	/* Main arrange function*/

	arrange : function( frm_didConnect ){
		var elems = Array.from( $L( this.__wrapper ).children( 'lyte-connect-item:not(.lyteConnectHiddenElem)' ) ),
		obj = {},
		$this = $L( this.$node ),
		data = this.data,
		_dim = {
			width : $this.width(),
			height : $this.height(),
			scrollLeft : data.ltPropScrollLeft,
			scrollTop : data.ltPropScrollTop
		},
		fastdom = $L.fastdom,
		is_default = this.data.ltPropArrangeType == 'default';

		elems.forEach( function( item ){
			 if( $L( item ).hasClass( 'lyteConnectHiddenElem' ) ){
			 	return;
			 }
			 this.formatting( item, obj );
		}.bind( this ));


		if( is_default || frm_didConnect ){
			this.set_positions( obj, _dim, frm_didConnect );
		} else {
			this.arrangeShapes( obj, _dim );
		}
		this._boundary();
		fastdom.measure( function(){
			fastdom.mutate( function(){
				this.moveToCenter();
			}.bind( this ));
		}.bind( this ));
	},

	/* Reference origin point for a shape */

	get_origin : function( _dim, obj, cur ){

		var x = 0,
		y = 0,
		modified = 0;

		cur.from.forEach( function( item ){
			var next = obj[ item ];
			if( next.modified ){
				var pos = next.position,
				dim = next.dimension;

				x += ( pos.left + dim.width * 0.5 );
				y += ( pos.top + dim.height * 0.5 );
				modified++;
			}
		});

		if( modified ){
			return {
				x : x / modified,
				y : y / modified
			}
		}

		var max_heigth = 0;

		cur.to.forEach( function( item ){
			max_heigth = Math.max( max_heigth, obj[ item ].dimension.height );
		});


		return{
			x : _dim.width * 0.5,
			y : _dim.height * 0.5 + max_heigth + 100
		};
	},

	/* It joins nearby ranges for finding bigger range*/

	individual_join : function( cur, merged, done, origin ){

		if( origin ){
			var offset = 500,
			exp_left = origin.left - offset,
			exp_top = origin.top - offset,
			exp_right = origin.right + offset,
			exp_bottom = origin.bottom + offset;

			if( cur.left > exp_right || cur.right < exp_left || cur.top > exp_bottom || cur.bottom < exp_top ){
				/* This function is costlier for ~500 shapes. So assuming ranges having offset 500px from expected origin don't need any merging. Ranges failed in this if check won't be merged*/
				merged.push( [ cur ] );
				done.push( cur );
				return;
			}
		}

		var right = cur._right,
		_this = this,
		is_consumed = function( src, target ){
			return src.left <= target.left && src.top <= target.top && src.right >= target.right && src.bottom >= target.bottom;
		},
		newly_merged = [],
		copy_removal = function( new_range ){
			var new_merge_len = newly_merged.length,
			push_new = true;

			for( var j = 0; j < new_merge_len; j++ ){
				var new_cur = newly_merged[ j ];

				if( is_consumed( new_cur, new_range ) ){
					push_new = false;
					break;
				} else if( is_consumed( new_range, new_cur ) ){
					newly_merged.splice( j--, 1 );
					new_merge_len--;
				}
			}

			return push_new;
		};

		if( right.length ){
			var push_current = true;

			right.forEach( function( item ){
				var __index = done.indexOf( item );
				if( __index == -1 ){
					_this.individual_join( item, merged, done, origin );
					__index = done.indexOf( item );
				}

				var values = merged[ __index ],
				len = values.length;

				for( var i = 0; i < len; i++ ){
					var next = values[ i ],
					new_range = {
						top : Math.max( cur.top, next.top ),
						bottom : Math.min( cur.bottom, next.bottom ),
						left : cur.left ,
						right : next.right
					};

					if(  is_consumed( cur, new_range ) || is_consumed( next, new_range ) ){
						continue;
					}

					if( is_consumed( new_range, next ) ){
						values.splice( i--, 1 );
						len--;
					}

					if( is_consumed( new_range, cur ) ){
						push_current = false;
					}

					new_range.width = new_range.right - new_range.left;
					new_range.height = new_range.bottom - new_range.top;

					if( copy_removal( new_range ) ){
						newly_merged.push( new_range );
					}
				}
			});
			if( push_current && copy_removal( cur ) ){
				newly_merged.push( cur );
			}
		} else {
			newly_merged.push( {
				left : cur.left,
				right : cur.right,
				top : cur.top,
				bottom : cur.bottom,
				width : cur.width,
				height : cur.height
			} );
		}

		merged.push( newly_merged );
		done.push( cur );
	},

	join_ranges : function( ranges, width, height, origin ){
		var merged = [],
		done = [],
		_this = this,
		final = [];

		width = width || 0;
		height = height || 0;

		ranges.forEach( function( item ){
			if( done.indexOf( item ) == -1 ){
				_this.individual_join( item, merged, done, origin );
			}
		});

		merged.forEach( function( item ){
			item.forEach( function( __item ){
				if( __item.width >= width && __item.height >= height ){
					final.push( __item );
				}
			});
		});

		return final;
	},

	/* It will return best available position near to the given origin */

	find_position : function( ranges, origin, dim, frm_drop ){
		var off = frm_drop ? this.data.ltPropMinDiff * 0.5 * this.offset_fact() : 100, 
		distance = Infinity,
		selected,
		width = dim.width + 2 * off,
		height = dim.height + 2 * off,
		mid_x = origin.x,
		mid_y = origin.y,
		exp_top = mid_y - height * 0.5,
		exp_bottom = mid_y + height * 0.5,
		exp_left = mid_x - width * 0.5,
		exp_right = mid_x + width * 0.5;

		this.join_ranges( ranges.slice(), width, height, { left : exp_left, top : exp_top, right : exp_right, bottom : exp_bottom } ).every( function( item ){
				var x_dist,
				y_dist,
				_distance,
				fn = function( _left, _right, mid ){
					if( item[ _left ] > mid || mid > item[ _right ] ){
						return  Math.min( Math.abs( item[ _left ] - mid ), Math.abs( item[ _right ] - mid ) )
					} 
					return 0;
				},
				is_fit = function(){
					return item.left <= exp_left && item.top <= exp_top && item.right >= exp_right && item.bottom >= exp_bottom;
				};

				x_dist = fn( 'left', 'right', mid_x );
				y_dist = fn( 'top', 'bottom', mid_y );
				_distance = Math.sqrt( x_dist * x_dist + y_dist * y_dist ); 

				if( _distance < distance ){
					distance = _distance;
					selected = item;
					if( is_fit() ){
						return false;
					}
				} else if( _distance == distance ){
					if( is_fit() ){
						distance = _distance;
						selected = item;
						return false;
					}
				}
			return true;
		});

		if( selected ){
			var fn = function( left, mid, right, item, __width ){
				var __left = item[ left ],
				__right =  item[ right ],
				left_diff = mid - __left,
				right_diff = __right - mid,
				half_width = __width * 0.5,
				is_right_great = right_diff >= half_width,
				is_left_great = left_diff >= half_width,
				cond1 = __left <= mid,
				cond2 = mid <= __right;

				if( cond1 && cond1 ){

					if( is_right_great &&  is_left_great ){
						return mid - half_width;
					}

					if( right_diff > left_diff ){
						if( is_left_great ){
							return mid - half_width;
						}
						return __left;
					} else {
						if( is_right_great ){
							return mid - half_width;
						}
						return __right - __width;
					}

				} else if( cond1 ) {
					return __right - __width;
				} else if( cond2 ){
					return __left;
				} 
			};

			return{
				left : fn( 'left', mid_x, 'right', selected, width ) + off,
				top : fn( 'top', mid_y, 'bottom', selected, height ) + off
			};
		}
		return {
			left : mid_x - width * 0.5 + off,
			top : mid_y - height * 0.5 + off
		};
	},

	/* Common set position function */

	set_positions : function( obj, _dim, frm_didConnect ){
		var inf = Infinity,
		ranges = [ { _left : [], _right : [], left : -inf, right : inf, top : -inf, bottom : inf, width : inf, height : inf } ],
		extra = [],
		fn = function( key ){
			return frm_didConnect.findIndex( function( item ){
				return item.item.id == key;
			}) != -1;
		};

		for( var key in obj ){

			if( frm_didConnect ){
				if( fn( key ) ){
					extra.push( key );
				} else{
					var cur = obj[ key ];
					obj.modified = true;
					this.split_ranges( ranges, cur );
					setTimeout( this.update_position.bind( this, this.get_element( key ), true ), 0 );
				}
			} else {
				this.set_individual_position( obj, _dim, ranges, key );
			}
		}

		extra.forEach( function( item ){
			this.set_individual_position( obj, _dim, ranges, item );
		}.bind( this ));

		if( this.data.ltPropCheckLineBreak ){
			this._ranges = ranges;
		}
	},

	/* Finds perfect position for a shape, sets and split ranges based on that*/

	set_individual_position : function( obj, _dim, ranges, key, ignore ){
		var cur = obj[ key ];

		if( !cur.modified ){
			var origin = this.get_origin( _dim, obj, cur ),
			new_position = this.find_position( ranges, origin, cur.dimension ),
			$elem = $L( '#' + this.data.ltPropIdPrefix + key, this.$node ),
			index = parseInt( $elem.attr( 'data-index' ) ),
			old_position = cur.position,
			is_same;

			cur.position = new_position;

			is_same = old_position.left == new_position.left && old_position.top == new_position.top;

			if( !is_same ){
				var __data = this.data.ltPropData[ index ];
				this.pushToQueue({
					type : "positionUpdate",
					id : key,
					oldValue : this.stringify( __data.position ),
					newValue : this.stringify( new_position )
				});
				Lyte.objectUtils( __data, 'add', 'position', new_position );
				setTimeout( this.update_position.bind( this, this.get_element( key ), true ), 0 );
			}

			cur.modified = true;
			this.split_ranges( ranges, cur );
		}

		!ignore && cur.to.forEach( function( item ){
			if( !obj[ item ].modified ){
				this.set_individual_position( obj, _dim, ranges, item, true );
			}
		}.bind( this ));
	},

						/* Range splitting code - for finding best available place */

	/* Splitting entire ranges based on single shape details*/

	split_ranges : function( ranges, cur ){
		var len = ranges.length,
		pos = cur.position,
		dim = cur.dimension,
		_left = pos.left,
		_right = _left + dim.width,
		_top = pos.top,
		_bottom = _top + dim.height,
		fn = function( cur, left, right, _left, _right ){
			var left_check = cur[ left ] < _left,
			right_check = cur[ right ] > _right,
			out_right = cur[ right ] <= _left,
			out_left = cur[ left ] >= _right,
			to_return = "4";

			if( out_left|| out_right ){
				to_return = '0';
			} else if( left_check && right_check ){
				to_return = '3';
			} else if( left_check ){
				to_return =  '2';
			} else if( right_check ){
				to_return = '1';
			} 
			return to_return;
		},
		replace_fn = function( arr, value, name, insert ){
			arr.forEach( function( item ){
				var __arr = item[ name ],
				index = __arr.indexOf( value );

				index != -1 && __arr.splice( index, 1 );

				if( insert ){
					__arr.push( insert );
				}
			});
		},
		is_falls = function( src, target, _left, _right ){
			var src_left = src[ _left ],
			src_right = src[ _right ],
			target_left = target[ _left ],
			target_right = target[ _right ];

			return ( target_left <= src_left && src_left <= target_right ) ||
			( target_left <= src_right && src_right <= target_right ) ||
			( src_left <= target_left && target_left <= src_right ) ||
			( src_left <= target_right && target_right <= src_right );
		},
		top_bottom_fn = function( remove_range, bottom_val, left_val, cur, _left, _right ){
			if( remove_range != void 0 ){
				ranges.splice( i + remove_range, 0, bottom_val );
			}
			if( left_val ){
				bottom_val[ _left ].push( left_val );
				left_val[ _right ].push( bottom_val );
			} else{
				bottom_val[ _left ] = cur[ _left ].filter( function( item ){
					return is_falls( bottom_val, item, 'top', 'bottom' );
				});
				replace_fn( bottom_val[ _left ], cur, _right, bottom_val );
			}
		};

		for( var i = 0; i < len; i++ ){
			var cur = ranges[ i ],
			hori = fn( cur, 'left', 'right', _left, _right ),
			vert = fn( cur, 'top', 'bottom', _top, _bottom );

			if( hori == '4' && vert == '4' ){
				ranges.splice( i--, 1 );
				len--;
				continue;
			}

			var new_ranges = this.split( cur, _left, _right, _top, _bottom, hori, vert ),
			left_val = new_ranges.left,
			top_val = new_ranges.top,
			bottom_val = new_ranges.bottom,
			right_val = new_ranges.right,
			remove_range = 0;

			if( !left_val && !right_val && !top_val && !bottom_val ){
				continue;
			}

			if( left_val ){
				remove_range++;
				ranges.splice( i + remove_range, 0, left_val );
				left_val._left = cur._left.slice();
			}
			replace_fn( cur._left, cur, '_right', left_val );

			if( top_val ){
				remove_range++;
				top_bottom_fn( remove_range, top_val, left_val, cur, '_left', '_right' );
			}
			
			if( bottom_val ){
				remove_range++;
				top_bottom_fn( remove_range, bottom_val, left_val, cur, '_left', '_right' );
			}

			if( right_val ){
				remove_range++;
				ranges.splice( i + remove_range, 0, right_val );
				right_val._right = cur._right;
				replace_fn( cur._right, cur, '_left', right_val );
				if( top_val ){
					right_val._left.push( top_val );
					top_val._right.push( right_val );
				}
				if( bottom_val ){
					right_val._left.push( bottom_val );
					bottom_val._right.push( right_val );
				}
			} else {
				if( top_val ){
					top_bottom_fn( void 0, top_val, right_val, cur, '_right', '_left' );
				}
				if( bottom_val ){
					top_bottom_fn( void 0, bottom_val, right_val, cur, '_right', '_left' );
				}
			}

			ranges.splice( i--, 1 );
			i += remove_range;
			len = ranges.length;

		}
	},

	/* Splitting a single range based on shape details */

	split : function( cur, _left, _right, _top, _bottom, hori, vert ){
		var split = {},
		fn = function( _left, _right, _top, _bottom ){
			return{
				left : _left,
				right : _right,
				top : _top,
				bottom : _bottom,
				width : _right - _left,
				height : _bottom - _top,
				_left : [],
				_right : []
			};
		},
		left_max = Math.max( _left, cur.left ),
		right_min = Math.min( _right, cur.right ),
		to_left,
		to_right,
		to_top,
		to_bottom;

		switch( hori ){
			case '3' : {
				if( vert != '0' ){
					to_left = to_right = true;
				}
				switch( vert ){
					case '3' : {
						to_top = to_bottom = true;
					}
					break;
					case "2" : {
						to_top = true;
					}
					break;
					case "1" : {
						to_bottom = true;
					}
					break;
				}
			}
			break;
			case "2" : {
				if( vert != '0' ){
					to_left = true
				}
				switch( vert ){
					case '3' : {
						to_top = to_bottom = true;
					}
					break;
					case "2" : {
						to_top = true;
					}
					break;
					case "1" : {
						to_bottom = true;
					}
					break;
				}
			}
			break;
			case "1" : {
				if( vert != '0' ){
					to_right = true;
				}
				switch( vert ){
					case '3' : {
						to_top = to_bottom = true;
					}
					break;
					case "2" : {
						to_top = true;
					}
					break;
					case "1" : {
						to_bottom = true;
					}
					break;
				}
			}
			break;
			case '4' : {
				switch( vert ){
					case '3' : {
						to_top = to_bottom = true;
					}
					break;
					case "2" : {
						to_top = true;
					}
					break;
					case "1" : {
						to_bottom = true;
					}
					break;
				}
			}
		}

		if( to_left ){
			split.left = fn( cur.left, _left, cur.top, cur.bottom );
		}
		if( to_top ){
			split.top = fn( left_max, right_min, cur.top, _top );
		}
		if( to_bottom ){
			split.bottom = fn( left_max, right_min, _bottom, cur.bottom );
		}
		if( to_right ){
			split.right = fn( _right, cur.right, cur.top, cur.bottom );
		}

		return split;
	},

							/* Range splitting code */
	/* Arrange ordering */
	formatting : function( item, obj ){
		var prefix = this.data.ltPropIdPrefix,
		id = item.id.replace( prefix, '' );

		if( obj[ id ] ){
			return;
		}

		var style = item.style,
		$item = $L( item ),
		src_elems = $item.find( '.lyteConnectionSrcElement' ),
		target_elems = $item.find( '.lyteConnectionTargetElement' ),
		from = [],
		to = [],
		common = [],
		_this = this,
		$node = $L( _this.$node ),
		__obj = { id : id },
		fn = function( arr, push, name, other ){
			$L.each( arr, function( index, __item ){
				var connection = $node.connection( 'getConnections', __item );
				connection[ name ].forEach( function( in_item ){

					if( in_item.hasClass( 'lyteConnectHiddenElem' ) ){
						return;
					}

					var __other = in_item.data( other ).closest( 'lyte-connect-item:not(.lyteConnectInnerItem)' ).get( 0 ),
					__id = __other.id.replace( prefix, '' );

					if( !obj[ __id ] ){
						_this.formatting( __other, obj );
					}

					_this.pushIfNot( push, __id );
				});
			});
		};

		obj[ id ] = __obj;

		fn( src_elems, to, 'src', 'target' );
		fn( target_elems, from, 'target', 'src' );

		__obj.position = {
			left : parseInt( style.left ),
			top : parseInt( style.top )
		};
		__obj.dimension = {
			width : item.offsetWidth,
			height : item.offsetHeight
		};
		__obj.from = from;
		__obj.to = to;
		__obj.common = common;
	},


										/* selection */

	/* returns shapes fall within given start end points. If 50% of area falls within selected area that shape will be considered as selected shape */										
	get_shapes : function( x1, y1, x2, y2 ){
		var details = this.data.details,
		fn = function( cur ){
			var _left = cur.left,
			_top = cur.top,
			_width = cur.width,
			_height = cur.height,
			_right = _left + _width,
			_bottom = _top + _height,
			area = _width * _height,
			new_width = Math.min( Math.max( _right, x1 ), x2 ) - Math.max( Math.min( _left, x2 ), x1 ),
			new_height = Math.min( Math.max( _bottom, y1 ), y2 ) - Math.max( Math.min( _top, y2 ), y1 ),
			new_area = new_width * new_height;

			return new_area && new_area / area >= 0.5;
		},
		arr = [];

		for( var key in details ){
			var __detail = details[ key ],
			cur = __detail.position;

			if( /lyteConnectHiddenElem/i.test( __detail.data.class ) ){
				continue;
			}

			if( fn( cur ) ){
				arr.push( __detail );
			}
		}

		return arr;
	},

	/* Select mousemove. It will simply creates one rect box. */

	selectmove : function( evt ){

		if( ( evt.touches || [] ).length > 1 ){
			return;
		}

		var ori_evt = evt;
		evt = ( evt.touches || [ evt ] )[ 0 ];

		var elem = this.__select_elem,
		bcr = this.$node.getBoundingClientRect(),
		_left = bcr.left,
		_top = bcr.top,
		_clientX = this._clientX,
		_clientY = this._clientY,
		clientX = evt.clientX,
		clientY = evt.clientY,
		allow,
		sL = "ltPropScrollLeft",
		sT = "ltPropScrollTop",
		data = this.data,
		boundary = data.ltPropBoundary,
		current_sL = data[ sL ],
		current_sT = data[ sT ],
		min = Math.min;

		if( !elem ){
			elem = this.__select_elem = $L( '<div></div>' ).addClass( 'lyteConnectSelectionElement' );
			this.$node.appendChild( elem.get( 0 ) );
		}

		elem.css({
			left : min( _clientX, clientX ) - _left,
			top : min( _clientY, clientY ) - _top,
			width : Math.abs( clientX - _clientX ),
			height : Math.abs( clientY - _clientY )
		});


		var fn = function( top_val, bottom_val, client_val, min_y, max_y, current, name, _name ){
			var _new = current,
			diff;

			if( top_val + 5 > client_val ){
				_new = min( Math.max( current + 5, min_y ), max_y );
			} else if( bottom_val - 5 < client_val ){
				_new = min( Math.max( current - 5, min_y ), max_y );
			}

			diff = _new - current;
			this.setData( name, _new );

			this[ _name ] += diff;

			return diff;

		}.bind( this );

		allow = fn( _top, bcr.bottom, clientY, boundary.min_y, boundary.max_y, current_sT, sT, '_clientY' );
		allow = allow || fn( _left, bcr.right, clientX, boundary.min_x, boundary.max_x, current_sL, sL, '_clientX' );

		window.cancelAnimationFrame( this._frame );

		if( allow ){
			this._frame = window.requestAnimationFrame( function(){
				this.selectmove( ori_evt );
			}.bind( this ));
		}
	},

	/* Mouseup for click and drag select. Here actual elements are marked as selected*/

	selectup : function( evt ){

		var cb = 'onClickSelectEnd',
		_this = this,
		scale = _this.data.ltPropContextualWheel ? 1 : _this.data.ltPropScale,
		bcr = _this.__wrapper.getBoundingClientRect(),
		fn = function( value, __top ){
			return ( value - bcr[ __top ] ) / scale;
		},
		fake_evt = ( evt.changedTouches || [ evt ] ) [ 0 ],
		shapes = _this.get_shapes( fn( Math.min( _this._clientX, fake_evt.clientX ), 'left' ), fn( Math.min( _this._clientY, fake_evt.clientY ), 'top' ), fn( Math.max( _this._clientX, fake_evt.clientX ), 'left' ), fn( Math.max( _this._clientY, fake_evt.clientY ), 'top' ) ),
		class_name = 'lyteConnectionSelected',
		elem = _this.__select_elem;

		if( elem && !( _this.getMethods( cb ) && _this.executeMethod( cb, evt, shapes, _this.$node ) == false ) ){

			if( !evt.shiftKey ){
				_this.resetSelected();
			}

			var data = _this._data,
			item = _this._item,
			prefix = _this.data.ltPropIdPrefix;

			if( !data ){
				data = _this._data = [];
				item = _this._item = [];
			}

			shapes.forEach( function( _item ){
				var __data = _item.data,
				index = data.indexOf( __data );

				if( index == -1 ){
					data.push( __data );
					item.push( $L( '#' + prefix + __data.id, _this.$node ).addClass( class_name ).data( 'position', $L.extend( true, {}, __data.position ) ) );
				}
			});
		}

		_this.bind_evt( 'removeEventListener', evt );
		window.cancelAnimationFrame( _this._frame );

		if( elem ){
			elem.get( 0 ).remove();
		}

		[ '_move', '_moved', '_up', '_clientX', '_clientY', '_frame', '__select_elem' ].forEach( function( item ){
			delete _this[ item ];
		});

		_this.__ignoreclick = true;

		setTimeout( function(){
			delete _this.__ignoreclick;
		});
	},
										/* selection end*/

										/* contextual zoom */
	/* Main contextual zoom observer function*/
	cont_obs : function( arg ){

		if( !this.data.ltPropContextualZoom || this.isUndo() ){
			return;
		}

		var origin = this._origin;

		if( !origin ){
			this.data.ltPropScale = arg.newValue / 100;
		}

		this.cont_zoom_fn( arg, origin );

	}.observes( 'ltPropContextualZoomLevel' ),

	contextual_zoom_wheel : function( __scale, origin ){
		var data = this.data,
		zoom_str = 'ltPropContextualZoomLevel',
		scale_str = 'ltPropScale',
		cont_level = data[ zoom_str ],
		hundred = 100,
		min_scale = data.ltPropMinScale,
		max_scale = data.ltPropMaxScale,
		zoom_data = this.data.ltPropContextualZoomData;

		__scale = Math.max( Math.min( __scale, max_scale ), min_scale );

		var scale_value = parseInt( __scale * hundred ),
		old_scale = data[ scale_str ],
		is_increase = __scale > old_scale,
		keys = Object.keys( zoom_data ).map( Number ),
		index = keys.indexOf( hundred ),
		nearest_level;

		if( index == -1 ){
			keys.push( hundred );
		}

		nearest_level = this.get_nearest( keys, scale_value, is_increase );

		if( old_scale == __scale ){
			return;
		}

		data[ scale_str ] = __scale;

		this._origin = origin;
		this.setData( zoom_str, nearest_level );
		delete this._origin;
	},

	get_nearest : function( keys, current, is_increase ){

		keys.sort( function( a, b ){ 
			return ( a - b ) * ( is_increase ? -1 : 1 );
		});

		var nearest_level;

		keys.every( function( item ){
			if( is_increase ){
				if( item < current ){
					return false;
				}
				nearest_level = item;
			} else{
				if( item >= current ){
					nearest_level = item;
					return false;
				}
			}
			return true;
		});

		return nearest_level;
	},

	cont_zoom_fn : function( arg, origin ){
		var __old = arg.oldValue,
		__new = arg.newValue,
		ns = 'lyteConnectContextualLevel',
		anim = "lyteContextualAnimation",
		addClass = 'addClass',
		removeClass = 'removeClass',
		cb = 'onAfterContextual',
		not_origin = !origin,

		fn = function( evt ){
			var $cur_target = $L( evt.currentTarget )[ removeClass ]( anim ).off({
						transitionend : fn,
						animationend : fn
					});
			window.requestAnimationFrame( function(){
				$cur_target.removeData( 'transition' );
				_this.update_ignore( false );
				_this._boundary( true );

				_this.getMethods( cb ) && _this.executeMethod( cb, _this.$node );
				if( _this.data.ltPropCheckLineBreak ){
					_this.$node.refreshConnectors( void 0, true );
				}
			});
		},
		_this = this,
		$node = $L( _this.$node ),
		keys = _this.data.ltPropContextualBreakPoints,
		bcr = not_origin ? _this.$node.getBoundingClientRect() : $L.extend( origin, { width : 0, height : 0 } ),
		old_class = _this.$node.className.split( ' ' ).filter( function( item ){
    		return item.indexOf( ns ) == 0;
		})[ 0 ],
		is_increase = __new > __old,
		new_class = ns + _this.get_nearest( keys.slice(), __new, is_increase );

		$node[ removeClass ]( old_class)[ addClass ]( new_class );

		_this.$node.style.setProperty( '--contextualLevel', __new );

		$L.fastdom.measure( function(){
			_this.update_dimensions();
			
			$node[ addClass ]( old_class )[ removeClass ]( new_class );
			_this.$node.style.setProperty( '--contextualLevel', __old );
				
			window.requestAnimationFrame( function(){
				$node.removeClass( old_class ).addClass( new_class + ' ' + anim ).on({
					transitionend : fn,
					animationend : fn
				}).data( 'transition', true );
				_this.update_ignore( true );
				_this.$node.style.setProperty( '--contextualLevel', __new );

				_this.contextual_zoom( __new, __old, bcr );
			});
		});

		this.pushToQueue({
			type : "contextualZoom",
			data : this.stringify( arg )
		});
	},

	/* reading target contextual zoom levels dimension */

	update_dimensions : function( _key ){
		var details = this.data.details,
		fn = function( cur, key, parent_id ){
			var pos = cur.position,
			elem = this.get_element( key, parent_id ),
			bcr = elem.getBoundingClientRect();

			pos.width = bcr.width;
			pos.height = bcr.height;
		}.bind( this );

		if( _key ){
			return fn( details[ _key ], _key );
		}
		for( var key in details ){
			var cur = details[ key ],
			children = cur.children || {};

			if( cur.data.children ){
				for( var __key in children ){
					fn( children[ __key ], __key, key );
				}
			} else {
				fn( cur, key );
			}
		}
	},

	/* Return element dom from its id without queryselector*/

	get_element : function( key, parent ){
		var details = this.data.details[ parent || key ],
		data = this.data.ltPropData,
		index = data.indexOf( details.data ),
		elem = this.__wrapper.children[ index ];

		if( parent ){
			var child = details.children[ key ].data,
			index = details.data.children.indexOf( child );

			elem = elem.children[ index ];
		}

		return elem;
	},

	sort_origin : function( details, cx, cy ){
		var obj = [],
		distance = function( item ){
			var pos = item.position;
			return Math.sqrt( Math.pow( cx - pos.left, 2 ) + Math.pow( cy - pos.top, 2 ) );
		};

		for( var key in details ){
			obj.push({
				key : key,
				position : details[ key ].position
			});
		};

		return obj.sort( function( a, b ){
			return distance( a ) - distance( b );
		});
	},

	/* Changing positions of the shape based on new contextual zoom level */

	contextual_zoom : function( _new, _old, bcr ){
		var comp_data = this.data,
		details = comp_data.details,
		zoom_data = comp_data.ltPropContextualZoomData,
		keys = Object.keys( zoom_data ).map( Number ).sort( function( a, b ){ 
			return a - b 
		} ),
		data = zoom_data[ _new ],
		fn = function( item ){
			if( !data ){
				return 1;
			}
			return ( data[ item ] || 100 ) / 100;
		},
		left_fact = fn( 'left' ),
		top_fact = fn( 'top' ),
		infinity = Infinity,
		ranges = [ { _left : [], _right : [], left : -infinity, right : infinity, top : -infinity, bottom : infinity, width : infinity, height : infinity } ],
		is_backward =  _new > _old,
		common_data = {
			left : 100,
			top : 100
		},
		is_avail = function( index ){
			return index != -1;
		};

		if( !is_backward ){
			keys.reverse();
		}

		keys.every( function( item ){

			if( is_backward ){
				if( item < _old ){
					return true;
				} else if( item > _new ){
					return false;
				}
			} else{
				if( item > _old ){
					return true;
				} else if( item < _new ){
					return false;
				}
			}

			var cur_data = zoom_data[ item ],
			merge = function( name ){
				var __value = cur_data[ name ];
				if( __value ){
					if( is_backward ){
						common_data[ name ] /= ( __value / 100 );
					} else{
						common_data[ name ] *= ( __value / 100 );
					}
				}
			};

			merge( 'left' );
			merge( 'top' );

			return true;
		});

		var left_fact = common_data.left / 100,
		top_fact = common_data.top / 100,
		sL = comp_data.ltPropScrollLeft,
		sT = comp_data.ltPropScrollTop,
		cx = bcr.left + bcr.width * 0.5 - sL,
		cy = bcr.top + bcr.height * 0.5 - sT,
		LC = Lyte.objectUtils,
		overlap = comp_data.ltPropOverlapCheck,
		ignore_overlap = comp_data.ltPropIgnoreOverlapOnContextual && !comp_data.ltPropCheckLineBreak,

		individual_move = function( cur, cx, cy, sL, sT, ranges, key_handle, is_child ){
			var pos = cur.position,
			_left = pos.left,
			_top = pos.top,
			_width = pos.width,
			_height = pos.height,
			dist_x = cx - _left /*- _width / 2*/,
			dist_y = cy - _top /*- _height / 2*/,
			new_left = _left + dist_x * ( 1 - left_fact ),
         	new_top = _top + dist_y * ( 1 - top_fact ),
         	obj = {
         		left : new_left,
         		top : new_top
         	};

         	pos.left = new_left;
         	pos.top = new_top;
         	pos.width = _width;
         	pos.height = _height;

         	/*if( ignore ){
         		ignore[ key ] = obj;
         	} else {*/

	         	if( overlap || is_child ){
					this.check_overlap( obj, key_handle, ranges, pos );
				}

				LC( cur, 'add', 'position', {
	         		left : obj.left,
	         		top : obj.top,
	         		width : _width,
	         		height : _height
	         	});

	         	if( !cur.data.children ){
	         		LC( cur.data, 'add', 'position', obj );
	         	}

	         	if( overlap || is_child ){
					this._split_indiv( key_handle, ranges, void 0, $L.extend( pos, obj ) );
				}
				if( !is_child ){
					this.raf_update( this.get_element( key_handle ), {} );
				}
			/*}*/
		}.bind( this );

		if( ignore_overlap /*&& _new != 100*/ ){
			overlap = false;
		}

		// for( var key in details ){
		this.sort_origin( details, cx, cy ).forEach( function( item ){
			var key = item.key,
			cur = details[ key ],
			old_position_out = this.stringify( cur.data.position );

			if( /lyteConnectHiddenElem/i.test( cur.class || '' ) ){
				return;
			}

			if( cur.data.children ){
				var inn = cur.children,
				fake_ranges = [ { _left : [], _right : [], left : -infinity, right : infinity, top : -infinity, bottom : infinity, width : infinity, height : infinity } ],
				child_left = infinity,
				child_top = infinity,
				child_right = -infinity,
				child_bottom = -infinity,
				cur_position = cur.position,
				off = this.data.ltPropMinDiff * this.offset_fact();

				for( var __key in inn ){
					var __cur = inn[ __key ];
					individual_move( __cur, ( cur_position.width * 0.5 ), ( cur_position.height * 0.5 ), 0, 0, fake_ranges, __key, true );

					var child_position = __cur.position;

					child_left = Math.min( child_left, child_position.left );
					child_top = Math.min( child_top, child_position.top );
					child_right = Math.max( child_right, child_position.left + child_position.width );
					child_bottom = Math.max( child_bottom, child_position.top + child_position.height );
				}

				var deduct_left = child_left - off,
				deduct_top = child_top - off;

				for( var __key in inn ){
					var __cur = inn[ __key ],
					position = __cur.position,
					shape_data = __cur.data,
					old_position = this.stringify( shape_data.position );

					LC( __cur, 'add', 'position', position = {
						left : position.left - deduct_left,
						top : position.top - deduct_top,
						width : position.width,
						height : position.height
					});

					LC( shape_data, 'add', 'position', {
						left : position.left,
						top : position.top
					});

					this.pushToQueue({
						type : "positionUpdate",
						id : __key,
						oldValue : old_position,
						newValue : this.stringify( shape_data.position ),
						group_id : key
					});
				}

				individual_move( cur, cx, cy, sL, sT, ranges, key );

				LC( cur.data, 'add', 'position', {
					left : cur_position.left,
					top : cur_position.top,
					width : child_right - child_left + 2 * off,
					height : child_bottom - child_top + 2 * off
				});
			} else {
				individual_move( cur, cx, cy, sL, sT, ranges, key );
			}
			this.pushToQueue({
				type : "positionUpdate",
				id : key,
				oldValue : old_position_out,
				newValue : this.stringify( cur.data.position )
			});
		}.bind( this ) );

		this._ranges = ranges;

		// return ignore;
	},

	/* Updating connectors with raf along with contextual zoom animation. Cant perform single animation for connectors because of shape animations */

	raf_update : function( elem, obj ){
		var _this = this,
		id = elem.id.replace( this.data.ltPropIdPrefix, '' ),
		cur = obj[ id ],
		allow,
		raf = "requestAnimationFrame";

		if( $L( elem ).hasClass( 'lyteConnectHiddenElem' ) ){
			return;
		}

		if( cur == void 0 ){
			cur = obj[ id ] = elem.getElementsByClassName( 'lyteConnectionSrcElement' );
		}

		if( cur.length && $L( _this.$node ).data( 'transition' ) ){
			window[ raf ]( function(){
				_this.update_position( elem, true, cur );
				window[ raf ]( function(){
					// window[ raf ]( function(){
						_this.raf_update( elem, obj );
					// });
				});
			});
		}
	},
							/* contextual zoom end*/
	offset_fact : function(){
		var data = this.data;

		return ( data.ltPropContextualZoom ? ( data.ltPropContextualZoomLevel / 100 ) : 1 );
	},
							/* Scrolls the document to center of the shapes */
	moveToCenter : function(){
		var boundary = this.data.ltPropBoundary,
		x_val = ( boundary.min_x + boundary.max_x ) * 0.5,
		y_val = ( boundary.min_y + boundary.max_y ) * 0.5;

		this.$node.ltProp({
			scrollLeft : x_val,
			scrollTop : y_val	
		});
	},
						    /* Scrolls the document's center to particular shape's center */
	moveToShape : function( elem, check_min_max ){
		var data = this.data,
		fn = function( __id ){
			return __id.replace( data.ltPropIdPrefix, "" );
		},
		id = fn( elem.id ),
		details = data.details,
		current = details[ id ],
		act_mid_x = this.$node.offsetWidth * 0.5,
		act_mid_y = this.$node.offsetHeight * 0.5,
		_left = "ltPropScrollLeft",
		_top = "ltPropScrollTop",
		sL = data[ _left ],
		sT = data[ _top ];

		if( !current ){
			current = details[ fn( elem.parentNode.id ) ].children[ id ];
		}

		var _position = current.position,
		cent_x = _position.left + _position.width * 0.5,
		cent_y = _position.top + _position.height * 0.5,
		left_to_be = act_mid_x - cent_x,
		top_to_be = act_mid_y - cent_y;

		if( check_min_max ){
			var boundary = data.ltPropBoundary;

			left_to_be = Math.min( Math.max( boundary.min_x, left_to_be ), boundary.max_x );
			top_to_be = Math.min( Math.max( boundary.min_y, top_to_be ), boundary.max_y );
		}

		this.setData( _left, left_to_be );
		this.setData( _top, top_to_be );
	},
							/* Keydown handling */
	keydown : function( evt ){
		var code = evt.which || evt.keyCode,
		prevent,
		shift = evt.shiftKey,
		ctrl = evt.ctrlKey;

		switch( code ){
			case 90 : {
				if( ctrl && this.data.ltPropUndo ){
					var undo = 'undoQueue',
					redo = 'redoQueue';

					if( shift ){
					 	prevent = this.undo( redo, undo );
					} else {
						prevent = this.undo( undo, redo, true );
					}
				}
			}
			break;
			case 65 : {
				if( ctrl ){
					prevent = this.selectAll();
				}
			}
			break;
			case 8 : {
				var cb = 'onBeforeDelete';
				if( this.getMethods( cb ) ){
					this.executeMethod( cb, this._data || [], this.$node );
					prevent = true;
				}
			}
		}

		if( prevent ){
			this.stopevt( evt );
		}
	},
						/* Select all*/
	selectAll : function(){
		var data = this.data;

		if( data.ltPropSelectMode ){
			this._data = data.ltPropData.slice();

			var arr = this._item = [],
			class_name = 'lyteConnectionSelected',
			children = $L( this.__wrapper ).children( 'lyte-connect-item' ),
			len = children.length;

			for( var i = 0; i < len; i++ ){
				arr.push( children.eq( i ).addClass( class_name ).data( 'position', $L.extend( {}, this._data[ i ].position ) ) );
			}
			return true;
		}
	},
						 /* Undo handling */
	undo : function( _undoQueue, _redoQueue, frm_undo ){
		this._isundo = true;

		var data = this.data,
		undoQueue = data[ _undoQueue ],
		last = undoQueue.pop(),
		ret;

		if( last ){
			ret = true;
			data[ _redoQueue ].push( last );
			this.process_do( last, frm_undo );
		}

		delete this._isundo;
		return ret;
	},

	parse : function( json ){
		return JSON.parse( json );
	},

	process_do : function( last, frm_undo ){

		if( frm_undo ){
			last = Array.from( last ).reverse();
		}

		last.forEach( function( item ){
			this[ 'do_' + item.type ]( item, frm_undo );
		}.bind( this ));

		this.call_queue_update();
		this.setup_viewbox();
		this._boundary( true );
	},

	do_positionUpdate : function( last, frm_undo ){
		var id = last.id,
		data = this.data.details[ id ];
		Lyte.objectUtils( data.data, 'add', 'position', this.parse( last[ frm_undo ? 'oldValue' : "newValue" ] ) );
		this.update_position( this.get_element( id ) );
	},

	do_renderConnections : function( last, frm_undo ){
		if( frm_undo ){
			this.do_deleteConnections( last );
		} else {
			var node = this.$node;
			this.parse( last.data ).forEach( function( item ){
				node.connect( item.src, item.target, item.options );
			});
		}
	},

	do_deleteConnections : function( last, frm_undo ){
		if( frm_undo ){
			this.do_renderConnections( last );
		} else {
			var node = this.$node;
			this.parse( last.data ).forEach( function( item ){
				node.disConnect( $L( '#' + item.options.id, node ) );
			});
		}
	},

	do_insertShape : function( last, frm_undo ){
		if( frm_undo ){
			this.do_deleteShape( last );
		} else {
			var data = this.parse( last.data );
			this.$node.insertShape( data, data.index, data.group_id );
		}
	},

	do_deleteShape : function( last, frm_undo ){
		if( frm_undo ){
			this.do_insertShape( last );
		} else{
			var data = this.parse( last.data );
			this.$node.deleteShape( data.id, data.group_id );
		}
	},

	do_contextualZoom : function( last, frm_undo ){
		var ns = 'lyteConnectContextualLevel',
		data = this.parse( last.data ),
		newValue = data[ frm_undo ? 'oldValue' : 'newValue' ],
		oldValue = data[ frm_undo ? 'newValue' : 'oldValue' ];

		this.setData( 'ltPropContextualZoomLevel', newValue );

		$L( this.$node ).removeClass( ns + oldValue ).addClass( ns + newValue );
	},

	isUndo : function(){
		return !!this._isundo;
	},

	pushToQueue : function( item ){

		var _this = this,
		data = _this.data,
		arr = data._undoQueue,
		LC = Lyte.arrayUtils;

		if( !data.ltPropUndo ){
			return;
		}

		arr.push( item );

		clearTimeout( _this.__undotime );
		_this.__undotime = setTimeout( function(){
			var undoQueue = data.undoQueue,
			redoQueue = data.redoQueue,
			remove_len = undoQueue.length - data.ltPropQueueLength + 1,
			redo_len = redoQueue.length;

			if( redo_len ){
				LC( redoQueue, 'removeAt', 0, redo_len );
			}

			undoQueue.push( arr.slice() );
			if( remove_len > 0 ){
				LC( undoQueue, 'removeAt', 0, remove_len );
			}

			arr.splice( 0 );

			_this.call_queue_update();
		}, data.ltPropUpdateTime );
	},

	call_queue_update : function(){
		var cb = "onUndoRedoQueueUpdate";

		if( this.getMethods( cb ) ){
			var data = this.data;
			this.executeMethod( cb, data.undoQueue, data.redoQueue, this.$node );
		}
	},

	resetQueue : function(){
		var data = this.data,
		undoQueue = data.undoQueue,
		redoQueue = data.redoQueue,
		_undoQueue = data._undoQueue,
		LC = Lyte.arrayUtils,
		undo_len = undoQueue.length,
		redo_len = redoQueue.length,
		_len = _undoQueue.length,
		removeAt = 'removeAt';

		if( undo_len || redo_len || _len ){
			LC( undoQueue, removeAt, 0, undo_len );
			LC( redoQueue, removeAt, 0, redo_len );
			clearTimeout( this.__undotime );
			LC( _undoQueue, removeAt, 0, _len );
			this.call_queue_update();
		}
	},

	getRanges : function(){
		var ranges = this._ranges;
		if( !ranges ){
			ranges = this.overall_split( [] );
		}

		return Lyte.deepCopyObject( ranges );
	},

	update_ignore : function( value ){
		$L( this.$node ).data( 'connection_data' ).ignore_break = value;
	},

	perform_pinch : function( evt ){
		var old_radius = this._cache,
		touches = evt.touches,
		len = touches.length,
		new_pos = {},
		radius = 0,
		origin = { 
			left : 0, 
			top : 0 
		},
		ref_x,
		ref_y;
		
		for( var i = 0; i < 2; i++ ){
			var cur = touches[ i ],
			identifier = cur.identifier;

			origin.left += ( ref_x = cur.clientX ) / 2;
			origin.top += ( ref_y = cur.clientY ) / 2;
		}

		radius = Math.sqrt( Math.pow( Math.abs( ref_x - origin.left ), 2 ) + Math.pow( Math.abs( ref_y - origin.top ), 2 ) );

		if( old_radius == void 0 ){
			old_radius = radius;
		}

		var radius_diff = radius - old_radius,
		scale = this.data.ltPropScale;

		if( radius_diff ){
			this.zoom_to( scale * ( 1 + radius_diff / 500 ), origin );
		}

		this._cache = radius;
	}
}, { mixins : [ 'lyte-connect-positioning' ] });

Lyte.Component.registerHelper( 'construct_style', function( obj ){
	var str = '';

	obj = obj || {};

	for( var key in obj ){
		str += ( key + ':' + obj[ key ] + 'px;' );
	}

	return str;
});
