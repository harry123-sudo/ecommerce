const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('products', 'harry', 'harry', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('HARRy-->Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

