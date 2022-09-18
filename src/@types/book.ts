export interface BookType {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string;
  isFavorite: boolean;
  isInTreeding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookCreation {
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string;
}

export type BookPartial = Partial<BookType>;
