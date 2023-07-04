import { Sequelize } from "sequelize";

const db = new Sequelize("node", "root", ".yan33405", {
  host: "localhost",
  dialect: "mysql",
  // logging: false
});

export default db;
