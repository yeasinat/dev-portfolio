/*
  Warnings:

  - You are about to drop the `_ProjectToTechnology` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN "technologiesUsed" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToTechnology";
PRAGMA foreign_keys=on;
