/*
  Warnings:

  - You are about to drop the column `date` on the `Lunch` table. All the data in the column will be lost.
  - Added the required column `dateWeek` to the `Lunch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lunch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateWeek" TEXT NOT NULL
);
INSERT INTO "new_Lunch" ("id") SELECT "id" FROM "Lunch";
DROP TABLE "Lunch";
ALTER TABLE "new_Lunch" RENAME TO "Lunch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
