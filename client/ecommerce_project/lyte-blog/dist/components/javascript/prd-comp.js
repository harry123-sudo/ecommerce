Lyte.Component.register("prd-comp", {
_template:"<template tag-name=\"prd-comp\"> </template>",
_dynamicNodes : [],
_observedAttributes :["showModal"],
	data : function(){
		return {

			showModal: Lyte.attr("boolean"),
		}		
	},
	init: function () {
		this.setData('showModal', false);

	},
	
	  
});
