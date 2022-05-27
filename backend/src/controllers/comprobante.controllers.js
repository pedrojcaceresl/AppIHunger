const service = require('../services/comprobante.service');

const list = async(req, res) => {

    try {
        const comprobantes = await service.list(req.query.q);
        res.status(200).send({
            result: comprobantes
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

const listFilter = async(req, res) => {

    const comprobante = await service.listFilter(req.params.q);
    res.status(200).send({
        success: true,
        comprobante
    });
}

const getById = async(req, res) => {
    try {
        const comprobante = await service.getById(req.params.id);
        let jsonResultado = req.query;
        res.status(201).send({
            success: true,
            result: comprobante
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
        const comprobante = await service.create(req.body);
        res.status(202).send({
            success: true,
            result: comprobante
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
        let comprobanteR = req.body;
        console.log(comprobanteR)
        const comprobante = await service.update(req.params.id, req.body);
        // console.log(req.params.id, req.body);

        res.status(202).send({
            success: true,
            result: comprobante
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
        const booleanValue = await service.remove(req.params.id);
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


module.exports = {
    list,
    listFilter,
    getById,
    create,
    update,
    remove,
}