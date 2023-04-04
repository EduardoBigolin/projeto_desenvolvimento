import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SALT } from "./config/environments";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const passwordHas = await bcrypt.hash("ADMIN", SALT);

  await prisma.lunch.create({
    data: {
      id: "1",
      dateWeek: "Segunda",
    },
  });
  await prisma.lunch.create({
    data: {
      id: "2",
      dateWeek: "Terça",
    },
  });
  await prisma.lunch.create({
    data: {
      id: "3",
      dateWeek: "Quarta",
    },
  });
  await prisma.lunch.create({
    data: {
      id: "4",
      dateWeek: "Quinta",
    },
  });
  await prisma.lunch.create({
    data: {
      id: "5",
      dateWeek: "Sexta",
    },
  });

  await prisma.courses.create({
    data: {
      name: "informatica",
      sigla: "INFO1",
      year: 1,
    },
  });
  await prisma.courses.create({
    data: {
      name: "enologia",
      sigla: "ENO1",
      year: 1,
    },
  });
  await prisma.courses.create({
    data: {
      name: "informatica",
      sigla: "INFO2",
      year: 2,
    },
  });
  await prisma.courses.create({
    data: {
      name: "enologia",
      sigla: "ENO2",
      year: 2,
    },
  });
  await prisma.courses.create({
    data: {
      name: "agronomia",
      sigla: "AGRO1",
      year: 1,
    },
  });
  await prisma.courses.create({
    data: {
      name: "agronomia",
      sigla: "AGRO2",
      year: 2,
    },
  });

  await prisma.users.create({
    data: {
      name: "ADMIN",
      email: "ADMIN@ADMIN.COM",
      birthDate: "ADMIN",
      photoFile: "ADMIN",
      isAdmin: true,
      password: passwordHas,
      coursesSigla: "INFO1",
    },
  });
  await prisma.lunch_courses.create({
    data: {
      lunchId: "2",
      course: "INFO1",
    },
  });

  await prisma.lunch_courses.create({
    data: {
      lunchId: "3",
      course: "INFO1",
    },
  });

  await prisma.lunch_courses.create({
    data: {
      lunchId: "1",
      course: "INFO1",
    },
  });
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
