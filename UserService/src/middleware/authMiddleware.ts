import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, '12dedah324') as JwtPayload & { id: string };

    // req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
