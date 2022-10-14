import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { ColorButton, CustomAlert } from "../../../lib";
import Box from "@mui/material/Box";
import {
  DeleteTraineeMutation,
  DeleteTraineeMutationVariables,
  JoinGroupMutation,
  JoinGroupMutationVariables,
  useDeleteTraineeMutation,
  useJoinGroupMutation,
} from "../../../../generated/graphql";
import { useAuth } from "../../../auth";

interface JoinGroupAlertProps {
  traineeId: string;
}

const successMessage =
  "Pomyślnie dołączono do grupy. Na maila wysłaliśmy dalsze instrukcje.";

const JoinGroupAlert: React.FC<JoinGroupAlertProps> = (props) => {
  const { traineeId } = props;
  const { user, setUser, accessClient } = useAuth();
  const [deleteTraineeStatus, setDeleteTraineeStatus] = useState<string>("");
  const [joinGroupStatus, setJoinGroupStatus] = useState<string>("");

  const { isLoading: isDeleteTraineeLoading, mutate: deleteTrainee } =
    useDeleteTraineeMutation<Error>(accessClient!, {
      onError: (error: Error) => {
        let err: any = {};
        err.data = error;
        setDeleteTraineeStatus(err?.data?.response.errors[0].message);
      },
      onSuccess: (
        data: DeleteTraineeMutation,
        _variables: DeleteTraineeMutationVariables,
        _context: unknown
      ) => {
        // queryClient.invalidateQueries('GetAllAuthors');
        setUser(data.deleteTrainee.user!);
      },
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
                  id: traineeId,
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
            onClick={() =>
              deleteTrainee({
                input: {
                  userId: user?.id!,
                },
              })
            }
          >
            Opuść
          </ColorButton>
        </Box>
      </Grid>
      {joinGroupStatus === "Success" ? (
        <CustomAlert severity="success" msg={successMessage} />
      ) : (
        joinGroupStatus && (
          <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
        )
      )}
      {deleteTraineeStatus && (
        <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
      )}
    </Grid>
  );
};

export default JoinGroupAlert;
