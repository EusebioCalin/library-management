
enum BookGenreEnum {
  Horror = 'Horror',
  Biography = 'Biography',
  Comedy = 'Comedy',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
}

interface Book {
  id: number,
  title: string;
  author: string;
  genre: BookGenreEnum;
  description: string;
}

type ColumnId = keyof Omit<Book, "id"> | "actions";
interface Column {
  id: ColumnId;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface AddBookDialog {
  title: string;
  author: string;
  genre: string;
  description: string;
}

export {
  BookGenreEnum,
  type Book,
  type Column,
  type AddBookDialog,
}