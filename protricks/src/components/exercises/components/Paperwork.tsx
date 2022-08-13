import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ColorButton } from "../../lib";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface PaperworkProps {
  visible: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const Paperwork: React.FC<PaperworkProps> = (props) => {
  const { visible, nextStep, prevStep } = props;
  const [file, setFile] = useState("/static/documents/regulamin.pdf");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [accepted, setAccepted] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return visible ? (
    <Box>
      <Typography variant="h2" color="primary.main" align="center" gutterBottom>
        W tym kroku należy pobrać, wydrukować, wypełnić, zeskanować i odesłać
        wzór umowy zawarty
        <a href="/static/documents/umowa.pdf" download>
          pod tym linkiem
        </a>na adres
        <a href="mailto:kontakt@protricks.pl">kontakt@protricks.pl</a>.
        Następnie zaznajomić się z regulaminem:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          "&& .react-pdf__Page__canvas": {
            width: "100% !important",
          },
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <ButtonGroup disableElevation>
          <IconButton
            color="primary"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber == 1}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <ColorButton
            variant="text"
            disableElevation
            disableRipple
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            Strona {pageNumber} z {numPages}
          </ColorButton>
          <IconButton
            color="primary"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber == numPages}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
      <FormControlLabel
        label="Potwierdzam, że zapoznałem się z treścią regulaminu i akceptuję jego
        postanowienia"
        sx={{
          "& .MuiFormControlLabel-label, .MuiSvgIcon-root": {
            color: "primary.main",
          },
        }}
        control={
          <Checkbox
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ColorButton variant="outlined" color="primary" onClick={prevStep}>
          Cofnij
        </ColorButton>
        <ColorButton
          variant="outlined"
          color="primary"
          onClick={nextStep}
          disabled={!accepted}
        >
          Zapisz
        </ColorButton>
      </Box>
    </Box>
  ) : null;
};

export default Paperwork;
