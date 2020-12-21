import { check } from "express-validator";

const createProfileValidation = [
  check("status", "Status should not be empty").not().isEmpty(),
  check("bio", "Bio should not be empty").not().isEmpty(),
];

export { createProfileValidation };
