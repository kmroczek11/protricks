import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import { SelectedItem } from './CheckoutForm';

interface RowProps {
  id: number,
  monthObject: {
    month: string,
    payed: boolean,
    exercises:
    Array<{
      id: string,
      day: any
    }>
  }
  price: number;
  selectedItems: SelectedItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const Row: React.FC<RowProps> = (props) => {
  const { id, monthObject, price, selectedItems, setSelectedItems } = props;
  const { month, exercises, payed } = monthObject;
  const amount = exercises.length * price
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isItemSelected = isSelected(id);

  const labelId = `enhanced-table-checkbox-${id}`;

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  React.useEffect(() => {
    isItemSelected ?
      setSelectedItems([...selectedItems, { month, amount }]) :
      setSelectedItems(selectedItems.filter((s) => s.month != month))
  }, [isItemSelected])

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          "&.Mui-selected": {
            backgroundColor: "success.main",

            "&:hover": {
              backgroundColor: "success.main"
            }
          }
        }}
        hover
        onClick={(event) => handleClick(event, id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={id}
        selected={isItemSelected}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {month}
        </TableCell>
        <TableCell align="right">{amount} zł</TableCell>
        <TableCell align="right">{payed ? "Tak" : "Nie"}</TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Zajęcia
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Dzień</TableCell>
                    <TableCell>Cena</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exercises.map((e) => (
                    <TableRow key={e.day}>
                      <TableCell component="th" scope="row">
                        {e.day}
                      </TableCell>
                      <TableCell>{price} zł</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;