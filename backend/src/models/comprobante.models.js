const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const comprobanteModel = sequelize.define("comprobante", {
    com_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true
    },
    com_nombre: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    com_numero_inicial: {
        default: 0,
        type: DataTypes.INTEGER,
        allowNull: true
    },
    com_numero_fin: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    com_cant_digitos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    com_serie: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    com_timbrado: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    com_fecha_inicio_vigencia: {
        type: DataTypes.DATE,
        allowNull: true
    },
    com_fecha_fin_vigencia: {
        type: DataTypes.DATE,
        allowNull: true
    },
    com_numero_actual: {
        default: 1,
        type: DataTypes.INTEGER,
        allowNull: true
    },

}, {
    tableName: 'comprobante',
    modelName: 'comprobante',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = { comprobanteModel }