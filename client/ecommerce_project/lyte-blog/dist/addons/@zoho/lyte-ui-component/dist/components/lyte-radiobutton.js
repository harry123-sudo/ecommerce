/**
 * Renders a radiobutton
 * @component lyte-radiobutton
 * @version 1.0.0
 * @utility focus,blur,click
 * @methods onBeforeChecked,onBeforeUnchecked,onChecked,onUnchecked,onChanged
 */

Lyte.Component.register( 'lyte-radiobutton', {
_template:"<template tag-name=\"lyte-radiobutton\"> <template is=\"switch\" value=\"{{ltPropType}}\"><template case=\"default\"></template><template case=\"primary\"></template><template case=\"secondary\"> <label class=\"{{radioclass}}\" onmouseup=\"{{action('mup',event)}}\"> <input onkeypress=\"{{action('preventPropagation',event)}}\" type=\"radio\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" class=\"lyteHide\" onclick=\"{{action('valueChanged',event)}}\" disabled=\"{{ltPropDisabled}}\" checked=\"{{ltPropChecked}}\"> <span class=\"{{ltPropClass}}\"> <span class=\"lyteRadioCheck\"> </span> </span> <span class=\"{{ltPropLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </label> </template><template case=\"switch\"> <label class=\"\" onmouseup=\"{{action('mup',event)}}\"> <input onkeypress=\"{{action('preventPropagation',event)}}\" type=\"radio\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide on-off-sw\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('valueChanged',event)}}\"> <span class=\"{{ltPropClass}}\"> <span class=\"on-btn\"></span> </span> <span class=\"{{ltPropLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </label> </template><template case=\"slider\"> <label class=\"lyteRadioSliderLabel\" onmouseup=\"{{action('mup',event)}}\"> <input onkeypress=\"{{action('preventPropagation',event)}}\" type=\"radio\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('valueChanged',event)}}\"> <span class=\"{{ltPropClass}}\"> <span class=\"{{ltPropLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </span> </label> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"default":{"dynamicNodes":[],"additional":{"next":"primary"}},"primary":{"dynamicNodes":[],"additional":{"next":"secondary"}},"secondary":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"switch":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"slider":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropName","ltPropDisabled","ltPropChecked","ltPropLabel","ltPropValue","ltPropFireOnInit","ltPropLabelClass","ltPropClass","ltPropYield","ltPropAriaRadio","ltPropFocus","lyteUnbound"],
	data: function() {
		return {

			/**
			 * @componentProperty {default|primary|secondary|switch|slider} ltPropType
			 * @default default
			 */

			'ltPropType': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton', 'type', 'default' )
			} ),

			/**
			 * @componentProperty {string} ltPropName
			 */

			'ltPropName': Lyte.attr( 'string', { 
				'default': undefined
			} ),

			/**
			 * @componentProperty {boolean} ltPropDisabled
			 * @default false
			 * 
			 */

			'ltPropDisabled': Lyte.attr( 'boolean', { 
				'default': false
			} ),

			/**
			 * @componentProperty {boolean} ltPropChecked
			 * @default false
			 * 
			 */

			'ltPropChecked': Lyte.attr( 'boolean', { 
				'default': false
			} ),

			/**
			 * @componentProperty {string} ltPropLabel
			 */


			'ltPropLabel': Lyte.attr( 'string', { 
				'default': undefined
			} ),

			/**
			 * @componentProperty {string} ltPropValue
			 */
			'ltPropValue': Lyte.attr( 'string', { 
				'default': undefined
			} ),

			/**
			 * @componentProperty {boolean} ltPropFireOnInit
			 * @default false
			 * 
			 */

			'ltPropFireOnInit': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton', 'fireOnInit', false )
			} ),

			/**
			 * @componentProperty {string} ltPropLabelClass
			 */
			'ltPropLabelClass': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton', 'labelClass', '' ) 
			} ),

			/**
			 * @componentProperty {string} ltPropClass
			 */

			'ltPropClass': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton', 'class', '' )
			} ),

			/**
			 * @componentProperty {boolean} ltPropYield
			 * @version 2.2.8
			 * @default false
			 * 
			 */

			'ltPropYield': Lyte.attr( 'boolean', {
				'default': false
			} ), 
			'ltPropAriaRadio': Lyte.attr( 'object', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-radiobutton', 'ariaRadio', {} )
			} ),
			'ltPropFocus': Lyte.attr( 'boolean', {
				'default': false
			} ),

			'lyteUnbound': Lyte.attr( 'boolean', {
				'default': false
			} )
		}
	},

	ariaObserver: function( change ) {
		var oldAria = change.oldValue,
		newAria = change.newValue;

		this.addAriaValues( oldAria, newAria );
	}.observes( 'ltPropAriaRadio' ),

	didDestroy: function() {
		delete this.$node.focus;
		delete this.$node.blur;
		delete this.$node.click;
	},

	changeStyle: function() {
		this.changeStyleFunction()
	}.observes( 'ltPropType' ),

	changeStyleFunction: function() {

		var type = this.getData( 'ltPropType' ), 
		checked = this.getData('ltPropChecked'),
		cls = this.getData( 'ltPropClass' ), 
		labelCls = this.getData( 'ltPropLabelClass' );

		if( 
			type.indexOf( 'slider' ) === -1 
			&& type.indexOf( 'switch' ) === -1 
			&& type.indexOf( 'default' ) === -1 
			&& type.indexOf( 'primary' ) === -1 
			&& type.indexOf( 'secondary' ) === -1 
		) {
			this.setData( 'ltPropType', 'default' );
		}

		if( type.indexOf( 'default' ) !== -1 ) {
			this.setData( 'radioclass', 'lyteRadioBtn lyteDefault' )
			this.setData( 'ltPropClass', cls ? cls : 'lyteRadioLayer' ) 
			this.setData( 'ltPropLabelClass', labelCls ? labelCls : 'lyteRadioLabel' )
		}
		else if( type.indexOf( 'primary' ) !== -1 ) {
			this.setData( 'radioclass', 'lyteRadioBtn lytePrimary' )
			this.setData( 'ltPropClass', cls ? cls : 'lyteRadioLayer' )
			this.setData( 'ltPropLabelClass', labelCls ? labelCls : 'lyteRadioLabel' )
		}
		else if( type.indexOf( 'secondary' ) !== -1 ) {
			this.setData( 'radioclass', 'lyteRadioBtn lyteSecondary' )
			this.setData( 'ltPropClass', cls ? cls : 'lyteRadioLayer' )
			this.setData( 'ltPropLabelClass', labelCls ? labelCls : 'lyteRadioLabel' )
		}
		else if( type.indexOf( 'switch' ) !== -1 ) {
			this.setData( 'ltPropClass', cls ? cls : 'lyteRadioSwitch' )	
			this.setData( 'ltPropLabelClass', labelCls ? labelCls : 'lyteRadioLabel' )	
		}
		else if( type.indexOf('slider') !== -1 ) {
			this.setData( 'ltPropClass', cls ? cls : 'lyteRadioSlider' )	
			this.setData( 'ltPropLabelClass', labelCls ? labelCls : 'lyteRadioSliderText' )	
		}
	},

	reduceOpacity: function() {
		if( this.getData( 'ltPropDisabled' ) ) {
			this.$node.classList.add( 'lyteRadioDisabled' );
		}
		else {
			this.$node.classList.remove( 'lyteRadioDisabled' );
		}
	},

	disabledChange: function() {
		this.reduceOpacity();
	}.observes( 'ltPropDisabled' ),

	init: function() {
		this.changeStyleFunction();
	},

	didConnect: function() {
		var that = this, newAria = this.getData( 'ltPropAriaRadio' );

		this.reduceOpacity();

		this.$node.click = function() {
			var ev = new Event( 'click', {
				bubbles: true,
				cancelable: true
			} ),
			node = that.$node,
			checked = node.ltProp( 'checked' ),
			disabled = node.ltProp( 'disabled' );

			if( disabled ) {
				return ;
			}

			node.component.clickFn = true;

			if( !checked ) {
				if( node._fR ) {
					// Just calling resetValues here to make things less complicated
					node.component.resetValues();
					node.component.checkFR( node );
				}
				else {
					node.ltProp( 'checked', true );
				}
			}

			node.component.clickFn = false;

			node.dispatchEvent( ev );
		}

		this.$node.focus = function() {
			var node = that.$node,
			input = node.querySelector( 'input' ),
			disabled = node.ltProp( 'disabled' );

			if( disabled ) {
				return ;
			}

			input.focus();
		}

		this.$node.blur = function() {
			var node = that.$node,
			input = node.querySelector( 'input' ),
			disabled = node.ltProp( 'disabled' );

			if( disabled ) {
				return ;
			}

			input.blur();
		}

		this.callMethodsOnInit( true );
		this.addAriaValues( {}, newAria );
	},

	addAriaValues: function( oldAria, newAria ) {
		var radio = this.getRadioWidget();

		_lyteUiUtils.setAttribute( radio, newAria, oldAria );
	},

	getRadioWidget: function() {
		return this.$node.querySelector( 'input' );
	},

	check: function( inp, comp ) {
		if( this.getMethods( 'onChecked' ) ) {
			this.executeMethod( 'onChecked', inp, comp, this.eventType() );
		}
	},

	uncheck: function( inp, comp ) {
		if( this.getMethods( 'onUnchecked' ) ) {
			this.executeMethod( 'onUnchecked', inp, comp, this.eventType() );
		}
	},

	beforeCheck: function( inp, comp ) {
		if( this.getMethods( 'onBeforeChecked' ) ) {
			return this.executeMethod( 'onBeforeChecked', inp, comp, this.eventType() );
		}
	},

	beforeUncheck: function( inp, comp ) {
		if( this.getMethods( 'onBeforeUnchecked' ) ) {
			return this.executeMethod( 'onBeforeUnchecked', inp, comp, this.eventType() );
		}
	},

	onchanged: function( inp, comp ) {
		if( this.getMethods( 'onChanged' ) ) {
			this.executeMethod( 'onChanged', inp, comp, this.eventType() );
		}
	},

	checkCurrentRadio: function() {
		this.eveType = 'key';
		this.setData( 'ltPropChecked', true );
		this.eveType = '';
	},

	checkNextRadio: function() {
		var radios = this.extractAllRadios(),
		nextRadioIndex = this.getCheckableRadio( radios, 1 );

		if( nextRadioIndex !== -1 ) {
			radios[ nextRadioIndex ].component.eveType = 'key';
			radios[ nextRadioIndex ].ltProp( 'checked', true );
			radios[ nextRadioIndex ].component.eveType = '';
		}
	},

	checkPreviousRadio: function() {
		var radios = this.extractAllRadios(),
		previousRadioIndex = this.getCheckableRadio( radios, -1 );

		if( previousRadioIndex !== -1 ) {
			radios[ previousRadioIndex ].component.eveType = 'key';
			radios[ previousRadioIndex ].ltProp( 'checked', true );
			radios[ previousRadioIndex ].component.eveType = '';
		}
	},

	getCheckableRadio: function( radios, indexChange ) {
		var currentRadioIndex = this.getIndex( radios ),
		totalRadios = radios.length,
		index = currentRadioIndex;

		for( var i = 0; i < totalRadios; i++ ) {
			index = index + indexChange;

			if( index < 0 ) {
				index = totalRadios - 1;
			}
			else if( index === totalRadios ) {
				index = 0;
			}

			if( !radios[ index ].ltProp( 'disabled' ) || index === currentRadioIndex ) {
				return index;
			}
		}

		return -1;
	},

	extractAllRadios: function() {
		var name = this.getData( 'ltPropName' ), i = 0, radio,
		inp = document.querySelectorAll( 'input[type="radio"][name="' + name + '"]' ),
		result = [];

		for( ; i < inp.length; i++ ) {
			radio = inp[ i ];

			while( radio.tagName !== 'LYTE-RADIOBUTTON' 
					&& radio.tagName !== 'HTML' 
			) {
				radio = radio.parentElement;
			}

			if( radio.tagName === 'LYTE-RADIOBUTTON' ) {
				result.push( radio );
			}
		}

		return result;
	},

	getIndex: function( result ) {
		return result.indexOf( this.$node );
	},

	extractRadios: function() {
		var name = this.getData( 'ltPropName' ), i = 0, tag,
		inp = document.querySelectorAll( 'input[type="radio"][name="' + name + '"]' );

		for( ; i < inp.length; i++ ) {
			tag = inp[ i ];

			while( tag.tagName !== 'LYTE-RADIOBUTTON' 
					&& tag.tagName !== 'HTML' 
			) {
				tag = tag.parentElement;
			}

			if( tag.tagName === 'LYTE-RADIOBUTTON'
				&& tag.ltProp( 'checked' ) 
				&& tag != this.$node
			) {
				return tag;
			}
		}
	},

	changeChecks: function( change ) {
		var radio = this.extractRadios(), 
		inp = radio && radio.querySelector( 'input' ),
		comp = radio && radio.component,
		cur = this.$node.querySelector( 'input' ),
		ret_uncheck, ret_check;

		// A checked radiobutton is checked
		// This check probably never executes because 
		// observers never fire when oldValue and newValue are the same. Its just a safety check
		if( change.newValue && change.oldValue ) {
			return ;
		}

		// A radiobutton that is different from the currently checked radiobutton is checked
		else if( change.newValue ) {
			this.setData( 'prevent', true );
			this.setData( 'ltPropChecked', false );

			// Unchecking the previously checked radiobutton and calling before uncheck callbacks
			if( radio ) {
				ret_uncheck = this.beforeUncheck( cur, this );
			}

			if( ret_uncheck === false ) {
				this.revertState( radio, this.$node );

				return ;	
			}

			ret_check = this.beforeCheck( cur, this );

			if( ret_check === false ) {
				this.revertState( radio, this.$node );

				return ;
			}

			// calling the uncheck callback of the previously checked radiobutton 
			if( radio ) {
				comp.setData( 'prevent', true );
                radio.ltProp( 'checked', false );
                comp.setData( 'prevent', false );
				this.uncheck( cur, this );
			}

			this.setData( 'ltPropChecked', true );
			this.setData( 'prevent', false );

			this.check( cur, this );
			this.onchanged( cur, this );
		}

		// A radiobutton is unchecked but it was not previously unchecked
		else if( !change.newValue && change.oldValue ) {
			this.setData( 'prevent', true );
			this.setData( 'ltPropChecked', true );

			ret_uncheck = this.beforeUncheck( cur, this );
			
			if( ret_uncheck === false ) {
				this.revertState( this.$node, {} );

				return ;
			}

			this.setData( 'ltPropChecked', false );
			this.uncheck( cur, this );
			this.onchanged( cur, this );
			this.setData( 'prevent', false );
		}
 
	},

	change: function( change ) {

		var name = this.getData( 'ltPropName' ),
		input = document.querySelector( 'input[type="radio"][name="' + name + '"]:checked' );

		if( !this.getData( 'onChange' ) ) {
			this.changeChecks( change );
		}
		else {
			if( !change.newValue ) {
				this.uncheck( input, this.getData( 'second' ) );
			}
			else {
				this.check( input, this );
			}
		}	
	},

	resetValues: function() {
		var name = this.getData( 'ltPropName' ),
		radios = document.querySelectorAll( 'input[type="radio"][name="' + name + '"]' ),
		i = 0, len = radios.length, comp;

		for( ; i < len; i++ ) {
			comp = radios[ i ].parentElement.parentElement.component;
			comp.setData( 'prev', undefined );
			comp.setData( 'node', undefined )
		}

	},

	valueChanged: function( change ) {
		this.fireCallbacks( change );	
	}.observes( 'ltPropChecked' ),

	fireCallbacks: function( change ) {
		var prev = change.oldValue,
		cur = change.newValue;

		if( prev && !cur ) {
			this.resetValues();
		}

		if( this.getData( 'prevent' ) ) {
			return ;
		}

		if( cur ) {
			this.$node.focus();
		}

		this.change( change );
	},

	focusRadioButton: function() {
		var shouldFocus = this.getData( 'ltPropFocus' );

		if( shouldFocus ) {
			this.$node.focus();
		}

		this.data.ltPropFocus = false;
	}.observes( 'ltPropFocus' ).on( 'didConnect' ),

	// Returns undefined when node is undefined
	
	getParentRadio: function( node ) {
		while( node 
			&& node.tagName !== 'LYTE-RADIOBUTTON' ) {
			node = node.parentElement;
		}

		return node;
	},

	revertState: function( uncheckedRadio, checkedRadio ) {
		var uncheckedRadioComp = ( uncheckedRadio || {} ).component,
		checkedRadioComp = ( checkedRadio || {} ).component;

		if( uncheckedRadioComp ) {
			uncheckedRadioComp.setData( 'prevent', true );
			uncheckedRadioComp.setData( 'ltPropChecked', true );
			uncheckedRadio.querySelector( 'input' ).checked = true;
			uncheckedRadioComp.setData( 'prevent', false );
		}

		if( checkedRadioComp ) {
			checkedRadioComp.setData( 'prevent', true );
			checkedRadioComp.setData( 'ltPropChecked', false );
			checkedRadio.querySelector( 'input' ).checked = false;
			checkedRadioComp.setData( 'prevent', false );
		}
		
	},

	callMethodsOnInit: function() {
		var foi = this.getData( 'ltPropFireOnInit' ), 
		checked = this.getData( 'ltPropChecked' );

		if(	!foi ) {
			return ;
		}

		if( checked ) {
			var element = this.$node.querySelector( 'input' ),
			value = element.getAttribute( 'value' );

			this.beforeCheck( element, this );
			this.check( element, this );
			this.onchanged( element, this );
		}
	},

	checkFR: function( node ) {

		node.component.setData( 'ltPropChecked', true );
		node.querySelector( 'input' ).checked = true;

		node.component.fireCallbacks( {
			oldValue: false,
			newValue: true
		} );
	},

	uncheckFR: function( node ) {

		node.component.setData( 'ltPropChecked', false );
		node.querySelector( 'input' ).checked = false;

		node.component.fireCallbacks( {
			oldValue: true,
			newValue: false
		} );
	},

	eventType: function() {
		var isClicked = this.clicked || this.clickFn,
		key = this.eveType;

		if( isClicked ) {
			return 'click';
		}

		return key ? key : 'script';
	},

	actions: {
		preventPropagation: function() {
			if( event.keyCode === 32 ) {
				this.preventClick = true;
			}
		},

		mup: function( event ) {
			var name = this.getData( 'ltPropName' ), 
			checkedNode = document.querySelector( 'input[type="radio"][name="' + name + '"]:checked' ), ret_check, ret_uncheck;

			this.setData( 'shouldCallUnChecked', false );
			if( checkedNode ) {
				this.setData( 'prev', checkedNode.getAttribute( 'value' ) );
				this.setData( 'node', checkedNode );
				this.setData( 'shouldCallUnChecked', true );
			} 

			var element = this.$node.querySelector( 'input' ), checked = element.checked;

			if( element.disabled ) {
				return ;
			}

			if( !checked ) {
				this.clicked = true;

				if( this.getData( 'shouldCallUnChecked' ) ) {
					ret_uncheck = this.beforeUncheck( element, this );

					if( ret_uncheck === false ) {
						this.setData( 'revertState', true );
						this.clicked = false;
						return ;
					}
				}

				ret_check = this.beforeCheck( element, this );

				if( ret_check === false ) {
					this.setData( 'revertState', true );
					this.clicked = false;
					return ;
				}
			}
		},

		valueChanged: function( event ) {
			var ele = event.target, 
			val = ele.getAttribute( 'value' ), 
			prev = this.getData( 'prev' ), 
			node = this.getData( 'node' ),
			revert = this.getData( 'revertState' ),
			uncheckedRadio = this.getParentRadio( node ),
			checkedRadio = this.$node,
			comp = node && node.parentElement.parentElement.component,
			parent = ele.parentElement.parentElement;

			event.stopPropagation();

			if( this.preventClick ) {
				this.preventClick = false;
				return ;
			}

			if( val === prev ) {
				return ;
			}

			if( revert ) {
				this.revertState( uncheckedRadio, checkedRadio );
				this.setData( 'node', undefined );

				// Just a safety
				this.clicked = false;

				return ;
			}

			if( node ) {
				while( node.tagName !== 'LYTE-RADIOBUTTON' ) {
					node = node.parentElement;
				}

				comp.setData( 'onChange', true );

				// We are using a variable called second so that we can pass the current radiobutton's this to the callback.
				// We won't get the current radiobutton's this in a different radiobutton's observer - we are setting ltPropChecked to false below.
				comp.setData( 'second', this );

				if( node._fR ) {
					this.uncheckFR( node );
				}
				else {
					node.ltProp( 'checked', false );
				}
				
				comp.setData( 'second', undefined );

				comp.setData( 'onChange', false );
			}

			node = this.getData( 'node' );
			if( node ) {
				this.setData( 'node', undefined );
			}

			this.setData( 'onChange', true );

			if( this.$node._fR ) {
				this.checkFR( this.$node );
			}
			else {
				this.setData( 'ltPropChecked', true );
			}
			
			this.setData( 'onChange', false );
			this.onchanged( ele, this );	
			this.clicked = false;
		}
	}
} );

