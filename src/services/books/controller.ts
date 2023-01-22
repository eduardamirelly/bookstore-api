import { Request, RequestHandler, Response } from "express";
import { CreateBookService } from "./createBookService";
import { DeleteBookService } from "./deleteBookService";
import { ShowBookService } from "./showBookService";
import { ShowBooksService } from "./showBooksService";
import { UpdateBookService } from "./updateBookService";

export class BookController {
  show: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const {
      params: { bookId }
    } = request;

    const showBookService = new ShowBookService();

    const book = await showBookService.execute(bookId);

    return response.status(200).json(book);
  }

  showAll: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const showBooksService = new ShowBooksService();

    const books = await showBooksService.execute(request);

    return response.status(200).json(books);
  }

  create: RequestHandler = async (request, response: Response): Promise<Response> => {
    const { title, description, author, price, cover, categories } = request.body;

    const createBookService = new CreateBookService();

    const book = await createBookService.execute({title, description, author, price, cover, categories});

    return response.status(201).json(book);
  }

  update: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const {
      params: { bookId },
      body
    } = request;

    const updateBookService = new UpdateBookService();

    const book = await updateBookService.execute(bookId, body);

    return response.status(200).json(book);
  }

  delete: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
    const {
      params: { bookId }
    } = request;

    const deleteBookService = new DeleteBookService();

    await deleteBookService.execute(bookId);

    return response.status(204).send();
  }
}
