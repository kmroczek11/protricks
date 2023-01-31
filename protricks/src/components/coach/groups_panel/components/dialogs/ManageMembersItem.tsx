import React from "react";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GradingIcon from "@mui/icons-material/Grading";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {
  Status,
  useConfirmContractReceiptMutation,
  useDeleteTraineeMutation,
} from "../../../../../generated/graphql";
import { CustomAvatar, CustomDialog, LoadingScreen } from "../../../../lib";
import Grid from "@mui/material/Grid";
import StatusBox from "./StatusBox";
import InfoIcon from "@mui/icons-material/Info";
import TraineeInfoDialog from "./TraineeInfoDialog";
import createAccessClient from "../../../../../graphql/clients/accessClient";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

interface ManageMembersItemProps {
  groupName: string;
  trainee: {
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
      email: string;
      imgSrc?: string;
    };
  };
}

const ManageMembersItem: React.FC<ManageMembersItemProps> = (props) => {
  const [openDeleteTrainee, setOpenDeleteTrainee] = useState(false);
  const [openDetailedInfo, setOpenDetailedInfo] = useState(false);
  const { groupName, trainee } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isLoading: isConfirmContractReceiptLoading,
    mutate: confirmContractReceipt,
  } = useConfirmContractReceiptMutation<Error>(createAccessClient(), {});

  const { isLoading: isDeleteTraineeLoading, mutate: deleteTrainee } =
    useDeleteTraineeMutation<Error>(createAccessClient(), {});

  const handleDialogClose = () => {
    setOpenDetailedInfo(false);
  };

  return isDeleteTraineeLoading ? (
    <LoadingScreen />
  ) : (
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
            {trainee?.status === Status.AcceptedWithoutContract && (
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
                        traineeId: trainee.id,
                        email: trainee.user.email,
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
              (process.env.NODE_ENV === "development"
                ? `${process.env.REACT_APP_HOST}/images/${trainee.user?.imgSrc}`
                : `${process.env.REACT_APP_HOST}/public/images/${trainee.user?.imgSrc}`)
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
  );
};

export default ManageMembersItem;
