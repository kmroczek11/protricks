import React from "react";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import PhotoCard from "./PhotoCard";

export interface PhotoCardObject {
  imgSrc: string;
  name?: string;
}

interface PhotoCardsProps {
  items: PhotoCardObject[];
  sxRoot?: SxProps<Theme>;
  onClick?: () => void;
}

const PhotoCards: React.FC<PhotoCardsProps> = (props) => {
  const { items, sxRoot, onClick } = props;

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={sxRoot}
    >
      {items.map((item, i) => (
        <Grid item xs={12} md={6} key={i}>
          <PhotoCard item={item} onClick={onClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoCards;
