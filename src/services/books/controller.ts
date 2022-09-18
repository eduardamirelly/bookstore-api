import { RequestHandler, response, Response } from "express";
import { CreateBookService } from "./createBookService";
import { ShowBookService } from "./showBookService";
import { UpdateBookService } from "./updateBookService";

export class BookController {
  show: RequestHandler = async (request, response): Promise<Response> => {
    const {
      params: { bookId }
    } = request;

    const showBookService = new ShowBookService();

    const book = await showBookService.execute(bookId);

    return response.status(200).json(book);
  }

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
