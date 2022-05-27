const { Sequelize, sequelize } = require("./bd.service");
const { QueryTypes } = require("sequelize");
const mime = require('mime');
const { productoModel } = require("../models/producto.models")


const create = async(producto) => {
    return await productoModel.create(producto);
}

const getFilter = async(q, l = 10, p = 1) => {
    let result = await sequelize.query(
        `SELECT * FROM 
       producto
        WHERE 
        UPPER(pro_descripcion) 
        LIKE :q
        ORDER BY pro_id
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

const getFilterByCategoria = async(q, id, l = 10, p = 1) => {
    let result = await sequelize.query(
        ` SELECT p.pro_id,
        p.cat_id,
        p.pro_precio,
        p.pro_descripcion,
        p.pro_iva,
        p.image
        FROM producto AS p 
        INNER JOIN 
        categoria AS c 
        on c.cat_id=p.cat_id
         WHERE 
         UPPER(P.pro_descripcion) 
         LIKE :q
         AND
         c.cat_id=:id
         ORDER BY P.pro_id;
        `, {
            replacements: {
                q: (q ? '%' + q.toUpperCase() + '%' : '%'),
                l: l,
                p: p,
                id: id
            }
        });
    result = (result && result[0]) ? result[0] : [];
    return result;
}

const getAll = async() => {
    let result = await sequelize.query(
        `SELECT * FROM 
        producto;
        `, {
            replacements: {

            }
        });
    result = (result && result[0]) ? result[0] : [];
    return result;
}

const getAllByCategoria = async(id) => {
    let result = await sequelize.query(
        `SELECT * FROM 
        producto 
        WHERE cat_id=:id;
        `, {
            replacements: {
                id: id

            }
        });
    result = (result && result[0]) ? result[0] : [];
    return result;
}

const getById = async(id) => {
    let result = await productoModel.findByPk(id);
    return result;

}

const update = async(producto) => {
    const count = await productoModel.update(
        producto, {
            where: {
                pro_id: producto.pro_id
            }
        });
    if (count > 0) {
        const productoResult = await productoModel.findByPk(producto.pro_id)
        return productoResult.dataValues;
    }
    return null;
}
const remove = async(pro_id) => {
    const count = await productoModel.destroy({
        where: {
            pro_id: pro_id
        },
    });
    return (count > 0)
}
module.exports = { update, remove, getFilter, getById, create, getAll, getFilterByCategoria, getAllByCategoria };