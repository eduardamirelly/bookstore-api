import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

export class DeleteBookService {
  async execute(bookId: string): Promise<void> {

    const isAlreadyBookExists = await prisma.book.findFirst(
      {
        where:{
          id: bookId,
        }
      }
    );

    if (!isAlreadyBookExists) {
      throw new AppError("Book don't exists");
    }

    await prisma.book.delete(
      {
        where:{
          id: bookId,
        }
      }
    );
  }
}

