// eslint-disable-next-line @typescript-eslint/no-redeclare
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const profileChecker = () => (req: Request, res: Response, next: NextFunction) => {
  if (Boolean(process.env.IS_ADMIN)) next();
  else
    res.send({ error: -1, description: `route ${req.originalUrl}, ${req.method} method, not authorized` });
};

export default profileChecker;
