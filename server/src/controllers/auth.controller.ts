import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { models } from "../models/index.js";
import RefreshToken from '../models/refreshToken.js';
import config from '../config/auth.config.js'
import { Request, Response } from 'express';
import { env } from '../config/db.config.js';

const Refresh_Token = env.REFRESH_TOKEN_SECRET
const User = models.user;
export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log("showing the data that comes from client", req.body)
  // const { username, email, password } = userData;

  if (!username  || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  const user = await User.findOne({ where: { username } });

  if (user) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Was not handling errors here
  try {
    const newUser: any = await User.create({ username, email, password: hashedPassword });
    const data = {
      username: newUser.username,
      email: newUser.email 
    }
    return res.status(201).json({ message: 'User created successfully', data });
  } catch (err:any) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(401).json({ message: err.message });
    }
  }
  
};

export const signin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user: any = await User.findOne({ where: { email } });
  if (!user) { return res.status(404).json({ message: 'Wrong Email Provided' }) }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  // Generate an access token and refreshToken 
  const accessToken = jwt.sign({ user: user.id }, config.secret as Secret, { expiresIn: '30m' });
  const refreshToken = jwt.sign({ user: user.id }, Refresh_Token  as Secret, { expiresIn: '7d' });

  // Save the refresh token in the database with an expiration date
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await RefreshToken.create({ token: refreshToken, userId: user.id, expiresAt });

  // Set the refresh token in an HttpOnly cookie
  res.cookie('refresh_token', refreshToken, { httpOnly: true, expires: expiresAt });
  res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 30 * 1000 * 60 });

  const data = {
    username: user.username,
    email: user.email,
    image: user.image,
  }
  
  // Return user and the access token.
  return res.json({ data });
};


// Logging user out
export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token; 
  
    if (!refreshToken) {
      console.log("no refresh token provided");
      return res.status(400).json({ message: 'No refresh token provided' });
    }
  
    // Find and delete the refresh token from the database
    const result = await RefreshToken.destroy({ where: { token: refreshToken } });
  
    // Check if the refresh token was deleted
    if (result === 0) {
      return res.status(404).json({ message: 'Refresh token not found' });
    }
    res.clearCookie('refresh_token', { httpOnly: true });
    res.clearCookie('access_token', { httpOnly: true });
    // Return a success message
    return res.json({ message: 'User logged out successfully' });
  };
  