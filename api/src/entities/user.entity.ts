import { Role } from "@prisma/client";

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
}
