import Sequelize from "sequelize";

export const sequelize = new Sequelize("FACEBOOK", "allang", "cnd80751xh", {
  dialect: "mysql",
  host: "localhost",
});
