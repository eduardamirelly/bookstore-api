export interface BookType {
  title: string;
  description: string;
  author: string;
  price: number;
  cover: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type BookPartial = Partial<BookType>;
