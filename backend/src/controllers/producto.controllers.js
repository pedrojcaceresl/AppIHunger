const service = require("../services/productos.service");

const getFilter = async(req, res) => {
    try {
        let q = req.params.q;
        let result = await service.getFilter(q);

        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}
const getByCategoria = async(req, res) => {
    try {
        let id = req.params.id;
        let result = await service.getAllByCategoria(id);
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}
const getFilterByCategoria = async(req, res) => {
    try {
        let q = req.params.q;
        let idCat = req.params.id;
        let result = await service.getFilterByCategoria(q, idCat);

        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}



const getAll = async(req, res) => {
    try {
        let result = await service.getAll();
        res.status(200).send({
            success: true,
            result
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
        let id = req.params.Id;
        let result = await service.getById(id);
        res.status(200).send({
            success: true,
            result
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
        let producto = req.body;
        console.log(producto)
        let result = await service.update(producto);

        console.log(result);
        res.status(200).send({
            success: true,
            result
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
        let id = req.params.Id;
        let result = await service.remove(id);
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}
const add = async(req, res) => {
    try {
        let producto = req.body;

        let result = await service.create(producto);
        res.status(200).send({
            success: true,
            result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}


module.exports = {
    getFilter,
    getById,
    add,
    remove,
    update,
    getAll,
    getByCategoria,
    getFilterByCategoria
};