import { Request, Response } from "express";
import { SubjectRepo } from "../repos/subject.repo";
import { SubjectDto } from "../dtos/subject.dto";
import IResponse from "../interfaces/IResponse";
import { LearnerRepo } from "../repos/learner.repo";

export class SubjectController {
  static async createSubject(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = SubjectDto.fromJson(req.body);
      const subject = await SubjectRepo.create(data);
      return res.success("Subject created.", SubjectDto.toJson(subject));
    } catch (error: any) {
      return res.error("Subject not created!", error.message);
    }
  }

  static async fetchSubjects(req: Request, res: Response): Promise<IResponse> {
    try {
      const userId = req.context.id;
      const userRole = req.context.role;

      const allSubjects = await SubjectRepo.findAllSubjects();
      const mySubjects = await LearnerRepo.findMySubjects(userId);
      return res.success("All Subjects.", {
        allSubjects: SubjectDto.toArray(allSubjects),
        mySubjects: mySubjects,
      });
    } catch (error: any) {
      return res.error("Subjects not found!", error.message);
    }
  }

  static async startSubject(req: Request, res: Response): Promise<IResponse> {
    try {
      const userId = req.context.id;
      const data = SubjectDto.fromJson(req.params);
      const subject = await SubjectRepo.findOneSubject(data.subjectId);

      // add subject to user's subjects list here
      const studentSubject = await LearnerRepo.startSubject(
        userId,
        data.subjectId,
        subject.lessons.map((lessons) => ({ lessonId: lessons.id, userId }))
      );

      return res.success("Subject started.", studentSubject);
    } catch (error: any) {
      return res.error("Subject not started!", error.message);
    }
  }

  static async getSubjectLearners(
    req: Request,
    res: Response
  ): Promise<IResponse> {
    try {
      const data = SubjectDto.fromJson(req.params);

      const subjectLearners = await LearnerRepo.findSubjectLearners(
        data.subjectId
      );

      return res.success("Subject learners.", subjectLearners);
    } catch (error) {
      return res.error("Lesson not completed!", error.message);
    }
  }

  static async completeLesson(req: Request, res: Response): Promise<IResponse> {
    try {
      const userId = req.context.id;
      const data = SubjectDto.fromJson(req.params);

      const studentSubject = await LearnerRepo.completeLesson(
        userId,
        data.lessonId
      );

      return res.success("Lesson completed.", studentSubject);
    } catch (error: any) {
      return res.error("Lesson not completed!", error.message);
    }
  }

  static async deleteSubject(req: Request, res: Response): Promise<IResponse> {
    try {
      const subject = await SubjectRepo.delete(Number(req.params.subjectId));
      return res.success("Subject deleted.", SubjectDto.toJson(subject));
    } catch (error: any) {
      return res.error("Subject not deleted!", error.message);
    }
  }
}
