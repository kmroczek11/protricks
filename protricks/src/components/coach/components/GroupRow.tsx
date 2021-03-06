import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledTableCell, StyledTableRow } from "..";
import EditIcon from "@mui/icons-material/Edit";
import EditGroupForm from "./EditGroupForm";
import { ColorButton } from "../../lib";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "../../lib/CustomDialog";
import CreateExerciseForm from "./CreateExerciseForm";
import { useDeleteGroupMutation } from "../../../generated/graphql";
import graphqlRequestClient from "../../../graphql/clients/graphqlRequestClient";
import ExerciseRow from "./ExerciseRow";

interface RowProps {
  item: {
    id: number;
    name: string;
    limit: number;
    exercises?: Array<{
      id: number;
      day: any;
      start: any;
      end: any;
    }> | null;
  };
}

const GroupRow: React.FC<RowProps> = (props) => {
  const { item } = props;
  const { id, name, limit, exercises } = item;
  const [openExercises, setOpenExercises] = useState(false);
  const [openEditGroup, setOpenEditGroup] = useState(false);
  const [openCreateExercise, setOpenCreateExercise] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

  const { isLoading, mutate } = useDeleteGroupMutation<Error>(
    graphqlRequestClient(),
    {}
  );

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenExercises(!openExercises)}
          >
            {openExercises ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          {id}
        </StyledTableCell>
        <StyledTableCell align="center">{name}</StyledTableCell>
        <StyledTableCell align="center">{limit}</StyledTableCell>
        <StyledTableCell align="center">
          <IconButton
            aria-label="edit-group"
            onClick={() => setOpenEditGroup(!openEditGroup)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete-group"
            onClick={() => setOpenDeleteGroup(!openDeleteGroup)}
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
          <Collapse in={openEditGroup} timeout="auto" unmountOnExit>
            <EditGroupForm item={item} />
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
      {openDeleteGroup && (
        <CustomDialog
          title={`Czy na pewno chcesz usun???? grup?? ${name}?`}
          content="Tej operacji nie mo??na cofn????."
          closeText="Nie usuwaj"
          acceptText="Usu??"
          onClose={() => setOpenDeleteGroup(false)}
          onAccept={() =>
            mutate({
              id: id,
            })
          }
        />
      )}
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openExercises} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h2" gutterBottom component="div">
                Zaj??cia
              </Typography>
              <Table size="small" aria-label="exercises">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Id</StyledTableCell>
                    <StyledTableCell align="center">Data</StyledTableCell>
                    <StyledTableCell align="center">
                      Godzina rozpocz??cia
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Godzina zako??czenia
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {exercises?.map((exercise) => (
                    <ExerciseRow item={exercise} />
                  ))}
                  <StyledTableRow>
                    <StyledTableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openCreateExercise}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CreateExerciseForm groupId={id} />
                      </Collapse>
                      <Box
                        sx={{ display: "flex", justifyContent: "center", p: 5 }}
                      >
                        <ColorButton
                          variant="contained"
                          endIcon={<AddIcon />}
                          onClick={() =>
                            setOpenCreateExercise(!openCreateExercise)
                          }
                        >
                          Dodaj zaj??cia
                        </ColorButton>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
};

export default GroupRow;
