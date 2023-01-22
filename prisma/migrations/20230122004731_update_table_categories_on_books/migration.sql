-- DropForeignKey
ALTER TABLE "categories_on_books" DROP CONSTRAINT "categories_on_books_bookId_fkey";

-- AddForeignKey
ALTER TABLE "categories_on_books" ADD CONSTRAINT "categories_on_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
