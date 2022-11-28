import React from "react";
import Typography from "@mui/material/Typography";
import { ImageBlock } from "../../lib";
const imgUrl = "/static/images/exercises/hero.jpg";

const Hero: React.FC = () => {
  return (
    <ImageBlock imgSrc={imgUrl}>
      <Typography variant="h1" color="primary" gutterBottom>
        Zajęcia
      </Typography>
    </ImageBlock>
  );
};

export default Hero;
