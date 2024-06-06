/**
 * This component is used to show tooltip when its content exceeds
 * @component lyte-text
 * @version 2.2.0
 */

Lyte.Component.register("lyte-text", {
_template:"<template tag-name=\"lyte-text\" lt-prop-title=\"{{if(expHandlers(tooltip,'&amp;&amp;',ltPropShow),ltPropValue,'')}}\" onmouseenter=\"{{action('mouse')}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteTextYield\" yield-name=\"lyte-text\" lt-prop-value=\"{{ltPropValue}}\"></lyte-yield> </template><template case=\"false\"> {{ltPropValue}} </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropValue","ltPropShow","ltPropYield","tooltip","lyteUnbound"],
	data : function(){
		return {
			/**
			 * @componentProperty {string} ltPropValue=''
			 * @version 2.2.0
			 */
			ltPropValue : Lyte.attr( 'string', { default : '' } ),
			/**
			 * @componentProperty {boolean} ltPropShow=true
			 * @version 2.2.0
			 */
			ltPropShow : Lyte.attr( 'boolean', { default : true } ),
			/**
			 * @componentProperty {boolean} ltPropYield=false
			 * @version 2.2.20
			 */


			ltPropYield : Lyte.attr( 'boolean', { default : false } ),

			tooltip : Lyte.attr( 'boolean', { default : false } ),
			lyteUnbound : Lyte.attr( 'boolean', { default : false } )
		}		
	},

	reset : function(){
		var scrwd = this.$node.scrollWidth, offwd = this.$node.offsetWidth;
		this.setData( 'tooltip', scrwd > offwd );
		if( this.$node._fR ){
			if( this.data.tooltip && this.data.ltPropShow ){
				this.$node.setAttribute( 'lt-prop-title', this.data.ltPropValue );
			} else {
				this.$node.removeAttribute( 'lt-prop-title' )
			}
		}
	},

	actions : {
		mouse : function(){
			this.reset();
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-text lt-prop-value = "some long text having higher width"></lyte-text>
 */

/**
 * @syntax yielded
 * <lyte-text lt-prop-yield = true lt-prop-value = "some long text having higher width">
 * 	 <template is = "registerYield" yield-name = "lyte-text">
 *		your value
 *	 </template>
 * </lyte-text>
 */