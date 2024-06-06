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

