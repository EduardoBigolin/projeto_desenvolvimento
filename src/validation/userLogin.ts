import { body, validationResult } from "express-validator";

export const userValidations = [
  body("email").isEmail().withMessage("O email não é válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
];
export const validateUserLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
