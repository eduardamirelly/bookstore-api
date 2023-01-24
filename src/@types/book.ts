import { Book } from "@prisma/client";

export type BookType = Book;

export type BookCreation = Omit<BookType, "createdAt" | "updatedAt" | "id">;

export type BookPartial = Partial<BookType>;
