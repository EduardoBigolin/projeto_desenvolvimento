import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRepos } from "../user.repos";
import { SALT } from "../../config/environments";

export class UpdateUserController {
  public static async execute(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res.json(401).json({
        message: "unauthorized for this function",
      });
    }
    const { userId } = req.params;
    try {
      const { name, email, password, dataNasc, course, isAdmin } = req.body;
      const repos = new UserRepos();
      const passwordHas = await bcrypt.hash(password, SALT);
      const photoFile = "";

      await repos.update(
        {
          name,
          email,
          birthDate: dataNasc,
          isAdmin,
          password: passwordHas,
          photoFile,
          coursesId: course,
        },
        userId
      );

      return res.status(201).json({
        message: {
          message: "Update with success",
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
