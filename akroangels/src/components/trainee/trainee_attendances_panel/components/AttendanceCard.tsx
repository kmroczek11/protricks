import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

interface ExerciseCardProps {
  item: { day: string; present: boolean };
}

const AttendanceCard: React.FC<ExerciseCardProps> = (props) => {
  const { item } = props;
  const { day, present } = item;

  return (
    <Card
      sx={{
        background: `linear-gradient(to right,${present ? 'green' : 'red'},#fff)`,
        borderRadius: "4px 4px 4px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography component="div" variant="h1">
            Dzień
          </Typography>
          <Typography component="div" variant="h1">
            Obecny/a
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography component="div" variant="h2">
            {new Date(day).toLocaleDateString()}
          </Typography>
          <Typography component="div" variant="h2">
            {present ? "Tak" : "Nie"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
