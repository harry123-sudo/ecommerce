Lyte.Component.register("login-comp", {

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
