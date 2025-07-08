export type Book = {
  _id?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

export type Borrow = {
  _id?: string;
  book: string;
  quantity: number;
  dueDate: Date;
  createAt?: Date;
  updatedAt?: Date;
};

export type BorrowDetails = {
  _id: string;
  bookTitle: string;
  totalQuantity: number;
  isbn: string;
};
