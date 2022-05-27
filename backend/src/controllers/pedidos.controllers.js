const { sequelize } = require("../services/bd.service");
//const { UsuarioModel: UsuarioModel } = require("../models/usuario.model");
const { QueryTypes } = require("sequelize");
const service = require("../services/pedidos.service");

const getPedidoPendiente = async(req, res) => {
    try {
        let result = await service.getPedidoPendiente();
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

function getPedidos(req, res) {

    try {
        let result = {};
        result = sequelize.query(`SELECT p.ped_id,pr.pro_descripcion,
        dp.det_cantidad,
        dp.det_observacion,
        p.ped_fecha,dp.det_estado 
        FROM detalle_pedido as dp 
        inner join pedido as p
        on p.ped_id = dp.det_id_pedido
        inner join producto as pr 
        on pr.pro_id = dp.det_id_producto
        where dp.det_estado=2 ;`, { type: QueryTypes.SELECT });

        result.then(function(pedidos) {
            return res.send({ "ok": true, "data": pedidos });
        }, function(err) {
            return res.send(err);
        });
    } catch (error) {

    }

}

function realizarPedido(req, res) {
    let resultado = {};
    resultado = sequelize.query(`INSERT INTO public.detalle_pedido(
        det_id, det_id_pedido, det_id_producto, det_precio_unitario, det_total_parcial, det_cantidad, det_valor_iva, det_total_general, det_iva_porcentaje, det_estado, det_observacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, {
        replacements: {

            precioUnitario: req.body.precioUnitario,
            totalParcial: req.body.totalParcial,
            cantidad: req.body.cantidad,
            valorIva: req.body.valorIva,
            totalGeneral: req.body.totalGeneral,
            ivaPorcentaje: req.body.ivaPorcentaje,
            estado: req.body.estado,
            observacion: req.body.observacion
        }
    })
}


const updateEstadoDetalle = async(req, res) => {
    try {
        let estado = req.body;
        let result = await service.updateEstadoDetalle(estado);
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

const add = async(req, res) => {
    try {
        let datos = req.body;
        let result = await service.create(datos);
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

//function para guardar pedidos


/*

INSERT INTO public.detalle_pedido(
	det_id, det_id_pedido, det_id_producto, det_precio_unitario, det_total_parcial, det_cantidad, det_valor_iva, det_total_general, det_iva_porcentaje, det_estado, det_observacion)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

*/

module.exports = {
    getPedidos,
    add,
    getPedidoPendiente,
    updateEstadoDetalle
}