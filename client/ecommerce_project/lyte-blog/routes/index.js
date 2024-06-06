Lyte.Router.registerRoute('index',{
	model : function()	{
		return {features : [{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
							{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
							{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
							{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
							]}
				
	},
	model : async function()	{   
		return await store.findAll('products').then (
			function(product) {
				console.log("successly 'get' all products from server-->");
				console.log(product); 
			},
			function() {
				console.log("fail (routes/index.js)")
			}
		); 
	},
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "welcome-comp"}
		// return {outlet : "#outlet",component : "user-comp"}
	}

});
