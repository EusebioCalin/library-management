import useSWR from "swr"
import { BOOKS_URL } from "../../utils/utils"
import { getFetcher } from "../fetchers/fetchers"

export function useBooks() {
  const { data, error, isLoading, mutate } = useSWR(BOOKS_URL, getFetcher)

  return {
    books: data,
    isLoading,
    isError: error,
    mutate

  }
}