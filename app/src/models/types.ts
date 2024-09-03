export type Role = "LEARNER" | "ADMIN" | "TEACHER";
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  subjectId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Subject = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
};

export type MySubject = {
  id: number;
  completed: boolean;
  startedAt: Date;
  subject: Pick<Subject, "id" | "title" | "description">;
  lessons: {
    id: number;
    lesson: {
      id: number;
      title: string;
      videoLink: string;
      description: string;
      subjectId: number;
    };
    startedAt: Date;
    completed: false;
  }[];
};

export type SubjectLearner = {
  completed: false;
  startedAt: "2024-09-02T14:28:15.262Z";
  lessons: {
    completed: boolean;
  }[];
  learner: Exclude<User, "role" | "createdAt">;
};

export type StoreState = {
  user?: User;
  token?: string;
  allSubjects?: Subject[];
  mySubjects?: MySubject[];
  subjectLearners?: SubjectLearner[];
};
