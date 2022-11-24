const usuariosService = require("../services/usuario.service");

const list = async (req, res) => {
  try {
    const usuarios = await usuariosService.list(req.query.q);
    res.status(200).send({
      result: usuarios,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.headers;
    let result = await usuariosService.logout(req.headers["x-token"]);
    res.status(200).send({
      result,
    });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const usuario = await usuariosService.login(req.headers["x-token"]);

    res.status(200).send({
      result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const listFilter = async (req, res) => {
  try {
    const usuario = await usuariosService.listFilter(req.params.q);
    res.status(200).send({
      success: true,
      result: usuario,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const usuario = await usuariosService.getById(req.params.id);
    res.status(201).send({
      success: true,
      result: usuario,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};
0;

const retrievePassword = async (req, res) => {
  try {
    const result = await usuariosService.retrievePassword(req.params.email);

    res.status(201).send({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const signUpAdmin = async (req, res) => {
  try {
    const result = await usuariosService.signUpAdmin(req.body);
    res.status(202).send({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const signUpUser = async (req, res) => {
  try {
    const result = await usuariosService.signUpUser(req.body);
    req.status(202).send({
      success: true,
      result,
    });
  } catch (error) {
    req.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const usuario = await usuariosService.create(req.body);
    res.status(202).send({
      success: true,
      result: usuario,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const usuario = await usuariosService.updateUsuarioById(
      req.params.id,
      req.body
    );
    res.status(202).send({
      success: true,
      result: usuario,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const booleanValue = await usuariosService.removeUsuario(req.params.id);
    res.status(202).send({
      success: booleanValue,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      result: error.message,
    });
  }
};

module.exports = {
  list,
  listFilter,
  getById,
  create,
  update,
  remove,
  login,
  logout,
  signUpAdmin,
  signUpUser,
  retrievePassword,
};
