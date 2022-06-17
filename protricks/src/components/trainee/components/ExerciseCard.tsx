import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

interface ExerciseCardProps {
  item: { id: number; day: string; start: string; end: string };
  onClick?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { item, onClick } = props;
  const { day, start, end } = item;

  const getTimeWithoutMiliseconds = (t: string) => {
    return t.slice(0, -3);
  };

  return (
    <Card
      sx={{
        background: `linear-gradient(to right,${grey[100]},#fff)`,
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
            Godzina
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
            {`${getTimeWithoutMiliseconds(start)} - ${getTimeWithoutMiliseconds(
              end
            )}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
