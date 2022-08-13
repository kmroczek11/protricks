import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../../../lib";
import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import plLocale from "date-fns/locale/pl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEditExerciseMutation } from "../../../../generated/graphql";
import accessClient from "../../../../graphql/clients/accessClient";
import LoadingScreen from "../../../lib/LoadingScreen";
import { useAuth } from "../../../auth";

interface EditExerciseFormProps {
  item: {
    id: string;
    day: string;
    start: string;
    end: string;
  };
}

const EditExerciseForm: React.FC<EditExerciseFormProps> = (props) => {
  const { item } = props;
  const { id, ...payload } = item;
  const { accessClient } = useAuth();
  const [formExerciseValues, setFormExerciseValues] = useState(payload);

  const { isLoading, mutate } = useEditExerciseMutation<Error>(accessClient!, {});

  const handleDayChange = (value: Event | null) => {
    setFormExerciseValues({
      ...formExerciseValues,
      day: (value as unknown as Date).toISOString().substring(0, 10),
    });
  };

  const handleStartChange = (value: Event | null) => {
    console.log(value as unknown as string);
    setFormExerciseValues({
      ...formExerciseValues,
      start: convertDateToTime(value as unknown as Date),
    });
  };

  const handleEndChange = (value: Event | null) => {
    setFormExerciseValues({
      ...formExerciseValues,
      end: convertDateToTime(value as unknown as Date),
    });
  };

  const convertTimeToDate = (t: string) => {
    let s = t.split(":");

    var date = new Date();
    date.setHours(parseInt(s[0]));
    date.setMinutes(parseInt(s[1]));

    return date;
  };

  const convertDateToTime = (d: Date) => {
    return d.toLocaleTimeString();
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
      }}
      noValidate
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
        <DatePicker
          mask="__.__.____"
          label="Nowy dzień zajęć"
          value={formExerciseValues.day}
          onChange={handleDayChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Nowa godzina rozpoczęcia"
          value={convertTimeToDate(formExerciseValues.start)}
          onChange={handleStartChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Nowa godzina zakończenia"
          value={convertTimeToDate(formExerciseValues.end)}
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
              exerciseId: id,
              day: formExerciseValues.day,
              start: formExerciseValues.start,
              end: formExerciseValues.end,
            },
          })
        }
      >
        Zmień
      </ColorButton>
    </Box>
  );
};

export default EditExerciseForm;