document.addEventListener( 'keydown', function( event ) {
	var keyCode = event.keyCode, node, checked, comp;

	if( keyCode === 37 
		|| keyCode === 38 
		|| keyCode === 39 
		|| keyCode === 40
		|| keyCode === 32 
	) {

		node = document.activeElement;

		if( node.tagName !== 'INPUT' ) {
			return ;
		}

		while( node.tagName !== 'LYTE-RADIOBUTTON' 
			&& node.tagName !== 'HTML' 
		) {
			node = node.parentElement;
		}

		if( node.tagName === 'LYTE-RADIOBUTTON' ) {
			comp = node.component;
			event.preventDefault();

			switch( keyCode ) {
				case 37:
				case 38:
					comp.checkPreviousRadio();
					break;
				case 39:
				case 40:
					comp.checkNextRadio();
					break;
				case 32:
					comp.checkCurrentRadio();
					break;
			}
		}
	}
} );

/**
 * @syntax nonYielded
 * <lyte-radiobutton lt-prop-value="1" lt-prop-label="check me" lt-prop-name="group-1"></lyte-radiobutton>
 */

 /**
  * @syntax yielded
  * <lyte-radiobutton lt-prop-value="1" lt-prop-name="group-1" lt-prop-yield="true">
  *     <template is="registerYield" yield-name="yield">
  *         check me
  *     </template>
  * </lyte-radiobutton>
  */
 
