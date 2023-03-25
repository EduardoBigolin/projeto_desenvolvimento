import { Router } from "express";
import { CreateUserController } from "./controller/create-user.controller";
import { validateUser } from "./validation/userCreate";
import { validateUserLogin } from "./validation/userLogin";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
  });
});

// Users
routes.post("/users/create", validateUser, CreateUserController.execute);
routes.post("/users/login", validateUserLogin, CreateUserController.execute);

export default routes;
