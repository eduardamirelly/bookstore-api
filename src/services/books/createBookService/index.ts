import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookCreation, BookType } from "../../../@types/book";

type CreateBookResponse = BookType;
type CreateBookRequest = BookCreation;

export class CreateBookService {
  async execute({ title, description, author, price, cover }: CreateBookRequest): Promise<CreateBookResponse> {

    if (!title || !description || !author || !price || !cover) {
      throw new AppError('Missing fields');
    }

    const data = {
      title,
      description,
      author,
      price,
      cover
    }

    const book = await prisma.book.create({
      data
    })

    return book;
  }
}

