import { Sequelize } from "sequelize";
import config from "../config/db.config.js";
import Users from "./users.model.js";

const sequelize = new Sequelize(config.development);

// Exporting db connection to be used in a different file.
export const db = {
  conn: sequelize,
  Sequelize: Sequelize,
};

export const models = {
  user: Users(),
};


const connect_to_db = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}; 

export default connect_to_db;
