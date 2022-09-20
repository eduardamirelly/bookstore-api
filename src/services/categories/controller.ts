import { RequestHandler, Response } from "express";
import { CreateCategoryService } from "./createCategoryService";

export class CategoryController {
  create: RequestHandler = async (request, response): Promise<Response> => {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({name});

    return response.status(201).json(category);
  }
}
