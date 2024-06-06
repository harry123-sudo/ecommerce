Lyte.Component.register( 'lyte-avatar-navigator-item', {
_template:"<template tag-name=\"lyte-avatar-navigator-item\"> <img src=\"{{src}}\" onload=\"{{action('hideIcon',event)}}\" title=\"\" alt=\"{{alt}}\" lt-prop-title=\"{{title}}\" lt-prop-tooltip-config=\"{{config}}\"> <div class=\"lyteAvatarLoadingCont\"> <template is=\"if\" value=\"{{ltPropLoadingIconYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"loadingIconYield\"></lyte-yield> </template><template case=\"false\"> <div class=\"{{ltPropLoadingIconClass}}\"></div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropImage","ltPropLoadingIconYield","ltPropLoadingIconClass","ltPropSelectedClass"],
	data: function() {
		return {
			'ltPropImage': Lyte.attr( 'object', {} ),
			'ltPropLoadingIconYield': Lyte.attr( 'boolean', { 'default': false } ),
			'ltPropLoadingIconClass': Lyte.attr( 'string', { 'default': 'lyteAvatarLoading' } ),
			'ltPropSelectedClass': Lyte.attr( 'string', { 'default': '' } )
		};
	},

	imageObserver: function() {
		this.setSelected();
		this.setImageAttributes();
	}.observes( 'ltPropImage' ),

	init: function() {
		this.setParentComponent();
		this.setImageAttributes();
	},

	didConnect: function() {
		this.setSelected();
	},

	addSelectedClass: function() {
		var sel = this.getData( 'ltPropSelectedClass' ),
		imageObj = this.getData( 'ltPropImage' );

		if( sel ) {
			this.$node.classList.add( sel );
			this.selClass = sel;
			imageObj.isSelected = true;
		}
		else {
			this.$node.classList.remove( this.selClass );
			this.selClass = '';
			imageObj.isSelected = false;
		}

	}.observes( 'ltPropSelectedClass' ),

	setParentComponent: function() {
		var parent = $L( this.$node ).closest( 'lyte-avatar-navigator' );

		this.parent = parent.get( 0 );
	},

	getLoadingIcon: function() {

		return this.$node.querySelector( '.lyteAvatarLoadingCont' );
	},

	setSelected: function() {
		var parent = this.parent.component,
		cls = parent.getData( 'ltPropSelectedClass' ),
		imageObj = this.getData( 'ltPropImage' );

		if( imageObj.isSelected ) {
			this.setData( 'ltPropSelectedClass', cls );
		}
	},

	setImageAttributes: function() {
		var parent = this.parent.component, 
		urlValue = parent.getData( 'ltPropUrlValue' ),
		tooltipValue = parent.getData( 'ltPropTooltipValue' ),
		imageObj = this.getData( 'ltPropImage' ) || {},
		isString = parent.getData( 'isString' ),
		id = ( imageObj || {} ).id,
		altValue = parent.getAltValue(),
		disabled = ( imageObj || {} ).disabled,
		config = parent.getData( 'ltPropTooltip' );

		if( imageObj[ urlValue ] ) {
			this.setData( 'src', imageObj[ urlValue ] );
		}

		if( !isNaN( id ) ) {
			this.$node.setAttribute( 'data-image-id', id );
		}

		this.setData( 'alt', imageObj[ altValue ] );

		if( imageObj.disabled ) {
			this.$node.setAttribute( 'disabled', 'true' );
		}

		if( tooltipValue && ( imageObj || {} )[ tooltipValue ] ) {
			this.setData( 'title', imageObj[ tooltipValue ] );
		}

		this.setData( 'config', config ); 
	},

	actions: {
		hideIcon: function( event ) {
			if( !this.$node ) {
				return ;
			}

			var loadingIcon = this.getLoadingIcon();

			loadingIcon.style.display = 'none';
		}
	}
} );