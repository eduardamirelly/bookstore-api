import { Router } from "express";
import { CategoryController } from "../services/categories/controller";

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.post("/", categoryController.create);

export { categoryRoutes };
