import React from "react";
import Typography from "@mui/material/Typography";
import { ColorButton, VideoBlock } from "../../lib";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
const videoUrl = "/static/videos/home.mp4";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <VideoBlock url={videoUrl}>
      <Typography variant="h1" color="primary" gutterBottom>
        Rozwijamy sporty akrobatyczne w Polsce
      </Typography>
      <ColorButton
        color="primary"
        variant="outlined"
        sx={{ width: 300, height: 50, borderWidth: 2, fontSize: 20 }}
        endIcon={<ArrowRightIcon />}
        onClick={() => navigate("/zajecia#zarejestruj")}
      >
        Dołącz do nas
      </ColorButton>
    </VideoBlock>
  );
};

export default Hero;
