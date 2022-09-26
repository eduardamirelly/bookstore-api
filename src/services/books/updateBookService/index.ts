import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

import { BookPartial } from "../../../@types/book";

type UpdateBookResponse = BookPartial;
interface UpdateBookRequest extends BookPartial {
  categories?: string[];
};

export class UpdateBookService {
  async execute(bookId: string, request: UpdateBookRequest): Promise<UpdateBookResponse> {

    const {
      categories,
      title,
      description,
      author,
      price,
      cover
    } = request;

    //Verify if the book exists

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
          bookId: isAlreadyBookExists.id,
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
            id: bookId,
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

    //Normal update data of book

    const book = await prisma.book.update(
      {
        where:{
          id: bookId,
        },
        data: {
          title,
          description,
          author,
          price,
          cover,
        }
      }
    );

    return book;
  }
}

