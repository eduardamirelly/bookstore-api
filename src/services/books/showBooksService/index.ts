import { prisma } from "../../../prisma/client";

import { BookType } from "../../../@types/book";
import { Request } from "express";

type ShowBooksResponse = BookType[];

export class ShowBooksService {
  async execute(request: Request): Promise<ShowBooksResponse> {

    const { query } = request;


    console.log(query);

    // Get category by request.query
    // Know if have relation with some book

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

