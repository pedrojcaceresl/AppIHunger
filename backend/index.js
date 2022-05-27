const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
const mime = require('mime');
const fs = require('file-system');

const { imageModel: imageModel } = require('./src/models/image.model');

//const upload = multer ({dest: 'uploads/'}); 


//app.use(bodyParser.json());

//Routes del Caso de Uso
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(bodyParser.json({ limit: "500mb" }));

app.use(cors({
    origin: '*'
}));
//require('./src/routes/eventos.routes')(app);
require('./src/routes/usuarios.routes')(app);
require('./src/routes/pedidos.routes')(app);
require('./src/routes/categorias.routes')(app);
require('./src/routes/producto.routes')(app);
require('./src/routes/comprobante.routes')(app);
require('./src/routes/pedidos.routes')(app);

const findImage = async(req, res) => {
    const codigo = req.params.id;
    const image = await imageModel.findByPk(codigo);
    if (image === null) {
        console.log('Not found!');
    } else {
        const result = image;
        console.log(image instanceof imageModel); // true
        res.status(200).send({ 'Ok': true, result })
            // Its primary key is 123
    }
}

app.get('/upload/:id', findImage);

app.post('/hello', (req, res) => {
    console.log(req);
    file = req.body;
    console.log(file);
    res.status(200).send(file)
});


//require('./src/routes/categorias.routes')(app);




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});