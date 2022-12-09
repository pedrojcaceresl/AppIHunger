const pagosController = require("../controllers/formaPago.controllers");
// const validarToken = require("../meddlewares/validar-jwt");
module.exports = (app) => {
  app.get("/pagos/get", pagosController.getAll);
  app.get("/pagos/getById/:id", pagosController.getById);
  app.post("/pagos/add", pagosController.add);
  app.put("/pagos/update", pagosController.update);
  app.delete("/pagos/delete/:id", pagosController.remove);
};
