import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "../../config/environments";

export interface TokenPayLoad {
  name: string;
  email: string;
  photoFile: string;
  isAdmin: boolean;
  course: string;
}
function Auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_JWT as string, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({
          message: "Unauthorized",
        });
      }
      req.user = user as TokenPayLoad;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
}

export default Auth;