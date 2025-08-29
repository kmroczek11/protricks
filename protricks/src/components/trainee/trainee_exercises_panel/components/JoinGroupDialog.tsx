import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ColorButton, CustomAlert, LoadingScreen } from "../../../lib";
import Typography from "@mui/material/Typography";
import { CreateLostTraineeMutation, CreateLostTraineeMutationVariables, DeleteTraineeWithMessageMutation, DeleteTraineeWithMessageMutationVariables, JoinGroupMutation, JoinGroupMutationVariables, useCreateLostTraineeMutation, useDeleteTraineeWithMessageMutation, useJoinGroupMutation } from "../../../../generated/graphql";
import { useAuth } from "../../../auth/providers/AuthProvider";
import { useClient } from "../../../auth/providers/ClientProvider";

interface TraineeInfoDialogProps {
  traineeId: string;
}

const JoinGroupDialog: React.FC<TraineeInfoDialogProps> = (props) => {
  const { traineeId } = props;
  const { user, setUserId } = useAuth();
  const { accessClient } = useClient()
  const [joinGroupStatus, setJoinGroupStatus] = React.useState<string>("");
  const [deleteTraineeStatus, setDeleteTraineeStatus] = React.useState<string>("");

  const {
    isLoading: isDeleteTraineeWithMessageLoading,
    mutate: deleteTraineeWithMessage,
  } = useDeleteTraineeWithMessageMutation<Error>(accessClient!, {
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
      setUserId(data.deleteTraineeWithMessage.userId)
    },
  });

  const { isLoading: isCreateLostTraineeLoading, mutate: createLostTrainee } =
    useCreateLostTraineeMutation<Error>(accessClient!, {
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
    useJoinGroupMutation<Error>(accessClient!, {
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
                      emailPlain: user?.emailPlain!,
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
                      email: user?.emailPlain!,
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
