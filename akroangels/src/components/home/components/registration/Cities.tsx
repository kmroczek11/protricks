import React from "react";
import Typography from "@mui/material/Typography";
import CustomPhotoCards, { PhotoCardObject } from "./CustomPhotoCards";

interface CitiesProps {
  visible: boolean;
  items: PhotoCardObject[];
  onClick: (name: string) => void;
  nextStep: () => void;
}

const Cities: React.FC<CitiesProps> = (props) => {
  const { visible, items, onClick, nextStep } = props;

  return visible ? (
    <React.Fragment>
      <Typography
        variant="h1"
        color={`secondary.contrastText`}
        align="center"
        gutterBottom
      >
        Gdzie prowadzimy zajęcia?
      </Typography>
      <Typography
        variant="h2"
        color="primary.main"
        align="center"
        sx={{ py: 5 }}
        gutterBottom
      >
        Aby zapisać się na pierwsze zajęcia zaloguj się lub zarejestruj,
        klikając ikonę w prawym górnym rogu ekranu. Następnie wybierz miasto,
        klikając w jego zdjęcie.
      </Typography>
      <CustomPhotoCards items={items} onClick={onClick} nextStep={nextStep} />
    </React.Fragment>
  ) : null;
};

export default Cities;
