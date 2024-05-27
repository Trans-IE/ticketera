import React, { useState, useEffect, useCallback } from "react";

import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useTheme } from '@mui/material/styles';

import { GridViewColSelector } from './GridViewColSelector';

import useWindowDimensions from "../../hooks/useWindowDimensions";

import CircleIcon from '@mui/icons-material/Circle';
import { DatagridEdit } from "./DatagridEdit";
import styled from "styled-components";

const StyledTableContainer = styled(TableContainer)(({ styleProp }) => `
  max-height: calc(${styleProp.maxHeight} - 30px);
  width: 100%;
`);


const PaginationTheme = styled(TablePagination)`
  .MuiToolbar-root {
    min-height: 30px;
  }
  .MuiTablePagination-actions .MuiButtonBase-root {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;


const CustomTableCellFormatter = ({ column, value, customColors }) => {
  let colorItem = customColors?.find(item => item[0] === column.id);
  let color = colorItem ? colorItem[1] : "";
  if (!Array.isArray(value)) {
    if (value.toString().length < 50) {
      return (
        column?.visible === true &&
        <TableCell
          style={{ color }}
          align="left"
        >
          {value}
        </TableCell>
      );
    } else {
      return (
        column?.visible === true &&
        <Tooltip title={value}>
          <TableCell
          >
            {
              column.cellWidth === 1
                ? `${value.toString().substr(0, 25)}...`
                : `${value.toString().substr(0, 50)}...`
            }
          </TableCell>
        </Tooltip>
      );
    }
  } else {

    return (
      column?.visible === true &&
      <TableCell
      >
        {
          value.join("\n")
        }
      </TableCell>
    );


  }
}

// crea y controla anidados de una fila
const GridViewBigDataRow = React.memo(
  ({ columns, detailcolumns, order, dataitem, page, customButtonNumber, gridSelectionOnClick, handleCustomButton, customButtonIcon, customButtonTooltip, customButtonEnable, showColumnSelector, handleOnExpand, oneExpandOnly = false, customButtonNumberDetail, customButtonEnableDetail, customButtonIconDetail, customButtonTooltipDetail, handleCustomButtonDetail, subDataActionRowsStyle = {}, subDataActionHeaderStyle = {}, subDataActionColumnShowLeft = false }) => {
    const [dataItemRow, setDataItemRow] = useState({
      ...dataitem,
      expanded: false,
    });
    const [initPage, setInitPage] = useState(0);
    useEffect(() => {
      setDataItemRow({
        ...dataitem,
        expanded: false,
      });
    }, [page]);

    if (oneExpandOnly) {
      useEffect(() => {
        if (dataItemRow.expanded && (dataitem.detail?.length === 0)) {
          setDataItemRow({
            ...dataitem,
            expanded: false,
          });
        }
      }, [dataitem.detail])
    }




    let customButtonQuantity = [];
    if (customButtonNumber > 0) {
      customButtonQuantity = Array.from({ length: customButtonNumber }, (_, i) => i + 1);
    }

    return (
      <>
        <TableRow hover tabIndex={-1} key={"ro" + dataitem[columns[0].id]} style={{ cursor: 'pointer' }} onClick={() => gridSelectionOnClick(dataitem)}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {(showColumnSelector || detailcolumns.length > 0 || (columns.length > 0 && customButtonQuantity.length > 0)) &&

            <TableCell
              key={dataitem[columns[0].id]}
            >
              {detailcolumns.length > 0 &&
                (
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      const newDataItem = { ...dataitem, expanded: !dataItemRow.expanded }
                      handleOnExpand(newDataItem, newDataItem.expanded)

                      setDataItemRow(newDataItem)
                    }
                    }
                  >
                    {dataItemRow.expanded ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>)}
              {columns.length > 0 && customButtonQuantity.map((item, i) => {
                if (customButtonEnable[i] ? typeof customButtonEnable[i] === "boolean" ? customButtonEnable[i] : customButtonEnable[i](dataitem) : false) {
                  return (
                    <Tooltip title={customButtonTooltip[i] ? typeof customButtonTooltip[i] === 'string' ? customButtonTooltip[i] : customButtonTooltip[i](dataitem) : ''} placement="top">
                      <IconButton
                        key={dataitem[columns[0].id] + "-custom-button"}
                        aria-label="custom"
                        onClick={(e) => {
                          handleCustomButton[i] ? handleCustomButton[i](dataitem, e) : () => { }
                        }}
                      >
                        {customButtonIcon[i] ? customButtonIcon[i] : <CircleIcon />}
                      </IconButton>
                    </Tooltip>)
                }
              })}
            </TableCell>

          }
          {order.map((colIdx, i) => {
            let value = dataitem[columns[colIdx]?.id];
            value = value === null || typeof value === "undefined" ? "" : value;

            return (
              <CustomTableCellFormatter key={i} column={columns[colIdx]} value={value} customColors={dataitem.customColors ? dataitem.customColors : []} />
            );

          })}
        </TableRow>

        {dataItemRow.expanded === true && dataitem.detail?.length > 0 && (
          <TableRow tabIndex={-1} key={"expanded" + dataitem[columns[0].id]}>
            <TableCell
              colSpan={columns.length + (showColumnSelector ? 1 : 0)}
              align="left"
            >
              <DatagridEdit
                data={dataitem.detail}
                columns={detailcolumns}
                customButtonNumber={customButtonNumberDetail}
                customButtonEnable={customButtonEnableDetail}
                customButtonIcon={customButtonIconDetail}
                customButtonTooltip={customButtonTooltipDetail}
                handleCustomButton={handleCustomButtonDetail}
                enableAdd={false}
                enableDelete={false}
                enableSelectData={false}
                enableEdit={false}
                initPage={initPage}
                handleOnPageChange={(event, newPage) => { setInitPage(newPage) }}
                actionRowsStyle={subDataActionRowsStyle}
                actionHeaderStyle={subDataActionHeaderStyle}
                actionColumnShowLeft={subDataActionColumnShowLeft}
              />
            </TableCell>
          </TableRow>
        )}

      </>
    );
  }
);

export const GridViewBigData = ({
  columns,
  detailcolumns,
  data,
  handleGridChangePage,
  resetPagination,
  initRowsPerPage = 25,
  gridDataHasMorePages,
  gridSelectionOnClick = () => { },
  handleColSelectorOnChange,
  customButtonNumber = 0,
  customButtonIcon,
  customButtonTooltip,
  customButtonEnable,
  handleCustomButton,
  showColumnSelector = true,
  specialButtonStyle = {},
  oneExpandOnly = false,
  customButtonNumberDetail = 0,
  customButtonEnableDetail = false,
  customButtonIconDetail = <CircleIcon />,
  customButtonTooltipDetail = '',
  handleCustomButtonDetail = () => { },
  handleOnExpand = (item, expand) => { },
  subDataActionHeaderStyle = {},
  subDataActionRowsStyle = {},
  subDataActionColumnShowLeft = false,
  maxHeight,
  canReorderColumns = false
}) => {
  const theme = useTheme()

  const { height, width } = useWindowDimensions();
  const propsStyles = { maxHeight: maxHeight || (height * 82) / 100 };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initRowsPerPage);
  const [position, setPosition] = React.useState(null);

  const [order, setOrder] = useState(
    new Array(columns.length).fill(null).map((n, i) => i)
  );

  useEffect(() => {
    console.log(propsStyles)
  }, [])

  useEffect(() => {
    setOrder(new Array(columns.length).fill(null).map((n, i) => i));
  }, [columns])

  const handleChangePage = (event, newPage) => {
    const grid_limit = rowsPerPage;
    const grid_offset = newPage * rowsPerPage;

    handleGridChangePage(grid_limit, grid_offset);
    resetPagination = false;

    setPage(newPage);
  };

  useEffect(() => {
    let elem = document.getElementById('test');
    setPosition(elem?.getBoundingClientRect());
  }, [data])

  const onReorderEnd = useCallback(
    ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
      if (canReorderColumns) {
        const newOrder = [...order];
        const moved = newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, moved[0]);
        setOrder(newOrder);
      }

    },
    [order, setOrder]
  );

  useEffect(() => {
    // cuando es true, debe reinicializar el estado de paginado
    if (resetPagination === true) {
      setPage(0);
    }
  }, [resetPagination]);


  return (
    <>
      <StyledTableContainer styleProp={propsStyles} style={{ borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border }}>
        <Table
          stickyHeader
          aria-label="listado de GridViewBigData"
          sx={{ minWidth: 650, backgroundColor: theme.palette.background.dark }}
          style={{ backgroundColor: theme.palette.background.dark }}
        >
          <TableHead style={{ backgroundColor: theme.palette.background.dark }} >
            <TableRow>

              {showColumnSelector && <TableCell

              >
                <div id="test">
                  <GridViewColSelector columns={columns} handleOnChangeValue={handleColSelectorOnChange} position={position} />
                </div>
              </TableCell>}

              {!showColumnSelector && (detailcolumns.length > 0 || customButtonNumber > 0) && (
                <TableCell
                >
                  {""}
                </TableCell>
              )}

              {order.map((colIdx, i) => {
                //  console.log(columns[colIdx])
                return (
                  columns[colIdx]?.visible === true && (
                    <TableCell
                      index={i}
                      key={colIdx}
                    > {columns[colIdx].label}</TableCell>
                  )
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: theme.palette.background.main }}>
            {data.length > 0 &&
              data.map((dataitem, index) => {
                return (
                  typeof columns !== "undefined" &&
                  columns.length > 0 === true && (
                    <GridViewBigDataRow
                      key={index}
                      columns={columns}
                      detailcolumns={detailcolumns}
                      order={order}
                      dataitem={dataitem}
                      page={page}
                      customButtonNumber={customButtonNumber}
                      handleCustomButton={handleCustomButton}
                      customButtonIcon={customButtonIcon}
                      customButtonTooltip={customButtonTooltip}
                      customButtonEnable={customButtonEnable}
                      handleOnExpand={handleOnExpand}
                      showColumnSelector={showColumnSelector}
                      oneExpandOnly={oneExpandOnly}
                      customButtonNumberDetail={customButtonNumberDetail}
                      customButtonEnableDetail={customButtonEnableDetail}
                      customButtonIconDetail={customButtonIconDetail}
                      customButtonTooltipDetail={customButtonTooltipDetail}
                      handleCustomButtonDetail={handleCustomButtonDetail}
                      subDataActionRowsStyle={subDataActionRowsStyle}
                      subDataActionHeaderStyle={subDataActionHeaderStyle}
                      subDataActionColumnShowLeft={subDataActionColumnShowLeft}
                      gridSelectionOnClick={gridSelectionOnClick}
                    />
                  )
                );
              })}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <PaginationTheme
        nextIconButtonProps={{ disabled: !gridDataHasMorePages }}
        // backIconButtonProps={{ disabled: true }}
        colSpan={25}
        labelRowsPerPage={""}
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
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
        labelDisplayedRows={
          ({ from, to, count }) =>
            data.length > 0 && `Mostrando resultados ${from}-${from + to - 1}`
          // (count === 0 )
          // `Sin resultados`
        }
      />
    </>
  );
};