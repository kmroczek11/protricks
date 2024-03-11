import React, { RefObject } from "react";
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../lib";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CustomVideoBlock from "./CustomVideoBlock";

const videoUrl = "/static/videos/home.mp4";

interface HeroProps {
  multistepFormBox: HTMLDivElement | null
}

const Hero: React.FC<HeroProps> = (props) => {
  const { multistepFormBox } = props;

  return (
    <CustomVideoBlock url={videoUrl}>
      <Typography variant="h1" color="primary" align="right" gutterBottom>
        ROZWIJAMY SPORTY
        <Typography variant="h1" color="secondary">
          AKROBATYCZNE
        </Typography>
        W POLSCE
      </Typography>
      <ColorButton
        color="secondary"
        variant="contained"
        sx={{ width: 300, height: 50, borderWidth: 2, fontSize: 20 }}
        endIcon={<ArrowRightIcon />}
        onClick={() => multistepFormBox?.scrollIntoView({ behavior: 'smooth' })}
      >
        Zapisz się na zajęcia
      </ColorButton>
    </CustomVideoBlock>
  );
};

export default Hero;
