import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TraineeInfoDialogProps {
  trainee: {
    id: string;
    age: number;
    parentName: string;
    parentPhone: any;
    parentEmail: any;
    feedback: string;
    user: { id: string; firstName: string; lastName: string; imgSrc?: string };
  };
  open: boolean;
  handleClose: () => void;
  onClose?: () => void;
}

const TraineeInfoDialog: React.FC<TraineeInfoDialogProps> = (props) => {
  const { trainee, open, handleClose, onClose } = props;
  const { firstName, lastName } = trainee.user;
  const { age, parentName, parentPhone, parentEmail, feedback } = trainee;
  const info = [
    { name: "Wiek dziecka", value: age },
    { name: "Imię i nazwisko rodzica", value: parentName },
    { name: "Numer telefonu rodzica", value: parentPhone },
    { name: "E-mail rodzica", value: parentEmail },
    { name: "Skąd dowiedzieli się Państwo o zajęciach?", value: feedback },
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle>{`Informacje o ${firstName} ${lastName}`}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {info.map(({ name, value }) => (
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ fontWeight: 600 }}
            >
              {name}
            </Typography>
            <Typography component="div" variant="body2">
              {value}
            </Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default TraineeInfoDialog;
