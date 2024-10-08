import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role, User } from "@prisma/client";
import { IsUnique } from "../validators/is-unique";

export class AuthDto {
  @IsNotEmpty({ message: "First name is required", groups: ["create"] })
  firstName: string;

  @IsNotEmpty({ message: "Last name is required", groups: ["create"] })
  lastName: string;

  @IsUnique({ entity: "user" }, { groups: ["create"] })
  @IsEmail({}, { message: "Invalid Email", groups: ["create", "authenticate"] })
  @IsNotEmpty({
    message: "Email is required",
    groups: ["create", "authenticate"],
  })
  email: string;

  @IsEnum(Object.values(Role), {
    message: "Role is required",
    groups: ["create"],
  })
  @IsOptional({ groups: ["create"] })
  role?: Role;

  public static fromJson(data: { [key: string]: any }): AuthDto {
    const user: AuthDto = new AuthDto();

    if (data?.firstName) user.firstName = data.firstName;
    if (data?.lastName) user.lastName = data.lastName;
    if (data?.email) user.email = data.email;
    if (data?.role) user.role = data.role;

    return user;
  }

  public static toJson(user: User): object {
    if (!user) {
      return;
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  public static toArray(users: User[]): object[] {
    return users.map((user) => this.toJson(user));
  }
}
