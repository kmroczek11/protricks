import React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Container from "@mui/material/Container";

const CustomVideoBlockRoot = styled("section")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 700,

  [theme.breakpoints.down("sm")]: {
    height: 400,
  },
}));

const Background = styled("video")({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  filter: "grayscale(100%)",
  objectFit: "cover",
});

interface VideoBlockProps {
  url: string;
  sxBackground?: SxProps<Theme>;
}

const CustomVideoBlock: React.FC<
  React.HTMLAttributes<HTMLDivElement> & VideoBlockProps
> = (props) => {
  const { url, children } = props;

  return (
    <CustomVideoBlockRoot>
      <Container
        sx={{
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          zIndex: 1,
          display: "flex",
        }}
      >
        {children}
      </Container>
      <Background
        muted
        autoPlay
        loop
      >
        <source src={url} type="video/mp4" />
        Twoja przeglądarka nie wspiera filmów.
      </Background>
    </CustomVideoBlockRoot>
  );
};

export default CustomVideoBlock;
