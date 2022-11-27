import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditExerciseForm from "./EditExerciseForm";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  Status,
  useDeleteExerciseMutation,
} from "../../../../generated/graphql";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../../../auth";
import { CustomDialog } from "../../../lib";
import * as XLSX from "xlsx";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { StyledExerciseTableCell, StyledExerciseTableRow } from "..";
import DownloadIcon from '@mui/icons-material/Download';
import AttendanceListDialog from "./AttendanceListDialog";
import createAccessClient from "../../../../graphql/clients/accessClient";

const StyledIconButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: grey[900],
  },
});

interface RowProps {
  i: number;
  groupName: string;
  item: {
    id: string;
    day: any;
    start: any;
    end: any;
  };
  trainees?: Array<{
    id: string;
    status: string;
    user: { id: string; firstName: string; lastName: string };
  }> | null;
}

const ExerciseRow: React.FC<RowProps> = (props) => {
  const { i, item, groupName, trainees } = props;
  const { id, day, start, end } = item;
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);
  const [openAttendanceList, setOpenAttendanceList] = useState(false);

  const { isLoading, mutate } = useDeleteExerciseMutation<Error>(
    createAccessClient(),
    {}
  );

  const convertToPlDate = (d: string) =>
    new Date(d).toLocaleDateString("pl-pl");

  const getTimeWithoutMiliseconds = (t: string) => {
    return t.slice(0, -3);
  };

  const data = [
    trainees?.map((trainee, i) =>
      i == 0
        ? {
          Dzień: convertToPlDate(day),
          Godzina: `${getTimeWithoutMiliseconds(
            start
          )} - ${getTimeWithoutMiliseconds(end)}`,
          "Lp.": ++i,
          Imię: trainee.user.firstName,
          Nazwisko: trainee.user.lastName,
          Obecny: "",
          "Pierwszy raz": trainee.status === Status.FirstTime ? "tak" : "nie",
        }
        : {
          Dzień: "",
          Godzina: "",
          "Lp.": ++i,
          Imię: trainee.user.firstName,
          Nazwisko: trainee.user.lastName,
          Obecny: "",
          "Pierwszy raz": trainee.status === Status.FirstTime ? "tak" : "nie",
        }
    )!,
  ].flat();

  const handleExport = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, `Lista obecności ${convertToPlDate(day)}.xlsx`);
  };

  return (
    <React.Fragment>
      <StyledExerciseTableRow key={i}>
        <StyledExerciseTableCell component="th" scope="row" align="center">
          {i}
        </StyledExerciseTableCell>
        <StyledExerciseTableCell align="center">
          {convertToPlDate(day)}
        </StyledExerciseTableCell>
        <StyledExerciseTableCell align="center">
          {getTimeWithoutMiliseconds(start)}
        </StyledExerciseTableCell>
        <StyledExerciseTableCell align="center">
          {getTimeWithoutMiliseconds(end)}
        </StyledExerciseTableCell>
        <StyledExerciseTableCell
          align="center"
          sx={{
            "& .MuiSvgIcon-root": {
              color: (theme) => theme.palette.secondary.contrastText,
            },
          }}
        >
          <Tooltip title="Edytuj zajęcia">
            <StyledIconButton
              aria-label="edit-exercise"
              onClick={() => setOpenEditExercise(!openEditExercise)}
            >
              <EditIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Usuń zajęcia">
            <StyledIconButton
              aria-label="delete-exercise"
              onClick={() => setOpenDeleteExercise(!openDeleteExercise)}
            >
              <DeleteIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Sprawdź listę obecności">
            <StyledIconButton
              aria-label="check-attendance-list"
              onClick={() => setOpenAttendanceList(!openAttendanceList)}
            >
              <FormatListNumberedIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Eksportuj listę obecności">
            <StyledIconButton
              aria-label="export-attendance-list"
              onClick={handleExport}
            >
              <DownloadIcon />
            </StyledIconButton>
          </Tooltip>
        </StyledExerciseTableCell>
      </StyledExerciseTableRow>
      <StyledExerciseTableRow>
        <StyledExerciseTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openEditExercise} timeout="auto" unmountOnExit>
            <EditExerciseForm item={item} />
          </Collapse>
        </StyledExerciseTableCell>
      </StyledExerciseTableRow>
      {openDeleteExercise && (
        <CustomDialog
          title={`Czy na pewno chcesz usunąć zajęcia dnia ${convertToPlDate(
            day
          )}?`}
          content="Tej operacji nie można cofnąć."
          closeText="Nie usuwaj"
          acceptText="Usuń"
          onClose={() => setOpenDeleteExercise(false)}
          onAccept={() =>
            mutate({
              id: id,
            })
          }
        />
      )}
      {openAttendanceList && (
        <AttendanceListDialog
          groupName={groupName}
          trainees={trainees}
          open={openAttendanceList}
          handleClose={() => setOpenAttendanceList(false)}
        />
      )}
    </React.Fragment>
  );
};

export default ExerciseRow;
