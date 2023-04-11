import { Request, Response } from "express";
import { UserRepos } from "../user.repos";

export class ListUserController {
  static async execute(req: Request, res: Response) {
    console.log(req.user);

    if (!req.user.isAdmin) {
      return res.status(401).json({
        message: "unauthorized for this function",
      });
    }
    try {
      const repos = new UserRepos();
      const allUser = await repos.listAll(req.user.email);

      return res.status(200).json({ data: allUser });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
