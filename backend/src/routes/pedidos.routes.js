const PedidosController = require("../controllers/pedidos.controllers");

module.exports = (app) => {
  app.post("/pedidos/post", PedidosController.add);
  app.post("/pedidos/post2", PedidosController.create);
  app.get("/pedidos/get", PedidosController.getPedidoPendiente);
  app.get("/pedidos/getAll", PedidosController.getAll);
  app.get("/pedidos/get/filter/:q", PedidosController.getPedidoFilter);
  app.get("/pedidos/get/all/user/:id", PedidosController.getPedidoUsuario);
  app.put("/pedidos/put/:id", PedidosController.updateEstadoDetalle);
};
