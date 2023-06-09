import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "../../config/environments";
import { TokenPayLoad } from "../middleware/auth";
import { UserRepos } from "../user.repos";
export class LoginUserController {
  public static async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email);

      const repos = new UserRepos();
      const user = await repos.findByEmail(email);
      if (!user) {
        return res.status(400).json({
          message: "INVALID EMAIL",
        });
      }
      if (!user.inUse) {
        throw new Error("User not found");
      }
      const verifyUser = await bcrypt.compare(password, user.password);

      if (!verifyUser) {
        return res.status(400).json({
          message: "INVALID PASSWORD OR EMAIL",
        });
      }
      const payLoad: TokenPayLoad = {
        name: user.name,
        email: user.email,
        photoFile: user.photoFile,
        isAdmin: user.isAdmin,
        course: user.coursesId,
      };
      const token = jwt.sign(payLoad, SECRET_JWT);
      return res.status(201).json({
        message: {
          token: token,
          data: user,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
