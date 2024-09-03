import { Request, Response } from "express";
import { UserRepo } from "../repos/user.repo";
import { AuthDto } from "../dtos/auth.dto";
import IResponse from "../interfaces/IResponse";
import { Role } from "@prisma/client";

export class UserController {
  static async createTeacher(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = AuthDto.fromJson(req.body);

      // create a teacher account
      const user = await UserRepo.createUser({ ...data, role: Role.TEACHER });

      return res.success("Teacher profile created.", AuthDto.toJson(user));
    } catch (error: any) {
      return res.error("Teacher not created!", error.message);
    }
  }
}
