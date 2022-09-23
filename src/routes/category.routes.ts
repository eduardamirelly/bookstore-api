import { Router } from "express";
import { CategoryController } from "../services/categories/controller";

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.show);
categoryRoutes.post("/", categoryController.create);
categoryRoutes.put("/:categoryId", categoryController.update);

export { categoryRoutes };
