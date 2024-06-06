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
