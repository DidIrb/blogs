import dotenv from 'dotenv'
dotenv.config()

import Sequelize from "sequelize";
const env = process.env 

const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};

const sequelize = new Sequelize(env.DB, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DIALECT,
    pool: {
      max: pool.max, 
      min: pool.min, 
      acquire: pool.acquire, 
      idle: pool.idle 
    }
});

export const db = {
    conn: sequelize,
    Sequelize: Sequelize
}

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

export default connectDB;