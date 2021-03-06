import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../context";
import {
  GetTraineeQuery,
  useGetTraineeQuery,
  GetTraineeQueryVariables,
} from "../../generated/graphql";
import graphqlRequestClient from "../../graphql/clients/graphqlRequestClient";
import ExerciseCard from "./components/ExerciseCard";

const TraineePanel: React.FC = () => {
  const [user] = useAuth();

  const { data, isLoading, error, refetch } = useGetTraineeQuery<
    GetTraineeQuery,
    Error
  >(
    graphqlRequestClient(),
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

  return (
    <Grid
      container
      spacing={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 10,
      }}
    >
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
          color="secondary.main"
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
          color="secondary.main"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Najbli??sze zaj??cia:
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
          color="secondary.main"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Brak zaj????
        </Typography>
      )}
    </Grid>
  );
};

export default TraineePanel;
