import { PrismaClient, Users } from "@prisma/client";

export class UserRepos {
  private prisma = new PrismaClient();

  public async save(userData: Users) {
    this.prisma.users.create({
      data: userData,
    });
  }
  public async findById(email: string) {
    this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
