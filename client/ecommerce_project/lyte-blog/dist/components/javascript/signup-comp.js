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
