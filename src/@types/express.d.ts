import { TokenPayLoad } from "../middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayLoad;
    }
  }
}
