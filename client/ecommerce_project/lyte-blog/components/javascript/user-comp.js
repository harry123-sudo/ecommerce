Lyte.Component.register("user-comp", {
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
