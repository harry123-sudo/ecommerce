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
