import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SALT } from "./config/environments";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const passwordHas = await bcrypt.hash("ADMIN", SALT);
  await prisma.users.create({
    data: {
      name: "ADMIN",
      email: "ADMIN@ADMIN.COM",
      birthDate: "ADMIN",
      photoFile: "ADMIN",
      password: passwordHas,
      coursesId: "INFO1",
    },
  });
  // await prisma.courses.create({
  //   data: {
  //     name: "informatica",
  //     sigla: "INFO1",
  //     year: 1,
  //   },
  // });
  // await prisma.courses.create({
  //   data: {
  //     name: "enologia",
  //     sigla: "ENO1",
  //     year: 1,
  //   },
  // });
  // await prisma.courses.create({
  //   data: {
  //     name: "informatica",
  //     sigla: "INFO2",
  //     year: 2,
  //   },
  // });
  // await prisma.courses.create({
  //   data: {
  //     name: "enologia",
  //     sigla: "ENO2",
  //     year: 2,
  //   },
  // });
  // await prisma.courses.create({
  //   data: {
  //     name: "agronomia",
  //     sigla: "AGRO1",
  //     year: 1,
  //   },
  // });
  // await prisma.courses.create({
  //   data: {
  //     name: "agronomia",
  //     sigla: "AGRO2",
  //     year: 2,
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
