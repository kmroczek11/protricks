import * as React from "react";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Status } from "../../../../../generated/graphql";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import ManageMembersItem from "./ManageMembersItem";

interface ManageMembersDialogProps {
  groupName: string;
  trainees?: Array<{
    id: string;
    birthDate: string;
    traineeName: string;
    parentPhone: any;
    parentEmail: any;
    feedback: string;
    status: Status;
    dateJoined: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      emailPlain: string;
      imgSrc?: string;
    };
  }> | null;
  groups: Array<{ id: string, name: string }> | null;
  open: boolean;
  handleClose: () => void;
  onClose?: () => void;
}

const ManageMembersDialog: React.FC<ManageMembersDialogProps> = (props) => {
  const { groupName, open, trainees, groups, handleClose, onClose } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      open={open}
      scroll="paper"
      fullScreen={smScreen}
      disableScrollLock
    >
      <DialogTitle>{`Członkowie grupy ${groupName}`}</DialogTitle>
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
        {trainees?.length != 0 ? (
          <List sx={{ pt: 0 }}>
            {trainees?.map((trainee, i) => (
              <ManageMembersItem groupName={groupName} trainee={trainee} groups={groups} />
            ))}
          </List>
        ) : (
          <Typography
            gutterBottom
            variant="body1"
            color="secondary.main"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Brak członków
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersDialog;
