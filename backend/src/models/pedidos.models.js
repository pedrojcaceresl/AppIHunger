const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const pedidoModel = sequelize.define("pedido", {
    pro_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cat_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pro_precio: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    pro_descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pro_iva: {
        type: DataTypes.NUMBER,
        allowNull: true
    }

}, {
    tableName: 'pedido',
    modelName: 'pedido',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = { pedidoModel }