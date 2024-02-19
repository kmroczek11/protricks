import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import Grid from "@mui/material/Grid";

const Lost: React.FC = () => {
  return (
    <Grid
      container
      p={{ xs: 10, md: 30 }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <NotListedLocationIcon sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Typography variant="h1" color="secondary" gutterBottom align="center">
          Ups! Wygląda na to, że się zgubiłeś. Aby przejść do strony głównej,
          kliknij{" "}
          <Link href="/" color="inherit">
            tutaj.
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Lost;
