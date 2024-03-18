import React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Grid from "@mui/material/Grid";

const PaymentSuccessfull: React.FC = () => {
  return (
    <Grid
      container
      p={{ xs: 10, md: 30 }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <CheckCircleOutlineIcon sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Typography variant="h1" gutterBottom align="center">
          Płatność powiodła się.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PaymentSuccessfull;
