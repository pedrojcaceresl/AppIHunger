const { sequelize } = require("./bd.service");
const { productoModel } = require("../models/producto.models");

const create = async (producto) => {
  return await productoModel.create(producto);
};

const getFilter = async (q, l = 100, p = 0) => {
  let sql = `SELECT p.* FROM 
       producto p
       inner join categoria as c
       on c.cat_id =p.cat_id
        WHERE 
        concat(UPPER(p.pro_descripcion),'',UPPER(p.pro_nombre),'',UPPER(c.cat_nombre),'',UPPER(c.cat_descripcion)) 
        LIKE :q
        ORDER BY pro_id
        ;`;
  let result = await sequelize.query(sql, {
    replacements: {
      q: q ? "%" + q.toUpperCase() + "%" : "%",
      l: l,
      p: p,
    },
  });
  result = result && result[0] ? result[0] : [];
  return result;
};

const getFilterByCategoria = async (id) => {
  let sql = `SELECT * FROM producto WHERE cat_id = :id`;
  let result = await sequelize.query(sql, {
    replacements: { id: id },
  });
  result = result && result[0] ? result[0] : [];
  return result;
};

const getAll = async () => {
  let result = await sequelize.query(`SELECT * FROM producto;`);
  result = result && result[0] ? result[0] : [];
  return result;
};

const getTop5 = async () => {
  let sql = `SELECT * FROM producto ORDER BY pro_nombre LIMIT 5`;
  let result = await sequelize.query(sql);
  result = result && result[0] ? result[0] : [];
  return result;
};

const getAllByCategoria = async (id) => {
  let result = await sequelize.query(
    `SELECT * FROM 
        producto 
        WHERE cat_id=:id;
        `,
    {
      replacements: {
        id: id,
      },
    }
  );
  result = result && result[0] ? result[0] : [];
  return result;
};

const getById = async (id) => {
  let result = await productoModel.findByPk(id);
  return result;
};

const update = async (producto) => {
  const count = await productoModel.update(producto, {
    where: {
      pro_id: producto.pro_id,
    },
  });
  if (count > 0) {
    const result = await productoModel.findByPk(producto.pro_id);
    return result.dataValues;
  }

  return null;
};
const remove = async (pro_id) => {
  const count = await productoModel.destroy({
    where: {
      pro_id: pro_id,
    },
  });
  return count > 0;
};
module.exports = {
  update,
  remove,
  getFilter,
  getById,
  create,
  getAll,
  getFilterByCategoria,
  getAllByCategoria,
  getTop5,
};
