import { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../auth";
import {
  GetTraineeQuery,
  Status,
  useGetTraineeQuery,
} from "../../../generated/graphql";
import ExerciseCard from "./components/ExerciseCard";
import { CustomAlert, LoadingScreen } from "../../lib";
import JoinGroupAlert from "./components/JoinGroupAlert";
import createAccessClient from "../../../graphql/clients/accessClient";

const successMessage =
  "Pomyślnie dołączono do grupy. Na maila wysłaliśmy dalsze instrukcje.";

const TraineeExercisesPanel: React.FC = () => {
  const { user } = useAuth();
  const [joinGroupStatus, setJoinGroupStatus] = useState<string>("");

  const { data, isLoading, error, refetch } = useGetTraineeQuery<
    GetTraineeQuery,
    Error
  >(
    createAccessClient(),
    {
      id: user?.id!,
    },
    {
      onSuccess: (data: GetTraineeQuery) => {
        data.getTrainee.group.exercises =
          data?.getTrainee?.group?.exercises?.filter((exercise) =>
            isRelevant(exercise.day)
          );
      },
      refetchInterval: 1000,
      enabled: user ? true : false,
    }
  );

  const isRelevant = (day: string) => {
    const date = new Date(day);

    return date > new Date() || isToday(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Grid
      container
      spacing={5}
      direction="column"
      justifyContent="center"
      p={{ xs: 6, md: 10 }}
    >
      <Grid item>
        {data?.getTrainee.status === Status.Expectation && (
          <JoinGroupAlert
            traineeId={data?.getTrainee.id!}
            setJoinGroupStatus={setJoinGroupStatus}
          />
        )}
         {joinGroupStatus === "Success" ? (
        <CustomAlert severity="success" msg={successMessage} />
      ) : (
        joinGroupStatus && (
          <CustomAlert severity="error" msg="Nieoczekiwany błąd." />
        )
      )}
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h1"
          component="div"
        >
          Twoja grupa:
        </Typography>
        <Typography
          gutterBottom
          variant="h2"
          color="primary.dark"
          component="div"
        >
          {data?.getTrainee.group.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          gutterBottom
          variant="h1"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Najbliższe zajęcia:
        </Typography>
      </Grid>
      {data?.getTrainee?.group?.exercises?.length != 0 ? (
        data?.getTrainee?.group?.exercises?.map((exercise, i) => (
          <Grid item xs={12}>
            <ExerciseCard item={exercise} />
          </Grid>
        ))!
      ) : (
        <Typography
          gutterBottom
          variant="h1"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Brak zajęć
        </Typography>
      )}
    </Grid>
  );
};

export default TraineeExercisesPanel;
