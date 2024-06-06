store.registerModel("products",{

        id: Lyte.attr('string', { primaryKey : true, baseKey :true }),
        prdName: Lyte.attr('string'), 
        imageUrl: Lyte.attr('string'), 
        price: Lyte.attr('string'), 
});

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


store.registerSerializer("products",{
	
    
      normalizeResponse : function( modelName , type , payLoad , pkValue , status , headers , queryParams , customData, opts ){ 
        console.log("normalize response");
       payLoad = {products: payLoad};
       console.log("modified:B", payLoad);
        return payLoad; 
      }, 
      serialize:function( type , payLoad , records , customData , modelName, queryParams , actionName ){
        // console.log(payLoad.products.prdName);
        // payLoad.products.name = payLoad.products.prdName;
        // delete payLoad.products.prdName;
        console.log(payLoad);
        return payLoad;
      }
});
