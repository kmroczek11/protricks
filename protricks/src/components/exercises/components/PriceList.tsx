import { useTheme, useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import { ImageBlock } from "../../lib";

interface PriceListProps {
  imgSrc: string;
}

const PriceList: React.FC<PriceListProps> = (props) => {
  const { imgSrc } = props;
  const theme = useTheme();

  return (
    <Container
      maxWidth={useMediaQuery(theme.breakpoints.down("sm")) ? "xs" : "sm"}
    >
      <ImageBlock imgSrc={imgSrc} sxImgBg={{ zIndex: 0 }} mobileHeight={460} />
    </Container>
  );
};

export default PriceList;
