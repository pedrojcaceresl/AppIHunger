const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const categoriaModel = sequelize.define("categoria", {
    cat_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cat_nombre: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cat_descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {
    tableName: 'categoria',
    modelName: 'categoria',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = { categoriaModel }