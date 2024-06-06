// Lyte.Router.configureDefaults({baseURL:'',history : "html5"});

Lyte.Router.configureRoutes(function(){
	this.route('index',{path:'/'});
	// this.route("users",{ path :"/users"});
	this.route("user",{ path :"/login"});
	this.route("newuser",{ path :"/signup"});
});

Lyte.Router.beforeRouteTransition = function() {
	//console.log('before Route Change');
}

Lyte.Router.afterRouteTransition = function() {
	//console.log('after Route Change');
}


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

Lyte.Router.registerRoute("newuser",{
    model : function()	{
		return {features : [{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
							{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
							{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
							{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
							]}
				
	},
	model : async function()	{   
		// return await store.findAll('products').then (
		// 	function(product) {
		// 		console.log("successly 'get' all products from server-->");
		// 		console.log(product); 
		// 	},
		// 	function() {
		// 		console.log("fail (routes/index.js)")
		// 	}
		// ); 
	},
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "signup-comp"}
		// return {outlet : "#outlet",component : "user-comp"}
	}
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
// beforeModel  : function (paramsObject ){ 
//         /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
// },
// model  : function (paramsObject ){ 
//         /* Initiate data request that are necessary for the current page. */
// },
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//         /* Redirections based on data fetched. */
// },
// renderTemplate  : function (model, paramsObject ){ 
//         /* return where and what to render.(container and component/HTML) */
// },
// afterRender  : function (model, paramsObject ){ 
//         /* Post processing of rendered page. */
// },
// beforeExit  : function (model, paramsObject ){ 
//         /* Will be invoked before a route is removed from view. */
// },
// didDestroy  : function (model, paramsObject ){ 
//         /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
// },
// actions  : { 
//        onBeforeLoad  : function (paramsObject ){ 
//                 /* Triggered once route transition starts. */
//         },
//        onError  : function (error, pausedTrans, paramsObject ){ 
//                 /* Triggered by error on file load or on data request. */
//         },
//        willTransition  : function (transition ){ 
//                 /* Triggered before a transition is going to change. */
//         },
//        didTransition  : function (paramsObject ){ 
//                 /* Triggered after completion of transition. */
//         },
// }
});

Lyte.Router.registerRoute("user",{
    model : function()	{
		return {features : [{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
							{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
							{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
							{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
							]}
				
	},
	model : async function()	{   
		// return await store.findAll('products').then (
		// 	function(product) {
		// 		console.log("successly 'get' all products from server-->");
		// 		console.log(product); 
		// 	},
		// 	function() {
		// 		console.log("fail (routes/index.js)")
		// 	}
		// ); 
	},
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "login-comp"}
		// return {outlet : "#outlet",component : "user-comp"}
	}
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
// beforeModel  : function (paramsObject ){ 
//         /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
// },
// model  : function (paramsObject ){ 
//         /* Initiate data request that are necessary for the current page. */
// },
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//         /* Redirections based on data fetched. */
// },
// renderTemplate  : function (model, paramsObject ){ 
//         /* return where and what to render.(container and component/HTML) */
// },
// afterRender  : function (model, paramsObject ){ 
//         /* Post processing of rendered page. */
// },
// beforeExit  : function (model, paramsObject ){ 
//         /* Will be invoked before a route is removed from view. */
// },
// didDestroy  : function (model, paramsObject ){ 
//         /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
// },
// actions  : { 
//        onBeforeLoad  : function (paramsObject ){ 
//                 /* Triggered once route transition starts. */
//         },
//        onError  : function (error, pausedTrans, paramsObject ){ 
//                 /* Triggered by error on file load or on data request. */
//         },
//        willTransition  : function (transition ){ 
//                 /* Triggered before a transition is going to change. */
//         },
//        didTransition  : function (paramsObject ){ 
//                 /* Triggered after completion of transition. */
//         },
// }
});

Lyte.Router.registerRoute("users",{
// 	getResources  : function (paramsObject ){ 
//         /* View related files should be returned as resources(HTML, CSS, components etc). It will be available before 'renderTemplate' hook. */
// },
// getDependencies  : function (paramsObject ){ 
//         /* Files returned as dependencies will be downloaded at once and will be available before 'beforeModel' hook. */
// },
// beforeModel  : function (paramsObject ){ 
//         /* Pre processing stage where you can decide whether to abort/redirect the current transition(e.g Permission check). */
// },
// model  : function (paramsObject ){ 
//         /* Initiate data request that are necessary for the current page. */
// },
// afterModel  : function (model, paramsObject ){ 
//         /* Manipulating data before returning data to component. */
// },
// redirect  : function (model, paramsObject ){ 
//         /* Redirections based on data fetched. */
// },
// renderTemplate  : function (model, paramsObject ){ 
//         /* return where and what to render.(container and component/HTML) */
// },
// afterRender  : function (model, paramsObject ){ 
//         /* Post processing of rendered page. */
// },
// beforeExit  : function (model, paramsObject ){ 
//         /* Will be invoked before a route is removed from view. */
// },
// didDestroy  : function (model, paramsObject ){ 
//         /* Will be invoked when a route is completly destroyed(remove residues of route. eg: file cache removal). */
// },
// actions  : { 
//        onBeforeLoad  : function (paramsObject ){ 
//                 /* Triggered once route transition starts. */
//         },
//        onError  : function (error, pausedTrans, paramsObject ){ 
//                 /* Triggered by error on file load or on data request. */
//         },
//        willTransition  : function (transition ){ 
//                 /* Triggered before a transition is going to change. */
//         },
//        didTransition  : function (paramsObject ){ 
//                 /* Triggered after completion of transition. */
//         },
// }
});

Lyte.Component.register("login-comp", {
_template:"<template tag-name=\"login-comp\"> <div class=\"login-form\" id=\"loginForm\" style=\"display: block;\"> <h2>Login</h2> <label for=\"login-email\">Email:</label> <lyte-input type=\"email\" id=\"login-email\" lt-prop-value=\"{{lbind(loginEmail)}}\"></lyte-input> <label for=\"login-password\">Password:</label> <lyte-input type=\"password\" id=\"login-password\" lt-prop-value=\"{{lbind(loginPassword)}}\"></lyte-input> <lyte-button type=\"submit\" lt-prop-appearance=\"primary\" onclick=\"{{action(&quot;handleLogin&quot;)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Login </template> </lyte-button> </div> </template>\n<style>.auth-container {\n    display: flex;\n    justify-content: space-around;\n    padding: 20px;\n  }\n\n  .login-form, .signup-form {\n    width: 45%;\n  }\n\n  form {\n    display: flex;\n    flex-direction: column;\n  }\n\n  label {\n    margin-bottom: 5px;\n  }\n\n  lyte-input {\n    margin-bottom: 15px;\n  }\n\n  lyte-button {\n    align-self: flex-start;\n  }</style>",
_dynamicNodes: [{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1,9]},{"type":"attr","position":[1,11]},{"type":"registerYield","position":[1,11,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,11]}],
_observedAttributes :["loginName","loginEmail","loginPassword","showLoginPagee"],

	data: function(){
		return {
			loginName: Lyte.attr("string"),
			loginEmail: Lyte.attr("string"),
		loginPassword: Lyte.attr("string"),
		showLoginPagee: Lyte.attr("boolean"),
		}
	},
	// init: function () {
		
	// 	this.setData('allprds', store.peekAll('products'));
	// 	this.setData('showSignInPage',false);
	// 	this.setData('showloginPage',false);
	// 	// console.log(allprds);

	// },
	  actions: {
		handleLogin() {
		  const email = this.getData('loginEmail');
		  const password = this.getData('loginPassword');
		  // Perform login logic here
		  console.log('Login with', email, password);
		  store.triggerAction("user", "login", { email: this.getData('loginEmail'), password: this.getData('loginPassword') }).then(function(data) {
			console.log(data.status);
			if(data.status == "verified")
			{
				var userData = store.createRecord("user",{ username : data.username, email : data.email, password : data.password, status : data.status} );
				console.log(userData);
				// this.setData('showloginPagee',true);
				Lyte.Router.transitionTo({route :'index'});

			}
		}).catch(function(error) {
			console.error(error);
			Lyte.Router.transitionTo({route :'login'});

		});
			this.setData('loginEmail', '');
			this.setData('loginPassword', '');
		},
		  
		  closeForm: function() {
			this.setData('showSignInPage',false);
			this.setData('showLoginPage',false);
		  }
	  }

});

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

Lyte.Component.register("signup-comp", {
_template:"<template tag-name=\"signup-comp\"> <div class=\"signup-form\" id=\"signupForm\" style=\"display: block;\"> <h2>Signup</h2> <label for=\"signup-name\">UserName:</label> <lyte-input type=\"text\" id=\"signup-name\" lt-prop-value=\"{{lbind(signupName)}}\"></lyte-input> <label for=\"signup-email\">Email:</label> <lyte-input type=\"email\" id=\"signup-email\" lt-prop-value=\"{{lbind(signupEmail)}}\"></lyte-input> <label for=\"signup-password\">Password:</label> <lyte-input type=\"password\" id=\"signup-password\" lt-prop-value=\"{{lbind(signupPassword)}}\"></lyte-input> <lyte-button type=\"submit\" lt-prop-appearance=\"primary\" onclick=\"{{action(&quot;handleSignup&quot;)}}\"> <template is=\"registerYield\" yield-name=\"text\"> SignUp </template> </lyte-button> </div> </template>\n<style>.auth-container {\n    display: flex;\n    justify-content: space-around;\n    padding: 20px;\n  }\n\n  .login-form, .signup-form {\n    width: 45%;\n  }\n\n  form {\n    display: flex;\n    flex-direction: column;\n  }\n\n  label {\n    margin-bottom: 5px;\n  }\n\n  lyte-input {\n    margin-bottom: 15px;\n  }\n\n  lyte-button {\n    align-self: flex-start;\n  }</style>",
_dynamicNodes : [{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1,9]},{"type":"attr","position":[1,13]},{"type":"componentDynamic","position":[1,13]},{"type":"attr","position":[1,15]},{"type":"registerYield","position":[1,15,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,15]}],
_observedAttributes :["signupName","signupEmail","signupPassword","showLoginPage","showSignInPage"],
	data: function(){
		return {
			
		signupName: Lyte.attr("string"),
		signupEmail: Lyte.attr("string"),
		signupPassword: Lyte.attr("string"),
		showLoginPage: Lyte.attr("boolean"),
		showSignInPage: Lyte.attr("boolean"),
		}
	},
	init: function () {
		store.triggerAction("user", "deflogin",{}).then(function(data) {
			console.log(data);
			if(data.status == "verified")
			{
				var userData = store.createRecord("user",{ username : data.username, email : data.email, password : data.password, status : data.status} );
				console.log(userData);
				// this.setData('showloginPagee',true);
				Lyte.Router.transitionTo({route :'index'});

			}
		}).catch(function(error) {
			console.error(error);
			Lyte.Router.transitionTo({route :'login'});

		});
		// this.setData('allprds', store.peekAll('products'));
		// this.setData('showSignInPage',false);
		// this.setData('showloginPage',false);
		// console.log(allprds);

	},
	  actions: {
		
		handleSignup() {
		  const name = this.getData('signupName');
		  const email = this.getData('signupEmail');
		  const password = this.getData('signupPassword');
		  // Perform signup logic here
		  console.log('Signup with', name, email, password);
		  if(name!=null && email!=null && password !=null)
		  {
			// var record = store.createRecord("user",{ username : name, email : email, password : password } ,true )
			var record = store.createRecord("user",{ username : this.getData('signupName'), email : this.getData('signupEmail'), password : this.getData('signupPassword'), status : "notVerified"} ,true )
			record.$.save();
		  }
		//   Lyte.Router.transitionTo({route :'index'});
		

		},
		
		  showSignupForm: function() {
			this.setData('showSignInPage',true);
			
		  },
		  closeForm: function() {
			this.setData('showSignInPage',false);
			this.setData('showLoginPage',false);
		  }
	  }

});

Lyte.Component.register("user-comp", {
_template:"<template tag-name=\"user-comp\"> <div class=\"auth-container\"> <div class=\"login-form\" id=\"loginForm\"> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('showLoginForm')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Login </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('showSignupForm')}}\"> <template is=\"registerYield\" yield-name=\"text\"> SignUp </template> </lyte-button> </div> </div> </template>\n<style>.auth-container {\n    display: flex;\n    justify-content: flex-end;\n    align-items: flex-start;\n    padding: 20px 100px;\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.login-form {\n    display: flex; /* Enable flexbox for the login form */\n    align-items: center; /* Align items vertically */\n}\n\n .login-form lyte-button {\n    margin-left: 10px; /* Adjust spacing between the buttons */\n}\n\n  /* .login-form, .signup-form {\n    width: 45%;\n  }\n\n  form {\n    display: flex;\n    flex-direction: column;\n  }\n\n  label {\n    margin-bottom: 5px;\n  }\n\n  lyte-input {\n    margin-bottom: 15px;\n  }\n\n  lyte-button {\n    align-self: flex-start;\n  } */ */</style>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"registerYield","position":[1,1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1,3]}],
_observedAttributes :["loginEmail","loginPassword","signupName","signupEmail","signupPassword","showLoginPage","showSignInPage"],
	data: function(){
		return {
			loginEmail: Lyte.attr("string"),
		loginPassword: Lyte.attr("string"),
		signupName: Lyte.attr("string"),
		signupEmail: Lyte.attr("string"),
		signupPassword: Lyte.attr("string"),
		showLoginPage: Lyte.attr("boolean"),
		showSignInPage: Lyte.attr("boolean"),
		}
	},
	init: async function () {

		console.log("HARRY-->usersdata--> ");

		var user=await store.findAll("user");
		console.log(user);

		this.setData('showloginPage',true);

		// store.triggerAction("user", "deflogin", { email: this.getData('loginEmail'), password: this.getData('loginPassword') }).then(function(data) {
		// 	console.log(data.status);
		// 	if(data.status == "verified")
		// 	{
		// 		var userData = store.createRecord("user",{ username : data.username, email : data.email, password : data.password, status : data.status} );
		// 		console.log(userData);
		// 		// this.setData('showloginPagee',true);
		// 		Lyte.Router.transitionTo({route :'index'});

		// 	}
		// }).catch(function(error) {
		// 	console.error(error);
		// 	Lyte.Router.transitionTo({route :'login'});

		// });
		
	},
	  actions: {
		handleLogin() {
		  const email = this.get('loginEmail');
		  const password = this.get('loginPassword');
		  // Perform login logic here
		  console.log('Login with', email, password);
		},
		handleSignup() {
		  const name = this.get('signupName');
		  const email = this.get('signupEmail');
		  const password = this.get('signupPassword');
		  // Perform signup logic here
		  console.log('Signup with', name, email, password);
		},
		showLoginForm: function() {
			
			
			Lyte.Router.transitionTo({route :'user'});
			
		  },
		  showSignupForm: function() {
			Lyte.Router.transitionTo({route :'newuser'});
			
		  },
		  
	  }
	});

 
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

store.registerModel("products",{

        id: Lyte.attr('string', { primaryKey : true, baseKey :true }),
        prdName: Lyte.attr('string'), 
        imageUrl: Lyte.attr('string'), 
        price: Lyte.attr('string'), 
});

store.registerAdapter("products", {//No I18n
	host: 'http://localhost:5000', 
    namespace: 'api', 
    headersForRequest : function( type , queryParams , customData, actionName, key ){
        return {
            'Content-type': 'application/json'
        };
    },
    methodForRequest : function( method , type , queryParams , customData, actionName, key ){
        console.log(method, "Default Get Method ")
        return method;
      }
});


store.registerSerializer("products",{
	
    
      normalizeResponse : function( modelName , type , payLoad , pkValue , status , headers , queryParams , customData, opts ){ 
        console.log("normalize response");
       payLoad = {products: payLoad};
       console.log("modified:B", payLoad);
        return payLoad; 
      }, 
      serialize:function( type , payLoad , records , customData , modelName, queryParams , actionName ){
        // console.log(payLoad.products.prdName);
        // payLoad.products.name = payLoad.products.prdName;
        // delete payLoad.products.prdName;
        console.log(payLoad);
        return payLoad;
      }
});

store.registerModel("user",{

    // id: Lyte.attr('string', { primaryKey : true, baseKey :true }),
        username: Lyte.attr('string'), 
        email: Lyte.attr('string'), 
        password: Lyte.attr('string'), 
        status: Lyte.attr('string', {default: "notVerified"}),
    },
    {
        actions : {
            login : {endpoint : "/api/user"},
            deflogin :{endpoint : "/"}
        }
    }
);

store.registerAdapter("user", {//No I18n
	host: 'http://localhost:5000', 
    namespace: 'api', 
    buildURL : function( modelName , type , queryParams , payLoad , url , actionName , customData , key ){
        if( modelName == "user" && actionName == "login" ){
          url='http://localhost:5000/api/login';
          console.log(url);
        }
        else if( modelName == "user" && actionName == "deflogin" ){
            url='http://localhost:5000/clear-cookie';
            console.log(url);
          }
          else if( modelName == "user" && type  === "findAll" ){

            url='http://localhost:5000/profile';
            console.log(url);
          }

        return url;
      },
    headersForRequest : function( type , queryParams , customData, actionName, key ){
        return {
            'Content-type': 'application/json'
        };
    },
    methodForRequest : function( method , type , queryParams , customData, actionName, key ){
        console.log(method, "Default Get Method ")
        if(actionName == "deflogin")
        {
            method="GET";
            console.log(method);
            console.log(type,customData)
        }
        return method;
      },
      reloadRecord : function( recordInstance , queryParams ){
        if( recordInstance.isUptoDate ){
            console.log("HARRY INSIDE-->record instance from adapter for userlogins-->",recordInstance);
          return false ;
        }
        console.log("HARRY-->record instance from adapter for userlogins-->",recordInstance);

        return true ;
      }
});


store.registerSerializer("user",{
	
    normalizeResponse : function( modelName , type , payLoad , pkValue , status , headers , queryParams , customData, opts ){ 
        console.log("normalize response");
        console.log(payLoad);
       payLoad = {user: payLoad};
       console.log("modified:B", payLoad.user);
        return payLoad; 
      }, 
      serialize:function( type , payLoad , records , customData , modelName, queryParams , actionName ){
        // console.log(payLoad.products.prdName);
        // payLoad.products.name = payLoad.products.prdName;
        // delete payLoad.products.prdName;
        
        if(actionName == "login" || actionName == "deflogin")
        {
            console.log(customData);
            return customData;

        }
        else
        {

            console.log(payLoad.user);
            return payLoad.user;
        }
        
      }
});
