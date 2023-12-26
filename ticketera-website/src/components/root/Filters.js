import React from 'react';
import Button from '@mui/material/Button'
import { FilterAlt } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Backdrop, Drawer, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { useTheme } from '@mui/styles';

const useStyles = makeStyles({
    sidebar: {
        borderRight: '1px solid #333',
        height: '100%', /* 100% Full-height */
        position: 'fixed', /* Stay in place */
        zIndex: '999999', /* Stay on top */
        top: '0',
        left: '0',
        backgroundColor: '#111', /* Black*/
        overflowX: 'hidden', /* Disable horizontal scroll */
        paddingTop: '60px', /* Place content 60px from the top */
        transition: '0.5s', /* 0.5 second transition effect to slide in the sidebar */
    },
    openSidebar: {
        width: '80', /* 0 width - change this with JavaScript */
        transition: '0.5s', /* 0.5 second transition effect to slide in the sidebar */
    },
    closedSidebar: {
        width: '0', /* 0 width - change this with JavaScript */
        transition: '0.5s', /* 0.5 second transition effect to slide in the sidebar */
    }
});


export const Filters = () => {
    const theme = useTheme()

    const [filters, setFilters] = useState([
        {
            filter: 'Estado',
            status: 'Abierto'
        },
        {
            filter: 'Fecha',
            status: 'Ultimo mes'
        }
    ])
    const [open, setOpen] = useState(closed)
    const [selectFirst, setSelectFirst] = useState('')
    const classes = useStyles();

    const handleChange = (event) => {
        setSelectFirst(event.target.value);
    };

    return (
        <div style={{ width: '1600px', height: '100%', margin: ' 0 auto', padding: '25px 25px 0 25px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{
                    borderRadius: '20px',
                }}>
                    <Button variant="outlined" startIcon={<FilterAlt />} style={{ borderRadius: '20px' }} onClick={() => { setOpen(!open) }}>Filtrar</Button>
                    {filters.map((filter) => (
                        <Button variant='outlined' color='tertiary' endIcon={<CloseIcon />} style={{ borderRadius: '20px', marginLeft: '10px' }}>{`${filter.filter}: ${filter.status}`}</Button>
                    ))}
                </div>
                <div>
                    <Button variant="contained"  style={{ borderRadius: '20px' }}>Nuevo Ticket</Button>
                </div>

            </div>


            <Backdrop
                sx={{ color: '#fff', zIndex: '9999' }}
                open={open}
                onClick={() => setOpen(false)}
            >
                <div className={classes.sidebar} style={{ width: open ? '500px' : '0' }} onClick={(e) => e.stopPropagation()}>
                    <CloseIcon style={{ left: '10px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 50px' }}>
                        <h2 style={{}}>Filtrar</h2>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectFirst}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Estado</em>
                            </MenuItem>
                            <MenuItem value={10}>Abiertos</MenuItem>
                            <MenuItem value={20}>Cerrados</MenuItem>
                            <MenuItem value={30}>Re-Abierto</MenuItem>
                            <MenuItem value={40}>Pendiente de Trans</MenuItem>
                            <MenuItem value={50}>Pendiente de Cliente</MenuItem>
                            <MenuItem value={60}>Pendiente de Asignacion</MenuItem>
                            <MenuItem value={70}>Pendiente de Cierre</MenuItem>
                        </Select>
                        <Button variant="contained" style={{ borderRadius: '20px' }}>Aplicar Filtros</Button>
                    </div>

                </div>
            </Backdrop>
        </div>
    )
}