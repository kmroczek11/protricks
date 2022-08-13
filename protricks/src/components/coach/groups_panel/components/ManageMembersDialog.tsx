import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CustomAvatar from "../../../lib/CustomAvatar";
import { DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useDeleteTraineeMutation } from "../../../../generated/graphql";
import LoadingScreen from "../../../lib/LoadingScreen";
import { useState } from "react";
import CustomDialog from "../../../lib/CustomDialog";
import { useAuth } from "../../../auth";
import InfoIcon from "@mui/icons-material/Info";
import TraineeInfoDialog from "./TraineeInfoDialog";

interface ManageMembersDialogProps {
  groupName: string;
  open: boolean;
  trainees?: Array<{
    id: string;
    age: number;
    parentName: string;
    parentPhone: any;
    parentEmail: any;
    feedback: string;
    user: { id: string; firstName: string; lastName: string; imgSrc?: string };
  }> | null;
  handleClose: () => void;
  onClose?: () => void;
}

const ManageMembersDialog: React.FC<ManageMembersDialogProps> = (props) => {
  const { groupName, open, trainees, handleClose, onClose } = props;
  const { accessClient } = useAuth();
  const [openDeleteTrainee, setOpenDeleteTrainee] = useState(false);
  const [openParentInfo, setOpenParentInfo] = useState(false);

  const { isLoading, mutate } = useDeleteTraineeMutation<Error>(
    accessClient!,
    {}
  );

  const handleDialogClose = () => {
    setOpenParentInfo(false);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      scroll="paper"
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
            {trainees?.map((trainee) => (
              <React.Fragment>
                <ListItem
                  key={trainee.id}
                  secondaryAction={
                    <React.Fragment>
                      <Tooltip title="Szczegółowe informacje">
                        <IconButton
                          aria-label="parent-info"
                          onClick={() => setOpenParentInfo(true)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Usuń z grupy">
                        <IconButton
                          aria-label="remove-from-group"
                          onClick={() => setOpenDeleteTrainee(true)}
                        >
                          <GroupRemoveIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  }
                >
                  <ListItemAvatar>
                    <CustomAvatar
                      name={`${trainee.user.firstName} ${trainee.user.lastName}`}
                      size="small"
                      imgSrc={trainee.user.imgSrc!}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${trainee.user.firstName} ${trainee.user.lastName}`}
                  />
                </ListItem>
                {openDeleteTrainee && (
                  <CustomDialog
                    title={`Czy na pewno chcesz usunąć użytkownika ${trainee.user.firstName} ${trainee.user.lastName} z grupy ${groupName}?`}
                    content="Tej operacji nie można cofnąć."
                    closeText="Nie usuwaj"
                    acceptText="Usuń"
                    onClose={() => setOpenDeleteTrainee(false)}
                    onAccept={() =>
                      mutate({
                        input: {
                          id: trainee.id,
                        },
                      })
                    }
                  />
                )}
                {openParentInfo && (
                  <TraineeInfoDialog
                    trainee={trainee}
                    open={openParentInfo}
                    handleClose={handleDialogClose}
                  />
                )}
              </React.Fragment>
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
