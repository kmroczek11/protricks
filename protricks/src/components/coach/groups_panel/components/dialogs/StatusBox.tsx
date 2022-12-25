import { green, grey, lightGreen } from "@mui/material/colors";
import { Status } from "../../../../../generated/graphql";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

interface StatusBoxProps {
  status: string;
}

const StatusBox: React.FC<StatusBoxProps> = (props) => {
  const { status } = props;

  return (
    <Box>
      {status === Status.FirstTime && (
        <Chip
          label="Pierwszy raz"
          variant="outlined"
          sx={{
            fontSize: 12,
            borderColor: green.A200,
            color: green.A200,
          }}
        />
      )}
      {status === Status.Expectation && (
        <Chip
          label="Oczekiwanie"
          variant="filled"
          sx={{
            fontSize: 12,
            border: 1,
            backgroundColor: grey[100],
            borderColor: grey[900],
            color: grey[900],
          }}
        />
      )}
      {status === Status.AcceptedWithoutContract && (
        <Chip
          label="Zaakceptowano (bez umowy)"
          variant="filled"
          sx={{
            fontSize: 12,
            border: 1,
            backgroundColor: lightGreen[100],
            borderColor: lightGreen[900],
            color: lightGreen[900],
          }}
        />
      )}
      {status === Status.Accepted && (
        <Chip
          label="Zaakceptowano"
          variant="filled"
          sx={{
            fontSize: 12,
            border: 1,
            backgroundColor: green[100],
            borderColor: green[900],
            color: green[900],
          }}
        />
      )}
    </Box>
  );
};

export default StatusBox;
