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

