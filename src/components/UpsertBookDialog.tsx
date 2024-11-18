import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { bookGenres, isBookGenre } from "../utils/utils";
import { AddBookDialog, Book } from "../types/types";
import { CustomButton } from "./CustomButton";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#7B463C",
    color: "#FEFCFD",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  position: "sticky",
  bottom: 0,
  backgroundColor: "#FEFCFD",
  borderTop: "1px solid #C4C4C4",
  zIndex: 2,
}));

interface AddBookDialogProps {
  editedBook?: Book;
  handleAddNewBook: (value: Book) => void;
  handleSetIsOpen: (value: boolean) => void;
  handleUpdateBook: (value: Book) => void;
  isEdit?: boolean;
  isOpen: boolean;
}

export const UpsertBookDialog = ({
  editedBook,
  handleAddNewBook,
  handleSetIsOpen,
  handleUpdateBook,
  isEdit,
  isOpen,
}: AddBookDialogProps) => {
  const handleClose = () => {
    handleSetIsOpen(false);
  };
  const initialValues: AddBookDialog =
    isEdit && editedBook
      ? {
          title: editedBook.title,
          author: editedBook.author,
          genre: editedBook.genre,
          description: editedBook.description,
        }
      : { title: "", author: "", genre: "", description: "" };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validate: (values) => {
      const errors: Partial<AddBookDialog> = {};

      console.log("values", values);
      if (!values.title) {
        errors.title = "Required";
      }

      if (!values.author) {
        errors.author = "Required";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      if (!values.genre) {
        errors.genre = "Required";
      } else if (!isBookGenre(values.genre)) {
        errors.genre = "Invalid genre";
      }

      return errors;
    },
    onSubmit: (values) => {
      !isEdit
        ? handleAddNewBook(values as Book)
        : handleUpdateBook({ ...values, id: editedBook?.id } as Book);
    },
  });

  const isTitleError = Boolean(formik.touched.title && formik.errors.title);
  const isAuthorError = Boolean(formik.touched.author && formik.errors.author);
  const isGenreError = Boolean(formik.touched.genre && formik.errors.genre);
  const isDescriptionError = Boolean(
    formik.touched.description && formik.errors.description
  );
  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={isOpen}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-title">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>{`${isEdit ? "Edit" : "Add"} book to library`}</Box>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: "#FEFCFD" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit} style={{ overflow: "scroll" }}>
          <DialogContent>
            <Typography gutterBottom>
              Please fill in the book details
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  sx={{ width: "100%" }}
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  error={isTitleError}
                  helperText={isTitleError && formik.errors.title}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="author"
                  label="Author"
                  name="author"
                  sx={{ width: "100%" }}
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  error={isAuthorError}
                  helperText={isAuthorError && formik.errors.author}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid xs={12}>
                <FormControl fullWidth error={isGenreError}>
                  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                  <Select
                    id="genre"
                    label="Genre"
                    labelId="genre"
                    name="genre"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                  >
                    {bookGenres.map((genre) => {
                      return <MenuItem value={genre}>{genre}</MenuItem>;
                    })}
                  </Select>
                  {isGenreError && (
                    <FormHelperText>{formik.errors.genre}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  name="description"
                  rows={4}
                  sx={{ width: "100%" }}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  error={isDescriptionError}
                  helperText={isDescriptionError && formik.errors.description}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <StyledDialogActions>
            <CustomButton autoFocus type="submit">
              Save book
            </CustomButton>
          </StyledDialogActions>
        </form>
      </StyledDialog>
    </>
  );
};
