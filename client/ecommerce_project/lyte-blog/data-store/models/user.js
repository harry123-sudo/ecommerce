store.registerModel("user",{

    // id: Lyte.attr('string', { primaryKey : true, baseKey :true }),
        username: Lyte.attr('string'), 
        email: Lyte.attr('string'), 
        password: Lyte.attr('string'), 
        status: Lyte.attr('string', {default: "notVerified"}),
    },
    {
        actions : {
            login : {endpoint : "/api/user"},
            deflogin :{endpoint : "/"}
        }
    }
);
