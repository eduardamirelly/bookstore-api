import { Router } from "express";
import { bookRoutes } from "./book.routes";
import { categoryRoutes } from "./category.routes";

const routes = Router();

routes.use("/books", bookRoutes);
routes.use("/categories", categoryRoutes);

export { routes };
