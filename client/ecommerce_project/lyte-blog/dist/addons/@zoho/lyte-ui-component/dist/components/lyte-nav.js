/**
 * Render a nav bar
 * @component lyte-nav
 * @version 1.0.0
 * @methods onItemSelected,afterRender
 * @import lyte-menu
 * @ignore-props
 * @dependencies lyte-menu
 */

Lyte.Component.register( 'lyte-nav', {
_template:"<template tag-name=\"lyte-nav\"> <template is=\"if\" value=\"{{expHandlers(ltPropAlignment,'!==','vertical')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropNavYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"nav\" items=\"{{auxArray}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"for\" items=\"{{auxArray}}\" item=\"item\" index=\"index\"> <lyte-nav-item data-value=\"{{item[ltPropSystemValue]}}\" lyte-shortcut=\"{{lyteUiGetValue(item,'shortcut')}}\">{{item[ltPropUserValue]}}</lyte-nav-item> </template> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropType,'===','collapse')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(menuContent.length,'>',0),'||',showMenu)}}\"><template case=\"true\"> <span class=\"{{ltPropContainerClass}}\"> <span class=\"{{ltPropMenuIcon}}\"></span> </span> </template></template> <lyte-menu lt-prop=\"{{stringify(ltPropMenu)}}\" on-menu-click=\"{{method('itemSelected')}}\" on-before-open=\"{{method('beforeOpen')}}\" on-open=\"{{method('open')}}\" on-before-close=\"{{method('beforeClose')}}\" on-close=\"{{method('close')}}\" before-render=\"{{method('befRender')}}\" after-render=\"{{method('aftRender')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{ltPropMenuYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"menu\" items=\"{{menuContent}}\"></lyte-yield> </template><template case=\"false\"> <lyte-menu-body class=\"{{ltPropNavMenuClass}}\"> <template is=\"for\" items=\"{{menuContent}}\" item=\"item\" index=\"index\"> <lyte-menu-item data-value=\"{{item[ltPropSystemValue]}}\" lyte-shortcut=\"{{lyteUiGetValue(item,'shortcut')}}\"> <lyte-menu-label> {{item[ltPropUserValue]}} </lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template></template> </template> </lyte-menu> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropMenu","ltPropNavYield","ltPropMenuYield","ltPropItems","ltPropUserValue","ltPropSystemValue","ltPropMaxWidth","ltPropType","ltPropNavMenuClass","ltPropMenuIcon","ltPropContainerClass","ltPropClick","ltPropAlignment","ltPropArrow","ltPropSelected","menuContent","auxArray","arrowTop","arrowBot","showMenu"],
	init: function() {
		/* Set core properties of menu */
		var dropObj = this.getData( 'ltPropMenu' ),
		query = this.getData( 'ltPropContainerClass' ), that = this;

		$L.fastdom.measure( function() {
			var prev = _lyteUiUtils.nav_innerWidth;

			if( !prev ) {
				_lyteUiUtils.nav_innerWidth = document.documentElement.clientWidth;
			}
		} );	
		
		Lyte.objectUtils( dropObj, 'add', 'yield', true );
		Lyte.objectUtils( dropObj, 'add', 'query', '.' + query );

		this.$node.recalculate = function() {
			that.recalculate();
		}
	},

	didDestroy: function() {
		var allNodes = this.$node.querySelectorAll('lyte-nav-item'), i = 0, curValue;

		for( ; i < allNodes.length; i++ ) {
			curValue = allNodes[ i ].getAttribute( 'lyte-shortcut' );
			if( curValue ) {
				allNodes[ i ].setAttribute( 'lyte-shortcut', JSON.stringify( {} ) );
			}
		}
	},

	// Creating outer div 
	createOuterDiv: function() {
		var div = document.createElement( 'div' ),
		useArrow = this.getData( 'ltPropArrow' );

		div.setAttribute( 'class', 'lyteNavDiv' );

		if( useArrow ) {
			div.style.overflow = window._lyteUiUtils.isMobile ? 'auto' : 'hidden';
		}
		else {
			div.style.overflow = 'auto';
			div.classList.add( 'lyteNavDivFullHeight' );
		}
		
		return div;
	},

	show: function( arrows, outer ) { 
		var useArrow = this.getData( 'ltPropArrow' );

		if( !this.$node ) {
			return ;
		}

		if( useArrow ) {
			this.setData( 'topH', arrows[0].getBoundingClientRect().height );
			this.setData( 'botH', arrows[1].getBoundingClientRect().height );
			this.dispArrow.call( this, arrows, outer );	
		}
		
		if( this.getMethods( 'afterRender' ) ) {
			this.executeMethod( 'afterRender', this );
		}
	},

	/**
	 * Constructs an Aux Array that is used to render the nav
	 * Reveals all items as part of the nav at the start
	 *
	 */

	construct: function() {
		var items = this.getData( 'ltPropItems' ) || [], i = 0,
		user = this.getData( 'ltPropUserValue' ),
		sys = this.getData( 'ltPropSystemValue' ), obj, store = [];

		for( ; i < items.length; i++ ) {
			obj = items[ i ];
			Lyte.arrayUtils( store, 'push', obj );
		}

		this.setData( 'auxArray', store );
	},

	recalculate: function() {
		var sel = this.getCurrentSelected(),
		dv = this.getDataValue( sel ),
		click = this.getData( 'ltPropClick' ), newSel;

		// This removes the clicked element when they haven't specified the selected element but if they have it retains it
		this.construct();

		// Can't use the previous sel variable because it gets destroyed
		newSel = this.$node.querySelector( 'lyte-nav-item[data-value="' + window._lyteUiUtils.escape( dv ) + '"]' );

		if( newSel ) {
			newSel.setAttribute( 'selected', true );
		}
		
		this.collapse();
	},

	/**
	 * Recalculate the layout when new items are pushed in
	 * 
	 */

	itemsOb: function() {
		this.recalculate();
	}.observes( 'ltPropItems' ),


	selObserver: function() {
		this.makeSelection();
	}.observes( 'ltPropSelected' ),

	makeSelection: function() {
		if( this.getData( 'preventSel' ) ) {
			return ;
		}

		this.selectItem();
	},

	selectItem: function() {
		var sel = this.getData( 'ltPropSelected' ), node;

		if( !sel ) {
			this.removeSelected();
		}
		else {
			this.addSelected();
		}
	},

	removeSelected: function() {
		var node = this.$node.querySelector( 'lyte-nav-item[selected="true"]' );

		if( node ) {
			node.removeAttribute( 'selected' );
		}
	},

	addSelected: function() {
		var isSelected = this.setInNav();

		if( !isSelected ) {
			this.setInMenu();
		}
	},

	setInNav: function() {
		var sel = this.getData( 'ltPropSelected' ), node;

		node = this.$node.querySelector( 'lyte-nav-item[data-value="' + window._lyteUiUtils.escape( sel ) + '"]' )

		if( node ) {
			node.setAttribute( 'selected', true );

			return true;
		}

		return false;
	},

	setInMenu: function() {
		var menu = this.$node.querySelector( 'lyte-menu' ),
		sel = this.getData( 'ltPropSelected' ),
		body = menu ? menu.component.childComp : null, node;

		if( body ) {
			node = body.querySelector( 'lyte-menu-item[data-value="' + window._lyteUiUtils.escape( sel ) + '"]' );

			if( node ) {
				this.setData( 'preventCallback', true );
				node.click();
				this.setData( 'preventCallback', false );
			}
		}
	},

	/**
	 * This returns the current selected item by searching the DOM
	 * returns {DOMElement | null}
	 *
	 */

	getCurrentSelected: function() {
		var click = this.getData( 'ltPropClick' );

		return this.$node.querySelector( 'lyte-nav-item.' + click );
	},

	/**
	 * Get the data-value of the current item
	 * @param {DOMElement | null} sel - The selected item
	 * @returns {String} - attribute value
	 *
	 */ 

	getDataValue: function( sel ) {
		if( sel ) {
			return sel.getAttribute( 'data-value' );
		}

		return '';
	},

	/**
	 * Get the width of the current item
	 * @param {DOMElement | null} - The element whose width needs to be found
	 * @returns {Number} - The width of the element
	 *
	 */

	getWidth: function( item ) {
		if( item ) {
			return item.getBoundingClientRect().width;
		}

		return 0;
	},

	/**
	 * This is used to get the width of the menu icon that is rendered
	 * @returns {Number} - The width of the menu icon
	 *
	 */

	getMenuWidth: function() {
		var menu, menuWidth;

		this.setData( 'showMenu', true );
		menu = this.$node.querySelector( '.' + this.getData( 'ltPropContainerClass' ) );
		menuWidth = this.getWidth( menu );
		this.setData( 'showMenu', false );

		return menuWidth;
	},

	/**
	 * Collapse excess width held by the nav-items
	 *
	 */

	calculate: function() {

		if( !this.$node ) {
			return ;
		}

		var items = this.getData( 'auxArray' ),
		store = [], tbr = [], ind,
		rects = this.$node.getBoundingClientRect(),
		percent = parseFloat( this.getData( 'ltPropMaxWidth' ) ) / 100,
		maxWidth = rects.width * percent, i = 0, length = items.length, item,
		sys = this.getData( 'ltPropSystemValue' ),
		totalWidth = 0, sel = this.getCurrentSelected(), 
		dv = this.getDataValue( sel ), selWidth = this.getWidth( sel ),
		menuWidth = this.getMenuWidth();

		totalWidth = totalWidth + selWidth + menuWidth;

		for( ; i < items.length; i++ ) {
			item = items[ i ];

			// We already know the width of the selected item
			if( item[ sys ] === dv ) {
				continue;
			}

			totalWidth += this.getWidth( this.$node.querySelector( 'lyte-nav-item[data-value="' + window._lyteUiUtils.escape( item[ sys ] ) + '"]' ) );

			if( totalWidth > maxWidth ) {
				Lyte.arrayUtils( store, 'push', item );
				tbr.push( i );
			}
		}

		this.setData( 'menuContent', store );

		while( !isNaN( ( ind = tbr.pop() ) ) ) {
			Lyte.arrayUtils( items, 'removeAt', ind, 1 );
		}
	},

	/**
	 * The staging function
	 *
	 */

	collapse: function() {
		$L.fastdom.measure( this.calculate, this );
	},

	didConnect: function() {
		var align = this.getData( 'ltPropAlignment' ), 
		tag = this.$node, useArrow = this.getData( 'ltPropArrow' ),
		isMobile = window._lyteUiUtils.isMobile,
		type, arrows, i, div;

		if( align === 'horizontal' ) {
			type = this.getData( 'ltPropType' );

			if( ( this.getData( 'ltPropItems' ) || [] ).length > 0 ) {
				this.construct();

				if( type === 'collapse' ) {
					this.collapse();
				}

				this.makeSelection();
			}
		}
		else if( align === 'vertical' ) {
			this.buildVerticalNav();

			if( !useArrow ) {
				return ;
			}

			div = tag.querySelector( '.lyteNavDiv' );
			this.addEventsForArrows();
			arrows = this.getArrows();

			var that = this;

			if( isMobile ) {
				this.prev = div.scrollTop;
				div.addEventListener( 'scroll', function( e ) {
					var topHeight, botHeight, total, 
					scrollH = div.scrollHeight,
					scrollT = div.scrollTop,
					height = div.getBoundingClientRect().height,
					prev = that.prev,
					diff = Math.floor( scrollT - prev ),
					stopHandler = that.getData( 'stopHandler' );

					that.prev = scrollT;

					topHeight = arrows[ 0 ].getBoundingClientRect().height;
					botHeight = arrows[ 1 ].getBoundingClientRect().height;

					e.preventDefault();
					if( diff == 0 || stopHandler ) {
						return ;
					}
					else if( diff > 0 ) {
						if( arrows[ 0 ].style.display === 'none' ) {
							arrows[ 0 ].style.display = 'inline-block';
							topHeight = that.getData( 'topH' );
							total = topHeight + botHeight;
							div.style.height = 'calc(100% - ' + total + 'px)';
						}

						if( Math.abs( scrollT + height - scrollH ) <= 5 ) {
							arrows[ 1 ].style.display = 'none';
							div.style.height = 'calc(100% - ' + topHeight + 'px)';
						}
					}
					else {
						// Added the second condition to solve a weird judder issue in mobile
						if( arrows[ 1 ].style.display === 'none' && ( scrollH - ( scrollT + height) ) >= 30 ) {
							arrows[ 1 ].style.display = 'inline-block';
							botHeight = that.getData( 'botH' );

							total = topHeight + botHeight;
							div.style.height = 'calc(100% - ' + total + 'px)';
						}

						if( scrollT <= 0 ) {
							arrows[ 0 ].style.display = 'none';
							div.style.height = 'calc(100% - ' + botHeight + 'px)';
						}
					}
				} );
			}
			else {
				div.addEventListener( 'wheel', function( e ) {
					var topHeight, botHeight, total, 
					deltaY = e.deltaY,
					scrollH = div.scrollHeight, 
					height = div.getBoundingClientRect().height, 
					scrollT = div.scrollTop;

					e.preventDefault();

					if( Math.floor( scrollH ) == Math.floor( height ) ) {
						return ;
					}

					topHeight = arrows[ 0 ].getBoundingClientRect().height;
					botHeight = arrows[ 1 ].getBoundingClientRect().height;

					if ( deltaY < 0 ) {
	    				scrollT = div.scrollTop = div.scrollTop - 6;

	    				if( arrows[ 1 ].style.display === 'none' ) {
	    					arrows[ 1 ].style.display = 'inline-block';
	    					botHeight = that.getData( 'botH' );
	    					total = topHeight + botHeight;
	    					div.style.height = 'calc(100% - ' + total + 'px)';
	    				}

	    				if( scrollT <= 0 ) {
	    					arrows[ 0 ].style.display = "none"
	    					div.style.height = 'calc(100% - ' + botHeight + 'px)';
	    				}
	  				}

	  				if ( deltaY > 0 ) {
	    				scrollT = div.scrollTop = div.scrollTop + 6;

	    				if( arrows[ 0 ].style.display === 'none' ) {
	    					arrows[ 0 ].style.display = 'inline-block';
	    					topHeight = that.getData( 'topH' );
	    					total = topHeight + botHeight;
	    					div.style.height = 'calc(100% - ' + total + 'px)';
	    				}

	    				if( Math.floor( height ) + Math.floor( scrollT ) >= Math.floor( scrollH ) ) {
	    					arrows[ 1 ].style.display = 'none';
	    					div.style.height = 'calc(100% - ' + topHeight + 'px)';
	    				}
	  				}
				} );
			}
		}
	},

	addEventsForArrows: function() {
		var parent = this.$node,
		useArrow = this.getData( 'ltPropArrow' ),
		arrows = this.getArrows(),
		isMobile = window._lyteUiUtils.isMobile;

		if( !useArrow ) {
			return ;
		}

		if( isMobile ) {
			arrows[ 0 ].addEventListener( 'touchstart', this.moveup.bind( this ) );
			arrows[ 1 ].addEventListener( 'touchstart', this.movedown.bind( this ) );
			arrows[ 0 ].addEventListener( 'touchend', this.removeup.bind( this ) );
			arrows[ 1 ].addEventListener( 'touchend', this.removedown.bind( this ) );
			arrows[ 0 ].addEventListener( 'touchcancel', this.removeup.bind( this ) );
			arrows[ 1 ].addEventListener( 'touchcancel', this.removedown.bind( this ) );
		}
		else {
			arrows[ 0 ].addEventListener( 'mouseenter', this.moveup.bind( this ) );
			arrows[ 1 ].addEventListener( 'mouseenter', this.movedown.bind( this ) );	
			arrows[ 0 ].addEventListener( 'mouseleave', this.removeup.bind( this ) );
			arrows[ 1 ].addEventListener( 'mouseleave', this.removedown.bind( this ) );
		}
	},

	buildVerticalNav: function() {
		var outerDiv, arrows, parent = this.$node,
		children = parent.children, length = children.length,
		temp, reset;

		outerDiv = this.createOuterDiv();
		arrows = this.getArrows();

		for( var i = 0; i < length; i++ ) {

			// Safari starts firing when a custom element is connected to a disconnected node
			children[ 0 ].prevent = true;
			temp = children[ 0 ];

			if( children[ 0 ].hasAttribute( 'selected' ) 
				&& children[ 0 ].getAttribute( 'selected' ) !== 'false' 
			) {
				reset = children[ 0 ];
				reset.removeAttribute( 'selected' );
			}

			_lyteUiUtils.appendChild( outerDiv, children[ 0 ] );
			temp.prevent = false;
			temp = null;
		}

		// Ideally we want it to be fired when it is appened to the DOM
		_lyteUiUtils.appendChild( parent, outerDiv );

		if( reset ) {
			reset.setAttribute( 'selected', 'true' );
		}

		reset = null;
		
		this.addArrows();
		arrows = this.getArrows();
		$L.fastdom.measure( this.show.bind( this, arrows, outerDiv ) );
	},

	addArrows: function() {
		var arrows = this.getArrows(),
		useArrow = this.getData( 'ltPropArrow' ),
		parent = this.$node;

		if( !useArrow ) {
			return ;
		}

		if( arrows.length == 0 ) {
			this.addArrow( 'arrow-up' );
			this.addArrow( 'arrow-down' );
		}
		else {
			parent.insertBefore( arrows[ 0 ], parent.children[ 0 ] );
			parent.appendChild( arrows[ 1 ] );
		}
	},

	getArrows: function() {
		var parent = this.$node;

		return parent.querySelectorAll( 'lyte-arrow' );
	},

	removedown: function() {
		this.setData( 'stopHandler', false );
		window.cancelAnimationFrame( this.getData( 'arrowdid' ) )
	},

	removeup: function() {
		this.setData( 'stopHandler', false );
		window.cancelAnimationFrame( this.getData( 'arrowuid' ) );
	},

	down: function( div, ar, bot ) {
		var id,
		scrollT = div.scrollTop, 
		scrollH = div.scrollHeight, 
		height = div.getBoundingClientRect().height;

		this.setData( 'stopHandler', true );

		if( scrollT + height < scrollH ) {
			scrollT = div.scrollTop = div.scrollTop + 3
		}

    	if( Math.floor( height ) + Math.floor( scrollT ) >= scrollH ) {
    		ar[ 1 ].style.display = 'none';
    		div.style.height = 'calc(100% - ' + bot + 'px)';
    	}

    	id = window.requestAnimationFrame( this.down.bind( this, div, ar, bot ) );
		this.setData( 'arrowdid', id );
	},

	up: function( div, ar, top ) {
		var scrollT = div.scrollTop, id;

		this.setData( 'stopHandler', true );

		if( scrollT !== 0 ) {
			scrollT = div.scrollTop = div.scrollTop - 3;
		}

   		if( scrollT <= 0 ) {
   			ar[ 0 ].style.display = 'none';
   			div.style.height = 'calc(100% - ' + top + 'px)';
   		}

		id = window.requestAnimationFrame( this.up.bind( this, div, ar, top ) );
		this.setData( 'arrowuid', id );
	},

	movedown: function( event ) {		
		var top, bot, total,
		tag = this.$node, 
		div = tag.querySelector( '.lyteNavDiv' ), 
		ar = this.getArrows(), 
		height = div.getBoundingClientRect().height, 
		scroll = div.scrollHeight, id;

		ar[ 0 ].style.display = 'inline-block';
		top = this.getData( 'topH' );
		bot = this.getData( 'botH' );
		total = top + bot;
		div.style.height = 'calc(100% - ' + total + 'px)';

		// Call Animation inside a rAF.
		id = window.requestAnimationFrame( this.down.bind( this, div, ar, bot ) );
		this.setData( 'arrowdid', id );	
	},

	moveup: function() {
		var top, bot, total,
		tag = this.$node, 
		div = tag.querySelector( '.lyteNavDiv' ), 
		ar = this.getArrows(), id,
		height = div.getBoundingClientRect().height, 
		scroll = div.scrollHeight;

		ar[ 1 ].style.display = 'inline-block';
		top = this.getData( 'topH' );
		bot = this.getData( 'botH' );
		total = top + bot;
		div.style.height = 'calc(100% - ' + total + 'px)';

		// Call Animation inside a rAF
		id = window.requestAnimationFrame( this.up.bind( this, div, ar, top ) );
		this.setData( 'arrowuid', id );			
	},

	addArrow: function( cls ) {
		var i = document.createElement( 'i' ),
		ar = document.createElement( 'lyte-arrow' ), 
		tag = this.$node;

		i.setAttribute( 'class', cls ); 
		ar.appendChild( i );

		if( cls.indexOf('up') !== - 1 ) {
			tag.insertBefore( ar, tag.children[ 0 ] );
		}
		else {
			tag.appendChild( ar )
		}
	},

	dispArrow: function( arrows, div ) {
		var which = 0, topHeight = 0, botHeight = 0, total = 0;
		
		if( this.getData( 'arrowTop' ) ) {
			topHeight = this.getData( 'topH' );
			which = 1;
		}

		if( this.getData( 'arrowBot' ) ) {
			botHeight = this.getData( 'botH' );
			if( which == 1 ) {
				which = 3
			}
			else {
				which = 2
			}
		}

		switch( which ) {
			case 1:
				div.style.height = 'calc(100% - ' + topHeight + 'px)'
				arrows[ 1 ].style.display = "none"
				break;
			case 2:
				div.style.height = 'calc(100% - ' + botHeight + 'px)'
				arrows[ 0 ].style.display = "none"
				break
			case 3:
				total = topHeight + botHeight
				div.style.height = 'calc(100% - ' + total + 'px)'
				break;
		}
	},

	/**
	 * This recreates an object with just the data-value
	 * @param {string} dv - The data-value of the element with which an object is created
	 * @returns {Object} obj - The lyte-nav info object
	 *
	 */

	recreateFromDv: function( dv ) {
		var sys = this.getData( 'ltPropSystemValue' ), i = 0,
		user = this.getData( 'ltPropUserValue' ), items = this.getData( 'ltPropItems' ) || [];

		for( ; i < items.length; i++ ) {
			if( items[ i ][ sys ] === dv ) {
				return items[ i ];
			}
		}
	},

	/**
	 * Find the index of the item that needs to be swapped out from the menu
	 * @param {String} dv - The data-value of the element
	 * @returns {Number} index - The index of the element in the rendered menu
	 *
	 */

	findInd: function( dv ) {
		var menus = this.getData( 'menuContent' ),
		i = 0, user = this.getData( 'ltPropUserValue' ),
		sys = this.getData( 'ltPropSystemValue' );

		for( ; i < menus.length; i++ ) {
			if( dv == menus[ i ][ sys ] ) {
				return i;
			}
		}
	},

	/**
	 * Set the click class to the item
	 * @param {String} dv - The data-value of the item which needs the click class
	 * 
	 */

	setSelected: function( dv ) {
		// Just set the click class to the item
		var newLast = this.$node.querySelector( 'lyte-nav-item[data-value="' + window._lyteUiUtils.escape( dv ) + '"]' ),
		click = this.getData( 'ltPropClick' );

		// Just a safety
		if( newLast ) {
			newLast.click();
		}
	},

	methods: {
		
		/**
		 * The menu was selected
		 * swap the menu item and the last item of the nav item
		 *
		 */

		itemSelected: function( ) {
			var selObj = arguments[ 4 ],
			click = this.getData( 'ltPropClick' ),
			item = selObj.element, aux = this.getData( 'auxArray' ),
			dv = this.getDataValue( item ), /* need to remove */ rm, ind = this.findInd( dv ),
			menus = this.getData( 'menuContent' ), /* need to remove */pushObj, prevSel,
			auxLength = aux.length, replacedObj, finalObj;

			prevSel = this.$node.querySelector( 'lyte-nav-item.' + click );
			if( prevSel ) {
				prevSel.classList.remove( click );
			}

			finalObj = this.recreateFromDv( dv );
			replacedObj = Lyte.arrayUtils( aux, 'replaceAt', auxLength - 1, finalObj );
			rm = Lyte.arrayUtils( menus, 'removeAt', ind, 1 );
			
			// Lyte.arrayUtils( aux, 'push', pushObj );
			// Lyte.arrayUtils( menus, 'replaceAt', ind, rm );

			Lyte.arrayUtils( menus, 'insertAt', ind, replacedObj );

			this.setSelected( dv );
			
			this.$node.recalculate();

			if( this.getMethods( 'onMenuClick' ) && !this.getData( 'preventCallback' ) ) {
				this.executeMethod( 'onMenuClick' );
			}
		},

		beforeOpen: function() {
			if( this.getMethods( 'onBeforeOpen' ) ) {
				this.executeMethod( 'onBeforeOpen' );
			}
		},

		open: function() {
			if( this.getMethods( 'onOpen' ) ) {
				this.executeMethod( 'onOpen' );
			}
		},

		beforeClose: function() {
			if( this.getMethods( 'onBeforeClose' ) ) {
				this.executeMethod( 'onBeforeClose' );
			}
		},

		close: function() {
			if( this.getMethods( 'onClose' ) ) {
				this.executeMethod( 'onClose' );
			}
		},

		befRender: function() {
			if( this.getData( 'beforeMenuRender' ) ) {
				this.executeMethod( 'beforeMenuRender' )
			}
		},

		aftRender: function() {
			if( this.getData( 'afterMenuRender' ) ) {
				this.executeMethod( 'afterMenuRender' );
			}
		}
	},

	data: function() {
		return {
			/**
			 * @componentProperty {object} ltPropMenu
			 * @default {}
			 * @version 1.0.8
			 * @component lyte-menu
			 */

			'ltPropMenu': Lyte.attr( 'object', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-nav', 'menu', {} ) } ),

			/**
			 * @componentProperty {boolean} ltPropNavYield
			 * @default false
			 * @version 1.0.8
			 * 
			 */

			'ltPropNavYield': Lyte.attr( 'boolean', { 'default': false } ),

			/**
			 * @componentProperty {boolean} ltPropMenuYield
			 * @default false
			 * @version 1.0.8
			 * 
			 */

			'ltPropMenuYield': Lyte.attr( 'boolean', { 'default': false } ),


			/**
			 * @componentProperty {array} ltPropItems
			 * @version 1.0.8
			 * @default []
			 */

			'ltPropItems': Lyte.attr( 'array', { 'default': [] } ),

			/**
			 * @componentProperty {string} ltPropUserValue
			 * @version 1.0.8
			 */

			'ltPropUserValue': Lyte.attr( 'string', { 'default': '' } ),

			/**
			 * @componentProperty {string} ltPropSystemValue
			 * @version 1.0.8
			 */

			'ltPropSystemValue': Lyte.attr( 'string', { 'default': '' } ),


			/**
			 * @componentProperty {string} ltPropMaxWidth
			 * @suffix %
			 * @default 90%
			 * @version 1.0.8
			 */
			
			'ltPropMaxWidth': Lyte.attr( 'string', { 'default': '90%' } ),

			/**
			 * @componentProperty {collapse|default} ltPropType
			 * @default default
			 * @version 1.0.8
			 */

			'ltPropType': Lyte.attr( 'string', { 'default': '' } ),

			/**
			 * @componentProperty {string} ltPropNavMenuClass
			 * @default lyteNavMenuClass
			 * @version 1.0.8
			 */

			'ltPropNavMenuClass': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-nav', 'navMenuClass', 'lyteNavMenuClass' ) } ),

			/**
			 * @componentProperty {string} ltPropMenuIcon
			 * @default lyteNavKebabMenu
			 * @version 1.0.8
			 */


			'ltPropMenuIcon': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-nav', 'menuIcon', 'lyteNavKebabMenu' ) } ),

			/**
			 * @componentProperty {string} ltPropContainerClass
			 * @default lyteNavIconContainer
			 * @version 1.0.8
			 */

			'ltPropContainerClass': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-nav', 'containerClass', 'lyteNavIconContainer' ) } ),
			

			/**
			 * @componentProperty {string} ltPropClick
			 * @default lyteNavActive
			 */

			'ltPropClick': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-nav', 'click', 'lyteNavActive' ) } ),

			/**
			 * @componentProperty {string} ltPropAlignment
			 * @default horizontal
			 * @options horizontal,vertical
			 */

			'ltPropAlignment':Lyte.attr( 'string', { 'default': 'horizontal' } ),

			/**
			 * @componentProperty {boolean} ltPropArrow
			 * @default true
			 * 
			 */

			'ltPropArrow': Lyte.attr( 'boolean', { 'default': true } ),

			'ltPropSelected': Lyte.attr( 'string', { 'default': '' } ),

			
			'menuContent': Lyte.attr( 'array', { 'default': [] } ),
			'auxArray': Lyte.attr( 'array', { 'default': [] } ),
			'arrowTop': Lyte.attr( 'boolean', { 'default': false } ),
			'arrowBot':Lyte.attr( 'boolean', { 'default': false } ),
			'showMenu': Lyte.attr( 'boolean', { 'default': false } )
		}
	}
})

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-nav-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-nav-item' ] = true;

	Lyte.createCustomElement( 'lyte-nav-item', {
		connectedCallback: function() {
			if( !this.prevent ) {

				var parent = this, component, align, div = this;

		    	while( 
		    		parent.tagName != 'LYTE-NAV' 
		    		&& parent.tagName != 'HTML' 
		    	) {
		      		parent = parent.parentElement
		    	}

		    	if( parent.tagName == 'HTML' ) {
		    		return ;
		  		}

		    	component = parent.component;
		    	align = component.getData( 'ltPropAlignment' );
		    	if( align === 'vertical' ) {
		        	while( div && !div.classList.contains( 'lyteNavDiv' ) ) {
		          		div = div.parentElement
		        	}
		   	 	}

		   	 	$L.fastdom.measure( function() {
		   	 		var offsetTop, newElemOffset;

		   	 		if( component && !component.$node ) {
		   	 			return ;
		   	 		}

		   	 		if( 
		    			this.hasAttribute( 'selected' ) 
		    			&& this.getAttribute( 'selected' ) 
		    		) {
		        		if( div && align === 'vertical' ) {   
		          			offsetTop = this.offsetTop;
		          			div.scrollTop = offsetTop
		          			if( offsetTop != 0 ) {
		            			component.setData( 'arrowTop', true );
		          			} 
		          			
		          			component.setData( 'arrowBot', false );
		        		}

		    		}
		    		else if( div && align === 'vertical' ) {
		      			newElemOffset = this.offsetTop;
		      			if( newElemOffset + this.getBoundingClientRect().height > div.getBoundingClientRect().height + div.scrollTop ) {
		           			component.setData( 'arrowBot', true )    
		        		}
		    		}
		   	 	}, this )

		    	

		   	 	if( !this._eventRegistered ) {
		   	 		this._eventRegistered = true;
		    		this.addEventListener( 'click', function() {
		      			this.setAttribute( 'selected', true );

		      			if( component.getMethods( 'onItemSelected' ) && !component.getData( 'preventCallback' ) ) {
		          			component.executeMethod( 'onItemSelected', this, component );
		          		}
		    		}.bind( this ) );
		   	 	}
		   	 	
			}
		},

		disconnectedCallback : function(){
			var curValue = this.getAttribute( 'lyte-shortcut' );
			if( curValue ) {
				this.setAttribute( 'lyte-shortcut', JSON.stringify( {} ) );
			}
		},

		static : {
			"observedAttributes" : {
				get : function() {
					return [ 'selected', 'lyte-shortcut' ];
				}
			}
		},

		/**
		 * The attrite changed callback will append classes to the lyte-nav-item
		 * It is fired when an element is appened to the DOM in chrome/opera/ff and when it is appended to any disconnected node in safari
		 *
		 */

		"attributeChangedCallback" : function( attributeName, oldValue, newValue, namespace ) {
			if( !this.prevent ) {
				var parent = this, component, click, prevSelected, val, dv;

				if ( attributeName === 'lyte-shortcut' ) {
		        	if ( typeof shortcut === 'function' ) {
		          		if ( !newValue ) {
		            		return;
		         	 	}
		          		newValue = JSON.parse( newValue );
		          		oldValue = oldValue ? JSON.parse( oldValue ) : {};
		          		shortcut.push( {
		           			newKey: newValue.key,
		            		type: newValue.type,
		            		wait: newValue.wait,
		            		oldKey: oldValue.key,
		            		value: this
		          		} );
		        	}
		      	} 
		      	else if ( attributeName == 'selected' && newValue && newValue !== 'false' ) {
		        	val = this.getAttribute( 'selected' );

		        	while (
		        		parent
		        		&& parent.tagName != 'LYTE-NAV' 
		        		&& parent.tagName != 'HTML' 
		        	) {
		          		parent = parent.parentElement;
		        	}

		        	if ( !parent || parent.tagName == 'HTML' ) {
		          		return;
		        	}

		        	component = parent.component;
		        	click = component.getData('ltPropClick');
		        	prevSelected = parent.querySelector('.' + click);
		        	if ( prevSelected && prevSelected != this ) {
		          		prevSelected.setAttribute( 'selected', '' );
		        	}

		        	if ( val ) {
		          		this.classList.add( click );

		          		dv = this.getAttribute( 'data-value' );

		          		if( dv ) {
		          			component.setData( 'preventSel', true );
		          			component.setData( 'ltPropSelected', dv );
		          			component.setData( 'preventSel', false );
		          		}
		        	}
		      	} 
		      	else if ( attributeName == 'selected' ) {
		        	parent = this;
		        	while ( 
		        		parent
		        		&& parent.tagName != 'LYTE-NAV' 
		        		&& parent.tagName != 'HTML' 
		        	) {
		          		parent = parent.parentElement;
		        	}

		        	if ( !parent || parent.tagName == 'HTML' ) {
		          		return;
		        	}

		        	component = parent.component;
		        	click = component.getData( 'ltPropClick' );
		        	this.classList.remove( click );

		        	if( !component.$node.querySelector( 'lyte-nav-item[selected="true"]' ) ) {
		        		component.setData( 'preventSel', true );
		          		component.setData( 'ltPropSelected', '' );
		          		component.setData( 'preventSel', false );
		        	}
		      	}
			}
		}
	});
}


