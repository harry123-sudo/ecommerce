/**
 * Renders a notification badge
 * @component lyte-badge
 * @version 2.2.0
 */

Lyte.Component.register("lyte-badge", {
_template:"<template tag-name=\"lyte-badge\"> <div class=\"lyteBadge\"> <span class=\"lyteBadgeContent\">{{ltPropData}} <lyte-yield yield-name=\"lyteBadgeYield\"></lyte-yield> </span> </div> </template>",
_dynamicNodes : [{"type":"text","position":[1,1,0]},{"type":"insertYield","position":[1,1,2]}],
_observedAttributes :["ltPropBadgeStyle","ltPropPosition","ltPropData","ltPropMaxLength"],
	data : function(){
		return {
			/**
			 * @componentProperty {object} ltPropBadgeStyle
			 */

			'ltPropBadgeStyle' : Lyte.attr('object' , { default : {}
			}),

			/**
			 * @componentProperty {topRight|topLeft|bottomRight|bottomLeft} ltPropPosition
			 * @default topRight
			 */

			'ltPropPosition' : Lyte.attr('string' , {
				default : 'topRight'
			}),

			/**
			 * @componentProperty {string} ltPropData
			 */

			'ltPropData' : Lyte.attr('string' , {
				default : ''
			}),

			/**
			 * @componentProperty {number} ltPropMaxLength
			 * @default 0
			 */

			'ltPropMaxLength' : Lyte.attr('number' , {
				default : 0
			})
		}
	},
	didConnect : function(){

		var maxCount = this.getData('ltPropMaxLength');

		if(maxCount !== 0){

			var countStr = ''

			for(var i=0 ; i<maxCount ;i++){

				countStr += '9';

			}

			countStr = parseInt(countStr);

			var userData = parseInt(this.getData('ltPropData'))

			if(countStr < userData){

				this.setData('ltPropData' , countStr + '+')

			}

		}


		if(window.getComputedStyle(this.$node.parentElement).position === "static"){
			this.$node.parentElement.style.position = 'relative';
		}
		var styleObject = this.getData('ltPropBadgeStyle');
		var lyteBadgeDiv = this.$node.querySelector('.lyteBadge');
		var newStyle = '';
		for(css in styleObject){
			newStyle += css + ":" + styleObject[css] + ';';
		}
		lyteBadgeDiv.setAttribute('style' , newStyle);
		if(this.getData('ltPropData') === ''){
			lyteBadgeDiv.classList.add('lyteBadgeWidHeiWD');
		} else {
			lyteBadgeDiv.classList.add('lyteBadgeWidHeiD');
		}

		var positionData = this.getData('ltPropPosition');
		positionData = 'lyteBadge' + positionData.charAt(0).toUpperCase() + positionData.slice(1);
		lyteBadgeDiv.classList.add(positionData);
	}
});


/**
 * @syntax yielded
 * <lyte-badge>
 *    <template is="registerYield" yield-name='lyteBadgeYield'>
 *        *
 *    </template>
 * </lyte-badge>
 */
