import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config/auth.config.js'
import { NextFunction, Response, Request } from 'express';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token; 
  // let token = req.header('Authorization');
  console.log("CHECKING TOKEN VALIDITY", token);
  // Check if the token exists
  if (!token) {
    console.log("no access token provided"); 
    return res.status(401).json({ message: 'Access denied, No token provided' });
  }
 
  try {
    // token = token.split(' ')[1]; // assumes it is a bearer token
    const decoded = jwt.verify(token, config.secret as Secret)  as JwtPayload; ;
    // req.user = decoded.user;
    (req as Request & { user?: any }).user = decoded.user;
    console.log(req)
    
    next();
  } catch (err) {
    // If the token is invalid, return an error
    console.log("token is invalid")
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;
