import Button from "@mui/material/Button";
import {
  styled,
  experimental_sx as sx,
} from '@mui/system';
import TextField from "@mui/material/TextField";

export const ColorButton = styled(Button)`
  border-radius: 24px;
  padding: 0.6rem 1.2rem;
  text-transform: none;

  &:hover {
    background: #d3d3d3;
  }
`;

export const Logo = styled("img")`
  width: 200px;
  height: 50px;
  object-fit: cover;
`;

export const StyledTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "250px",
 },
 [theme.breakpoints.up("md")]: {
    width: "600px",
 },
  borderRadius:'5px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}));

export { default as VideoBlock } from "./VideoBlock";
export { default as ImageBlock } from "./ImageBlock";
export { default as CustomList } from "./CustomList";
export { default as PhotoCard } from "./PhotoCard";
export { default as PhotoCards } from "./PhotoCards";
export { default as CustomTable } from "./CustomTable";
