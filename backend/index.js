// Importing the dependencies
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = process.env.PORT;
const io = new Server();
const morgan = require("morgan");
const chalk = require("chalk");

const swaggerDocs = require("./src/helpers/swagger.js");

// Defining Expresss app
const app = express();

const morganMiddleware = morgan(function (tokens, req, res) {
  return [
    "\n\n\n",
    chalk.hex("#ff4757").bold("🍄  Morgan --> "),
    chalk.hex("#34ace0").bold(tokens.method(req, res)),
    chalk.hex("#ffb142").bold(tokens.status(req, res)),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    "\n\n\n",
  ].join(" ");
});

app.use(morganMiddleware);
// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: false,
//   })
// );

// Enable CORS for all requests
app.use(
  cors({
    origin: "*",
  })
);

// Endpoints
require("./src/routes/usuarios.routes")(app);
require("./src/routes/pedidos.routes")(app);
require("./src/routes/categorias.routes")(app);
require("./src/routes/producto.routes")(app);
require("./src/routes/comprobante.routes")(app);
require("./src/routes/pedidos.routes")(app);
require("./src/routes/formaPagos.routes")(app);

// Socket server event
io.on("connection", (socket) => {
  console.log(`A user with ${socket.id} is connected`);
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}}`);
  swaggerDocs(app, PORT);
});

module.exports = app;
