export type classnames = {
  [key: string]: string;
};

export type Book = {
  coverImage: string;
  description: string;
  discountRate: number;
  price: number;
  title: string;
};

export type Data = {
  data: { hasNext: boolean; totalPage: 10; data: Book[] };
  message: string;
};

export type ErrorResponse = {
  message: string;
};
