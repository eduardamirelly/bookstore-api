import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookPartial } from "../../../@types/book";

type UpdateBookResponse = BookPartial;
type UpdateBookRequest = BookPartial;

export class UpdateBookService {
  async execute(bookId: string, request: UpdateBookRequest): Promise<UpdateBookResponse> {

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

    const book = await prisma.book.update(
      {
        where:{
          id: bookId,
        },
        data: request,
      }
    );

    return book;
  }
}

