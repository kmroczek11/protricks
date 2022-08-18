import React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ImageBlockRoot = styled("section")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  position: "relative",
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.up("sm")]: {
    height: "55vh",
  },

  [theme.breakpoints.up("md")]: {
    height: "80vh",
  },
}));

const Background = styled("img")({
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: -2,
});

interface ImageBlockProps {
  imgSrc: string;
  secondImgSrc?: string;
  sxBackground?: SxProps<Theme>;
}

const ImageBlock: React.FC<
  React.HTMLAttributes<HTMLDivElement> & ImageBlockProps
> = (props) => {
  const { imgSrc, secondImgSrc, sxBackground, children } = props;

  return (
    <ImageBlockRoot>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <picture>
          {secondImgSrc && (
            <source media="(min-width: 600px)" srcSet={secondImgSrc} />
          )}
          <Background
            src={imgSrc}
            alt="Nie udało się załadować obrazu"
            sx={sxBackground}
          />
        </picture>
      </Container>
    </ImageBlockRoot>
  );
};

export default ImageBlock;
