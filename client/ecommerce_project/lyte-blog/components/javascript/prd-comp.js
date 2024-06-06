Lyte.Component.register("prd-comp", {
	data : function(){
		return {

			showModal: Lyte.attr("boolean"),
		}		
	},
	init: function () {
		this.setData('showModal', false);

	},
	
	  
});
