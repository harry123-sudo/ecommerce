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

