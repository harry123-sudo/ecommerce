Lyte.Component.register("lyte-connect-item", {
_template:"<template tag-name=\"lyte-connect-item\"> <template is=\"for\" items=\"{{points}}\" item=\"item\" index=\"index\"> <span onmousedown=\"{{action('mousedown')}}\" class=\"lyteConnectAnchorPoint\" left=\"{{item.left}}\" top=\"{{item.top}}\" style=\"{{item.style}}\"></span> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item.style"}}}]}],
_observedAttributes :["ltPropItem","ltPropAnywhere","ltPropDefaultAnchors","points","dataIndex"],
	data : function(){
		return {
			ltPropItem : Lyte.attr( 'object' ),
			ltPropAnywhere : Lyte.attr( 'boolean', { default : true } ),
			ltPropDefaultAnchors : Lyte.attr( 'array', { default : [ [ 0, 0.5 ], [ 1, 0.5 ], [ 0.5, 0 ], [ 0.5, 1 ] ] } ),

			points : Lyte.attr( 'array' ),
			dataIndex : Lyte.attr( 'string' )
		}		
	},

	actions : {
		mousedown : function(){
			return !1;
		}
	},

	didConnect : function(){

		this.$node._hovered = function( evt ){
			var data = this.data,
			anywhere = data.ltPropAnywhere;

			if( !data.points ){
				if( anywhere ){
					var obj = { left : 0, top : 0, style : "" };
					this.setData( 'points', [ obj ] );
				} else {
					this.construct_points();
				}
			}
			if( anywhere ){
				this.update_from_evt( data.points[ 0 ], evt );
				clearTimeout( this._leave );
				if( !this._mmove ){
					this._mmove = this.mousemove.bind( this );
					$L( this.$node ).addClass( 'lyteCustomAnchorBinded' ).on( 'mousemove', this._mmove );
				}
			}
		}.bind( this );

		this.$node._left = function(){
			this._leave = setTimeout( function(){
				$L( this.$node ).removeClass( 'lyteCustomAnchorBinded' ).off( 'mousemove', this._mmove );
				delete this._mmove;
			}.bind( this ), 3000 );
		}.bind( this );
	},

	mousemove : function( evt ){
		this.update_from_evt( this.data.points[ 0 ], evt );
	},

	update_from_evt : function( obj, evt ){
		var bcr = this.$node.getBoundingClientRect(),
		width = bcr.width,
		height = bcr.height,
		x_value,
		y_value,
		fn = function(){
			Lyte.objectUtils( obj, 'add', 'style', 'display:none;' );
		};

		if( ( this.data.ltPropItem || {} ).geom == "circle" ){

			var x_radius = width / 2,
	        y_radius = height / 2,
			x_diff = evt.clientX - bcr.left,
			y_diff = evt.clientY - bcr.top,
	        angle = Math.atan2( ( y_diff - y_radius ), ( x_diff - x_radius ) ),
	        x = x_radius + x_radius * Math.cos( angle ),
	        y = y_radius + y_radius * Math.sin( angle );

	        x_value = x / width;
	        y_value = y / height;

	        if( Math.sqrt( Math.pow( x_diff - x_radius, 2 ) + Math.pow( y_diff - y_radius, 2 ) ) + 10 < x_radius  ){
				return fn();
	        }

		} else {
			var x_diff = Math.abs( evt.clientX - bcr.left ),
			y_diff = Math.abs( evt.clientY - bcr.top ),

			x_other = Math.abs( bcr.right - evt.clientX ),
			y_other = Math.abs( bcr.bottom - evt.clientY ),
			min_x = Math.min( x_diff, x_other ),
			min_y = Math.min( y_diff, y_other );

			x_value = x_diff / width;
			y_value =  y_diff / height;

			if( min_x > 10 && min_y > 10 ){
				return fn();
			}

			if( min_x > min_y ){
				y_value = y_diff > y_other ? 1 : 0;
				x_value = Math.max( 0, Math.min( 1, x_value ) );
			} else {
				x_value = x_diff > x_other ? 1 : 0;
				y_value = Math.max( 0, Math.min( 1, y_value ) );
			}
		}

		this.update_value( obj, [ x_value, y_value ] );
	},

	indexObs : function(){
		$L( this.$node ).attr( 'data-index', this.data.dataIndex );
	}.observes( 'dataIndex' ).on( 'didConnect' ),

	construct_points : function(){
		var data = this.data,
		points = data.ltPropItem.points || data.ltPropDefaultAnchors,
		pts = [];

		points.forEach( function( item ){
			pts.push( this.update_value( {}, item ) );
		}.bind( this ) );

		this.setData( 'points', pts );
	},

	update_value : function( obj, item ){
		var LC = Lyte.objectUtils,
		_left = item[ 0 ],
		_top = item[ 1 ];


		LC( obj, 'add', 'style', "left:" + ( _left * 100 ) + '%;top:'  + ( _top * 100 ) + '%;' );
		LC( obj, 'add', 'left', _left );
		LC( obj, 'add', 'top', _top );

		return obj;
	}
});
