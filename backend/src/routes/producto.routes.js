const controller = require("../controllers/producto.controllers");

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
  app.get("/productos", controller.getAll);
  app.get("/producto/getTop5", controller.getTop5);
  app.get(
    "/producto/getByFilterCategoria/:id",
    controller.getFilterByCategoria
  );
  app.get("/producto/categoria/:id", controller.getByCategoria);
  app.get("/producto/getById/:id", controller.getById);
  app.get("/producto/getFilter/:q", controller.getFilter);
  app.put("/producto/update", controller.update);
  app.post("/producto/add", controller.add);
  app.delete("/producto/delete/:id", controller.remove);
};
