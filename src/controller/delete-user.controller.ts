import { Request, Response } from "express";
import { UserRepos } from "../user.repos";

export class DeleteUserController {
  static async execute(req: Request, res: Response) {
    if (!req.user.isAdmin) {
      return res.status(401).json({
        message: "unauthorized for this function",
      });
    }
    const repos = new UserRepos();
    const { userId } = req.query;

    try {
      await repos.deleteById(userId as string);

      return res.status(200).json({
        message: "User deleted with success",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
