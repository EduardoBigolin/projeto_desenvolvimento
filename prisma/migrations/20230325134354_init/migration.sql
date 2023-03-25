/*
  Warnings:

  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Courses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "sigla" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);
INSERT INTO "new_Courses" ("name", "sigla", "year") SELECT "name", "sigla", "year" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "photoFile" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "coursesId" TEXT NOT NULL,
    "coursesSigla" TEXT,
    CONSTRAINT "Users_coursesSigla_fkey" FOREIGN KEY ("coursesSigla") REFERENCES "Courses" ("sigla") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("birthDate", "coursesId", "email", "id", "isAdmin", "name", "password", "photoFile") SELECT "birthDate", "coursesId", "email", "id", "isAdmin", "name", "password", "photoFile" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
