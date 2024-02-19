import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ColorButton } from ".";

interface CustomModalProps {
  title: string;
  content: string;
  closeText?: string;
  acceptText?: string;
  onClose?: () => void;
  onAccept?: () => void;
}

const CustomDialog: React.FC<CustomModalProps> = (props) => {
  const { title, content, closeText, acceptText, onClose, onAccept } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose!();
    setOpen(false);
  };

  const handleAccept = () => {
    onAccept!();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ColorButton onClick={handleClose} variant="outlined" color="secondary">
          {closeText ? closeText : "OK"}
        </ColorButton>
        {acceptText && (
          <ColorButton
            onClick={handleAccept}
            autoFocus
            variant="outlined"
            color="secondary"
          >
            {acceptText}
          </ColorButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
