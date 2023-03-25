import { body, validationResult } from "express-validator";

export const userValidations = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("O email não é válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
  body("dataNasc").isISO8601().withMessage("A data de nascimento não é válida"),
  body("isAdmin")
    .isBoolean()
    .withMessage("O valor de isAdmin deve ser booleano"),
];
export const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
