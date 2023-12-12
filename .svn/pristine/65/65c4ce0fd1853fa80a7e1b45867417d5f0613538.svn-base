import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles({
  tcontainer: {
    maxHeight: 450,
  },
  tableRow: {
    height: 30
  },
  tableCell: {
    padding: "0px 16px"
  },
  iconButtonClass: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingBottom: 0,
  },
});

const PaginationTheme = withStyles({
  toolbar: {
    minHeight: '30px'
  },
    
  actions: {
    "& .MuiButtonBase-root": {
      paddingLeft: 0, 
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    }
  }
})(TablePagination);

const CustomTableCell = withStyles((theme) => ({
  head: {
    //backgroundColor: theme.palette.primary.main,
    backgroundColor: "#ea8234",
    color: theme.palette.common.white,
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    whiteSpace: "pre",
  },
  body: {
    fontSize: 11,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    whiteSpace: "pre",
  },
}))(TableCell);

export const DatagridSelection = ({ columns, data, enableSelect=true, handleGridChangePage, resetPagination, handleSelect=null, hasMorePage=true }) => {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  const handleChangePage = (event, newPage) => {

    const grid_limit = rowsPerPage;
    const grid_offset = newPage * rowsPerPage;

    handleGridChangePage(grid_limit, grid_offset);
    resetPagination = false;

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // cuando es true, debe reinicializar el estado de paginado
    if (resetPagination === true) {
      setPage(0);
    }
  }, [resetPagination]);

  return (
    <>
      <TableContainer className={classes.tcontainer}  >
        <Table stickyHeader aria-label="sticky table" size="small"  >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                (column.minWidth !== 0) &&
                <CustomTableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                 
                >
                  {column.label}
                </CustomTableCell>
              ))}
                <CustomTableCell >
                #
                </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data.length > 0 && 
              data.map((dataitem, index) => {
              return (
                (typeof columns !== "undefined" && ((columns.length > 0) === true)) && (
                <TableRow hover tabIndex={-1} key={dataitem[columns[0].id]} className={classes.tableRow} >
                  {columns.map((column) => {
                    const value = dataitem[column.id];
                    return (
                      (column.minWidth !== 0) &&
                      <CustomTableCell key={column.id} align={column.align} padding="none" >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </CustomTableCell>
                    );
                  })}
                  <CustomTableCell key={dataitem[columns[0].id]} >
                  {
                    enableSelect && 
                    <IconButton className={ classes.iconButtonClass } key={dataitem[columns[0].id]+"-edit-button"} aria-label="editar" onClick={ () => handleSelect(dataitem) }>
                      <DoneIcon />
                    </IconButton>
                  }
                  </CustomTableCell>
                </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
      </TableContainer >
      <PaginationTheme 
        nextIconButtonProps={{ disabled: !hasMorePage }}
        colSpan={10}
        labelRowsPerPage={"Filas por pagina:"}
        rowsPerPageOptions={[]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => 
        (data.length > 0) && 
        `Mostrando resultados ${from}-${to}`} 
        getItemAriaLabel={(type) => {
          switch (type) {
            case 'first':
              return 'Ir a primer página';
            case 'last':
              return 'Ir a última página';
            case 'next':
              return 'Ir a próxima página';
            case 'previous':
              return 'Ir a página anterior';
            default:
              return '';
          }
        }}
     />

    </>
  )
}
