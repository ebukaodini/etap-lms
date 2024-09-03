import { Lesson } from "@prisma/client";

export class Subject {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
}
