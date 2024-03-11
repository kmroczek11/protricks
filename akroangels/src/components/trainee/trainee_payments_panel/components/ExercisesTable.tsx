import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { convertToPlDate } from "../../../coach/groups_panel/components/helpers";
import Row from "./Row";
import { styled } from '@mui/material/styles';
import { SelectedItem } from "./CheckoutForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface ExercisesTableProps {
  price: number;
  monthObjects: Array<{
    month: string,
    payed: boolean,
    exercises:
    Array<{
      id: string,
      day: any
    }>
  }>
  selectedItems: SelectedItem[]
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>
}
const ExercisesTable: React.FC<ExercisesTableProps> = (props) => {
  const { price, monthObjects, selectedItems, setSelectedItems } = props;
  console.log(monthObjects)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Miesiąc</StyledTableCell>
            <StyledTableCell align="right">Suma</StyledTableCell>
            <StyledTableCell align="right">Zapłacono</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {monthObjects.map((mo, index) => (
            <Row
              id={index}
              price={price}
              monthObject={mo}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExercisesTable;
