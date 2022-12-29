import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GradingIcon from "@mui/icons-material/Grading";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  Status,
  useAcceptToGroupMutation,
  useConfirmContractReceiptMutation,
  useDeleteTraineeMutation,
} from "../../../../../generated/graphql";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import TraineeInfoDialog from "./TraineeInfoDialog";
import { CustomAvatar, CustomDialog, LoadingScreen } from "../../../../lib";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import createAccessClient from "../../../../../graphql/clients/accessClient";
import StatusBox from "./StatusBox";

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
    user: { id: string; firstName: string; lastName: string; imgSrc?: string };
  }> | null;
  open: boolean;
  handleClose: () => void;
  onClose?: () => void;
}

const ManageMembersDialog: React.FC<ManageMembersDialogProps> = (props) => {
  const { groupName, open, trainees, handleClose, onClose } = props;
  const [openDeleteTrainee, setOpenDeleteTrainee] = useState(false);
  const [openDetailedInfo, setOpenDetailedInfo] = useState(false);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoading: isDeleteTraineeLoading, mutate: deleteTrainee } =
    useDeleteTraineeMutation<Error>(createAccessClient(), {});

  const {
    isLoading: isConfirmContractReceiptLoading,
    mutate: confirmContractReceipt,
  } = useConfirmContractReceiptMutation<Error>(createAccessClient(), {});

  const handleDialogClose = () => {
    setOpenDetailedInfo(false);
  };

  return isDeleteTraineeLoading ? (
    <LoadingScreen />
  ) : (
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
            {trainees?.map((trainee) => (
              <React.Fragment>
                <ListItem
                  key={trainee.id}
                  secondaryAction={
                    <React.Fragment>
                      <Tooltip title="Szczegółowe informacje">
                        <IconButton
                          aria-label="detailed-info"
                          onClick={() => setOpenDetailedInfo(true)}
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
                      {trainee.status === Status.AcceptedWithoutContract && (
                        <Tooltip
                          title={
                            <div style={{ whiteSpace: "pre-line" }}>
                              {`Potwierdź otrzymanie umowy\n
                                Kliknij ten przycisk, aby potwierdzić otrzymanie umowy od tego wychowanka.`}
                            </div>
                          }
                        >
                          <IconButton
                            aria-label="confirm-contract-receipt"
                            onClick={() =>
                              confirmContractReceipt({
                                input: {
                                  id: trainee.id,
                                },
                              })
                            }
                          >
                            <GradingIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </React.Fragment>
                  }
                >
                  <ListItemAvatar>
                    <CustomAvatar
                      name={`${trainee.user.firstName} ${trainee.user.lastName}`}
                      size="small"
                      imgSrc={
                        trainee.user?.imgSrc &&
                        `${process.env.REACT_APP_HOST}/images/${trainee.user?.imgSrc}`
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Grid
                        container
                        spacing={smScreen ? 0 : 1}
                        alignItems="baseline"
                        direction={smScreen ? "column" : "row"}
                      >
                        <Grid item>
                          <Typography variant="body2" gutterBottom>
                            {trainee.user.firstName} {trainee.user.lastName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <StatusBox status={trainee.status} />
                        </Grid>
                      </Grid>
                    }
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
                      deleteTrainee({
                        input: {
                          userId: trainee.user.id,
                        },
                      })
                    }
                  />
                )}
                {openDetailedInfo && (
                  <TraineeInfoDialog
                    trainee={trainee}
                    open={openDetailedInfo}
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
