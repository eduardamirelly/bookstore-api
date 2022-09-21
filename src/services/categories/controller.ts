import { RequestHandler, Response } from "express";
import { CreateCategoryService } from "./createCategoryService";
import { UpdateCategoryService } from "./updateCategoryService";

export class CategoryController {
  create: RequestHandler = async (request, response): Promise<Response> => {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({name});

    return response.status(201).json(category);
  }

  update: RequestHandler = async (request, response): Promise<Response> => {
    const {
      params: { categoryId },
      body
    } = request;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute(categoryId, body);

    return response.status(200).json(category);
  }
}
