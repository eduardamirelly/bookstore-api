import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";
import { CategoryCreation } from "../../../@types/category";

type UpdateCategoryResponse = CategoryCreation;
type UpdateCategoryRequest = CategoryCreation;

export class UpdateCategoryService {
  async execute(categoryId: string, { name }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {

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

    const category = await prisma.category.update({
      where:{
        id: categoryId,
      },
      data: {
        name
      }
    })

    return category;
  }
}

