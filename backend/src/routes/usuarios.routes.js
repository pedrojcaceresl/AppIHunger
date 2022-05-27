const controller = require('../controllers/usuario.controller');
const {authorization} = require("../middleware/authorization.middleware");

module.exports = (app) => {

    app.get('/usuario/list', authorization, controller.list);
    app.get('/usuario-filter', authorization, controller.listFilter);
    app.get('/usuario/find/:id', authorization, controller.getById);
    app.post('/usuario/create', authorization, controller.create);
    app.put('/usuario/update/:id', authorization, controller.update);
    app.delete('/usuario/remove/:id',  controller.remove);
    //app.post('/update/foto/:id', controller.updateFoto)
    //Authentication
    app.post("/usuario/login",  controller.login);
    app.post("/usuario/logout", authorization, controller.logout);
};  