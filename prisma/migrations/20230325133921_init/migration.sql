/*
  Warnings:

  - Added the required column `coursesId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "photoFile" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "coursesId" TEXT NOT NULL,
    CONSTRAINT "Users_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("birthDate", "email", "id", "isAdmin", "name", "password", "photoFile") SELECT "birthDate", "email", "id", "isAdmin", "name", "password", "photoFile" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");
