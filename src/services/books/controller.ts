import { RequestHandler, Response } from "express";
import { CreateBookService } from "./createBookService";
import { UpdateBookService } from "./updateBookService";

export class BookController {
  create: RequestHandler = async (request, response): Promise<Response> => {
    const { title, description, author, price, cover, isFavorite } = request.body;

    const createBookService = new CreateBookService();

    const book = await createBookService.execute({title, description, author, price, cover, isFavorite});

    return response.status(201).json(book);
  }

  update: RequestHandler = async(request, response): Promise<Response> => {
    const {
      params: { bookId },
      body
    } = request;

    const updateBookService = new UpdateBookService();

    const book = await updateBookService.execute(bookId, body);

    return response.status(200).json(book);
  }
}
