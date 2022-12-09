const pedidosController = require("../controllers/pedidos.controllers");

module.exports = (app) => {
  app.get("/pedidos/getAll", pedidosController.getAll);
  app.get("/pedidos/get", pedidosController.getPedidoPendiente);
  app.get("/pedidos/get/filter/:q", pedidosController.getPedidoFilter);
  app.get("/pedidos/get/all/user/:id", pedidosController.getPedidoUsuario);
  app.post("/pedidos/post", pedidosController.add);
  app.post("/pedidos/post2", pedidosController.create);
  app.put("/pedidos/put/:id", pedidosController.updateEstadoDetalle);
};
