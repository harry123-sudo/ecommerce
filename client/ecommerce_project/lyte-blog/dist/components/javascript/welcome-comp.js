 
Lyte.Component.register("welcome-comp",{
_template:"<template tag-name=\"welcome-comp\"> <div class=\"welcome-container\"> <user-comp></user-comp> </div> <h1> Product </h1> <div> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('openModal',event)}}\" mousedown=\"{{action('check',event)}}\" final-style=\"\" final-class=\"lyte-button lytePrimaryBtn\"> <template is=\"registerYield\" yield-name=\"text\"> Add Product </template> </lyte-button> <lyte-modal lt-prop-show=\"{{showModal}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> Add Product Details </lyte-modal-header> <lyte-modal-content> <table cellpadding=\"0\" cellspacing=\"0\" class=\"w100per modalTable\"> <tbody> <tr> <td class=\"pB10 pR30 alignRight\"> Product ID </td> <td class=\"pB10 mymodalinput\"> <lyte-input lt-prop-type=\"text\" lt-prop-value=\"{{lbind(prdId)}}\" lt-prop-placeholder=\"\" lt-prop-appearance=\"box\"></lyte-input> </td> </tr> <tr> <td class=\"pB10 pR30 alignRight\"> Product name </td> <td class=\"pB10 mymodalinput\"> <lyte-input lt-prop-type=\"text\" lt-prop-value=\"{{lbind(productName)}}\" lt-prop-placeholder=\"\" lt-prop-appearance=\"box\"></lyte-input> </td> </tr> <tr> <td class=\"pR30 alignRight vat pT7\"> Price </td> <td class=\"mymodaltextarea\"> <lyte-input lt-prop-type=\"textarea\" lt-prop-value=\"{{lbind(productPrice)}}\" lt-prop-appearance=\"box\" lt-prop-id=\"lyteinput\" lt-prop-rows=\"2\" lt-prop-cols=\"60\" lt-prop-placeholder=\"Description\" lt-prop-text-area-resize=\"{&quot;horizontal&quot; : false, &quot;vertical&quot; : true }\"></lyte-input> </td> </tr> <tr> <td class=\"pR30 alignRight vat pT7\"> product image Url </td> <td class=\"mymodaltextarea\"> <lyte-input lt-prop-type=\"textarea\" lt-prop-value=\"{{lbind(prdUrl)}}\" lt-prop-appearance=\"box\" lt-prop-id=\"lyteinput\" lt-prop-rows=\"2\" lt-prop-cols=\"60\" lt-prop-placeholder=\"Description\" lt-prop-text-area-resize=\"{&quot;horizontal&quot; : false, &quot;vertical&quot; : true }\"></lyte-input> </td> </tr> </tbody> </table> </lyte-modal-content> <lyte-modal-footer class=\"right\"> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action(&quot;create&quot;)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Create </template> </lyte-button> <lyte-button onclick=\"{{action(&quot;closeModal&quot;)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Cancel </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </div> <div class=\"prd-datas\"> <template items=\"{{allprds}}\" item=\"product\" index=\"index\" is=\"for\"><div class=\"prd-data\"> <products-comp prd=\"{{product}}\"></products-comp> </div></template> </div> </template>\n<style>body {\n    font-family: Arial, sans-serif;\n}\n.prd-datas {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n    gap: 16px;\n    padding: 16px;\n}\n.prd-data {\n    border: 1px solid #ccc;\n    border-radius: 8px;\n    padding: 16px;\n    text-align: center;\n}\n.prd-data img {\n    max-width: 100%;\n    height: auto;\n    border-radius: 4px;\n}\n.welcome-container {\n    position: relative; /* Ensure positioning context */\n}\n/* .welcome-container {\n    display: flex;\n    justify-content: space-around;\n    padding: 20px;\n  }\n\n  .login-form, .signup-form {\n    width: 45%;\n  }\n\n  form {\n    display: flex;\n    flex-direction: column;\n  }\n\n  label {\n    margin-bottom: 5px;\n  }\n\n  lyte-input {\n    margin-bottom: 15px;\n  }\n\n  lyte-button {\n    align-self: flex-start;\n  } */</style>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1,3,1]},{"type":"componentDynamic","position":[3,1,1,1,3,1]},{"type":"attr","position":[3,1,1,3,3,1]},{"type":"componentDynamic","position":[3,1,1,3,3,1]},{"type":"attr","position":[3,1,1,5,3,1]},{"type":"componentDynamic","position":[3,1,1,5,3,1]},{"type":"attr","position":[3,1,1,7,3,1]},{"type":"componentDynamic","position":[3,1,1,7,3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[5,3]},{"type":"attr","position":[7,1]},{"type":"for","position":[7,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}],







_observedAttributes :["features","allprds","showModal","productName","productPrice","prdUrl","prdId"],
	data : function(){
		return {
			features : Lyte.attr("array"),
			allprds : Lyte.attr("array"),
			showModal: Lyte.attr("boolean"),
			productName : Lyte.attr("string"),
			productPrice : Lyte.attr("string"),
			prdUrl : Lyte.attr("string"),
			prdId : Lyte.attr("string"),

			// openModal: Lyte.attr("Boolean"),

		}
	},
	init: function () {
		
		this.setData('allprds', store.peekAll('products'));
		this.setData('showModal',false);
		// console.log(allprds);

	},
	actions: {
		openModal() {
		  this.setData('showModal', true);
		},
		closeModal() {
		  this.setData('showModal', false);
		},
		create() {
			try{

				console.log("harry-->fetching data");
			// cons[ole.log(this.getData('productName'));
			var record = store.createRecord("products",{id : this.getData('prdId'), prdName : this.getData('productName'), imageUrl : this.getData('prdUrl'), price : this.getData('productPrice') } ,true )
			record.$.save();
			console.log("harry-->post request");
			console.log(record);
			this.setData('showModal', false);


			}
			catch( ex)
			{
				console.log(ex);
			}
			this.setData('productName', '');
			this.setData('prdId', '');
			this.setData('prdUrl', '');
			this.setData('productPrice', '');
		  },
		check(event) {
			// Your logic here
			this.setData('showModal', false);
			console.log("Mouse down event triggered");
			console.log(event); // Logs the event object to the console
		  },

	},
	methods: {
		// setprdId: function (a) {
		// 	this.setData('prdId', a.newValue);
		// },
		// setproductName: function (a) {
		// 	this.setData('productName', a.newValue);
		// },
		// setprdUrl: function (a) {
		// 	this.setData('prdUrl', a.newValue);
		// },
		// setproductPrice: function (a) {
		// 	this.setData('productPrice', a.newValue);
		// },
	}
});
