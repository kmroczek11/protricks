import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetCoachQuery, useGetCoachQuery } from "../../../generated/graphql";
import TableBody from "@mui/material/TableBody";
import GroupRow from "./components/GroupRow";
import { styled } from "@mui/material/styles";
import { ColorButton, LoadingScreen } from "../../lib";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CreateGroupForm from "./components/forms/CreateGroupForm";
import { useAuth } from "../../auth";
import createAccessClient from "../../../graphql/clients/accessClient";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    padding: 30,
  },
  [`&.${tableCellClasses.body}`]: {
    padding: 30,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledExerciseTableCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));

export const StyledExerciseTableRow = styled(StyledTableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  "& th": {
    color: theme.palette.secondary.contrastText,
  },
}));

const GroupsPanel: React.FC = () => {
  const { user } = useAuth();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const { data, isLoading, error, refetch } = useGetCoachQuery<
    GetCoachQuery,
    Error
  >(
    createAccessClient(),
    {
      id: user?.id!,
    },
    {
      refetchInterval: 1000,
      enabled: user ? true : false,
    }
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <TableCell />
            <StyledTableCell align="center">Lp.</StyledTableCell>
            <StyledTableCell align="center">Nazwa grupy</StyledTableCell>
            <StyledTableCell align="center">Limit uczestników</StyledTableCell>
            <StyledTableCell align="center">Cena</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            data?.getCoach?.groups?.map((group, i) => (
              <GroupRow i={++i} item={group} groups={data?.getCoach?.groups!} />
            ))!
          }
          <StyledTableRow>
            <StyledTableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={6}
            >
              <Collapse in={openCreateGroup} timeout="auto" unmountOnExit>
                <CreateGroupForm coachId={data?.getCoach.id!} />
              </Collapse>
              <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <ColorButton
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => setOpenCreateGroup(!openCreateGroup)}
                >
                  Dodaj grupę
                </ColorButton>
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupsPanel;
