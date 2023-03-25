import { Router } from "express";
import { CreateUserController } from "./controller/create-user.controller";
import { validateUserLogin } from "./validation/userLogin";
import { HomePageController } from "./controller/home-page.controller";
import { LoginUserController } from "./controller/login-user.controller";
import Auth from "./middleware/auth";
const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
  });
});

// Users
routes
  .post("/users/create", Auth, CreateUserController.execute)
  .post("/users/login", validateUserLogin, LoginUserController.execute)
  .get("/users/", Auth, HomePageController.execute);
export default routes;
