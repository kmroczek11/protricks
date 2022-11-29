import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import ButtonGroup from "@mui/material/ButtonGroup";
import { ColorButton } from "../../lib";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface PaperworkProps {
  visible: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

const Paperwork: React.FC<PaperworkProps> = (props) => {
  const { visible, nextStep, prevStep } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [accepted, setAccepted] = useState(false);

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return visible ? (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography
          variant="h2"
          color="primary.main"
          align="center"
          gutterBottom
        >
          W tym kroku należy zaakceptować regulamin zajęć. Jeśli po pierwszych
          darmowym treningu uczestnik uzna, że chce chodzić na zajęcia,
          podpisujemy krótką umowę, która dostępna jest{" "}
          <a
            href="/static/documents/umowa.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            tutaj
          </a>
          .
        </Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid
          item
          sx={{
            "&& .react-pdf__Page__canvas": {
              margin: "0 auto",
              width: "80% !important",
              height: "100% !important",
            },
          }}
        >
          <Document
            file="/static/documents/regulamin.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <FormControlLabel
        label="Potwierdzam, że zapoznałem się z treścią regulaminu i akceptuję jego
        postanowienia."
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
      <Grid container justifyContent="space-between">
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
      </Grid>
    </Grid>
  ) : null;
};

export default Paperwork;
