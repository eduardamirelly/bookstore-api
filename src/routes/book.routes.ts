import { Router } from "express";
import { BookController } from "../services/books/controller";

const bookController = new BookController();

const bookRoutes = Router();

bookRoutes.post("/", bookController.create);

export { bookRoutes };
