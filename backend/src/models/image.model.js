const { DataTypes } = require('sequelize');
const {sequelize} = require('../services/bd.service');

const imageModel = sequelize.define('Images', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  // Other model options go here
  tableName: 'images',
  timestamps: false
});

module.exports = {
  imageModel
};