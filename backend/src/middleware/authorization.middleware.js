const { sequelize } = require("../services/bd.service");

const authorization = async (request, response, next) => {
  const token = request.headers.authorization;
  try {
    let sql =
      "SELECT usu_codigo, usu_email, usu_token FROM usuarios WHERE usu_token = :t";

    let usuariosResults = await sequelize.query(sql, {
      replacements: {
        t: token,
      },
    });

    if (usuariosResults && usuariosResults.length > 0) {
      request.usuarioId = usuariosResults[0][0].usu_codigo;
      next();
    }
  } catch (error) {
    response.send({
      success: false,
      error: "No autorizado para esta operacion",
    });
  }
};

module.exports = {
  authorization,
};
