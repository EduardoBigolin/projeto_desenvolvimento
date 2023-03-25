/*
  Warnings:

  - Added the required column `sigla` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);
INSERT INTO "new_Courses" ("id", "name", "year") SELECT "id", "name", "year" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
