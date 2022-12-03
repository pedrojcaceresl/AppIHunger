const { Sequelize, sequelize } = require("./bd.service");
const { comprobanteModel } = require("../models/comprobante.models");
const { QueryTypes } = require("sequelize");
const mime = require("mime");
const fs = require("file-system");

const list = async (query, pageStart = 0, pageLimit = 10) => {
  let result = await comprobanteModel.findAll();
  result = result ? result : [];
  return result;
};

const listFilter = async (query, pageStart = 0, pageLimit = 10) => {
  let comprobantesResult = await sequelize.query(
    `SELECT * FROM comprobante WHERE UPPER(com_nombre) LIKE :q;
`,
    {
      replacements: {
        q: query ? "%" + query.toUpperCase() + "%" : "%",
      },
    }
  );

  comprobantesResult =
    comprobantesResult && comprobantesResult[0] ? comprobantesResult[0] : [];
  return comprobantesResult;
};

const getById = async (codigo) => {
  //Buscar en la BD por codigo
  const comprobanteModelResult = await comprobanteModel.findByPk(codigo);
  if (comprobanteModelResult) {
    return comprobanteModelResult.dataValues;
  } else {
    return null;
  }
};

const create = async (data) => {
  //Guardar el data en la BD
  const comprobanteModelResult = await comprobanteModel.create(data);
  if (comprobanteModelResult) {
    return comprobanteModelResult.dataValues;
  } else {
    return null;
  }
};

const update = async (id, data) => {
  const comprobanteModelCount = await comprobanteModel.update(data, {
    where: {
      com_id: id,
    },
  });
  return data;
};

const remove = async (id) => {
  //elimina el data en la BD
  const comprobanteModelCount = await comprobanteModel.destroy({
    where: {
      com_id: id,
    },
  });
  if (comprobanteModelCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  list,
  listFilter,
  getById,
  create,
  update,
  remove,
};
