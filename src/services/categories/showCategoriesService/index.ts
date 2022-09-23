import { AppError } from "../../../utils/errors";
import { prisma } from "../../../prisma/client";
import { CategoryType } from "../../../@types/category";

type ShowCategoriesResponse = CategoryType[];

export class ShowCategoriesService {
  async execute(): Promise<ShowCategoriesResponse> {

    const categories = await prisma.category.findMany();

    return categories;
  }
}

