const { Sequelize, sequelize } = require("./bd.service");
const { pedidoModel } = require("../models/pedidos.models");

const create = async (pedido) => {
  const dt = pedido.detalles;
  const t = await sequelize.transaction();

  console.log(pedido.datosCabecera.gps);
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
            ped_total_general, 
            gps,
            ped_pago)

            VALUES (
            :clienteId, 
             (CURRENT_DATE), 
            :comprobanteId, 
            (select com_fecha_inicio_vigencia from comprobante where com_id = :comprobanteId), 
            (select com_fecha_fin_vigencia from comprobante where com_id  =:comprobanteId),
            (select com_numero_actual from comprobante where com_id = :comprobanteId)	, 
            (select com_timbrado from comprobante where com_id = :comprobanteId), 
            :totalGeneral, 
            :gps,
            :formaPago) returning ped_id AS pedidoId;
        `,
      {
        replacements: {
          clienteId: pedido.datosCabecera.clienteId,
          comprobanteId: pedido.datosCabecera.comprobanteId,
          totalGeneral: pedido.datosCabecera.totalGeneral,
          gps: pedido.datosCabecera.gps,
          formaPago: pedido.datosCabecera.formaPagoId,
        },
        transaction: t,
      }
    );

    await sequelize.query(
      `UPDATE comprobante SET com_numero_actual = com_numero_actual+1 WHERE com_id = :id`,
      {
        replacements: {
          id: pedido.datosCabecera.comprobanteId,
        },
        transaction: t,
      }
    );

    console.log(result);
    console.log(dt);

    for (let index = 0; index < dt.length; index++) {
      const element = dt[index];
      await sequelize.query(
        ` INSERT INTO public.detalle_pedido(
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
            `,
        {
          replacements: {
            pedidoId: result[0][0].pedidoid,
            productoId: element.productoId,
            precioUnit: element.precioUnit,
            totalParcial: element.totalParcial,
            cantidad: element.cantidad,
            valorIva: element.valorIva,
            totalGeneral: element.totalGeneral,
            ivaPorcent: element.ivaPorcent,
            estado: 2,
            obs: element.obs,
          },
          transaction: t,
        }
      );
    }
  } catch (error) {
    console.log(error);
    t.rollback();
    throw error;
  }
  t.commit();
  return true;
};

const create2 = async (pedido) => {
  const dt = pedido.detalles;
  const t = await sequelize.transaction();

  try {
    for (let index = 0; index < dt.length; index++) {
      const element = dt[index];
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
            `,
        {
          replacements: {
            pedidoId: pedido.Id,
            productoId: element.productoId,
            precioUnit: element.precio,
            totalParcial: element.totalParcial,
            cantidad: element.cantidad,
            valorIva: element.iva,
            totalGeneral: element.totalGeneral,
            ivaPorcent: element.ivaPorcent,
            estado: element.estado,
            obs: element.obs,
          },
          transaction: t,
        }
      );
    }
  } catch (error) {
    console.log(error);
    t.rollback();
    throw error;
  }
  t.commit();
  return true;
};

const updateEstadoDetalle = async (id) => {
  let result = await sequelize.query(
    `UPDATE 
            detalle_pedido 
            SET 
            det_estado=:e 
            WHERE 
            det_id=:id`,
    {
      replacements: {
        id: id,
        e: "0",
      },
    }
  );
  return true;
};

const getPedidoPendiente = async () => {
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
            pro.pro_nombre,
            pro.image,
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
        `,
    {
      replacements: {},
    }
  );

  result = result && result[0][0] ? result[0][0] : [];
  return result;
};

const getAll = async () => {
  let result = await sequelize.query(
    `SELECT * from detalle_pedido  as dt inner join 
        pedido as p on
        dt.det_id_pedido = p.ped_id
        inner join producto as pro on pro.pro_id = dt.det_id_producto
        where dt.det_estado=2
        `,
    {
      replacements: {},
    }
  );
  result = result && result[0] ? result[0] : [];
  return result;
};

const getAllbyUser = async (id) => {
  let result = await sequelize.query(
    `SELECT t.ped_fecha,t.ped_id, 
        ARRAY_TO_JSON ( ARRAY_AGG ( ROW_TO_JSON(t) ) ) as detalles
        FROM 
        (
            SELECT 
            p.ped_id_cliente,
            p.ped_fecha,
            p.ped_id,
            p.ped_total_general,
            dt.det_id,
            pro.pro_descripcion,
            pro.pro_nombre,
            pro.image,
            dt.det_cantidad,
            dt.det_observacion,
            dt.det_estado                 					
            FROM pedido AS p
            INNER JOIN detalle_pedido AS dt 
            ON p.ped_id = dt.det_id_pedido
            INNER JOIN producto AS pro ON 
            pro.pro_id = dt.det_id_producto
        ) AS t 
        WHERE t.ped_id_cliente =:id
        GROUP BY t.ped_fecha,t.ped_id;
        `,
    {
      replacements: {
        id: id,
      },
    }
  );
  result = result && result[0] ? result[0] : [];
  console.log(result);
  return result;
};

const getPedidoUsuarios = async (id) => {
  let result = await sequelize.query(
    `SELECT t.ped_fecha,t.ped_id, 
        ARRAY_TO_JSON ( ARRAY_AGG ( ROW_TO_JSON(t) ) ) as detalles
        FROM 
        (
            SELECT 
            p.ped_id_cliente,
            p.ped_fecha,
            p.ped_id,
            dt.det_id,
            pro.pro_descripcion,
            pro.pro_nombre,
            pro.image,
            dt.det_cantidad,
            dt.det_observacion,
            dt.det_estado                 					
            FROM pedido AS p
            INNER JOIN detalle_pedido AS dt 
            ON p.ped_id = dt.det_id_pedido
            INNER JOIN producto AS pro ON 
            pro.pro_id = dt.det_id_producto
        ) AS t 
        WHERE t.ped_id_cliente =:id
        GROUP BY t.ped_fecha,t.ped_id;
        `,
    {
      replacements: {
        id: id,
      },
    }
  );

  result = result && result[0][0] ? result[0][0] : [];
  return result;
};

const getFilter = async (q, l = 100, p = 0) => {
  let result = await sequelize.query(
    `SELECT * FROM 
       categoria
        WHERE 
        UPPER(cat_nombre) 
        LIKE :q
        ORDER BY cat_id
        ;
        `,
    {
      replacements: {
        q: q ? "%" + q.toUpperCase() + "%" : "%",
        l: l,
        p: p,
      },
    }
  );
  result = result && result[0] ? result[0] : [];
  return result;
};

const getById = async (id) => {
  let result = await pedidoModel.findByPk(id);
  return result;
};

const update = async (rol) => {
  const count = await pedidoModel.update(rol, {
    where: {
      cat_id: rol.cat_id,
    },
  });
  if (count > 0) {
    const rolResult = await pedidoModel.findByPk(rol.cat_id);
    return rolResult.dataValues;
  }
  return null;
};
const remove = async (cat_id) => {
  const count = await pedidoModel.destroy({
    where: {
      cat_id: cat_id,
    },
  });
  return count > 0;
};
module.exports = {
  create,
  update,
  remove,
  getFilter,
  getById,
  getAll,
  getPedidoPendiente,
  getPedidoUsuarios,
  updateEstadoDetalle,
  create2,
  getAllbyUser,
};
