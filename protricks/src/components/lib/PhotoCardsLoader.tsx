import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import LoadingPhotoCard from "./LoadingPhotoCard";

interface PhotoCardsLoaderProps {
  sxRoot?: SxProps<Theme>;
}

const PhotoCardsLoader: React.FC<PhotoCardsLoaderProps> = (props) => {
  const { sxRoot } = props;
  let timer;
  const [itemsCount, setItemsCount] = useState(1);

  useEffect(() => {
    timer = setInterval(() => {
      setItemsCount(randomInteger(2, 8));
    }, itemsCount! * 1000);
    return () => clearInterval(timer);
  }, []);

  const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={sxRoot}
    >
      {[...Array(itemsCount!).keys()].map((item) => (
        <Grid item xs={12} md={6} key={item}>
          <LoadingPhotoCard i={item} total={itemsCount!} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoCardsLoader;
