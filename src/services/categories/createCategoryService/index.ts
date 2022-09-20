import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";
import { Category } from "@prisma/client";
import { CategoryCreation } from "../../../@types/category";

type CreateCategoryResponse = Category;
type CreateCategoryRequest = CategoryCreation;

export class CreateCategoryService {
  async execute({ name }: CreateCategoryRequest): Promise<CreateCategoryResponse> {

    if (!name) {
      throw new AppError('Missing name field');
    }

    const category = await prisma.category.create({
      data: {
        name
      }
    })

    return category;
  }
}

