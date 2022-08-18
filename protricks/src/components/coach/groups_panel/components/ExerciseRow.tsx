import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { StyledTableCell, StyledTableRow } from "..";
import EditIcon from "@mui/icons-material/Edit";
import EditExerciseForm from "./EditExerciseForm";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "../../../lib/CustomDialog";
import { useDeleteExerciseMutation } from "../../../../generated/graphql";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../../../auth";

interface RowProps {
  item: {
    id: string;
    day: any;
    start: any;
    end: any;
  };
  trainees?: Array<{
    id: string;
    user: { id: string; firstName: string; lastName: string };
  }> | null;
}

const ExerciseRow: React.FC<RowProps> = (props) => {
  const { item, trainees } = props;
  const { id, day, start, end } = item;
  const { accessClient } = useAuth();
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);

  const { isLoading, mutate } = useDeleteExerciseMutation<Error>(
    accessClient!,
    {}
  );

  const convertToPlDate = (d: any) => new Date(d).toLocaleDateString("pl-pl");

  const getTimeWithoutMiliseconds = (t: string) => {
    return t.slice(0, -3);
  };

  return (
    <React.Fragment>
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row" align="center">
          {id}
        </StyledTableCell>
        <StyledTableCell align="center">{convertToPlDate(day)}</StyledTableCell>
        <StyledTableCell align="center">
          {getTimeWithoutMiliseconds(start)}
        </StyledTableCell>
        <StyledTableCell align="center">
          {getTimeWithoutMiliseconds(end)}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title="Edytuj zajęcia">
            <IconButton
              aria-label="edit-exercise"
              onClick={() => setOpenEditExercise(!openEditExercise)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Usuń zajęcia">
            <IconButton
              aria-label="delete-exercise"
              onClick={() => setOpenDeleteExercise(!openDeleteExercise)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openEditExercise} timeout="auto" unmountOnExit>
            <EditExerciseForm item={item} />
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
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
    </React.Fragment>
  );
};

export default ExerciseRow;
