// @ts-ignore
import bcrypt from "bcrypt";
import { Request, Response } from "express";
// @ts-ignore
import jwt from "jsonwebtoken";
import { SALT, SECRET_JWT } from "../../config/environments";
import { TokenPayLoad } from "../middleware/auth";
import { UserRepos } from "../user.repos";
import { unlink } from "fs";
import {uploadImage} from "../../config/multer";
import * as fs from "fs";

export class CreateUserController {
  public static async execute(req: Request, res: Response) {
    // @ts-ignore
    if (!req.user.isAdmin) {
      throw new Error("unauthorized for this function")
    }
    try {
      const { name, email, password, dataNasc, isAdmin, course, image } = req.body;
      const repos = new UserRepos();
      const emailExist = await repos.findByEmail(email);
      const photoFile = `http://localhost:3000/static/upload/${req.file?.filename}`;
      if (emailExist) {
        throw new Error("This email is in use")
      }

      const passwordHas = await bcrypt.hash(password, SALT);

      if (!photoFile) {
        throw new Error("Photo is required")
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
      if (fs.existsSync(`http://localhost:3000/static/upload/${req.file?.filename}`)) {
        unlink(`http://localhost:3000/static/upload/${req.file?.filename}`, (err) => {
          if (err) throw err;
          console.log(req.file.filename)
        });
      }
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
