import {
  Box,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Book, Column } from "../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7B463C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  "& .MuiSvgIcon-root": {
    path: {
      fill: "#7B463C",
    },
  },
}));

const columns: readonly Column[] = [
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
  { id: "genre", label: "Genre" },
  {
    id: "description",
    label: "Description",
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
  },
];

interface BookTableProps {
  books: Book[];
  handleEditBook: (book: Book) => void;
  handleDeleteBook: (bookId: number) => void;
}

export const BookTable = ({
  books = [],
  handleEditBook,
  handleDeleteBook,
}: BookTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderedBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer
        sx={{ maxHeight: 440, borderRadius: "4px", position: "relative" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedBooks?.length ? (
              renderedBooks.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Box
                              display={"flex"}
                              alignItems="center"
                              justifyContent={"center"}
                            >
                              <StyledIconButton
                                edge="start"
                                aria-label="edit"
                                onClick={() => {
                                  handleEditBook(row);
                                }}
                              >
                                <EditIcon />
                              </StyledIconButton>
                              <StyledIconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  handleDeleteBook(row.id);
                                }}
                              >
                                <DeleteIcon />
                              </StyledIconButton>
                            </Box>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Books Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
