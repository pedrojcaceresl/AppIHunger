const { Sequelize, sequelize } = require("./bd.service");
const { UsuarioModel: UsuarioModel } = require("../models/usuario.model");
const { QueryTypes } = require("sequelize");
const mime = require("mime");
const fs = require("file-system");
const { request } = require("express");
const jwt = require("./../helpers/jwt");
const { sendEmail } = require("./email.service");

/**
 * List all users
 * @param {*} query
 * @param {number} pageStart - The start page limit
 * @param {number} pageLimit - The page limit
 * @todo There are a lot of things
 * @returns
 */
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
                                        ORDER BY usu_id`,
    {
      replacements: {
        q: query ? "%" + query.toUpperCase() + "%" : "%",
      },
    }
  );

  usuariosResult = usuariosResult && usuariosResult[0] ? usuariosResult[0] : [];
  return usuariosResult;
};

const getUserById = async (usu_id) => {
  //Buscar en la BD por codigo
  const usuarioModelResult = await UsuarioModel.findByPk(usu_id);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const updateUserById = async (id, data) => {
  await UsuarioModel.update(data, {
    where: {
      usu_id: id,
    },
  });
  return data;
};

const removeUser = async (id) => {
  //elimina la data en la BD
  const usuarioModelCount = await UsuarioModel.destroy({
    where: {
      usu_id: id,
    },
  });
  if (usuarioModelCount > 0) {
    return true;
  } else {
    return false;
  }
};

// USER CREATION update
const create = async (data) => {
  //Guardar el data en la BD
  const usuarioModelResult = await UsuarioModel.create(data);
  if (usuarioModelResult) {
    return usuarioModelResult.dataValues;
  } else {
    return null;
  }
};

const signUpAdmin = async (data) => {
  console.log(data);
  let sql = `INSERT INTO usuarios 
            (usu_nombre, usu_telefono, usu_email, usu_password, usu_fecha, usu_documento, usu_rol)
            VALUES (:usu, :telefono, :email, :pass, CURRENT_DATE, :docu, :rol)`;
  let usuariosResult = await sequelize.query(sql, {
    replacements: {
      usu: data.usu,
      telefono: data.telefono,
      email: data.email,
      pass: data.pass,
      docu: data.docu,
      rol: data.rol,
    },
  });
  console.log(usuariosResult);
  return usuariosResult;
};

const signUpUser = async (data) => {
  let sql = `INSERT INTO usuarios 
            (usu_nombre, usu_telefono, usu_email, usu_password, usu_fecha, usu_documento, usu_rol)
            VALUES (:usu, :telefono, :email, :pass, CURRENT_DATE, :docu, :rol)`;
  let usuariosResult = await sequelize.query(sql, {
    replacements: {
      usu: data.usu,
      telefono: data.telefono,
      email: data.email,
      pass: data.pass,
      docu: data.docu,
      rol: "usuario",
    },
  });
  return usuariosResult;
};

//AUTHORIZATION

const login = async (data) => {
  console.log("LOGIN DATAAA ", data);
  let dbUser;
  dbUser = await getUserByEmailPass(data.usu_email, data.usu_password);

  console.log("DB USERRR", dbUser);
  if (dbUser && dbUser.usu_id) {
    let payload = { usu: dbUser.usu_id };
    let token = await jwt.generateJWT(payload);
    let updated = await updateToken(dbUser.usu_id, token);
    return { usuario: updated, token };
  }
  throw "Datos de acceso no válidos";
};

const getUserByEmailPass = async (email, pass) => {
  console.log("email and pass", email, pass);
  let sql = `SELECT * FROM usuarios WHERE usu_password = :pass and usu_email = :email`;
  let usuariosResult = await sequelize.query(sql, {
    replacements: {
      pass: pass,
      email: email,
    },
  });
  return usuariosResult[0][0];
};

const getUserByEmail = async (data) => {
  let sql = `SELECT * FROM usuarios WHERE usu_email = :email`;
  let result = await sequelize.query(sql, {
    replacements: {
      email: data,
    },
  });
  return result && result[0].length > 0 && result[0][0] ? result[0][0] : null;
};

const getUserByToken = async (data) => {
  let sql = `SELECT * FROM usuarios WHERE usu_token = :token`;
  let result = await sequelize.query(sql, {
    replacements: {
      token: data.replace(`"`, ""),
    },
  });
  return result && result[0].length > 0 && result[0][0] ? result[0][0] : null;
};

const logout = async (data) => {
  let id = jwt.decodeToken(data);
  let sql = `update usuarios set usu_token=:token 
        WHERE 
        usu_id=:id;`;

  try {
    if (id && id.usu) {
      await sequelize.query(sql, {
        replacements: {
          id: id.usu,
          token: "",
        },
      });
    }
    return "logout";
  } catch (error) {
    throw error;
  }
};

const updateToken = async (id, token) => {
  let sql = `UPDATE usuarios SET usu_token = :token
             WHERE usu_id = :id 
             returning usu_id, usu_token, usu_nombre, usu_rol, usu_email`;
  try {
    let result = await sequelize.query(sql, {
      replacements: {
        id: id,
        token: token,
      },
    });
    return result[0][0];
  } catch (error) {
    return error;
  }
};

const retrievePassword = async (data) => {
  const result = await getUserByEmail(data);

  if (result && result.usu_email) {
    return await sendEmail(result);
  }
  throw "Datos no válidos";
};

module.exports = {
  list,
  listFilter,
  getUserById,
  create,
  updateUserById,
  removeUser,
  login,
  getUserByToken,
  signUpUser,
  logout,
  signUpAdmin,
  retrievePassword,
};
