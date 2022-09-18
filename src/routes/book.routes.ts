import { Router } from "express";
import { BookController } from "../services/books/controller";

const bookController = new BookController();

const bookRoutes = Router();

bookRoutes.get("/:bookId", bookController.show);
bookRoutes.post("/", bookController.create);
bookRoutes.put("/:bookId", bookController.update);

export { bookRoutes };
