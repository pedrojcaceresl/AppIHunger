const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/bd.service');

const detalle_pedidoModel = sequelize.define('detalle_pedido', {
    // Model attributes are defined here
    det_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },

    det_id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },

    det_id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },

    det_precio_unitario: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },
    det_total_parcial: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },
    det_cantidad: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },
    det_valor_iva: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },
    det_total_general: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },


    det_iva_porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    det_estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 1
            // allowNull defaults to true
    },
    det_observacion: {
        type: DataTypes.STRING,
        allowNull: true
            // allowNull defaults to true
    }

}, {
    tableName: 'detalle_pedido',
    modelName: 'detalle_pedido',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
});

module.exports = {
    detalle_pedidoModel
};