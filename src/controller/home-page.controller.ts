import { Request, Response } from "express";
import { UserRepos } from "../user.repos";
import moment from "moment";
import { Lunch, Lunch_courses } from "@prisma/client";

moment.locale("pt-br");

export class HomePageController {
  public static async execute(req: Request, res: Response) {
    try {
      const email = req.user.email;
      const repos = new UserRepos();

      const user = await repos.findUserForHome(email);
      if (!user) {
        return res.status(401).json({
          message: "INVALID USER",
        });
      }

      let isLunch = HomePageController.getDateWeek(user.lunch);

      const returnData = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        photoFile: user.photoFile,
        course: {
          sigla: user.course?.sigla,
          name: user.course?.name,
          year: user.course?.year,
        },
        lunch: isLunch,
        linkAuthorized: `http://localhost:3000/api/v1/users/confirm/${user.linkAuthorized}`,
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
  public static getDateWeek(
    lunch: (Lunch_courses & {
      lunch: Lunch;
    })[]
  ): boolean {
    let returnValue = false;
    lunch.forEach((element) => {
      if (
        moment().format("dddd").split("-")[0].toLocaleLowerCase() ==
        element.lunch.dateWeek.toLocaleLowerCase()
      ) {
        returnValue = true;
      }
    });
    return returnValue;
  }
}
