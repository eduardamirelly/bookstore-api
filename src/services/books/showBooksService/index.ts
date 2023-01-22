import { prisma } from "../../../prisma/client";

import { BookType } from "../../../@types/book";
import { Request } from "express";
import { ParsedUrlQuery } from "querystring";

type ShowBooksResponse = BookType[];

interface RequestProps extends ParsedUrlQuery {
  search?: string;
  sort?: 'asc' | 'desc';
  category?: string;
}

export class ShowBooksService {
  async execute(request: Request): Promise<ShowBooksResponse> {

    const query = request.query as RequestProps;

    const search = query.search || '';
    const sort = query.sort || 'desc';
    const category = query.category || '';

    let books = [];

    if(category) {
      books = await prisma.book.findMany({
        orderBy: [
          {
            createdAt: sort,
          },
          {
            title: sort,
          }
        ],
        where: {
          categories: {
            some: {
              category: {
                name: category,
              }
            },
          },
          title: {
            contains: search,
          }
        },
        include: {
          categories: {
            select: {
              category: true
            }
          }
        }
      });
    } else {
      books = await prisma.book.findMany({
        orderBy: [
          {
            createdAt: sort,
          },
          {
            title: sort,
          }
        ],
        where: {
          title: {
            contains: search,
          }
        },
        include: {
          categories: {
            select: {
              category: true
            }
          }
        }
      });
    }

    return books;
  }
}

