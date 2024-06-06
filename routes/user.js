const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// Get all products
router.get('/user', async (req, res) => {
  try {
    const userId = req.query.id;
    const email=req.query.email;
    const loginPassword=req.query.password;
      console.log("HARRY query data  ", req.query.password);
      console.log("HARRY  params data--> ", req.query.email);
      // Fetch the user data for the specified id from the database
      if(email!=null)
      {
        const user = await db.UsersTable.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
        const storedHash =  user.password;
        const passwordCorrect = bcrypt.compareSync(loginPassword, storedHash);

        if (passwordCorrect) {
            console.log('Password is correct');
            console.log("HARRY-->fetching one user alone ");
            // res.json(user);
            req.query.status="verified";
            console.log(req.query);
            res.json(req.query);
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
    res.status(500).json({ error: error.message });
  }
});

// router.get('/user/id', async (req, res) => {
//     try {
//       // Extract the id parameter from the request URL
//       const userId = req.params.id;
//       console.log("HARRY  ", userId)
  
//       // Fetch the user data for the specified id from the database
//       const user = await db.UsersTable.findOne({ where: { id: userId } });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // If user exists, send the user data in the response
//       res.json(user);
//     } catch (error) {
//       // Handle errors
//       res.status(500).json({ error: error.message });
//     }
// Create a new user
router.post('/user', async (req, res) => {
  try {
    console.log("HARRRYYYYYY"); 
    // delete req.body.id;
    console.log(req.body);
    req.body.id = Math.floor(Math.random() * 1000000000);
    
    const saltRounds = 10; // Number of salt rounds
    const password =req.body.password;
    const hashedPassword = bcrypt.hashSync(password, saltRounds); // Synchronously hash the password

    req.body.password = hashedPassword;
    console.log(req.body);
    
    const user = await db.UsersTable.create(req.body);
    console.log("HARRY-->adding  data :: ");
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
