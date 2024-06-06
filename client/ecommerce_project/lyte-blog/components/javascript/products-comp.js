Lyte.Component.register("products-comp", {
	
	data: function () {
		return {
            prd: Lyte.attr('object'), 
		}

	},
	init: function () {
		 console.log(this.getData('prd'));
	},
	
});
