import { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../auth";
import {
  GetAttendanceByUserIdQuery,
  GetTraineeQuery,
  Status,
  useGetAttendanceByUserIdQuery,
  useGetTraineeQuery,
} from "../../../generated/graphql";
import { CustomAlert, LoadingScreen } from "../../lib";
import createAccessClient from "../../../graphql/clients/accessClient";
import AttendanceCard from "./components/AttendanceCard";

const TraineeAttendancesPanel: React.FC = () => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useGetAttendanceByUserIdQuery<
    GetAttendanceByUserIdQuery,
    Error
  >(
    createAccessClient(),
    {
      id: user?.id!,
    },
    {
      refetchInterval: 1000,
      enabled: user ? true : false,
    }
  );

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
          Obecności:
        </Typography>
      </Grid>
      {data?.getAttendanceByUserId.length != 0 ? (
        data?.getAttendanceByUserId.map((attendance, i) => (
          <Grid item xs={12}>
            <AttendanceCard item={attendance} />
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
          Brak obecności
        </Typography>
      )}
    </Grid>
  );
};

export default TraineeAttendancesPanel;
