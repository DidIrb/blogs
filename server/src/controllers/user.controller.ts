import { models } from "../models/index.js";
import {Request, Response} from 'express';

const User = models.user;

// CREATE NEW USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userExists = await User.findOne({
      where: { name: data.name },
    });

    if (userExists) {
      throw new Error(`Username ${data.name} already exists`);
    }

    const user = await User.create(data);
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE USER BY ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// UPDATE METHOD
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ username, email, password });
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: any = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res
      .status(200)
      .json({
        message: `User with username ${user.username} was deleted successfully`,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
