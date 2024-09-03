import { IsNotEmpty, IsString } from "class-validator";
import { Subject } from "../entities/subject.entity";
import { Exists } from "../validators/exists";

export class SubjectDto {
  @IsString({ message: "Title must be a string", groups: ["create", "update"] })
  @IsNotEmpty({ message: "Title is required", groups: ["create", "update"] })
  title: string;

  @IsString({ message: "Title must be a string", groups: ["create", "update"] })
  @IsNotEmpty({
    message: "Description is required",
    groups: ["create", "update"],
  })
  description: string;

  @Exists(
    { entity: "subject", field: "id", transform: (v) => Number(v) },
    { message: "Subject does not exist", groups: ["start", "learners"] }
  )
  @IsNotEmpty({
    message: "Subject ID is required",
    groups: ["start", "learners"],
  })
  subjectId?: number;

  @Exists(
    { entity: "learnerLesson", field: "id", transform: (v) => Number(v) },
    { message: "Lesson does not exist", groups: ["complete"] }
  )
  @IsNotEmpty({ message: "Lesson ID is required", groups: ["complete"] })
  lessonId?: number;

  public static fromJson(data: { [key: string]: any }): SubjectDto {
    const subject: SubjectDto = new SubjectDto();

    if (data?.title) subject.title = data.title;
    if (data?.description) subject.description = data.description;
    if (data?.subjectId) subject.subjectId = Number(data.subjectId);
    if (data?.lessonId) subject.lessonId = Number(data.lessonId);

    return subject;
  }

  public static toJson(subject: Subject): object {
    if (!subject) {
      return;
    }

    return {
      id: subject.id,
      title: subject.title,
      description: subject.description,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
      lessons: subject.lessons,
    };
  }

  public static toArray(subjects: Subject[]): object[] {
    return subjects.map((subject) => this.toJson(subject));
  }
}
