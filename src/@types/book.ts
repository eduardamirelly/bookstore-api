import { Book } from "@prisma/client";

export type BookType = Book;

export type BookCreation = Omit<BookType, "createdAt" | "updatedAt" | "isInTreeding" | "isFavorite" | "id">;

export type BookPartial = Partial<BookType>;
