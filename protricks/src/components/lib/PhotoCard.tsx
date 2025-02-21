import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PhotoCardObject } from "./PhotoCards";
import { SxProps, Theme } from "@mui/system";

interface PhotoCardProps {
  item: PhotoCardObject;
  sxBackground?: SxProps<Theme>;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = (props) => {
  const { item, sxBackground,onClick } = props;
  const { name, imgSrc } = item;

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: "4px 4px 40px",
        ...sxBackground
      }}
    >
      <CardActionArea onClick={onClick} sx={{ position: "relative" }}>
        <CardMedia
          width="100%"
          height={300}
          component="img"
          image={imgSrc}
          alt={name}
          sx={{backgroundSize:'cover'}}
        />
        <CardContent sx={{ position: "absolute", bottom: 0 }}>
          {name && (
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              component="div"
            >
              {name}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PhotoCard;
