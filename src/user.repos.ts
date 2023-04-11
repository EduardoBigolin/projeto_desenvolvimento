import { PrismaClient } from "@prisma/client";
import { log } from "console";

export interface UsersDTO {
  name: string;
  email: string;
  password: string;
  photoFile: string;
  isAdmin: boolean;
  birthDate: string;
  coursesSigla: string;
}
export class UserRepos {
  private prisma = new PrismaClient();

  public async listAllCourses() {
    return this.prisma.courses.findMany();
  }

  public async confirmUser(link: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        linkAuthorized: link,
      },
    });
    return user;
  }
  public async save(userData: UsersDTO) {
    return await this.prisma.users.create({
      data: userData,
    });
  }
  public async listAll(email: string) {
    return this.prisma.users.findMany({
      where: {
        email: {
          not: email,
        },
      },
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
  public async findUserForHome(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        Courses: true,
      },
    });
    console.log(user);

    if (!user || !user.coursesSigla) {
      throw new Error("User not found");
    }
    const lunch_course = await this.prisma.lunch_courses.findMany({
      where: {
        course: user.coursesSigla,
      },
      include: {
        lunch: true,
      },
    });

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      course: user.Courses,
      birthDate: user.birthDate,
      photoFile: user.photoFile,
      lunch: lunch_course,
      linkAuthorized: user.linkAuthorized,
    };
  }
}
