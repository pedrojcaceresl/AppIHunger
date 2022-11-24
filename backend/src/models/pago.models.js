const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const pagosModel = sequelize.define("pagos", {
    fp_Id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true
    },

    fp_descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {
    tableName: 'formaDePago',
    modelName: 'formaDePago',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = { pagosModel }