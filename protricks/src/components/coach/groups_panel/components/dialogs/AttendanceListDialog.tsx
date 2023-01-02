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
import Typography from "@mui/material/Typography";
import {
  CreateAttendanceMutation,
  CreateAttendanceMutationVariables,
  Status,
  useAcceptToGroupMutation,
  useCreateAttendanceMutation,
} from "../../../../../generated/graphql";
import { useEffect, useState } from "react";
import {
  ColorButton,
  CustomAvatar,
  LoadingScreen,
} from "../../../../lib";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Theme, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Switch from "@mui/material/Switch";
import createAccessClient from "../../../../../graphql/clients/accessClient";
import StatusBox from "./StatusBox";

interface AttendanceListDialogProps {
  groupName: string;
  day: any;
  trainees?: Array<{
    id: string;
    status: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      imgSrc?: string;
    };
  }> | null;
  open: boolean;
  handleClose: () => void;
  setOpenAttendanceList: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  switch_track: {
    backgroundColor: theme.palette.error.main,
  },
  switch_base: {
    "&.Mui-disabled": {},
    "&.Mui-checked": {},
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.success.main,
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4CAF50",
    },
  },
}));

const AttendanceListDialog: React.FC<AttendanceListDialogProps> = (props) => {
  const {
    groupName,
    day,
    open,
    trainees,
    handleClose,
    setOpenAttendanceList,
    onClose,
  } = props;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [traineesPresence, setTraineesPresence] = useState<
    {
      id: string;
      status: string;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        imgSrc?: string;
      };
      present: boolean;
    }[]
  >([]);

  const { isLoading, mutate: createAttendance } =
    useCreateAttendanceMutation<Error>(createAccessClient(), {
      onSuccess: (
        data: CreateAttendanceMutation,
        _variables: CreateAttendanceMutationVariables,
        _context: unknown
      ) => setOpenAttendanceList(false),
    });

  const { isLoading: isAcceptToGroupLoading, mutate: acceptToGroup } =
    useAcceptToGroupMutation<Error>(createAccessClient(), {});

  useEffect(() => {
    setTraineesPresence(
      trainees?.map((t) => ({
        ...t,
        present: false,
      }))!
    );
  }, []);

  const setPresence = (id: string) => {
    const presence = traineesPresence?.map((t) =>
      t.id === id
        ? {
            ...t,
            present: !t.present,
          }
        : t
    );

    setTraineesPresence(presence);
  };

  const saveAttendanceList = () => {
    traineesPresence.forEach((t) => {
      if (t.present && t.status === Status.FirstTime) {
        // if trainee's first time accept to group and send email
        acceptToGroup({
          input: {
            id: t.id,
            email: t.user.email,
          },
        });
      }

      createAttendance({
        input: {
          traineeId: t.id,
          day: day,
          present: t.present,
        },
      });
    });
  };

  return isLoading ? (
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
      <DialogTitle>{`Lista obecności grupy ${groupName}`}</DialogTitle>
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
        {traineesPresence?.length != 0 ? (
          <List sx={{ pt: 0 }}>
            {traineesPresence?.map((trainee) => (
              <React.Fragment>
                <ListItem
                  key={trainee.id}
                  secondaryAction={
                    <React.Fragment>
                      <Switch
                        type="checkbox"
                        // icon={icon}
                        // checkedIcon={icon}
                        classes={{
                          track: classes.switch_track,
                          switchBase: classes.switch_base,
                          colorPrimary: classes.switch_primary,
                        }}
                        onClick={() => setPresence(trainee.id)}
                        checked={trainee.present}
                      />
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
              </React.Fragment>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ColorButton
                variant="contained"
                color="success"
                type="submit"
                sx={{ my: 2 }}
                onClick={() => saveAttendanceList()}
              >
                Zapisz obecności
              </ColorButton>
            </Box>
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

export default AttendanceListDialog;
