const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const cors = require('cors'); // Import the cors package
const crypto = require('crypto');

 // Output a random 64-character hexadecimal string

const bodyParser = require('body-parser');
const db = require('./models');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

console.log(generateSecretKey());
const sessionStore = new SequelizeStore({
    db: db.sequelize,
});
sessionStore.sync(); // Sync the session store with the database

app.use(session({
    secret:  (), // Secret key for signing the session ID cookie
    resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    store: sessionStore,
    // rolling: false,
    cookie: {
        secure: false, // Set to true if serving over HTTPS
        httpOnly: true, // Cookies accessible only through HTTP(S) requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (optional)
        // sameSite: 'strict', // Protection against CSRF attacks
        domain: 'http://localhost:3000', // Set domain if necessary
    }, 
}));



app.use('/api', productRoutes); 
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/clear-cookie', (req, res) => {
    console.log("cookie cleared called");
    res.clearCookie('cookieName');
    res.send('Cookie cleared');
});

app.get('/profile', (req, res) => {
    console.log("HARRY-->profile session ID-->",req.session.id);
    
    if (req.session.user) {
        res.send('Welcome, ' + req.session.user.username);
    } else {
        res.send('User not logged in');
    }
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {

      console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch(err => {
    console.log('Error: ', err);
  });
  
// const products = [
// 	{ "id": 1, "prdName": "Wireless Mouse", "imageUrl": "https://placehold.co/200x200", "price": 25.99 },
//     { "id": 2, "prdName": "Bluetooth Speaker", "imageUrl": "https://placehold.co/200x200", "price": 45.99 },
//     { "id": 3, "prdName": "Smart Watch", "imageUrl": "https://placehold.co/200x200", "price": 150.99 },
//     { "id": 4, "prdName": "Laptop Stand", "imageUrl": "https://placehold.co/200x200", "price": 35.99 },
//     { "id": 5, "prdName": "USB-C Hub", "imageUrl": "https://placehold.co/200x200", "price": 59.99 },
//     { "id": 6, "prdName": "Noise Cancelling Headphones", "imageUrl": "https://placehold.co/200x200", "price": 120.99 },
//     { "id": 7, "prdName": "Portable SSD", "imageUrl": "https://placehold.co/200x200", "price": 99.99 },
//     { "id": 8, "prdName": "4K Monitor", "imageUrl": "https://placehold.co/200x200", "price": 299.99 },
//     { "id": 9, "prdName": "Mechanical Keyboard", "imageUrl": "https://placehold.co/200x200", "price": 79.99 },
//     { "id": 10, "prdName": "Ergonomic Chair", "imageUrl": "https://placehold.co/200x200", "price": 199.99 }
// ];
// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

