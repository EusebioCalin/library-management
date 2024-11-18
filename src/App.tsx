import { BookList } from "./components/BookList";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: "24px" }}>
      <Grid container spacing={2} mb={4}>
        <Grid xs={12}>
          <Typography variant="h4">📖 Book List 📚</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">Your personal library</Typography>
        </Grid>
      </Grid>
      <BookList />
    </Container>
  );
}

export default App;
