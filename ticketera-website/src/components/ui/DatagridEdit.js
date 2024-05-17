import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CallIcon from '@mui/icons-material/Call';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircleIcon from '@mui/icons-material/Circle';
import useWindowDimensions from "../../hooks/useWindowDimensions";

export const DatagridEdit = ({
  columns,
  data,
  handleSelectData,
  handleEdit,
  handleDelete,
  handleAdd,
  enableSelectData = true,
  enableEdit = true,
  enableDelete = true,
  enableAdd = false,
  customButtonNumber = 0,
  customButtonIcon,
  customButtonTooltip,
  customButtonEnable,
  handleCustomButton,
  initRowsPerPage = 10,
  initPage = 0,
  actionRowsStyle = {},
  actionHeaderStyle = {},
  handleOnPageChange = () => { },
  actionColumnShowLeft = false,
  maxHeight
}) => {

  const { height, width } = useWindowDimensions();
  const propsStyles = { maxHeight: maxHeight || /*(height * 82) / 100 */ 450 };
  const classes = useStyles(propsStyles);
  const [page, setPage] = React.useState(initPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(initRowsPerPage);

  const handleChangePage = (event, newPage) => {
    handleOnPageChange(event, newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(initPage);
  }, [data]);

  let customButtonQuantity = [];
  if (customButtonNumber > 0) {
    customButtonQuantity = Array.from({ length: customButtonNumber }, (_, i) => i + 1);
  }

  return (
    <>
      <TableContainer className={classes.tcontainer}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {actionColumnShowLeft && (enableAdd || enableDelete || enableEdit || enableSelectData || customButtonNumber > 0) && (
                <TableCell style={actionHeaderStyle || {}}>
                  Acciones
                  {enableAdd && (
                    <IconButton
                      className={classes.iconButtonClass}
                      key="-add-button"
                      aria-label="Agregar"
                      onClick={handleAdd}
                      style={{ color: 'white' }}
                    >
                      <Typography>&nbsp;&nbsp;</Typography>
                      <AddCircleIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}

              {columns
                .filter((column) => column.minWidth !== 0)
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      zIndex: 1,
                      backgroundColor: column.backgroundColor || '',
                      color: column.color || '',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}

              {!actionColumnShowLeft && (enableAdd || enableDelete || enableEdit || enableSelectData || customButtonNumber > 0) && (
                <TableCell style={actionHeaderStyle || {}}>
                  Acciones
                  {enableAdd && (
                    <IconButton
                      className={classes.iconButtonClass}
                      key="-add-button"
                      aria-label="Agregar"
                      onClick={handleAdd}
                      style={{ color: 'white' }}
                    >
                      <Typography>&nbsp;&nbsp;</Typography>
                      <AddCircleIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>

          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataitem) => {
                const actionColumn = (
                  <TableCell style={actionRowsStyle || {}}>
                    {enableSelectData && (
                      <IconButton
                        className={classes.iconButtonClass}
                        key={`${dataitem[columns[0].id]}-select-button`}
                        aria-label="seleccione"
                        onClick={() => handleSelectData(dataitem)}
                      >
                        <CallIcon />
                      </IconButton>
                    )}
                    {enableEdit && (
                      <IconButton
                        className={classes.iconButtonClass}
                        key={`${dataitem.id}-edit-button`}
                        aria-label="editar"
                        onClick={() => handleEdit(dataitem)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {enableDelete && (
                      <IconButton
                        className={classes.iconButtonClass}
                        key={`${dataitem[columns[0].id]}-delete-button`}
                        aria-label="eliminar"
                        onClick={() => handleDelete(dataitem)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {customButtonQuantity.map((item, i) => {
                      if (
                        customButtonEnable[i]
                          ? typeof customButtonEnable[i] === "boolean"
                            ? customButtonEnable[i]
                            : customButtonEnable[i](dataitem)
                          : false
                      ) {
                        return (
                          <Tooltip
                            title={
                              customButtonTooltip[i]
                                ? typeof customButtonTooltip[i] === "string"
                                  ? customButtonTooltip[i]
                                  : customButtonTooltip[i](dataitem)
                                : ""
                            }
                            placement="top"
                          >
                            <IconButton
                              className={classes.iconButtonClass}
                              key={`${dataitem[columns[0].id]}-custom-button`}
                              aria-label="custom"
                              onClick={(e) => {
                                handleCustomButton[i]
                                  ? handleCustomButton[i](dataitem, e)
                                  : () => { };
                              }}
                            >
                              {customButtonIcon[i] ? customButtonIcon[i] : <CircleIcon />}
                            </IconButton>
                          </Tooltip>
                        );
                      }
                    })}
                  </TableCell>
                );

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={dataitem.id}

                  >
                    {actionColumnShowLeft && actionColumn}
                    {columns.map((column) => {
                      const value = dataitem[column.id];
                      return (
                        column.minWidth !== 0 && (
                          <CustomTableCell
                            key={column.id}
                            align={column.align}
                            padding="none"
                            style={{
                              color: column.enableCustomColor
                                ? dataitem.customColor
                                : "black",
                              fontWeight: column.customFontWeight
                                ? column.customFontWeight
                                : "",
                              backgroundColor: column.enableCustomBackgroundColor
                                ? dataitem.customBackgroundColor
                                : "",
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </CustomTableCell>
                        )
                      );
                    })}
                    {!actionColumnShowLeft && actionColumn}
                  </TableRow>
                );
              })}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"Filas por pagina:"}
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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
        labelDisplayedRows={({ from, to, count }) =>
          `Mostrando resultados ${from}-${to}`
        }
      />
    </>
  );
};
