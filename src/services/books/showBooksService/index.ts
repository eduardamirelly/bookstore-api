import { prisma } from "../../../prisma/client";

import { Request } from "express";
import { ParsedUrlQuery } from "querystring";
import { BookType } from "../../../@types/book";

type ShowBooksResponse = BookType[];

interface RequestProps extends ParsedUrlQuery {
  search?: string;
  sort?: 'asc' | 'desc';
  category?: string;
  isInTrending?: 'true' | 'false';
}

export class ShowBooksService {
  async execute(request: Request): Promise<ShowBooksResponse> {

    const query = request.query as RequestProps;

    const search = query.search || '';
    const sort = query.sort || 'desc';
    const category = query.category || '';
    const isInTrending = query.isInTrending || 'false';

    let books = [];

    let orderBy = [
      {
        createdAt: sort,
      },
      {
        title: sort,
      }
    ];

    let include = {
      categories: {
        select: {
          category: true
        }
      }
    };

    if(category) {
      if (isInTrending == 'true') {
        books = await prisma.book.findMany({
          orderBy: orderBy,
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
              mode: 'insensitive',
            },
            isInTrending: true,
          },
          include: include,
        });
      } else {
        books = await prisma.book.findMany({
          orderBy: orderBy,
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
            },
          },
          include: include,
        });
      }
    } else {
      if (isInTrending == 'true') {
        books = await prisma.book.findMany({
          orderBy: orderBy,
          where: {
            title: {
              contains: search,
            },
            isInTrending: true,
          },
          include: include,
        });
      } else {
        books = await prisma.book.findMany({
          orderBy: orderBy,
          where: {
            title: {
              contains: search,
            }
          },
          include: include,
        });
      }
    }

    return books;
  }
}

