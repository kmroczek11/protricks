import React from "react";
import Typography from "@mui/material/Typography";
import { PhotoCards } from "../../lib";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const items = [
  { id: 1, name: 'Bochnia', imgSrc: '/static/images/cities/bochnia.jpg' }
]

const StaticCities: React.FC = () => {

  return (
    <Box sx={{ backgroundColor: "#000", py: 10 }}>
      <Container >
        <Typography
          variant="h1"
          color={`secondary.contrastText`}
          align="center"
          gutterBottom
        >
          Gdzie prowadzimy zajęcia?
        </Typography>
        <Typography
          variant="h2"
          color="primary.main"
          align="center"
          sx={{ py: 5 }}
          gutterBottom
        >
          Oto lista miast, w których prowadzimy zajęcia
        </Typography>
        <PhotoCards items={items} />
      </Container>
    </Box>
  )
};

export default StaticCities;
