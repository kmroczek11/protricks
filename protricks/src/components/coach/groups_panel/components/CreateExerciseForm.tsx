import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton, LoadingScreen } from "../../../lib";
import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import plLocale from "date-fns/locale/pl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useCreateExerciseMutation } from "../../../../generated/graphql";
import { useAuth } from "../../../auth";

const defaultExerciseValues = {
  day: new Date(),
  start: new Date(),
  end: new Date(),
};

interface CreateExerciseFormProps {
  groupId: string;
}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = (props) => {
  const { groupId } = props;
  const { accessClient } = useAuth();
  const [formExerciseValues, setFormExerciseValues] = useState(
    defaultExerciseValues
  );

  const { isLoading, mutate } = useCreateExerciseMutation<Error>(
    accessClient!,
    {}
  );

  const handleDayChange = (value: Event | null) => {
    setFormExerciseValues({
      ...formExerciseValues,
      day: value as unknown as Date,
    });
  };

  const handleStartChange = (value: Event | null) => {
    setFormExerciseValues({
      ...formExerciseValues,
      start: value as unknown as Date,
    });
  };

  const handleEndChange = (value: Event | null) => {
    setFormExerciseValues({
      ...formExerciseValues,
      end: value as unknown as Date,
    });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "secondary.main",
        "& .MuiInputLabel-root, .MuiInputBase-root, .MuiButton-root, .MuiSvgIcon-root": {
          borderColor:"secondary.contrastText",
          color: "secondary.contrastText",
        }
      }}
      noValidate
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
        <DatePicker
          mask="__.__.____"
          label="Dzień zajęć"
          value={formExerciseValues.day}
          onChange={handleDayChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Godzina rozpoczęcia"
          value={formExerciseValues.start}
          onChange={handleStartChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Godzina zakończenia"
          value={formExerciseValues.end}
          onChange={handleEndChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <ColorButton
        variant="outlined"
        color="secondary"
        onClick={() =>
          mutate({
            input: {
              groupId: groupId,
              day: formExerciseValues.day.toISOString().substring(0, 10),
              start: formExerciseValues.start.toLocaleTimeString(),
              end: formExerciseValues.end.toLocaleTimeString(),
            },
          })
        }
      >
        Dodaj
      </ColorButton>
    </Box>
  );
};

export default CreateExerciseForm;
