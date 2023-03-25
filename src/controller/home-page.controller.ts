import { Request, Response } from "express";
import { UserRepos } from "../user.repos";

export class HomePageController {
  public static async execute(req: Request, res: Response) {
    try {
      const email = req.user.email;
      const repos = new UserRepos();
      const user = await repos.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          message: "INVALID USER",
        });
      }
      const returnData = {
        name: user.name,
        email: user.email,
        course: user.coursesId,
        birthDate: user.birthDate,
        photoFile: user.photoFile,
      };
      res.status(200).json({
        message: {
          status: "ok",
          returnData,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}
