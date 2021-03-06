const { Sequelize, sequelize } = require("./bd.service");
const { UsuarioModel: UsuarioModel } = require("../models/usuario.model");
const { QueryTypes } = require("sequelize");
const mime = require("mime");
const fs = require("file-system");
const { request } = require("express");
const jwt = require("jsonwebtoken");

const list = async (query, pageStart = 0, pageLimit = 10) => {
  let result = await UsuarioModel.findAll();
  result = result ? result : [];
  console.log(result.dataValues);
  return result;
};

const listFilter = async (query, pageStart = 0, pageLimit = 10) => {
  let usuariosResult = await sequelize.query(
    `SELECT * FROM usuarios WHERE (UPPER(usu_nombre) LIKE :q
                                        OR UPPER(usu_email) LIKE :q)
                                        ORDER BY usu_codigo`,
    {
      replacements: {
        q: query ? "%" + query.toUpperCase() + "%" : "%",
      },
    }
  );

  usuariosResult = usuariosResult && usuariosResult[0] ? usuariosResult[0] : [];
  return usuariosResult;
};

const getById = async (usu_codigo) => {
  //Buscar en la BD por codigo
  const usuarioModelResult = await UsuarioModel.findByPk(usu_codigo);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const create = async (data) => {
  //Guardar el data en la BD
  const usuarioModelResult = await UsuarioModel.create(data);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const updateUsuarioById = async (id, data) => {
  const usuarioModelCount = await UsuarioModel.update(data, {
    where: {
      usu_codigo: id,
    },
  });
  return data;
};

const removeUsuario = async (id) => {
  //elimina la data en la BD
  const usuarioModelCount = await UsuarioModel.destroy({
    where: {
      usu_codigo: id,
    },
  });
  if (usuarioModelCount > 0) {
    return true;
  } else {
    return false;
  }
};

const updateFotoPerfil = async (usu_codigo, matches, dataUrl) => {
  //TO DO BASE64 HANDLER LOGIC
  //let matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

  response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  ("");
  let extension = mime.getExtension(type);
  let fileName = Date.now() + "." + extension;
  try {
    fs.writeFileSync("./images/" + fileName, imageBuffer, "utf8");
    let file = dataUrl;
    //console.log(file);

    let sql =
      "UPDATE usuarios SET usu_imagen = :imagen WHERE usu_codigo = :codigo";
    const usuarioResult = await sequelize.query(sql, {
      replacements: {
        imagen: file,
        codigo: usu_codigo,
      },
    });

    return usuarioResult;
  } catch (error) {
    console.log(error.message);
  }
};

//AUTHORIZATION

const login = async (data) => {
  let usuariosResults = await sequelize.query(
    `SELECT usu_codigo, usu_email, usu_token
                                                FROM usuarios
                                                WHERE usu_email = :n
                                                AND usu_password = :p LIMIT 1`,
    {
      replacements: {
        n: data.usu_email,
        p: data.usu_password,
      },
      type: QueryTypes.SELECT,
    }
  );

  if (usuariosResults && usuariosResults.length > 0) {
    if (usuariosResults[0].usu_token && usuariosResults[0].usu_codigo != "") {
      return {
        token: usuariosResults[0].usu_token,
      };
    } else {
    }

    const payload = {
      usu_email: data.usu_email,
      usu_codigo: usuariosResults[0].usu_codigo,
    };

    var token = jwt.sign(payload, "comidasecreta");

    let updateTokenUsuarioResults = await sequelize.query(
      `UPDATE usuarios
                                                  SET usu_token = :t
                                                  WHERE usu_codigo = :i`,
      {
        replacements: {
          t: token,
          i: usuariosResults[0].usu_codigo,
        },
        type: QueryTypes.SELECT,
      }
    );

    return {
      token,
    };
  } else {
    throw new Error("DATOS DE ACCESO NO VALIDOS");
  }
};

const logout = async (usuarioId) => {
  let updateTokenUsuarioResults = await sequelize.query(
    `UPDATE usuarios SET usu_token = null WHERE usu_codigo = :i`,
    {
      replacements: {
        i: usuarioId,
      },
    }
  );
  return;
};

module.exports = {
  list,
  listFilter,
  getById,
  create,
  updateUsuarioById,
  removeUsuario,
  updateFotoPerfil,
  login,
  logout,
};
