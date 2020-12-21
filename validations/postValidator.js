import { body } from "express-validator";

const createPostValidation = [
  // check("thumbnail", "Must select a thumbnail").not(),
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title Can not Be Empty")
    .isLength({ max: 100 })
    .withMessage("Title should not be over 100 characters")
    .trim(),
  body("body", "body should not be empty").not().isEmpty(),
];

export { createPostValidation };
