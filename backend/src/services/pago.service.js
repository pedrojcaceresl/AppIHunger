const { pagosModel } = require("../models/pago.models");

const create = async (rol) => {
  return await pagosModel.create(rol);
};

const getFilter = async (q, l = 10, p = 1) => {
  let result = await sequelize.query(
    `SELECT * FROM 
       fpegoria
        WHERE 
        UPPER(fp_nombre) 
        LIKE :q
        ORDER BY fp_Id
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

const getAll = async () => {
  let result = await sequelize.query(
    `SELECT * FROM 
        "formaDePago";
        `,
    {
      replacements: {},
    }
  );
  result = result && result[0] ? result[0] : [];
  return result;
};

const getById = async (id) => {
  let result = await pagosModel.findByPk(id);
  return result;
};

const update = async (rol) => {
  console.log(rol);
  const count = await pagosModel.update(rol, {
    where: {
      fp_Id: rol.fp_Id,
    },
  });
  if (count > 0) {
    const rolResult = await pagosModel.findByPk(rol.fp_Id);
    return rolResult;
  }
  return null;
};
const remove = async (fp_Id) => {
  const count = await pagosModel.destroy({
    where: {
      fp_Id: fp_Id,
    },
  });
  return count > 0;
};
module.exports = { update, remove, getFilter, getById, create, getAll };
