const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const UsuarioModel = sequelize.define('usuario', {
    // Model attributes are defined here
    usu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usu_nombre: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_telefono: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_rol: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_email: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_password: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_token: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    },
    usu_fecha: {
        type: DataTypes.DATE,
        allowNull: true
            // allowNull defaults to true   
    },
    usu_imagen: {
        type: DataTypes.TEXT,
        allowNull: true
            // allowNull defaults to true   
    },
    usu_documento: {
        type: DataTypes.TEXT,
        allowNull: true
            // allowNull defaults to true   
    }


}, {
    // Other model options go here
    tableName: 'usuarios',
    modelName: 'usuarios',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = {
    UsuarioModel
};