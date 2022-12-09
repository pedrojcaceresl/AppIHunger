const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "admin", {
  host: "localhost",
  port: "5438",
  dialect: "postgres",
});

const testConnection = async () => {
  console.log("TRYING TO CONNECTTTT");
  try {
    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully on port ${sequelize.options.port}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
const db = {
  Sequelize,
  sequelize,
};
module.exports = db;
