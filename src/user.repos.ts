import { PrismaClient } from "@prisma/client";

export interface UsersDTO {
  name: string;
  email: string;
  password: string;
  photoFile: string;
  isAdmin: boolean;
  birthDate: string;
  coursesId: string;
}
export class UserRepos {
  private prisma = new PrismaClient();

  public async save(userData: UsersDTO) {
    return await this.prisma.users.create({
      data: userData,
    });
  }
  public async listAll() {
    return this.prisma.users.findMany({
      include: {
        Courses: true,
      },
    });
  }
  public async update(userData: UsersDTO, userId: string) {
    return this.prisma.users.update({
      where: {
        id: userId,
      },
      data: userData,
    });
  }
  public async deleteById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
  public async alterById(id: string, userData: UsersDTO) {
    return await this.prisma.users.update({
      data: userData,
      where: { id },
    });
  }
  public async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
