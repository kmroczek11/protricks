import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditExerciseForm from "./forms/EditExerciseForm";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  GetAttendanceByDayQuery,
  Status,
  useDeleteExerciseMutation,
  useGetAttendanceByDayQuery,
} from "../../../../generated/graphql";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../../../auth";
import { CustomDialog } from "../../../lib";
import * as XLSX from "xlsx";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { StyledExerciseTableCell, StyledExerciseTableRow } from "..";
import DownloadIcon from "@mui/icons-material/Download";
import AttendanceListDialog from "./dialogs/AttendanceListDialog";
import createAccessClient from "../../../../graphql/clients/accessClient";
import accessClient from "../../../../graphql/clients/accessClient";
import { convertToPlDate, getTimeWithoutMiliseconds } from "./helpers";

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
    user: { id: string; firstName: string; lastName: string; email: string };
  }> | null;
}

const ExerciseRow: React.FC<RowProps> = (props) => {
  const { i, item, groupName, trainees } = props;
  const { id, day, start, end } = item;
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);
  const [openAttendanceList, setOpenAttendanceList] = useState(false);
  const [attendanceChecked, setAttendanceChecked] = useState(false);
  const [openAttendanceWarning, setOpenAttendanceWarning] = useState(false);

  const {
    data,
    isLoading: attendanceLoading,
    error,
    refetch,
  } = useGetAttendanceByDayQuery<GetAttendanceByDayQuery, Error>(
    accessClient(),
    {
      attendanceByDayInput: {
        day,
      },
    },
    { refetchInterval: 1000 }
  );

  const { isLoading, mutate } = useDeleteExerciseMutation<Error>(
    createAccessClient(),
    {}
  );

  const sheetData = [
    data?.getAttendanceByDay.map((attendance, i) =>
      i == 0
        ? {
            Dzień: convertToPlDate(day),
            Godzina: `${getTimeWithoutMiliseconds(
              start
            )} - ${getTimeWithoutMiliseconds(end)}`,
            "Lp.": ++i,
            Imię: attendance.trainee.user.firstName,
            Nazwisko: attendance.trainee.user.lastName,
            Obecny: attendance.present ? "tak" : "nie",
            "Pierwszy raz":
              attendance.trainee.status === Status.FirstTime ? "tak" : "nie",
          }
        : {
            Dzień: "",
            Godzina: "",
            "Lp.": ++i,
            Imię: attendance.trainee.user.firstName,
            Nazwisko: attendance.trainee.user.lastName,
            Obecny: attendance.present ? "tak" : "nie",
            "Pierwszy raz":
              attendance.trainee.status === Status.FirstTime ? "tak" : "nie",
          }
    )!,
  ].flat();

  const handleExport = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(sheetData);

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
          {data?.getAttendanceByDay.length ? (
            <Tooltip title="Eksportuj listę obecności">
              <StyledIconButton
                aria-label="export-attendance-list"
                onClick={handleExport}
              >
                <DownloadIcon />
              </StyledIconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Sprawdź listę obecności">
              <StyledIconButton
                aria-label="check-attendance-list"
                onClick={() => setOpenAttendanceList(!openAttendanceList)}
              >
                <FormatListNumberedIcon />
              </StyledIconButton>
            </Tooltip>
          )}
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
          day={day}
          trainees={trainees}
          open={openAttendanceList}
          handleClose={() => {
            if (!attendanceChecked) setOpenAttendanceWarning(true);
          }}
          setOpenAttendanceList={setOpenAttendanceList}
        />
      )}
      {openAttendanceWarning && (
        <CustomDialog
          title="Czy na pewno chcesz wyjść?"
          content="Wprowadzone zmiany nie zostały zapisane"
          closeText="Wróć"
          acceptText="Wyjdź"
          onClose={() => setOpenAttendanceWarning(false)}
          onAccept={() => {
            setOpenAttendanceWarning(false);
            setOpenAttendanceList(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ExerciseRow;
