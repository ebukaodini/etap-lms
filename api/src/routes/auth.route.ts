import express from "express";
import { AuthDto } from "../dtos/auth.dto";
import { validator } from "../middlewares";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post(
  "/auth/sign-up",
  validator(AuthDto, "create"),
  AuthController.signUp
);
authRoutes.post(
  "/auth/sign-in",
  validator(AuthDto, "authenticate"),
  AuthController.signIn
);

export default authRoutes;
