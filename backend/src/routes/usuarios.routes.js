const usuario = require("../controllers/usuario.controller");

module.exports = (app) => {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Returns API operational status
   *     responses:
   *       200:
   *         description: API is up and running
   */
  app.get("/healthcheck", (req, res) => res.status(200).send());
  /**
   * @openapi
   * /usuarios:
   *  get:
   *     tags:
   *     - List All Users
   *     description: Returns a list with al the users
   *     responses:
   *       200:
   *         description: Returns a list with al the users
   */
  app.get("/usuarios", usuario.list);
  app.post("/usuario/create", usuario.create);
  app.put("/usuario/update/:id", usuario.update);
  app.delete("/usuario/remove/:id", usuario.remove);
  app.get("/usuario/filter", usuario.listFilter);

  app.get("/usuario/find/:id", usuario.getById);
  app.post("/usuario/registrar/adm", usuario.signUpAdmin);
  app.post("/usuario/registrar", usuario.signUpUser);
  //Authentication
  app.post("/usuario/login", usuario.login);
  app.get("/usuario/recuperar/:email", usuario.retrievePassword);
  app.post("/usuario/logout", usuario.logout);
};
