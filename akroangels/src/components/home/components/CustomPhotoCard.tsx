import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CustomPhotoCardObject } from "./CustomPhotoCards";
import { SxProps, Theme } from "@mui/system";

interface CustomPhotoCardProps {
  item: CustomPhotoCardObject;
  sxBackground?: SxProps<Theme>;
  onClick?: () => void;
}

const CustomPhotoCard: React.FC<CustomPhotoCardProps> = (props) => {
  const { item, sxBackground, onClick } = props;
  const { name, imgSrc } = item;

  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        borderRadius: "4px 4px 40px",
        boxShadow: "-30px -30px 40px #d871da",
        ...sxBackground,
      }}
    >
      <CardActionArea onClick={onClick} sx={{ position: "relative" }}>
        <CardMedia
          width="100%"
          height={300}
          component="img"
          image={imgSrc}
          alt={name}
          sx={{ backgroundSize: "cover" }}
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

export default CustomPhotoCard;
