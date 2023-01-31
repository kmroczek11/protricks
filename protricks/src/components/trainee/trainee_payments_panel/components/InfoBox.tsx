import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface InfoBoxProps {
  amount: number;
}

const InfoBox: React.FC<InfoBoxProps> = (props) => {
  const { amount } = props;

  return (
    <Box>
      <Typography gutterBottom variant="h1" component="div" align="center">
        Do zapłaty: {amount} zł
      </Typography>
    </Box>
  );
};

export default InfoBox;
