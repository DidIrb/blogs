import dotenv from "dotenv";
dotenv.config();
export const env = process.env;

const config = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB,
    host: env.DB_HOST,
    dialect: env.DIALECT,
    timestamps: false,
    pool : { 
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }
  },
};

export default config;