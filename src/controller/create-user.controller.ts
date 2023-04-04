import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SALT, SECRET_JWT } from "../../config/environments";
import { TokenPayLoad } from "../middleware/auth";
import { UserRepos } from "../user.repos";

export class CreateUserController {
  public static async execute(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res.json(401).json({
        message: "unauthorized for this function",
      });
    }
    try {
      const { name, email, password, dataNasc, isAdmin, course } = req.body;
      const repos = new UserRepos();
      const emailExist = await repos.findByEmail(email);
      if (emailExist) {
        return res.status(400).json({
          message: "This email is at in use",
        });
      }
      const passwordHas = await bcrypt.hash(password, SALT);

      const photoFile = `http://localhost:3000/static/upload/${req.file?.filename}`;

      if (!photoFile) {
        return res.status(400).json({
          message: "Photo is required",
        });
      }

      const user = await repos.save({
        name,
        email,
        birthDate: dataNasc,
        isAdmin: false,
        password: passwordHas,
        photoFile,
        coursesSigla: course,
      });
      const payLoad: TokenPayLoad = {
        name: user.name,
        email: user.email,
        photoFile: user.photoFile,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(payLoad, SECRET_JWT);
      return res.status(201).json({
        message: {
          token: token,
          message: {
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            photoFile: user.photoFile,
            isAdmin: user.isAdmin,
            linkauthorized: `http://localhost:3000/api/v1/users/confirm/${user.linkAuthorized}`,
          },
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
