import { Request, RequestHandler, Response } from "express";
import { CreateCategoryService } from "./createCategoryService";
import { DeleteCategoryService } from "./deleteCategoryService";
import { ShowCategoriesService } from "./showCategoriesService";
import { UpdateCategoryService } from "./updateCategoryService";

export class CategoryController {
  show: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const showCategoriesService = new ShowCategoriesService();

    const categories = await showCategoriesService.execute();

    return response.status(200).json(categories);
  }

  create: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({name});

    return response.status(201).json(category);
  }

  update: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const {
      params: { categoryId },
      body
    } = request;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute(categoryId, body);

    return response.status(200).json(category);
  }

  delete: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const {
      params: { categoryId }
    } = request;

    const deleteCategoryService = new DeleteCategoryService();

    await deleteCategoryService.execute(categoryId);

    return response.status(204).send();
  }
}
