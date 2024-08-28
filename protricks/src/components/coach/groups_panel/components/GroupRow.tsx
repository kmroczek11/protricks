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
import {
  StyledExerciseTableCell,
  StyledExerciseTableRow,
  StyledTableCell,
  StyledTableRow,
} from "..";
import EditGroupForm from "./forms/EditGroupForm";
import { ColorButton } from "../../../lib";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import CustomDialog from "../../../lib/CustomDialog";
import CreateExerciseForm from "./forms/CreateExerciseForm";
import { Status, useDeleteGroupMutation } from "../../../../generated/graphql";
import ExerciseRow from "./ExerciseRow";
import Tooltip from "@mui/material/Tooltip";
import ManageMembersDialog from "./dialogs/ManageMembersDialog";
import { useAuth } from "../../../auth";
import SendEmailToGroupDialog from "./dialogs/SendEmailToGroupDialog";
import createAccessClient from "../../../../graphql/clients/accessClient";

interface RowProps {
  i: number;
  item: {
    id: string;
    name: string;
    limit: number;
    price: number;
    exercises?: Array<{
      id: string;
      day: any;
      start: any;
      end: any;
    }> | null;
    trainees?: Array<{
      id: string;
      birthDate: string;
      traineeName: string;
      parentPhone: any;
      parentEmail: any;
      feedback: string;
      status: Status;
      dateJoined: string;
      user: { id: string; firstName: string; lastName: string; email: string };
    }> | null;
  };
  groups: Array<{ id: string, name: string }> | null
}

const GroupRow: React.FC<RowProps> = (props) => {
  const { i, item, groups } = props;
  const { id, name, limit, price, exercises, trainees } = item;
  const [openExercises, setOpenExercises] = useState(false);
  const [openEditGroup, setOpenEditGroup] = useState(false);
  const [openCreateExercise, setOpenCreateExercise] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
  const [openManageMembersDialog, setOpenManageMembersDialog] = useState(false);
  const [openSendEmailToGroupDialog, setOpenSendEmailToGroupDialog] =
    useState(false);

  const { isLoading, mutate } = useDeleteGroupMutation<Error>(
    createAccessClient(),
    {}
  );

  const handleManageMembersDialogClose = () => {
    setOpenManageMembersDialog(false);
  };

  const handleSendEmailToGroupDialogClose = () => {
    setOpenSendEmailToGroupDialog(false);
  };

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
              <Tooltip title="Zwiń">
                <KeyboardArrowUpIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Rozwiń, aby wyświetlić zajęcia w tej grupie">
                <KeyboardArrowDownIcon />
              </Tooltip>
            )}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          {i}
        </StyledTableCell>
        <StyledTableCell align="center">{name}</StyledTableCell>
        <StyledTableCell align="center">{limit}</StyledTableCell>
        <StyledTableCell align="center">{price}</StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title="Edytuj grupę">
            <IconButton
              aria-label="edit-group"
              onClick={() => setOpenEditGroup(!openEditGroup)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Usuń grupę">
            <IconButton
              aria-label="delete-group"
              onClick={() => setOpenDeleteGroup(!openDeleteGroup)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zarządzaj członkami">
            <IconButton
              aria-label="manage-members"
              onClick={() => setOpenManageMembersDialog(true)}
            >
              <GroupIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Wyślij e-mail do grupy">
            <IconButton
              aria-label="send-email-to-group-list"
              onClick={() => setOpenSendEmailToGroupDialog(true)}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <ManageMembersDialog
            groupName={name}
            trainees={trainees}
            groups={groups}
            open={openManageMembersDialog}
            handleClose={handleManageMembersDialogClose}
          />
          <SendEmailToGroupDialog
            groupId={id}
            groupName={name}
            open={openSendEmailToGroupDialog}
            handleClose={handleSendEmailToGroupDialogClose}
          />
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
          title={`Czy na pewno chcesz usunąć grupę ${name}?`}
          content="Tej operacji nie można cofnąć."
          closeText="Nie usuwaj"
          acceptText="Usuń"
          onClose={() => setOpenDeleteGroup(false)}
          onAccept={() =>
            mutate({
              id: id,
            })
          }
        />
      )}
      <StyledExerciseTableRow>
        <StyledExerciseTableCell
          sx={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openExercises} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h2"
                gutterBottom
                component="div"
                color="secondary.contrastText"
              >
                Zajęcia
              </Typography>
              <Table size="small" aria-label="exercises">
                <TableHead>
                  <StyledExerciseTableRow>
                    <StyledExerciseTableCell align="center">
                      Lp.
                    </StyledExerciseTableCell>
                    <StyledExerciseTableCell align="center">
                      Data
                    </StyledExerciseTableCell>
                    <StyledExerciseTableCell align="center">
                      Godzina rozpoczęcia
                    </StyledExerciseTableCell>
                    <StyledExerciseTableCell align="center">
                      Godzina zakończenia
                    </StyledExerciseTableCell>
                  </StyledExerciseTableRow>
                </TableHead>
                <TableBody>
                  {exercises?.map((exercise, i) => (
                    <ExerciseRow
                      i={++i}
                      item={exercise}
                      trainees={trainees}
                      groupId={id}
                      groupName={name}
                    />
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
                          Dodaj zajęcia
                        </ColorButton>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledExerciseTableCell>
      </StyledExerciseTableRow>
    </React.Fragment>
  );
};

export default GroupRow;
