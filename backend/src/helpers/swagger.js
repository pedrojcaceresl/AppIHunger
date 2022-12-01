const { Express, request, response } = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("./../../package.json");
const logger = require("./../helpers/logger");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "iHunger REST API Docs",
      version,
    },
    // components: {
    //   securitySchemas: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: {
    //   bearerAuth: [],
    // },
  },
  apis: ["./src/routes/usuarios.routes.js", "./src/routes/producto.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("docs.json", (req, res) => {
    // res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  // console.log(`Docs available at http://localhost:${port}/api-docs`);
  logger.info(`Docs available at http://localhost:${port}/api-docs`);
}
module.exports = swaggerDocs;
