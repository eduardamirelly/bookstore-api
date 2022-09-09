/*
  Warnings:

  - You are about to drop the column `name` on the `Book` table. All the data in the column will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "name",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
