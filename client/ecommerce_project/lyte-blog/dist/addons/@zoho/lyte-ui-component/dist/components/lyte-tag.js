Lyte.Component.register( "lyte-tag", {
_template:"<template tag-name=\"lyte-tag\"> <lyte-dropdown on-before-show=\"{{method('preventOpen')}}\" on-add=\"{{method('onAdd')}}\" on-remove=\"{{method('onRemove')}}\" lt-prop-type=\"multisearch\" lt-prop-no-result=\"{{ltPropNoResult}}\" lt-prop-options=\"{{ltPropOptions}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\" lt-prop-selected-list=\"{{lbind(ltPropSelectedList)}}\" lt-prop=\"{{stringify(ltPropDropdown)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <div class=\"lyteMultiSelect\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{ltPropSelectedList}}\" item=\"item\" index=\"index\"> <li data-value=\"{{item[ltPropSystemValue]}}\"> <span class=\"lyteTagItem\">{{item[ltPropUserValue]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteTagInputLi\"> <input placeholder=\"{{ltPropPlaceholder}}\" class=\"lyteDropdownTextField\" type=\"text\" oninput=\"{{action('buildItem',event)}}\" onblur=\"{{action('buildItem',event)}}\" onkeydown=\"{{action('handleOtherKeys',event)}}\"> </li> </ul> </div> </lyte-drop-button> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{lyteOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> <lyte-tag-label> {{item[ltPropUserValue]}} </lyte-tag-label> <template is=\"if\" value=\"{{item[ltPropDescriptionValue]}}\"><template case=\"true\"> <lyte-tag-description> {{item[ltPropDescriptionValue]}} </lyte-tag-description> </template></template> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropOptions","ltPropUserValue","ltPropSystemValue","ltPropDescriptionValue","ltPropSearchKeys","ltPropSelectedList","ltPropDelimiters","ltPropNoResult","ltPropDropdown","ltPropPlaceholder"],
	data: function() {
		// TODO: Decide default values for the attributes
		// FIX: Cannot read value of undefined
		return {
			'ltPropOptions': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropUserValue': Lyte.attr( 'string', { 'default': '' } ),

			'ltPropSystemValue': Lyte.attr( 'string', { 'default': '' } ),

			'ltPropDescriptionValue': Lyte.attr( 'string', { 'default': '' } ),

			'ltPropSearchKeys': Lyte.attr( 'array', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-tag', 'searchKeys', [] ) 
			} ),

			'ltPropSelectedList': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropDelimiters': Lyte.attr( 'array', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-tag', 'delimiters', [ ',', 'Enter' ] ) 
			} ),

			'ltPropNoResult': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-tag', 'noResult', _lyteUiUtils.i18n( 'no.results.found' ) ) 
			} ),

			'ltPropDropdown': Lyte.attr( 'object', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-tag', 'dropdown', {} ) 
			} ),

			'ltPropPlaceholder': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-tag', 'placeholder', '' ) 
			} )
		}		
	},

	didConnect: function() {
		this.setInputWidthBasedOnPlaceHolder();
		this.getDropBox().classList.add( 'lyteTagDropdown' );
		this.toggleDropIcon();
	},

	setInputWidthBasedOnPlaceHolder: function() {
		var placeholder = ( this.getData( 'ltPropPlaceholder' ) || '' ).trim(),
		input = this.getInput();

		if( placeholder.length === 0 ) {
			input.style.width = '5ch';
		}
		else {
			input.style.width = placeholder.length + 'ch';
		}
	},

	toggleDropIcon: function() {
		var options = this.getData( 'ltPropOptions' ) || [];

		if( options.length === 0 ) {
			this.getDropdown().classList.add( 'lyteTagRemoveIcon' );
		}
		else {
			this.getDropdown().classList.remove( 'lyteTagRemoveIcon' );
		}
	},

	filterItems: function( value ) {
		var visibleItems = this.getVisibleItems( value );

		this.hideItems();
		this.showItems( visibleItems );
		this.toggleNoResults();
	},

	hideItems: function() {
		var box = this.getDropBox(),
		items = box.querySelectorAll( 'lyte-drop-item' );

		items.forEach( function( item ) {
			item.classList.add( 'lyteTagHidden' );
		} );
	},

	showItems: function( resultArray ) {
		resultArray = resultArray || this.getDropBox().querySelectorAll( 'lyte-drop-item' );

		resultArray.forEach( function( item ) {
			item.classList.remove( 'lyteTagHidden' );
		} );
	},

	getVisibleItems: function( value ) {
		var result = this.filterOptions( value ), visibleItems = [], that = this;

		result.forEach( function( arrItem ) {
			visibleItems.push( that.getDropItem( arrItem ) );
		} ); 

		return visibleItems;
	},

	filterOptions: function( value ) {
		var options = this.getData( 'ltPropOptions' ) || [], that = this;

		return options.filter( function( option ) {
			return that.isValid( option, value );
		} );
	},

	isValid: function( option, value ) {
		var keys = this.getData( 'ltPropSearchKeys' ), that = this;

		return keys.some( function( key ) {
			return !!~( option[ key ] || '' ).indexOf( value );
		} );
	},

	getDropItem: function( arrItem ) {
		var sysValue = this.getData( 'ltPropSystemValue' ),
		dataValue = arrItem[ sysValue ];

		return this.getDropBox().querySelector( 'lyte-drop-item[data-value="' + dataValue + '"]' );
	},

	toggleNoResults: function() {
		if( this.hasVisibleItems() ) {
			this.hideNoResults();
		}
		else {
			this.showNoResults();
		}
	},

	hasVisibleItems: function() {
		return this.getDropBox().querySelectorAll( 'lyte-drop-item:not(.lyteTagHidden):not(.lyteDropdownActive)' ).length > 0;
	},

	showNoResults: function() {
		var noResults = this.getNoResults();

		noResults.style.display = 'block';
	},

	hideNoResults: function() {
		var noResults = this.getNoResults();

		noResults.style.display = 'none';
	},

	getNoResults: function() {
		return this.getDropBox().querySelector( '.lyteDropdownNoResult' );
	},

	getNoResults: function() {
		return this.getDropBox().querySelector( '.lyteDropdownNoResult' );
	},

	addToSelected: function( sel ) {
		Lyte.arrayUtils( this.getData( 'ltPropSelectedList' ), 'push', sel );
	},

	clearInput: function() {
		var input = this.getInput();

		input.value = '';
	},

	processInput: function( isBlur ) {
		var tags = this.getTags(),
		length = tags.length, that = this;

		if( !isBlur 
			&& length === 1 
			&& !this.isDelimiter( this.lastTypedChar() ) 
		) {
			this.filterItems( tags[ 0 ] );
		}
		else {
			tags.forEach( function( tag, index )  {
				that.filterItems( tag );
				that.buildTag( tag );
			} );

			this.showItems();
			this.toggleNoResults();
		}
	},

	getTags: function() {
		var rdelimiter = this.buildDelimiterRegex(),
		value = this.getInputValue(), result = [];

		value.split( rdelimiter ).forEach( function( item ) {
			item = item.trim();

			if( item.length ) {
				result.push( item );
			}
		} );

		return result;
	},

	buildDelimiterRegex: function() {
		var separators = this.getData( 'ltPropDelimiters' ) || [],
		res = '[';

		separators.forEach( function( item ) {
			res += item;
		} );

		res += ']'

		return new RegExp( res, 'g' );
	},

	isDelimiter: function( key ) {
		var delimiters = this.getData( 'ltPropDelimiters' );

		return !!~delimiters.indexOf( key );
	},

	lastTypedChar: function() {
		return this.getInputValue().slice( -1 );
	},

	buildTag: function( value ) {
		var box = this.getDropBox(),
		// TODO: Maybe this has something to do with lyteDropdownSelection
		firstItem = this.getHighLightedItem(),
		sel;

		if( firstItem ) {
			sel = this.getObjFromOptions( firstItem );
		}
		else {
			sel = this.buildObjManually( value );
		}

		if( sel ) {
			this.addToSelected( sel );
		}

		this.clearInput();
	},

	getObjFromOptions: function( item ) {
		var options = this.getData( 'ltPropOptions' ) || [],
		dataValue = item.getAttribute( 'data-value' ),
		sysValue = this.getData( 'ltPropSystemValue' );

		for( var i = 0; i < options.length; i++ ) {
			if( options[ i ][ sysValue ] === dataValue ) {
				return options[ i ];
			}
		}
	},

	buildObjManually: function( value ) {
		var userValue = this.getData( 'ltPropUserValue' ),
		sysValue = this.getData( 'ltPropSystemValue' ), obj = {};

		obj[ userValue ] = value;
		obj[ sysValue ] = value;

		return obj;
	},

	toggleDropdown: function() {
		var value = this.getInputValue();

		if( value.length === 0 ) {
			this.hideDropdown();
		}
		else {
			this.showDropdown();
		}
	},

	showDropdown: function() {
		this.getDropdown().open();
	},

	hideDropdown: function() {
		this.getDropdown().close();
	},

	setInputWidth: function() {
		var value = this.getInputValue(),
		placeholder = ( this.getData( 'ltPropPlaceholder' ) || '' ).trim();

		if( value.length < placeholder.length ) {
			this.setInputWidthBasedOnPlaceHolder();
		}
		else {
			input.style.width = value.length + 'ch';
		}
	},

	getDropBox: function() {
		return this.getDropdown().component.getDropBox();
	},

	getDropdown: function() {
		return this.$node.querySelector( 'lyte-dropdown' );
	},

	getInput: function() {
		return this.$node.querySelector( '.lyteDropdownTextField' );
	},

	getInputValue: function() {
		return this.getInput().value.trim();
	},

	getHighLightedItem: function() {
		return this.getDropBox().querySelector( 'lyte-drop-item.lyteDropdownSelection:not(.lyteTagHidden):not(.lyteDropdownActive)' );
	},

	optionsObserver: function() {
		this.toggleDropIcon();
	}.observes( 'ltPropOptions.[]' ),

	actions: {
		buildItem: function( event ) {
			var that = this,
			isBlur = event.type === 'blur';

			setTimeout( function() {
				that.processInput( isBlur );
				that.toggleDropdown();
			}, 10 );

			this.setInputWidth();
		},

		handleOtherKeys: function( event ) {
			var key = event.key,
			value = this.getInputValue(),
			highLightedItem = this.getHighLightedItem();

			// TODO: Need to remove key === 'Enter'
			if( key === 'Enter' && this.isDelimiter( key ) && !highLightedItem ) {
				this.buildTag( this.getInputValue() );
				event.preventDefault();
			}
		}
	},

	methods: {
		onAdd: function() {
			this.toggleNoResults();
			this.clearInput();
			this.hideDropdown();
		},

		onRemove: function() {
			this.toggleNoResults();
			this.clearInput();
			this.hideDropdown();
		},

		preventOpen: function() {
			var value = this.getInputValue(),
			options = this.getData( 'ltPropOptions' );

			if( value.length === 0 || options.length === 0 ) {
				return false;
			}
		}
	}
} );
