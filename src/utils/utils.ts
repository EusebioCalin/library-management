import { BookGenreEnum } from "../types/types"

const BASE_URL = 'http://localhost:3001'
const BOOKS_URL = `${BASE_URL}/books`

const bookGenres = Object.values(BookGenreEnum)

function isEnumMember<E>(
  value: unknown, enumArg: Record<string | number | symbol, E>
): value is E {
  return (Object.values(enumArg) as unknown[]).includes(value);
}

const isBookGenre = (value: string) => {
  return isEnumMember(value, BookGenreEnum)
}

export {
  BASE_URL,
  BOOKS_URL,
  bookGenres,
  isBookGenre,
}