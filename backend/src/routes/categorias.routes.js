const categoriaController = require('../controllers/categoria.controllers')

module.exports = (app) => {

    app.get('/categorias/get', categoriaController.getAll);
    app.get('/categorias/getById/:Id', categoriaController.getById);
    app.get('/categorias/getFilter/:q', categoriaController.getFilter);
    app.put('/categorias/update', categoriaController.update);
    app.post('/categorias/add', categoriaController.add);
    app.delete('/categorias/delete/:Id', categoriaController.remove);

}