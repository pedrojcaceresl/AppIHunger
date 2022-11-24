const {
  list,
  listFilter,
  getById,
  login,
  create,
  signUpAdmin,
  signUpUser,
  retrievePassword,
  update,
  logout,
  remove,
} = require("../controllers/usuario.controller");

module.exports = (app) => {
  app.get("/usuarios", list);
  app.post("/usuario/create", create);
  app.put("/usuario/update/:id", update);
  app.delete("/usuario/remove/:id", remove);
  app.get("/usuario/filter", listFilter);
  app.get("/usuario/find/:id", getById);
  app.post("/usuario/registrar/adm", signUpAdmin);
  app.post("/usuario/registrar", signUpUser);
  //Authentication
  app.post("/usuario/login", login);
  app.get("/usuario/recuperar/:email", retrievePassword);
  app.post("/usuario/logout", logout);
};
