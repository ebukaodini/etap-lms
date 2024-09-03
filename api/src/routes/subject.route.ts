import express from "express";
import { SubjectController } from "../controllers/subject.controller";
import { SubjectDto } from "../dtos/subject.dto";
import { validator } from "../middlewares";
import { AuthService } from "../services/auth";

const subjectRoutes = express.Router();

// teachers
subjectRoutes.post(
  "/subjects",
  AuthService.authenticate,
  AuthService.authorize(["ADMIN", "TEACHER"]),
  validator(SubjectDto, "create"),
  SubjectController.createSubject
);

subjectRoutes.get(
  "/subjects/:subjectId/learners",
  AuthService.authenticate,
  AuthService.authorize(["ADMIN", "TEACHER"]),
  validator(SubjectDto, "learners", "params"),
  SubjectController.getSubjectLearners
);

subjectRoutes.delete(
  "/subjects/:subjectId",
  AuthService.authenticate,
  AuthService.authorize(["ADMIN", "TEACHER"]),
  SubjectController.deleteSubject
);

// learners
subjectRoutes.get(
  "/subjects",
  AuthService.authenticate,
  SubjectController.fetchSubjects
);

subjectRoutes.post(
  "/subjects/:subjectId/start",
  AuthService.authenticate,
  validator(SubjectDto, "start", "params"),
  SubjectController.startSubject
);

subjectRoutes.post(
  "/lessons/:lessonId/complete",
  AuthService.authenticate,
  validator(SubjectDto, "complete", "params"),
  SubjectController.completeLesson
);

export default subjectRoutes;
