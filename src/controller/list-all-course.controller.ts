import { Request, Response } from "express";
import { UserRepos } from "../user.repos";

export class ListAllCourseController {
  public static async execute(req: Request, res: Response) {
    const repos = new UserRepos();
    const listAllCourse = await repos.listAllCourses();
    return res.status(200).json({ message: listAllCourse });
  }
}
