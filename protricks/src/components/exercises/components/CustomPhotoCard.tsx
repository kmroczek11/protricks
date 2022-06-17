import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PhotoCardObject } from "./CustomPhotoCards";

interface CustomPhotoCardProps {
  item: PhotoCardObject;
  onClick: (name: string) => void;
  nextStep: () => void;
}

const CustomPhotoCard: React.FC<CustomPhotoCardProps> = (props) => {
  const { item, onClick, nextStep } = props;
  const { name, imgSrc } = item;

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: "4px 4px 40px",
      }}
    >
      <CardActionArea
        onClick={() => {
          onClick(name);
          nextStep();
        }}
        sx={{ position: "relative" }}
      >
        <CardMedia
          width="100%"
          height={300}
          component="img"
          image={imgSrc}
          alt={name}
        />
        <CardContent sx={{ position: "absolute", bottom: 0 }}>
          <Typography gutterBottom variant="h5" color="primary" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomPhotoCard;
