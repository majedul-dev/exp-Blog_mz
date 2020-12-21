import { body } from "express-validator";

export const signupValidation = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name should not be empty")
    .isLength({ max: 15 })
    .withMessage("Name shuld be maximum 15 char"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email shuld not be empty")
    .isEmail()
    .withMessage("Please use a valid email")
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password shuld not be empty")
    .isLength({ min: 6 })
    .withMessage("Password must more than 6 char"),
];

export const loginValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Enter your email")
    .isEmail()
    .withMessage("Invalid credential"),
  body("password").not().isEmpty().withMessage("Enter your password"),
];
