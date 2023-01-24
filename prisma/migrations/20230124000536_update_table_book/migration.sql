/*
  Warnings:

  - You are about to drop the column `isInTreeding` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "isInTreeding",
ADD COLUMN     "isInTrending" BOOLEAN NOT NULL DEFAULT false;
