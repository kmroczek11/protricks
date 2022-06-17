import React from "react";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import CustomPhotoCard from "./CustomPhotoCard";

export interface PhotoCardObject {
  id: number;
  name: string;
  imgSrc?: string;
}

interface CustomPhotoCardsProps {
  items: PhotoCardObject[];
  sxRoot?: SxProps<Theme>;
  onClick: (name: string) => void;
  nextStep: () => void;
}

const CustomPhotoCards: React.FC<CustomPhotoCardsProps> = (props) => {
  const { items, sxRoot, onClick, nextStep } = props;

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
          <CustomPhotoCard item={item} onClick={onClick} nextStep={nextStep} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomPhotoCards;
