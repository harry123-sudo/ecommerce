/**
 * Renders a checkbox
 * @component lyte-checkbox
 * @version 1.0.0
 * @utility focus,blur,click
 * @methods onBeforeChecked,onChecked,onChanged,onBeforeUnchecked,onUnchecked
 */

Lyte.Component.register( 'lyte-checkbox', {
_template:"<template tag-name=\"lyte-checkbox\" onkeydown=\"{{action('preventInputClick',event)}}\" onkeyup=\"{{action('preventInputClick',event)}}\"> <template is=\"switch\" value=\"{{ltPropType}}\"> <template case=\"default\"> <label class=\"lyteCheckbox lyteDefault\" onmouseup=\"{{action('mup',event)}}\" onclick=\"{{action('prevent',event)}}\"> <input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" tabindex=\"{{ltPropTabindex}}\" disabled=\"{{ltPropDisabled}}\" class=\"\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\"> <span class=\"{{ltPropFinalClass}}\"> <span class=\"{{ltPropFinalLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </span> </label> </template> <template case=\"primary\"> <label class=\"lyteCheckbox lytePrimary\" onmouseup=\"{{action('mup',event)}}\" onclick=\"{{action('prevent',event)}}\"> <input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" tabindex=\"{{ltPropTabindex}}\" disabled=\"{{ltPropDisabled}}\" class=\"\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\"> <span class=\"{{ltPropFinalClass}}\"> <span class=\"{{ltPropFinalLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </span> </label> </template> <template case=\"switch\"> <label class=\"\" onmouseup=\"{{action('mup',event)}}\" onclick=\"{{action('prevent',event)}}\"> <input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" tabindex=\"{{ltPropTabindex}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide on-off-sw\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\"> <span class=\"{{ltPropFinalClass}}\"> <span class=\"on-btn\"></span> </span> <span class=\"{{ltPropFinalLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </label> </template> <template case=\"slider\"> <label class=\"lyteCheckSliderLabel\" onmouseup=\"{{action('mup',event)}}\" onclick=\"{{action('prevent',event)}}\"> <input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" tabindex=\"{{ltPropTabindex}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\"> <span class=\"{{ltPropFinalClass}}\"> <span class=\"{{ltPropFinalLabelClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> {{ltPropLabel}} </template></template> </span> </span> </label> </template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"default":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"primary":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"switch":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"slider":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropType","ltPropId","ltPropDisabled","ltPropChecked","ltPropLabel","ltPropName","ltPropValue","ltPropReadonly","ltPropFireOnInit","ltPropClass","ltPropLabelClass","ltPropTabindex","lyteUnbound","ltPropYield","ltPropAriaCheckbox","ltPropFocus"],
	data: function() {
    	return {
    		/**
			 * @componentProperty {default | primary | secondary | switch | slider} ltPropType=default
			 */

			'ltPropType': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox', 'type', 'default' )  
			} ),

			/**
			 * @componentProperty {string} ltPropId
			 */

			'ltPropId': Lyte.attr( 'string', { 
				'default': undefined
			} ),

			/**
			 * @componentProperty {boolean} ltPropDisabled=false
			 */

			'ltPropDisabled': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {boolean} ltPropChecked=false
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
			 * @componentProperty {string} ltPropName
			 */

			'ltPropName': Lyte.attr( 'string', {
				'default': undefined
			} ),

			/**
			 * @componentProperty {string} ltPropValue
			 */

			'ltPropValue': Lyte.attr( 'string', { 
				'default': undefined
			} ),

			/**
			 * @componentProperty {boolean} ltPropReadOnly=false
			 */

			'ltPropReadonly': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 */

			'ltPropFireOnInit': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox', 'fireOnInit', false )
			} ),

			/**
			 * @componentProperty {string} ltPropClass
			 */

			'ltPropClass': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox', 'class', '' )
			} ),

			/**
			 * @componentProperty {string} ltPropLabelClass
			 */

			'ltPropLabelClass': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox', 'labelClass', '' )
			} ),

			/**
			 * @componentProperty {number} ltPropTabindex=0
			 */

			'ltPropTabindex': Lyte.attr( 'number', {
				'default': 0
			} ),
			'lyteUnbound': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {boolean} ltPropYield=false
			 * @version 2.2.8
			 */

			'ltPropYield': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {object} ltPropAriaCheckbox={}
			 * @version 3.1.0
			 */


			'ltPropAriaCheckbox': Lyte.attr( 'object', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-checkbox', 'ariaCheckbox', {} )
			} ),

			/**
			 * @componentProperty {boolean} ltPropFocus=false
			 * @version 3.2.0
			 */

			'ltPropFocus': Lyte.attr( 'boolean', {
				'default': false
			} )
		}
	},

	ariaObserver: function( change ) {
		var oldAria = change.oldValue,
		newAria = change.newValue;

		this.addAriaValues( oldAria, newAria );
	}.observes( 'ltPropAriaCheckbox' ),

	didDestroy: function() {
		delete this.$node.focus;
		delete this.$node.blur;
		delete this.$node.click;
	},

	reduceOpacity: function() {
		if( this.getData( 'ltPropDisabled' ) ) {
			this.$node.classList.add( 'lyteCheckDisabled' );
		}
		else {
			this.$node.classList.remove( 'lyteCheckDisabled' );
		}
	},

	disabledChange: function() {
		this.reduceOpacity();
	}.observes( 'ltPropDisabled' ),

	setDefaults: function() {
		var type = this.getData( 'ltPropType' ), 
		cls = this.getData( 'ltPropClass' ),
		label = this.getData( 'ltPropLabelClass' );

		if( type === 'switch' ) {
			this.setData( 'ltPropFinalClass', cls ? cls : 'lyteCheckSwitch' );
		}
		else if( type === 'default' ) {
			this.setData( 'ltPropFinalClass', cls ? cls : 'lyteCheckBoxDefault' );
		}
		else if( type === 'primary' ) {
			this.setData( 'ltPropFinalClass', cls ? cls : 'lyteCheckBoxPrimary' );
		}
		else if( type === 'slider' ) {
			this.setData( 'ltPropFinalClass', cls ? cls : 'lyteCheckSlider' );
		}

		if( type === 'slider' ) {
			this.setData( 'ltPropFinalLabelClass', label ? label : 'lyteCheckSliderText' );
		}
		else {
			this.setData( 'ltPropFinalLabelClass', label ? label : '' );
		}
	},

	typeObs: function() {
		this.setDefaults();
	}.observes( 'ltPropType', 'ltPropClass', 'ltPropLabelClass' ).on( 'init' ),

	didDestroy: function() {
		delete this.$node.focus;
		delete this.$node.blur;
		delete this.$node.click;
	},

	focusInput: function() {
		var input = this.$node.querySelector( 'input' ),
		doesNeedFocus = document.activeElement !== input;

		// Clicking on label doesn't focus checkbox in ff and safari
		if( doesNeedFocus ) {
			input.focus();
		}
	},

	didConnect: function() {
		var that = this, newAria = this.getData( 'ltPropAriaCheckbox' );

		this.reduceOpacity();
		
		this.$node.click = function() {
			var ev = new Event( 'click', {
				bubbles: true,
				cancelable: true
			} ),
			node = that.$node,
			checked = node.ltProp( 'checked' ),
			disabled = node.ltProp( 'disabled' ),
			readonly = node.ltProp( 'readonly' ),
			unbound = that.getData( 'lyteUnbound' ),
			item = that.$node.querySelector( 'input' );

			if( disabled || readonly ) {
				return ;
			}

			that.setData( 'eventCache', ev );
			// that.setData( 'preventRefire', true );

			that.clickFn = true;

			if( checked ) {
				node.ltProp( 'checked', false );
			}
			else {
				node.ltProp( 'checked', true );
			}

			// Unbound checkboxes don't check/uncheck visually on their own because we rely on lt-prop-checked to do it
			// TODO: The input will be checked in onBefore callbacks
			// TODO: This needs to be changed when LN provides the relevant APIs to check if it is unbound
			if( that.$node._fR ) {
				item.checked = node.ltProp( 'checked' );

				if( item.checked ) {
					item.setAttribute( 'checked', '' );
				}
				else {
					item.removeAttribute( 'checked' )
				}
				that.fireCallBacksFunction( {}, false );
			}

			that.clickFn = false;
			// that.setData( 'preventRefire', false );
			// that.fireCallBacksFunction( {}, false );
			node.dispatchEvent( ev );
		}

		this.$node.focus = function() {
			var node = that.$node,
			input = node.querySelector( 'input' ),
			disabled = node.ltProp( 'disabled' ),
			readonly = node.ltProp( 'readonly' );

			if( disabled || readonly ) {
				return ;
			}

			input.focus();
		}

		this.$node.blur = function() {
			var node = that.$node,
			input = node.querySelector( 'input' ),
			disabled = node.ltProp( 'disabled' ),
			readonly = node.ltProp( 'readonly' );

			if( disabled || readonly ) {
				return ;
			}

			input.blur();
		}

		this.fireCallBacksFunction.call( this, undefined, true );
		this.addAriaValues( {}, newAria );
	},

	addAriaValues: function( oldAria, newAria ) {
		var checkbox = this.getCheckboxWidget();

		_lyteUiUtils.setAttribute( checkbox, newAria, oldAria );
	},

	getCheckboxWidget: function() {
		return this.$node.querySelector( 'input' );
	},

	fireCallbacks:function( change, onrender ) {
		if( this.getData( 'preventRefire' ) ) {
			return ;
		}

		if( this.getData( 'preventObs' ) ) {
			return ;
		}

		if( this.getData( 'handleLbind' ) ) {

			this.setData( 'preventObs', true );
			this.setData( 'ltPropChecked', !this.getData( 'ltPropChecked' ) );
			this.setData( 'preventObs', false );

			this.setData( 'handleLbind', false );
			return ;
		}
		
		this.fireCallBacksFunction.call( this, change, onrender );
	}.observes( 'ltPropChecked' ),

	focusCheckbox: function() {
		var shouldFocus = this.getData( 'ltPropFocus' );

		if( shouldFocus ) {
			this.$node.focus();
		}

		this.data.ltPropFocus = false;
	}.observes( 'ltPropFocus' ).on( 'didConnect' ),

	fireCallBacksFunction: function( arg1, onrender ) {
		var checked = this.getData( 'ltPropChecked' ), 
		foi = this.getData( 'ltPropFireOnInit' ), returnval,
		eventCache = this.getData( 'eventCache' ), shouldBreak;

		// This property is very misleading don't use it for anything
		this.$node.checked = checked ? checked : false;

		if( checked && onrender ) {
			if( !foi ) {
				return ;
			}

			var input = this.$node.querySelector( 'input' );
			if( this.getMethods( 'onBeforeChecked' ) ) {
				this.executeMethod( 'onBeforeChecked', input, this, eventCache, 'script' );
			}

			if( this.getMethods( 'onChecked' ) ) {
				this.executeMethod( 'onChecked', input, this, eventCache, 'script' )
			}

			if( this.getMethods( 'onChanged' ) ) {
				this.executeMethod('onChanged', input, this, eventCache, 'script' )
			}
		}
		else if( this.$node.checked && !onrender ) {
			var input = this.$node.querySelector( 'input' );

			if( !this.clicked ) {
				this.setData( 'preventRefire', true );

				if( this.getMethods( 'onBeforeChecked' ) ) {

					this.data.ltPropChecked = false;
					input.checked = false;

					// can return undefined or false
					shouldBreak = this.executeMethod( 'onBeforeChecked', input, this, eventCache, this.eventType() ) === false;

					if( shouldBreak ) {
						if( this.isCheckedLbound() ) {
							this.setData( 'handleLbind', true );
						}
						else {

							// I am doing this so that the framework will set the checked attribute
							this.data.ltPropChecked = true;
							this.setData( 'ltPropChecked', false );
						}

						this.setData( 'preventRefire', false );

						return ;
					}
					else {
						this.data.ltPropChecked = true;
						input.checked = true;
					}
				}
				
				this.setData( 'preventRefire', false );
			}

			if( this.getMethods( 'onChecked' ) ) {
				this.executeMethod( 'onChecked', input, this, eventCache, this.eventType() );
			}

			this.toggleClass( 'lyteCboxChecked' );

			if( this.getMethods( 'onChanged' ) ) {
				this.executeMethod( 'onChanged', input, this, eventCache, this.eventType() );
			}
		}
		else if( !this.$node.checked && !onrender ) {
			var input = this.$node.querySelector( 'input' );

			if( !this.clicked ) {
				this.setData( 'preventRefire', true );
				// this.setData( 'ltPropChecked', true );

				if( this.getMethods( 'onBeforeUnchecked' ) ) {

					this.data.ltPropChecked = true;
					input.checked = true;

					shouldBreak = this.executeMethod( 'onBeforeUnchecked', input, this, eventCache, this.eventType() ) === false;

					if( shouldBreak ) {
						if( this.isCheckedLbound() ) {
							this.setData( 'handleLbind', true );
						}
						else {
							this.data.ltPropChecked = false;
							this.setData( 'ltPropChecked', true );
						}

						this.setData( 'preventRefire', false );

						return ;
					}
					else {
						this.data.ltPropChecked = false;
						input.checked = false;
					}
				}

				this.setData( 'preventRefire', false);
			}

			if( this.getMethods( 'onUnchecked' ) ) {
				this.executeMethod( 'onUnchecked', input, this, eventCache, this.eventType() );
			}

			this.toggleClass( 'lyteCboxUnchecked' );

			if( this.getMethods( 'onChanged' ) ) {
				this.executeMethod( 'onChanged', input, this, eventCache, this.eventType() );
			}
		}

	},

	// class added only when it is checked/unchecked by user. Not added during initial render. Used to handle animations
	toggleClass: function( cls ) {
		var clsToRemove = cls === 'lyteCboxChecked' ? 'lyteCboxUnchecked' : 'lyteCboxChecked';

		this.$node.classList.remove( clsToRemove );
		this.$node.classList.add( cls );
	},

	eventType: function() {
		var isClicked = this.clicked || this.clickFn,
		key = this.eveType;

		if( !isClicked ) {
			return 'script';
		}

		return key ? key : 'click';
	},

	isCheckedLbound: function() {
		if( !this.$node._attributeDetails ) {
			return false;
		}

		return this.$node._attributeDetails[ 'lt-prop-checked' ] ? !!this.$node._attributeDetails[ 'lt-prop-checked' ].isLbind : false;
	},

	isNodeDestroyed: function() {
		return !this.$node;
	},

	fireClick: function( event ) {
		var input, hasClickHandlerFired = this.getData( 'sendEvent' ),
		disabled = this.getData( 'ltPropDisabled' ), clickEvent;

		this.isTimeoutInitiated = false;

		// sendEvent is going to tell us if the click handler was called or not
		if( !this.isNodeDestroyed() && !hasClickHandlerFired && !disabled ) {
			input = this.$node.querySelector( 'input' );
			input.checked = !input.checked;

			// This calls the click function
			clickEvent = new Event( 'click' );
			clickEvent.shiftKey = true;
			input.dispatchEvent( clickEvent );
		}
	},

	actions: {
		preventInputClick: function( event ) {
			if( event.keyCode === 32 ) {
				event.preventDefault();	
			}
		},

		mup: function( event ) {
			this.setData( 'prevented', false );
			this.setData( 'sendEvent', false );

			var disabled = this.getData( 'ltPropDisabled' ), checked, returnval;

			if( disabled ) {
				return ;
			}

			var ele =  this.$node.querySelector( 'input' )
			checked = ele.checked
			if( this.getMethods( 'onBeforeChecked' ) && !checked ) {
				returnval = this.executeMethod( 'onBeforeChecked', ele, this, event, 'click' ) == false ? false : true;
				if( !returnval ) {
					this.setData( 'prevented', true );
					event.preventDefault();
				}
			}

			else if( this.getMethods( 'onBeforeUnchecked' ) && checked ) {
				returnval = this.executeMethod( 'onBeforeUnchecked', ele, this, event, 'click' ) == false ? false : true;
				if( !returnval ) {
					this.setData( 'prevented', true )
					event.preventDefault();
				}
			}
		},

		prevent: function( event ) {
			var se = this.getData( 'sendEvent' ),
			isFireFox = !!~window.navigator.userAgent.indexOf( 'Firefox' ),
			isTimeoutInitiated = this.isTimeoutInitiated;

			// Two events originate - one from the user click and another from the browser click
			// We only allow the user click event to bubble up not the browser click

			// In the newer versions of the framework 3 events are originating.?
			if( !se ) {
				event.stopPropagation();
			}

			// Insanely hacky solution to fix firefox bug
			// https://bugzilla.mozilla.org/show_bug.cgi?id=559506
			if( isFireFox && !isTimeoutInitiated ) {
				this.isTimeoutInitiated = true;
				setTimeout( this.fireClick.bind( this, event ), 0 );	
			}
			
		}, 

		checkBoxClicked: function( event ) {

			this.setData( 'sendEvent', true );
			this.setData( 'eventCache', event );
			this.clicked = true
			var input;

			this.focusInput();

			if( this.getData( 'prevented' ) ) {
				input = this.$node.querySelector( 'input' );
				this.setData( 'prevented', false )
				this.setData( 'preventRefire', true )
				if( input.checked ) {
					input.checked = false
				}
				else {
					input.checked = true
				}

				this.setData( 'preventRefire', false )
				this.clicked = false
				this.setData( 'eventCache', {} );
				return;
			}

			if( this.getData( 'ltPropDisabled' ) ) {
				this.clicked = false
				event.preventDefault()
				this.setData( 'eventCache', {} );
				return ;
			}

			var checked
			var ele = event.target
			checked = ele.checked;

			// this.setData( 'preventRefire', true );

			if( !checked ) {
				this.setData( 'ltPropChecked', false );
			}
			else{
				this.setData( 'ltPropChecked', true );
			}

			// this.setData( 'preventRefire', false );
			// TODO: change this when LN gives his API
			if( this.$node._fR ) {
				if( this.getData( 'ltPropChecked' ) ) {
					this.$node.querySelector( 'input' ).setAttribute( 'checked', '' );
				}
				else {
					this.$node.querySelector( 'input' ).removeAttribute( 'checked' );
				}
				this.fireCallBacksFunction( {}, false );
			}
			// this.fireCallBacksFunction( {}, false );
			this.setData( 'eventCache', {} );
			this.clicked = false
		}
	}
} );

document.addEventListener( 'keyup', function( event ) {
	var keyCode = event.keyCode, node, checked, comp;

	if( keyCode === 32 ) {

		node = document.activeElement;

		if( node.tagName !== 'INPUT' ) {
			return ;
		}

		while( node.tagName !== 'LYTE-CHECKBOX' 
			&& node.tagName !== 'HTML' 
		) {
			node = node.parentElement;
		}

		if( node.tagName === 'LYTE-CHECKBOX' ) {
			// We are calling the checkbox's click because we want all the callbacks to be properly fired.
			// We'll be preventing the default behaviour of the browser in the keyup and keypress events
			node.component.eveType = 'key';
			node.click();
			node.component.eveType = '';
		}
	}
}, true );

/**
 * @syntax nonYielded
 * <lyte-checkbox lt-prop-value="1" lt-prop-label="check me"></lyte-checkbox>
 */

 /**
  * @syntax yielded
  * <lyte-checkbox lt-prop-value="1" lt-prop-yield="true">
  *     <template is="registerYield" yield-name="yield">
  *         check me
  *     </template>
  * </lyte-checkbox>
  */

