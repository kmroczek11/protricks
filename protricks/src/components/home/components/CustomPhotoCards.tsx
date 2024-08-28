import React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import CustomPhotoCard from "./CustomPhotoCard";

export interface CustomPhotoCardObject {
  imgSrc: string;
  name?: string;
}

interface CustomPhotoCardObjectProps {
  items: CustomPhotoCardObject[];
  sxRoot?: SxProps<Theme>;
  onClick?: () => void;
}

const CustomPhotoCards: React.FC<CustomPhotoCardObjectProps> = (props) => {
  const { items, sxRoot, onClick } = props;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        ...sxRoot,
      }}
    >
      {items.map((item, i) => (
        <CustomPhotoCard
          item={item}
          onClick={onClick}
          sxBackground={{
            position: "absolute",
            top: -i * 100,
            left: (i + 1) * 130
          }}
        />
      ))}
    </Box>
  );
};

export default CustomPhotoCards;
