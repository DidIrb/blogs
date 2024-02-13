import express from "express";
import { createUser, deleteUserById, getUserById, updateUserById } from "../controllers/user.controller.js";
import validateToken from "../middleware/validationToken.js";
const router = express.Router();

// CREATE
router.post('/', validateToken, createUser);
// GET
router.get('/:id', validateToken, getUserById);
// UPDATE
router.put('/:id', validateToken, updateUserById);
// DELETE
router.delete('/:id', validateToken, deleteUserById);

export default router;
