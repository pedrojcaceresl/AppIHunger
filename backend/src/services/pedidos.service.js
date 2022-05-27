const { Sequelize, sequelize } = require("./bd.service");
const { QueryTypes } = require("sequelize");
const mime = require('mime');
const { pedidoModel } = require("../models/pedidos.models")
const { detalle_pedidoModel } = require("../models/detalle_pedido.models")

const create = async(pedido) => {
    const dt = pedido.detalles;
    const t = await sequelize.transaction();

    try {
        let result = await sequelize.query(
            `
          INSERT INTO public.pedido(
            ped_id_cliente, 
            ped_fecha, 
            ped_id_comprobante, 
            ped_fecha_inicio_vigencia,
            ped_fecha_fin_vigencia, 
            ped_num_comprobante, 
            ped_timbrado, 
            ped_total_parcial, 
            ped_iva, 
            ped_total_general, 
            ped_estado,
            gpsX,
            gpsY)
            VALUES (
            :clienteId, 
            :fecha, 
            :comprobanteId, 
            (select com_fecha_inicio_vigencia from comprobante where com_id = :comprobanteId), 
            (select com_fecha_fin_vigencia from comprobante where com_id  =:comprobanteId),
            (select com_numero_actual from comprobante where com_id = :comprobanteId)	, 
            (select com_timbrado from comprobante where com_id = :comprobanteId), 
            :totalParcial, 
            :iva, 
            :totalGeneral, 
            :estado,
            :gpsX,
            :gpsY) returning ped_id AS pedidoId;
        `, {
                replacements: {
                    clienteId: pedido.clinteId,
                    fecha: pedido.fecha,
                    comprobanteId: pedido.comprobanteId,
                    totalParcial: pedido.totalParcial,
                    iva: pedido.iva,
                    totalGeneral: pedido.totalGeneral,
                    estado: pedido.estado,
                    gpsX: pedido.gpsX,
                    gpsY: pedido.gpsY

                },
                transaction: t
            });

        result[1]
        console.log(result, "aaaaaaaaaa")

        for (let index = 0; index < dt.length; index++) {
            const element = dt[index];
            console.log(result[0][0].pedidoid)
            await sequelize.query(
                `
                INSERT INTO public.detalle_pedido(
                    det_id_pedido, 
                    det_id_producto, 
                    det_precio_unitario, 
                    det_total_parcial,
                    det_cantidad,
                    det_valor_iva,
                    det_total_general,
                    det_iva_porcentaje,
                    det_estado,
                    det_observacion)
                    VALUES (
                        :pedidoId,
                        :productoId,
                        :precioUnit,
                        :totalParcial,
                        :cantidad,
                        :valorIva,
                        :totalGeneral,
                        :ivaPorcent,
                        :estado,
                        :obs
                    );
            `, {
                    replacements: {
                        pedidoId: result[0][0].pedidoid,
                        productoId: element.productoId,
                        precioUnit: element.precio,
                        totalParcial: element.totalParcial,
                        cantidad: element.cantidad,
                        valorIva: element.iva,
                        totalGeneral: element.totalGeneral,
                        ivaPorcent: element.ivaPorcent,
                        estado: element.estado,
                        obs: element.obs

                    },
                    transaction: t
                });
        }



    } catch (error) {
        t.rollback();
        throw (error)
    }
    t.commit();
    return true;


}


const updateEstadoDetalle = async(pedido) => {
    let result = await sequelize.query(
        `UPDATE 
            detalle_pedido 
            SET 
            det_estado=:e 
            WHERE 
            det_id=:id`, {
            replacements: {
                id: pedido.id,
                e: pedido.estado

            },
        });
    return true;
}
const getPedidoPendiente = async() => {
    let result = await sequelize.query(
        `SELECT t.ped_fecha,t.ped_id, 
        ARRAY_TO_JSON ( ARRAY_AGG ( ROW_TO_JSON(t) ) ) as detalles
        FROM 
        (
            SELECT 
            p.ped_fecha,
            p.ped_id,
            dt.det_id,
            pro.pro_descripcion,
            dt.det_cantidad,
            dt.det_observacion,
            dt.det_estado                 					
            FROM pedido AS p
            INNER JOIN detalle_pedido AS dt 
            ON p.ped_id = dt.det_id_pedido
            INNER JOIN producto AS pro ON 
            pro.pro_id = dt.det_id_producto
        ) AS t 
        WHERE t.det_estado=2
        GROUP BY t.ped_fecha,t.ped_id;
        `, {
            replacements: {

            }
        });

    result = (result && result[0][0]) ? result[0][0] : [];
    console.log(result);
    return result;
}

const getFilter = async(q, l = 10, p = 1) => {
    let result = await sequelize.query(
        `SELECT * FROM 
       categoria
        WHERE 
        UPPER(cat_nombre) 
        LIKE :q
        ORDER BY cat_id
        ;
        `, {
            replacements: {
                q: (q ? '%' + q.toUpperCase() + '%' : '%'),
                l: l,
                p: p
            }
        });
    result = (result && result[0]) ? result[0] : [];
    return result;
}

const getAll = async() => {

}

const getById = async(id) => {
    let result = await pedidoModel.findByPk(id);
    return result;

}

const update = async(rol) => {
    const count = await pedidoModel.update(
        rol, {
            where: {
                cat_id: rol.cat_id
            }
        });
    if (count > 0) {
        const rolResult = await pedidoModel.findByPk(rol.cat_id)
        return rolResult.dataValues;
    }
    return null;
}
const remove = async(cat_id) => {
    const count = await pedidoModel.destroy({
        where: {
            cat_id: cat_id
        },
    });
    return (count > 0)
}
module.exports = { create, update, remove, getFilter, getById, getAll, getPedidoPendiente, updateEstadoDetalle };