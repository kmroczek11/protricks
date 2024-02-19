import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Meetings: React.FC = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 10, md: 30 },
        }}
      >
        <Typography
          variant="h1"
          color="secondary"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Więcej o zlotach już wkrótce!
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Meetings;
