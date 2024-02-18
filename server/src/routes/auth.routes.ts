import { Router } from 'express';
const router = Router();
import { signup, logout, signin } from '../controllers/auth.controller.js';

// A route for signing up a new user
router.post('/signup', signup);

// A route for logging in an existing user
router.post('/signin', signin);

// A route for logging out a user
router.post('/logout', logout);

export default router; 
