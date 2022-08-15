import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtConfig } from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = JwtConfig.params;

const publicKey = Buffer.from(<string>process.env.PUBLIC_KEY, 'base64').toString('ascii');

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: <[jwt.Algorithm]>config.decryptAlgorithms
    });
    req.headers.user = JSON.stringify(decoded);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  return next();
};
