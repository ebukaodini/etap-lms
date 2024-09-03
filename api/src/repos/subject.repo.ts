import { SubjectDto } from "../dtos/subject.dto";
import { Subject } from "../entities/subject.entity";
import { connectDb } from "../services/db";

export class SubjectRepo {
  private static db = connectDb();
  private static subjects = this.db.subject;

  static async create(subject: SubjectDto): Promise<Subject> {
    try {
      return this.subjects.create({ data: { ...subject } });
    } catch (error: any) {
      throw error;
    }
  }

  static async findAllSubjects(): Promise<Subject[]> {
    try {
      return this.subjects.findMany({
        include: { lessons: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async findOneSubject(subjectId: number): Promise<Subject> {
    try {
      return this.subjects.findFirst({
        where: { id: subjectId },
        include: { lessons: true },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async delete(subjectId: Subject["id"]): Promise<Subject> {
    try {
      return this.subjects.delete({ where: { id: subjectId } });
    } catch (error: any) {
      throw error;
    }
  }
}
