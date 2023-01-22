import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookPartial } from "../../../@types/book";

type ShowBookResponse = BookPartial;

export class ShowBookService {
  async execute(bookId: string): Promise<ShowBookResponse> {

    const book = await prisma.book.findUnique(
      {
        where:{
          id: bookId,
        },
        include: {
          categories: {
            select: {
              category: true
            }
          }
        }
      },
    );

    if (!book) {
      throw new AppError("Book don't exists");
    }

    return book;
  }
}

