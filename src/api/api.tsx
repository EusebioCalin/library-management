import axios from "axios";
import { Book } from "../types/types";
import { BOOKS_URL } from "../utils/utils";

const addNewBook = async (book: Book) => {
  try {
    const res = await axios.post(BOOKS_URL, book);
    return res;
  } catch (e) {
    console.error("Error", e);
  }
};

const deleteBook = async (bookId: number) => {
  try {
    const res = await axios.delete(`${BOOKS_URL}/${bookId}`);
    return res;
  } catch (e) {
    console.error("Error", e);
  }
};

const updateBook = async (book: Book) => {
  try {
    const res = await axios.put(`${BOOKS_URL}/${book.id}`, {
      ...book,
    });
    return res;
  } catch (e) {
    console.error("Error", e);
  }
};

export { addNewBook, deleteBook, updateBook };
