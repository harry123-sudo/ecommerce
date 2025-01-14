/**
 * This component is used to append a dom anywhere in the document
 * @component lyte-wormhole
 * @version 2.2.6
 * @methods onBeforeAppend,onAppend
 */


Lyte.Component.register("lyte-wormhole",{
_template:"<template tag-name=\"lyte-wormhole\"> <lyte-yield yield-name=\"lyte-content\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropQuery"],

	data : function(){
		return {
			/**
			 * @componentProperty {string} ltPropQuery
			 * @version 2.2.6
			 */
			ltPropQuery : Lyte.attr( 'string' )
		}
	},

	didConnectFunc :function(){
		var ret, outlet = this.data.ltPropQuery ? document.querySelector( this.data.ltPropQuery ) : document.body;
		if( !outlet ) {
			console.error( 'Provide valid outlet to append' );
			return;
		}
		if( this.getMethods( 'onBeforeAppend' ) && this.executeMethod( 'onBeforeAppend', this.$node, outlet ) == false ) {
			return;
		}
		_lyteUiUtils.appendChild( outlet, this.$node );
		this.appended = true;
		if( this.getMethods( 'onAppend' ) ){
			this.executeMethod( 'onAppend', this.$node, outlet )
		}
	}.observes( 'ltPropQuery' ).on( 'didConnect' )
});

/**
 * @syntax yielded
 * <lyte-wormhole>
 * 	  <template is = "registerYield" yield-name = "lyte-content">
 * 		 Some wormhole content
 *	  </template>
 * </lyte-wormhole>
 */
