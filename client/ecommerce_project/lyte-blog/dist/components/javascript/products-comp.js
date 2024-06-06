Lyte.Component.register("products-comp", {
_template:"<template tag-name=\"products-comp\"> <div class=\"product-grid\"> <img src=\"{{prd.imageUrl}}\" alt=\"{{prd.prdName}}\"> <h2> {{prd.prdName}}</h2> <h3>Price: ${{prd.price}}</h3> </div> </template>",
_dynamicNodes: [{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,1]},{"type":"text","position":[1,5,1]}],
_observedAttributes :["prd"],
	
	data: function () {
		return {
            prd: Lyte.attr('object'), 
		}

	},
	init: function () {
		 console.log(this.getData('prd'));
	},
	
});
