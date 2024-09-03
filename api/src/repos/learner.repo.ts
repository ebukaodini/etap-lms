import { LearnerLesson, LearnerSubject } from "@prisma/client";
import { connectDb } from "../services/db";

export class LearnerRepo {
  private static db = connectDb();
  private static learnerSubjects = this.db.learnerSubject;
  private static learnerLessons = this.db.learnerLesson;

  static async startSubject(
    userId: LearnerSubject["userId"],
    subjectId: LearnerSubject["subjectId"],
    lessons: Array<Partial<LearnerLesson>>
  ): Promise<LearnerSubject> {
    try {
      return this.learnerSubjects.create({
        data: { userId, subjectId, lessons: { create: lessons } },
      });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
  }

  static async completeLesson(
    userId: LearnerLesson["userId"],
    lessonId: LearnerLesson["id"]
  ): Promise<LearnerLesson> {
    try {
      return await this.learnerLessons
        .update({
          data: { completed: true },
          where: { userId, id: lessonId },
        })
        .then(async (resp) => {
          resp.learnerSubjectId;
          const allLessons = this.learnerLessons.findMany({
            where: { learnerSubjectId: resp.learnerSubjectId },
          });

          // update learner subject if all lessons are completed
          if (
            (await allLessons).filter((lesson) => lesson.completed === true)
          ) {
            this.learnerSubjects.update({
              where: { id: resp.learnerSubjectId },
              data: { completed: true },
            });
          }

          return resp;
        });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
  }

  static async findMySubjects(
    userId: LearnerSubject["userId"]
  ): Promise<LearnerSubject[]> {
    try {
      return (await this.learnerSubjects.findMany({
        where: { userId },
        select: {
          id: true,
          completed: true,
          startedAt: true,
          subject: { select: { id: true, title: true, description: true } },
          lessons: {
            select: {
              id: true,
              lesson: {
                select: {
                  id: true,
                  title: true,
                  videoLink: true,
                  description: true,
                  subjectId: true,
                },
              },
              completed: true,
              startedAt: true,
            },
          },
        },
        orderBy: { startedAt: "desc" },
      })) as unknown as LearnerSubject[];
    } catch (error: any) {
      throw error;
    }
  }

  static async findSubjectLearners(subjectId: number) {
    try {
      return (await this.learnerSubjects.findMany({
        where: { subjectId },
        select: {
          completed: true,
          startedAt: true,
          lessons: { select: { completed: true } },
          learner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { startedAt: "desc" },
      })) as unknown as LearnerSubject[];
    } catch (error: any) {
      throw error;
    }
  }
}