var _lyteUiNav = {
	resize: function() {
		var navs = document.querySelectorAll( 'lyte-nav' ), 
		length = navs.length, i = 0, nav, comp;

		for( ; i < navs.length; i++ ) {
			nav = navs[ i ];
			comp = nav.component;

			if( comp && comp.getData( 'ltPropType' ) === 'collapse' ) {
				comp.recalculate();
			}
		}
	}
};

window.addEventListener( 'resize', function( event ) {
	var id = _lyteUiUtils.lyteNavId,
	isMobile = _lyteUiUtils.isMobile,
	width = _lyteUiUtils.nav_innerWidth, cur;

	if( isMobile && width ) {
		// Comparing the layout viewport widths to check if the orientation has changed
		cur = document.documentElement.clientWidth;

		if( cur !== width ) {
			_lyteUiUtils.nav_innerWidth = cur;
			_lyteUiNav.resize();
		}
	}
	else if( !isMobile ) {
		window.clearTimeout( id );

		// Debounce
		_lyteUiUtils.lyteNavId = window.setTimeout( function() {
			_lyteUiNav.resize();
		}, 16 /* yikes */ );
	}


} );

/**
 * @syntax nonYielded
 * <lyte-nav lt-prop-items='[ { "name": "Tab 1", "value": "1" }, { "name": "Tab 2", "value": "2" } ]' lt-prop-user-value="name" lt-prop-system-value="value"></lyte-nav>
 *
 */ 

