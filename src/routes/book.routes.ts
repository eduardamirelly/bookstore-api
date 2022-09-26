import { Router } from "express";
import { BookController } from "../services/books/controller";

const bookController = new BookController();

const bookRoutes = Router();

bookRoutes.get("/:bookId", bookController.show);
bookRoutes.get("/", bookController.showAll);
bookRoutes.post("/", bookController.create);
bookRoutes.put("/:bookId", bookController.update);
bookRoutes.delete("/:bookId", bookController.delete);

export { bookRoutes };
