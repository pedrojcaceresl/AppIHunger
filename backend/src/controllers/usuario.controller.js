const usuariosService = require('../services/usuario.service');

const list = async(req, res) => {


    try {
        const usuarios = await usuariosService.list(req.query.q);
        res.status(200).send({
            result: usuarios
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}

const listFilter = async(req, res) => {

    try {

        const usuario = await usuariosService.listFilter(req.query.q);
        res.status(200).send({
            success: true,
            result: usuario
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });

    }
}

const getById = async(req, res) => {

    try {
        const usuario = await usuariosService.getById(req.params.id);
        let jsonResultado = req.query;
        res.status(201).send({
            success: true,
            result: usuario
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}

const create = async(req, res) => {
    try {
        const usuario = await usuariosService.create(req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

const update = async(req, res) => {
    try {
        const usuario = await usuariosService.updateUsuarioById(req.params.id, req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }




}




const remove = async(req, res) => {
    try {
        const booleanValue = await usuariosService.removeUsuario(req.params.id);
        res.status(202).send({
            success: booleanValue
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}


const updateFoto = async(req, res) => {
    let matches = req.body.dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    dataUrl = req.body.dataUrl;
    const imagen = await usuariosService.updateFotoPerfil(req.params.id, matches, dataUrl);
    res.status(202).send({
        success: { imagen }
    })
}
module.exports = {
    list,
    listFilter,
    getById,
    create,
    update,
    remove,
    updateFoto
}