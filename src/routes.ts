import { Router } from "express";
import { CreateUserController } from "./controller/create-user.controller";
import { validateUserLogin } from "./validation/userLogin";
import { HomePageController } from "./controller/home-page.controller";
import { LoginUserController } from "./controller/login-user.controller";
import Auth from "./middleware/auth";
import { DeleteUserController } from "./controller/delete-user.controller";
import { UserRepos } from "./user.repos";
import { uploadImage } from "../config/multer";
import { ListAllCourseController } from "./controller/list-all-course.controller";
import { ListUserController } from "./controller/list-all-user.controlle";
const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
  });
});

routes
  .post(
    "/users/create",
    [Auth, uploadImage.single("image")],
    CreateUserController.execute
  )
  .post("/users/login", validateUserLogin, LoginUserController.execute)
  .get("/users/", Auth, HomePageController.execute)
  .delete("/users/del/:userId", Auth, DeleteUserController.execute)
  .get("/users/list", Auth, ListUserController.execute)
  .get("/users/confirm/:link", async (req, res) => {
    const repos = new UserRepos();
    const { link } = req.params;
    const user = await repos.confirmUser(link);

    if (!user) {
      return res.status(400).redirect("/static/invalidUser.html");
    }
    return res.status(200).redirect("/static/validUser.html");
  })
  .get("/course/list", Auth, ListAllCourseController.execute);
export default routes;
