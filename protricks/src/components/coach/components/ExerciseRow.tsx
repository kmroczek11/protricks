import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { StyledTableCell, StyledTableRow } from "..";
import EditIcon from "@mui/icons-material/Edit";
import EditExerciseForm from "./EditExerciseForm";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "../../lib/CustomDialog";
import { useDeleteExerciseMutation } from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";

interface RowProps {
  item: {
    id: number;
    day: any;
    start: any;
    end: any;
  };
}

const ExerciseRow: React.FC<RowProps> = (props) => {
  const { item } = props;
  const { id, day, start, end } = item;
  const [openEditExercise, setOpenEditExercise] = useState(false);
  const [openDeleteExercise, setOpenDeleteExercise] = useState(false);

  const { isLoading, mutate } = useDeleteExerciseMutation<Error>(
    graphqlRequestClient(),
    {}
  );

  const getTimeWithoutMiliseconds = (t: string) => {
    return t.slice(0, -3);
  };

  return (
    <React.Fragment>
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row" align="center">
          {id}
        </StyledTableCell>
        <StyledTableCell align="center">
          {new Date(day).toLocaleDateString("pl-pl")}
        </StyledTableCell>
        <StyledTableCell align="center">
          {getTimeWithoutMiliseconds(start)}
        </StyledTableCell>
        <StyledTableCell align="center">
          {getTimeWithoutMiliseconds(end)}
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton
            aria-label="edit-exercise"
            onClick={() => setOpenEditExercise(!openEditExercise)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete-exercise"
            onClick={() => setOpenDeleteExercise(!openDeleteExercise)}
          >
            <DeleteIcon />
          </IconButton>
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
          title={`Czy na pewno chcesz usunąć zajęcia dnia ${new Date(
            day
          ).toLocaleDateString("pl-pl")}?`}
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
