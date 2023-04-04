/*
  Warnings:

  - You are about to drop the column `coursesId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lunchId]` on the table `Lunch_courses` will be added. If there are existing duplicate values, this will fail.

*/
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
    "coursesSigla" TEXT,
    "inUse" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Users_coursesSigla_fkey" FOREIGN KEY ("coursesSigla") REFERENCES "Courses" ("sigla") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("birthDate", "coursesSigla", "email", "id", "inUse", "isAdmin", "name", "password", "photoFile") SELECT "birthDate", "coursesSigla", "email", "id", "inUse", "isAdmin", "name", "password", "photoFile" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Lunch_courses_lunchId_key" ON "Lunch_courses"("lunchId");
