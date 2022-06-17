import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 26,
        padding:12,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 22,
        padding:12,

        [`&.${tableCellClasses.alignRight}`]: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
                cursor: 'pointer'
            }
        },
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface CustomTableItem {
    hours: string;
    data: string[];
}

interface CustomTableProps {
    header: string[];
    cells: CustomTableItem[];
    onClick?:() => void;
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
    const { header, cells, onClick } = props;
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const selectItem = (hours: string, item: string, index: number) => {
        const fullItem = {
            day: header[index],
            hours: hours,
            name: item
        }
        setSelectedItem(fullItem);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {header.map((item, i) =>
                            i == 0 ?
                                <StyledTableCell>{item}</StyledTableCell>
                                :
                                <StyledTableCell align="right" key={i}>{item}</StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cells.map(({ hours, data }, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">
                                {hours}
                            </StyledTableCell>
                            {data.map((item, i) =>
                                <StyledTableCell
                                    key={i}
                                    align="right"
                                    onClick={() => {
                                        selectItem(hours, item, i);
                                        onClick!();
                                    }}
                                    sx={{
                                        ...(hours === selectedItem?.hours && item === selectedItem?.name && {
                                            backgroundColor: 'success.light',
                                            color: 'secondary.contrastText'
                                        })
                                    }}
                                >
                                    {item}
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default CustomTable;