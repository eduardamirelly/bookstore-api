import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookCreation, BookType } from "../../../@types/book";
import { Category } from "@prisma/client";

type CreateBookResponse = BookType;
// type CreateBookRequest = BookCreation;

interface CreateBookRequest extends BookCreation {
  categories?: string[];
};

export class CreateBookService {
  async execute({ title, description, author, price, cover , categories }: CreateBookRequest): Promise<CreateBookResponse> {

    if (!title || !description || !author || !price || !cover) {
      throw new AppError('Missing fields');
    }

    let isCategoriesExists: Category[] = [];

    if(categories && categories.length > 0) {
      //Verify if the categories exists

       isCategoriesExists = await prisma.category.findMany({
        where: {
          name: {
            in: categories
          }
        }
      })

      if (isCategoriesExists.length < 1 || !isCategoriesExists) {
        throw new AppError("Categories don't exists");
      }
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        author,
        price,
        cover
      },
    })

    return book;
  }
}

