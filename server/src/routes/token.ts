import { Router } from 'express';
const router = Router();
import jwt, { Secret } from 'jsonwebtoken';
import  RefreshToken from '../models/refreshToken.js';
import config from '../config/auth.config.js'
import { env } from '../config/db.config.js';

router.post('/', async (req, res) => {
  // const { refreshToken } = req.body;
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token provided' });
  }
  const token: any = await RefreshToken.findOne({ where: { token: refreshToken } });

  if (!token || token.expiresAt < new Date()) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }

  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET as Secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const accessToken = jwt.sign({ user: user.id }, config.secret as Secret, { expiresIn: '30m' });
    console.log('new token', accessToken);
    res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 30 * 1000 * 60 });
    return res.status(200).json({ message: 'token refreshed successfully!', status: 200 });
  });
});


export default router;

// Does the access Token get cleared from our server once it is consumed completely.
// return res.json({ accessToken });