import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";

export class DeleteCategoryService {
  async execute(categoryId: string): Promise<void> {

    const isAlreadyCategoryExists = await prisma.category.findFirst(
      {
        where:{
          id: categoryId,
        }
      }
    );

    if (!isAlreadyCategoryExists) {
      throw new AppError("Category don't exists");
    }

    await prisma.category.delete(
      {
        where:{
          id: categoryId,
        }
      }
    );
  }
}

