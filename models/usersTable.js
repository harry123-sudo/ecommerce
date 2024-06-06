// models/usersTable.js

'use strict';

module.exports = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define('UsersTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {
    tableName: 'usersTable',
    timestamps: false // Set to true if you want Sequelize to handle createdAt and updatedAt columns
  });

  return UsersTable;
};
