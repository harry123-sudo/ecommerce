Lyte.Component.register("signup-comp", {
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
