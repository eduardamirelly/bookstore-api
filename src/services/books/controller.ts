import { RequestHandler, Response } from "express";
import { CreateBookService } from "./createBookService";

export class BookController {
  create: RequestHandler = async (request, response) => {
    const { title, description, author, price, cover, isFavorite } = request.body;

    const createBookService = new CreateBookService();

    const book = await createBookService.execute({title, description, author, price, cover, isFavorite});

    return response.status(201).json(book);
  }
}
