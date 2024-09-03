import express from "express";
import { UserController } from "../controllers/user.controller";
import { AuthDto } from "../dtos/auth.dto";
import { validator } from "../middlewares";
import { AuthService } from "../services/auth";

const userRoutes = express.Router();

userRoutes.post(
  "/teachers",
  AuthService.authenticate,
  AuthService.authorize(["ADMIN", "TEACHER"]),
  validator(AuthDto, "create"),
  UserController.createTeacher
);

export default userRoutes;
