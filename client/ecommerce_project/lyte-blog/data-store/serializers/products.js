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
