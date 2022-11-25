const controller = require("../controllers/producto.controllers");

module.exports = (app) => {
  app.get("/producto/get", controller.getAll);
  app.get("/producto/getTop5", controller.getTop5);
  app.get(
    "/producto/getByFilterCategoria/:q/:id",
    controller.getFilterByCategoria
  );
  app.get("/producto/getByCategoria/:id", controller.getByCategoria);
  app.get("/producto/getById/:id", controller.getById);
  app.get("/producto/getFilter/:q", controller.getFilter);
  app.put("/producto/update/:id", controller.update);
  app.post("/producto/add", controller.add);
  app.delete("/producto/delete/:id", controller.remove);
};
