import React from "react";
import Card from "@mui/material/Card";
import { keyframes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

interface LoadingPhotoCardProps {
  i: number;
  total: number;
}

const LoadingPhotoCard: React.FC<LoadingPhotoCardProps> = (props) => {
  const { i, total } = props;
  
  const gradient = keyframes`
    0% {background-position: 0%}
    100% {background-position: 100%}
`;

  const fadeIn = keyframes`
    to {
    opacity: 1;
  }
`;

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: "4px 4px 40px",
        background: `linear-gradient(45deg,${grey[100]},${grey[300]},${grey[500]})`,
        backgroundSize: "600% 100%",
        animation: `${fadeIn} ${total}s ease forwards infinite, ${gradient} 2s linear infinite`,
        animationDelay: `${i}s`,
        opacity: 0,
      }}
    />
  );
};

export default LoadingPhotoCard;
