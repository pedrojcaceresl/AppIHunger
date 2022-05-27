const PedidosController = require('../controllers/pedidos.controllers');

module.exports = (app) => {

    app.post('/pedidos/post', PedidosController.add);
    app.get('/pedidos/get', PedidosController.getPedidoPendiente);
    app.put('/pedidos/put', PedidosController.updateEstadoDetalle);


}