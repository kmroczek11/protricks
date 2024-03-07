import Button from "@mui/material/Button";
import { styled, experimental_sx as sx } from "@mui/system";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const ColorButton = styled(Button)`
  border-radius: 24px;
  padding: 0.6rem 1.2rem;
  text-transform: none;

  &:hover {
    background: #d3d3d3;
  }
`;

export const Logo = styled("img")`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: theme.palette.secondary.contrastText,
  },
}));

export { default as VideoBlock } from "./VideoBlock";
export { default as ImageBlock } from "./ImageBlock";
export { default as CustomList } from "./CustomList";
export { default as PhotoCard } from "./PhotoCard";
export { default as PhotoCards } from "./PhotoCards";
export { default as PhotoCardsLoader } from "./PhotoCardsLoader";
export { default as CustomTable } from "./CustomTable";
export { default as CustomAlert } from "./CustomAlert";
export { default as CustomAvatar } from "./CustomAvatar";
export { default as CustomDialog } from "./CustomDialog";
export { default as LoadingPhotoCard } from "./LoadingPhotoCard";
export { default as LoadingScreen } from "./LoadingScreen";
