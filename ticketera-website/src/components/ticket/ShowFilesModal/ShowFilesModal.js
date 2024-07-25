import { Box, Button, IconButton, ListItem, ListItemButton, ListItemText, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
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

    const columnsData = [
        { id: 'priority', label: '', cellWidth: 0, visible: true },
        { id: 'type', label: '', cellWidth: 0, visible: true },
        { id: 'id', label: 'ID', cellWidth: 0, visible: true },
        { id: 'titulo', label: 'Titulo', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'empresa', label: 'Empresa', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'tipo_falla', label: 'Tipo de falla', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'responsable', label: 'Responsable', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'estado', label: 'Estado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
        { id: 'fecha_creacion', label: 'Creado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' }
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

        dispatch(getAllFilesByTicketId(ticketId)).then((listOfFiles) => {

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
                    {
                        [].length > 0 && (
                            <GridViewBigData
                                columns={columnsData}
                                data={[]}
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

                    <div style={{ marginTop: '10px', height: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cargar Archivos</ButtonTrans>
                        <ButtonTrans onClick={() => closeModal()} variant='outlined' marginLeft>Cerrar</ButtonTrans>
                    </div>
                </div>

            </div>
        </Box>
    )
}
