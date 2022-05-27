const controller = require('../controllers/comprobante.controllers');

module.exports = (app) => {
    app.get('/comprobante/list', controller.list);
    app.get('/comprobante/filter/:q', controller.listFilter);
    app.get('/comprobante/find/:id', controller.getById);
    app.post('/comprobante/create', controller.create);
    app.put('/comprobante/update/:id', controller.update);
    app.delete('/comprobante/remove/:id', controller.remove);



}