import { useState } from "react";
import { Paper, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSWRConfig } from "swr";
import { BookTable } from "./BookTable";
import { UpsertBookDialog } from "./UpsertBookDialog";
import { CustomButton } from "./CustomButton";
import { useBooks } from "../api/hooks/useBooks";
import { addNewBook, deleteBook, updateBook } from "../api/api";
import { Book } from "../types/types";
import { BOOKS_URL } from "../utils/utils";

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const BookList = () => {
  const { mutate } = useSWRConfig();
  const { books, isError, isLoading } = useBooks();

  const [isEdit, setIsEdit] = useState(false);
  const [inEditBook, setInEditBook] = useState<Book>();
  const [isUpsertBookModalOpen, setIsUpsertBookModalOpen] = useState(false);
  const handleSetIsAddBookModalOpen = (value: boolean) => {
    setIsUpsertBookModalOpen(value);
  };

  const handleAddNewBook = async (value: Book) => {
    await addNewBook(value);
    setIsUpsertBookModalOpen(false);
    mutate(BOOKS_URL);
  };

  const handleUpdateBook = async (value: Book) => {
    await updateBook(value);
    setIsUpsertBookModalOpen(false);
    setIsEdit(false);
    mutate(BOOKS_URL);
  };

  const handleDeleteBook = async (bookId: number) => {
    await deleteBook(bookId);
    setIsUpsertBookModalOpen(false);
    mutate(BOOKS_URL);
  };

  const handleEditBook = (value: Book) => {
    setInEditBook(value);
    setIsEdit(true);
    setIsUpsertBookModalOpen(true);
  };

  if (isError) {
    return (
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">
            😵 Something went wrong, please try again.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">Loading</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <StyledPaper sx={{ width: "100%", overflow: "hidden" }}>
            <BookTable
              books={books}
              handleDeleteBook={handleDeleteBook}
              handleEditBook={handleEditBook}
            />
          </StyledPaper>
        </Grid>
        <Grid>
          <CustomButton
            onClick={() => {
              handleSetIsAddBookModalOpen(true);
              setIsEdit(false);
            }}
          >
            Add new book
          </CustomButton>
        </Grid>
      </Grid>
      {isUpsertBookModalOpen && (
        <UpsertBookDialog
          editedBook={inEditBook}
          handleAddNewBook={handleAddNewBook}
          handleSetIsOpen={handleSetIsAddBookModalOpen}
          handleUpdateBook={handleUpdateBook}
          isEdit={isEdit}
          isOpen={isUpsertBookModalOpen}
          key={"upsert-book-modal"}
        />
      )}
    </>
  );
};
