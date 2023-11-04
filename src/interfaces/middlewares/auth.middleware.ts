import { auth } from '../../infrastructure/firebase/authentication';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../types/CustomRequest';
export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Authorization token missing');
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    // console.log('decodedToken: ', decodedToken);
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};
