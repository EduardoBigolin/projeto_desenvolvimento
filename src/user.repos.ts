import { PrismaClient, Users } from "@prisma/client";

export interface UsersDTO {
  name: string;
  email: string;
  password: string;
  photoFile: string;
  isAdmin: boolean;
  birthDate: string;
}
export class UserRepos {
  private prisma = new PrismaClient();

  public async save(userData: UsersDTO) {
    return this.prisma.users.create({
      data: userData,
    });
  }
  public async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
