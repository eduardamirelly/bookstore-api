import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookPartial, BookType } from "../../../@types/book";

type CreateBookResponse = BookType;
type CreateBookRequest = BookPartial;

export class CreateBookService {
  async execute({ title, description, author, price, cover, isFavorite }: CreateBookRequest): Promise<CreateBookResponse> {

    if (!title || !description || !author || !price || !cover) {
      throw new AppError('Missing fields');
    }

    const data = {
      title,
      description,
      author,
      price,
      cover,
      isFavorite
    }

    const book = await prisma.book.create({
      data
    })

    return book;
  }
}

