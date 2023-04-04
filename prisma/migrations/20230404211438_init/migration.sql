-- AlterTable
ALTER TABLE "Courses" ADD COLUMN "lunchId" TEXT;

-- CreateTable
CREATE TABLE "Lunch_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lunchId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    CONSTRAINT "Lunch_courses_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Lunch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lunch_courses_course_fkey" FOREIGN KEY ("course") REFERENCES "Courses" ("sigla") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lunch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);
