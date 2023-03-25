import { Router } from "express";
import { CreateUserController } from "./controller/create-user.controller";
import { validateUser } from "./validation/userCreate";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
  });
});

// Users
routes.post("/users/create", validateUser, CreateUserController.execute);

export default routes;
