import { Box, Button, IconButton, ListItem, ListItemButton, ListItemText, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { grey } from '@mui/material/colors';
import { ButtonTrans } from '../../ui/ButtonTrans';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import { GridViewBigData } from '../../ui/GridViewBigData';

import { getAllFilesByTicketId } from '../../../redux/actions/ticketActions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '20px',
    border: '1px solid',
};


export const ShowFilesModal = ({ ticketId, closeModal }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [rowsPerPageFiles, setRowsPerPageFiles] = useState(10);
    const [actualOffsetFiles, setActualOffsetFiles] = useState(0);
    const [resetPaginationFiles, setResetPaginationFiles] = useState(false);
    const [filesList, setfilesList] = useState([]);
    const [hasMorePages, setHasMorePages] = useState(true);

    const columnsData = [
        { id: 'archivo', label: 'Archivo', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'fecha', label: 'Fecha', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'usuarios_nombre', label: 'Nombre', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'usuarios_apellido', label: 'Apellido', cellWidth: 1, visible: true, backgroundColor: "#b5b3b3", color: 'black' }
    ]

    const handleGridChangePageFiles = (newpage_limit, newpage_offset) => {
        setResetPaginationFiles(false);
        setActualOffsetFiles(newpage_offset)
    };

    const GridSelectionOnClickHandleSelectFile = (item) => {
        // obtengo el item seleccionado

    }

    useEffect(() => {

        // getAllFilesPaths

        dispatch(getAllFilesByTicketId(ticketId, 0, 15)).then((listOfFiles) => {

            //    console.log("lista de archivos obtenidos 3 : ", listOfFiles);

            if (listOfFiles.length < 15) {
                setHasMorePages(false)
            }
            else {
                setHasMorePages(true)
            }

            setfilesList(listOfFiles);

        })

        return () => {

        }
    }, [])


    return (
        <Box sx={{ ...style, borderColor: theme.palette.background.border, bgcolor: theme.palette.background.background }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '15%', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <h2>Detalle de archivos cargados al ticket N°</h2>

                    </div>
                    <div style={{ marginTop: '10px', marginBottom: '50px', height: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cargar Archivos</ButtonTrans>
                        <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cerrar</ButtonTrans>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>


                        {
                            filesList.length > 0 && (
                                <GridViewBigData
                                    columns={columnsData}
                                    data={filesList}
                                    customButtonNumber={0}
                                    customButtonTooltip={[]}
                                    customButtonIcon={[]}
                                    handleCustomButton={[]}
                                    customButtonEnable={[false]}
                                    initRowsPerPage={rowsPerPageFiles}
                                    handleGridChangePage={handleGridChangePageFiles}
                                    resetPagination={resetPaginationFiles}
                                    gridDataHasMorePages={hasMorePages}
                                    showColumnSelector={false}
                                    gridSelectionOnClick={GridSelectionOnClickHandleSelectFile}
                                    detailcolumns={[]}
                                    oneExpandOnly={false}
                                    specialButtonStyle={{ backgroundColor: "#b5b3b3", color: 'black' }}
                                    handleOnExpand={(item, expand) => {

                                    }}
                                    canReorderColumns={true}
                                    customButtonNumberDetail={0}
                                    customButtonEnableDetail={[]}
                                    customButtonTooltipDetail={[]}
                                    customButtonIconDetail={[]}
                                    handleCustomButtonDetail={[]}

                                    subDataActionHeaderStyle={{ backgroundColor: grey[400], color: 'black', zIndex: 1 }}
                                    subDataActionRowsStyle={{ backgroundColor: grey[50] }}
                                    subDataActionColumnShowLeft={true}
                                    maxHeight={'calc(100vh - 155px)'}
                                />
                            )
                        }
                    </div>

                </div>

            </div>
        </Box>
    )
}
