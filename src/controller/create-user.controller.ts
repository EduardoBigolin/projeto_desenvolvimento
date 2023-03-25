import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SALT, SECRET_JWT } from "../../config/environments";
import { UserRepos } from "../user.repos";

export class CreateUserController {
  public static async execute(req: Request, res: Response) {
    try {
      const { name, email, password, dataNasc, isAdmin } = req.body;
      const repos = new UserRepos();
      const emailExist = await repos.findByEmail(email);
      if (emailExist) {
        return res.status(400).json({
          message: "This email is at in use",
        });
      }
      const passwordHas = await bcrypt.hash(password, SALT);
      const photoFile = "";
      const user = await repos.save({
        name,
        email,
        birthDate: dataNasc,
        isAdmin,
        password: passwordHas,
        photoFile,
      });
      const payLoad = {
        name: user.name,
        email: user.email,
        photoFile: user.photoFile,
      };
      const token = jwt.sign(payLoad, SECRET_JWT);
      return res.status(201).json({
        message: {
          token: token,
          message: user,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
