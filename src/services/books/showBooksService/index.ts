import { prisma } from "../../../prisma/client";

import { BookType } from "../../../@types/book";

type ShowBooksResponse = BookType[];

export class ShowBooksService {
  async execute(): Promise<ShowBooksResponse> {

    const books = await prisma.book.findMany({
      include: {
        categories: {
          select: {
            category: true
          }
        }
      }
    });

    return books;
  }
}

