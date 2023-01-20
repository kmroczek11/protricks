import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../../auth";
import createAccessClient from "../../../../graphql/clients/accessClient";
import { convertToPlDate } from "../../../coach/groups_panel/components/helpers";

interface ExercisesTableProps {
  data: Array<{ id: string; day: any; price: number }>;
}

const ExercisesTable: React.FC<ExercisesTableProps> = (props) => {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="exercises-table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Dzień</TableCell>
            <TableCell align="center">Cena</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(
            (e, i) =>
              (
                <TableRow
                  key={e.day}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {convertToPlDate(e.day)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {e.price}
                  </TableCell>
                </TableRow>
              )!
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExercisesTable;
