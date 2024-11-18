import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#7B463C",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FEFCFD",
  "&:hover": {
    backgroundColor: "#934839",
  },
  "&:focus": {
    outline: "unset",
  },
}));
