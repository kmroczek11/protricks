import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import { GetCoachQuery, useGetCoachQuery } from "../../../generated/graphql";
import ExerciseCard from "./components/ExerciseCard";
import { LoadingScreen } from "../../lib";
import { useAuth } from "../../auth/providers/AuthProvider";
import { useClient } from "../../auth/providers/ClientProvider";

const CoachExercisesPanel: React.FC = () => {
  const { user } = useAuth();
  const { accessClient } = useClient()

  const { data, isLoading } = useGetCoachQuery<GetCoachQuery, Error>(
    accessClient!,
    {
      id: user?.id!,
    },
    {
      onSuccess: (data: GetCoachQuery) => {
        data.getCoach.groups = data?.getCoach?.groups?.map((group) => {
          group.exercises = group.exercises?.filter((exercise) =>
            isRelevant(exercise.day)
          );
          return group;
        });
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
          component="div"
        >
          Miejsce:
        </Typography>
        <Typography
          gutterBottom
          variant="h2"
          color="primary.dark"
          component="div"
        >
          {data?.getCoach.city.name}
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
      {data?.getCoach?.groups?.length != 0 ? (
        data?.getCoach?.groups?.map((group, i) => (
          <React.Fragment>
            <Grid
              item
              xs={12}
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
                Grupa:
              </Typography>
              <Typography
                gutterBottom
                variant="h2"
                color="primary.dark"
                component="div"
              >
                {group.name}
              </Typography>
            </Grid>
            {group.exercises?.length != 0 ? (
              group.exercises?.map((exercise, i) => (
                <Grid item xs={12}>
                  <ExerciseCard item={exercise} />
                </Grid>
              ))
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
          </React.Fragment>
        ))
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
          Brak grup
        </Typography>
      )}
    </Grid>
  );
};

export default CoachExercisesPanel;
