import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { green } from "@mui/material/colors";
import { ColorButton, CustomAlert, LoadingScreen } from "../../../lib";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../auth";
import { CreateLostTraineeMutation, CreateLostTraineeMutationVariables, DeleteTraineeWithMessageMutation, DeleteTraineeWithMessageMutationVariables, JoinGroupMutation, JoinGroupMutationVariables, useCreateLostTraineeMutation, useDeleteTraineeWithMessageMutation, useJoinGroupMutation } from "../../../../generated/graphql";
import createAccessClient from "../../../../graphql/clients/accessClient";

interface TraineeInfoDialogProps {
  traineeId: string;
}

const JoinGroupDialog: React.FC<TraineeInfoDialogProps> = (props) => {
  const { traineeId } = props;
  const { user, setUser } = useAuth();
  const [joinGroupStatus, setJoinGroupStatus] = React.useState<string>("");
  const [deleteTraineeStatus, setDeleteTraineeStatus] = React.useState<string>("");

  const {
    isLoading: isDeleteTraineeWithMessageLoading,
    mutate: deleteTraineeWithMessage,
  } = useDeleteTraineeWithMessageMutation<Error>(createAccessClient(), {
    onError: (error: Error) => {
      let err: any = {};
      err.data = error;
      setDeleteTraineeStatus(err?.data?.response.errors[0].message);
    },
    onSuccess: (
      data: DeleteTraineeWithMessageMutation,
      _variables: DeleteTraineeWithMessageMutationVariables,
      _context: unknown
    ) => {
      // queryClient.invalidateQueries('GetAllAuthors');
      setUser(data.deleteTraineeWithMessage.user!);
    },
  });

  const { isLoading: isCreateLostTraineeLoading, mutate: createLostTrainee } =
    useCreateLostTraineeMutation<Error>(createAccessClient(), {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setDeleteTraineeStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: CreateLostTraineeMutation,
        _variables: CreateLostTraineeMutationVariables,
        _context: unknown
      ) => { },
    });

  const { isLoading: isJoinGroupLoading, mutate: joinGroup } =
    useJoinGroupMutation<Error>(createAccessClient(), {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setJoinGroupStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: JoinGroupMutation,
        _variables: JoinGroupMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        setJoinGroupStatus(data.joinGroup.msg);
      },
    });

  return isJoinGroupLoading ? (
    <LoadingScreen />
  ) : (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={true}
      scroll="paper"
    >
      <DialogTitle>Czy chcesz dołączyć do grupy na stałe?</DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              component="div"
              variant="h2"
              align="center"
              gutterBottom
            >
              Trener wysłał Ci zaproszenie do grupy. Poniżej zdecyduj, czy chcesz
              dołączyć do niej na stałe.
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
              }}
            >
              <ColorButton
                variant="contained"
                color="success"
                type="submit"
                sx={{ my: 2 }}
                onClick={() =>
                  joinGroup({
                    input: {
                      userId: user?.id!,
                      traineeId: traineeId,
                      email: user?.email!,
                    },
                  })
                }
              >
                Dołącz
              </ColorButton>
              <ColorButton
                variant="contained"
                color="error"
                type="submit"
                sx={{ my: 2 }}
                onClick={() => {
                  deleteTraineeWithMessage({
                    input: {
                      userId: user?.id!,
                      email: user?.email!,
                    },
                  });

                  createLostTrainee({
                    input: {
                      traineeId,
                    },
                  });
                }}
              >
                Opuść
              </ColorButton>
            </Box>
          </Grid>
          <Grid item>
            {(
              joinGroupStatus && (
                <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
              )
            )}
          </Grid>
          {deleteTraineeStatus && (
            <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
