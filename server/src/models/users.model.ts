import { DataTypes } from "sequelize";
import { db } from "./index.js";
import { NextFunction } from "express";

const Users = () => {
  const Users = db.conn.define( "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          len: [3, 20],
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: {
            msg: 'Please enter a valid email address'
          },
          isUnique: async (value: string, next: NextFunction ) => {
            const user = await Users.findOne({ where: { email: value } });
            if (user) {
              return next("Email already in use");
            }
            return next();
          },
        },
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};

export default Users;

export interface user_db {
  id: number;
  username: string;
  email: string;
  password: string
}