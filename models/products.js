module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id :{
            type: DataTypes.STRING,
            primaryKey: true, 
            allowNull: false,
            autoIncrement : true
         },
      prdName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Product;
  };
  