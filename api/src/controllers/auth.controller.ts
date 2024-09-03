import { Request, Response } from "express";
import IResponse from "../interfaces/IResponse";
import { AuthDto } from "../dtos/auth.dto";
import { UserRepo } from "../repos/user.repo";
import { Role } from "@prisma/client";
import { AuthService } from "../services/auth";

export class AuthController {
  static async signUp(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = AuthDto.fromJson(req.body);

      // create user account
      const user = await UserRepo.createUser({ ...data, role: Role.LEARNER });

      return res.success("User profile created.", {
        user: AuthDto.toJson(user),
        token: AuthService.sign({ id: user.id, role: user.role }),
      });
    } catch (error: any) {
      return res.error("User not created!", error.message);
    }
  }

  static async signIn(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = AuthDto.fromJson(req.body);
      const user = await UserRepo.findUserByEmail(data.email);

      if (!user) {
        throw new Error();
      }

      return res.success("User profile.", {
        user: AuthDto.toJson(user),
        token: AuthService.sign({ id: user.id, role: user.role }),
      });
    } catch (error: any) {
      return res.error("Profile not found!");
    }
  }
}
