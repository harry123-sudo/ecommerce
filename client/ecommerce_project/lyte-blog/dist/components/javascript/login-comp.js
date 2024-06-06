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
