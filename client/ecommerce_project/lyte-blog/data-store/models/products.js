store.registerModel("products",{

        id: Lyte.attr('string', { primaryKey : true, baseKey :true }),
        prdName: Lyte.attr('string'), 
        imageUrl: Lyte.attr('string'), 
        price: Lyte.attr('string'), 
});
