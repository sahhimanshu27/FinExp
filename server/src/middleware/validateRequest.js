import { validationResult } from "express-validator";

export const validateRequest = (Request, Response, NextFunction) => {
  const errors = validationResult(Request);
  if (!errors.isEmpty()) {
    return Response.status(400).json({ errors: errors.array() });
  }
  NextFunction();
};
