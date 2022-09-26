import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookCreation, BookType } from "../../../@types/book";

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

    const book = await prisma.book.create({
      data: {
        title,
        description,
        author,
        price,
        cover
      },
    })

    if (categories && categories.length > 0) {

      //Verify if the categories exists

      const isCategoriesExists = await prisma.category.findMany({
        where: {
          name: {
            in: categories
          }
        }
      })

      if (isCategoriesExists.length < 1 || !isCategoriesExists) {
        throw new AppError("Categories don't exists");
      }

      //Verify if the connection between Book and categories already exists

      const isAlreadyExistsBookOnCategories = await prisma.categoriesOnBooks.findMany({
        where: {
          bookId: book.id,
          categoryId: {
            in: isCategoriesExists.map((category) => category.id)
          }
        }
      })

      if (isAlreadyExistsBookOnCategories.length > 0) {
        throw new AppError("Connection between Book and Categories already exists");
      }

      //Registering categories on book

      isCategoriesExists.map(async (category) => {
        await prisma.book.update({
          where: {
            id: book.id,
          },
          data: {
            categories: {
              create: {
                category: {
                  connect: {
                    id: category.id
                  }
                }
              }
            }
          }
        })
      })
    }

    return book;
  }
}

