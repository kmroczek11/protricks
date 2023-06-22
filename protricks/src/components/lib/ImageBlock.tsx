import React from "react";
import { Theme, SxProps, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ImageBlockRoot = styled("section")(
  ({ theme }) => ({
    color: theme.palette.primary.contrastText,
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 800,

    [theme.breakpoints.down("sm")]: {
      height: 400,
    },
  })
);

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
  sxImgBg?: SxProps<Theme>;
}

const ImageBlock: React.FC<
  React.HTMLAttributes<HTMLDivElement> & ImageBlockProps
> = (props) => {
  const {
    imgSrc,
    secondImgSrc,
    sxImgBg,
    children,
  } = props;

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
            sx={sxImgBg}
          />
        </picture>
      </Container>
    </ImageBlockRoot>
  );
};

export default ImageBlock;
