import express from "express";
import { displayRoutes } from "../utils/route.utils";
import userRoutes from "./user.route";
import subjectRoutes from "./subject.route";
import authRoutes from "./auth.route";

const indexRoute = express.Router();
indexRoute.get("/", (_req, res, _next) => {
  res.success("Welcome!");
});

export const v1RoutePrefix = "/api/v1";
export const v1Routes = [indexRoute, authRoutes, userRoutes, subjectRoutes];

displayRoutes(v1RoutePrefix, v1Routes);
