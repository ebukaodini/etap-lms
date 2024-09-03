import { AuthDto } from "../dtos/auth.dto";
import { User } from "../entities/user.entity";
import { connectDb } from "../services/db";

export class UserRepo {
  private static db = connectDb();
  private static users = this.db.user;

  static async createUser(user: AuthDto): Promise<User> {
    try {
      return this.users.create({ data: { ...user, role: user.role! } });
    } catch (error: any) {
      throw error;
    }
  }

  static async findUserByEmail(email: User["email"]): Promise<User> {
    try {
      return this.users.findUnique({ where: { email } });
    } catch (error: any) {
      throw error;
    }
  }
}
