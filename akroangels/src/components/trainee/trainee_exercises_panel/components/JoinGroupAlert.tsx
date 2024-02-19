import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { ColorButton, CustomAlert } from "../../../lib";
import Box from "@mui/material/Box";
import {
  CreateLostTraineeMutation,
  CreateLostTraineeMutationVariables,
  DeleteTraineeMutation,
  DeleteTraineeMutationVariables,
  DeleteTraineeWithMessageMutation,
  DeleteTraineeWithMessageMutationVariables,
  JoinGroupMutation,
  JoinGroupMutationVariables,
  useCreateLostTraineeMutation,
  useDeleteTraineeMutation,
  useDeleteTraineeWithMessageMutation,
  useJoinGroupMutation,
} from "../../../../generated/graphql";
import { useAuth } from "../../../auth";
import createAccessClient from "../../../../graphql/clients/accessClient";

interface JoinGroupAlertProps {
  traineeId: string;
  setJoinGroupStatus: React.Dispatch<React.SetStateAction<string>>;
}

const JoinGroupAlert: React.FC<JoinGroupAlertProps> = (props) => {
  const { traineeId, setJoinGroupStatus } = props;
  const { user, setUser } = useAuth();
  const [deleteTraineeStatus, setDeleteTraineeStatus] = useState<string>("");

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
      ) => {},
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      border={2}
      borderColor={green.A700}
      p={5}
      sx={{
        backgroundColor: green.A400,
      }}
    >
      <Grid item>
        <Typography
          component="div"
          variant="h1"
          color="secondary.main"
          align="center"
          gutterBottom
        >
          Czy chcesz dołączyć do grupy na stałe?
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          component="div"
          variant="h2"
          color="secondary.main"
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
      {deleteTraineeStatus && (
        <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
      )}
    </Grid>
  );
};

export default JoinGroupAlert;
