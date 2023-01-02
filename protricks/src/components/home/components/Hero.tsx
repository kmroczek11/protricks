import React from "react";
import Typography from "@mui/material/Typography";
import { ColorButton, VideoBlock } from "../../lib";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CustomVideoBlock from "./CustomVideoBlock";
const videoUrl = "/static/videos/home.mp4";

const Hero: React.FC = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/zajecia/zarejestruj")}
        >
          Dołącz do nas
        </ColorButton>
    </CustomVideoBlock>
  );
};

export default Hero;
