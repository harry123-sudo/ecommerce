const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// Get all products
router.post('/login', async (req, res) => {
    try {
        console.log("HARRRYYYYYY login"); 
    // delete req.body.id;
    console.log(req.body);
    const userId = req.query.id;
    const email=req.body.email;
    const loginPassword=req.body.password;
      console.log("HARRY query data  ", req.body.password);
      console.log("HARRY  params data--> ", req.body.email);
      // Fetch the user data for the specified id from the database
      if(email!=null)
      {
        const user = await db.UsersTable.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

        //   if(user.status == "verified")
        //   {
        //     req.body.status="verified";
        //     console.log("record got already verified ",req.body);
        //     return res.status(201).json(req.body);
        //   }
        const storedHash =  user.password;
        const passwordCorrect = bcrypt.compareSync(loginPassword, storedHash);

        if (passwordCorrect) {
            user.status="verified";
            await user.save();
            console.log('User record updated successfully.');
            console.log('Password is correct');
            console.log("HARRY-->fetching one user alone ");
            // res.json(user);
                

            req.body.status="verified";
            req.body.username=user.username;
            req.session.user = req.body;
            console.log(req.session);

            console.log("HARRY-->profile session ID-->",req.session.id);

            const sid=req.session.id;
            // res.set('Set-Cookie', `connect.sid=${sid}`);
            console.log(req.body);
            return res.status(201).json(req.body);
          } else {
            console.log('Password is incorrect');
            res.status(500).json({ error: "Password is incorrect" });
          }
      }
      else
      {
        const users = await db.UsersTable.findAll();
        console.log("HARRY-->fetching all data");
        res.json(users);
      }
  
      // Check if the user exists
      
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
