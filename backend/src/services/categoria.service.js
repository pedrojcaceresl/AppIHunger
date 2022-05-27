const { Sequelize, sequelize } = require("./bd.service");
const { QueryTypes } = require("sequelize");
const mime = require('mime');
const { categoriaModel } = require("../models/categoria.models")


const create = async(rol) => {
    return await categoriaModel.create(rol);
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
    let result = await sequelize.query(
        `SELECT * FROM 
        categoria;
        `, {
            replacements: {

            }
        });
    result = (result && result[0]) ? result[0] : [];
    return result;
}

const getById = async(id) => {
    let result = await categoriaModel.findByPk(id);
    return result;

}

const update = async(rol) => {
    console.log('ROOOOOOL', rol)
    const count = await categoriaModel.update(
        rol, {
            where: {
                cat_id: rol.cat_id
            }
        });
    if (count > 0) {
        const rolResult = await categoriaModel.findByPk(rol.cat_id)
        return rolResult.dataValues;
    }
    return null;
}
const remove = async(cat_id) => {
    const count = await categoriaModel.destroy({
        where: {
            cat_id: cat_id
        },
    });
    return (count > 0)
}
module.exports = { update, remove, getFilter, getById, create, getAll };