import React, { useState } from "react";
import LogInDialog from "./LogInDialog";
import RegisterDialog from "./RegisterDialog";

interface UserDialogProps {
  open: boolean;
  handleClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = (props) => {
  const { open, handleClose } = props;
  const [activeDialog, setActiveDialog] = useState<string>("login");

  const renderDialog = () => {
    switch (activeDialog) {
      case "login":
        return (
          <LogInDialog
            open={open}
            handleClose={handleClose}
            setActive={setActiveDialog}
          />
        );
      case "register":
        return (
          <RegisterDialog
            open={open}
            handleClose={handleClose}
            setActive={setActiveDialog}
          />
        );
    }
  };

  return renderDialog()!;
};

export default UserDialog;
