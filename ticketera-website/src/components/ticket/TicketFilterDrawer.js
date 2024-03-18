import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ButtonTrans } from '../ui/ButtonTrans'
import { useDispatch } from 'react-redux';
import { getAllCompanies, getAllPriorities, getAllTicketStates, getAllUsersByCompany } from '../../redux/actions/ticketActions';

export default function TicketFilterDrawer() {
    const dispatch = useDispatch();

    const [productList, setProductList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [priorityList, setPriorityList] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [responsiblesList, setResponsiblesList] = useState([]);

    useEffect(() => {
        dispatch(getAllTicketStates()).then(res => {
            if (res.ok) {
                setStateList(res.value)
            }
        })

        dispatch(getAllPriorities()).then(res => {
            if (res.ok) {
                setPriorityList(res.value)
            }
        })

        dispatch(getAllCompanies()).then(res => {
            if (res.ok) {
                setCompaniesList(res.value)
            }
        })

        dispatch(getAllUsersByCompany()).then(res => {
            if (res.ok) {
                res.value.sort(compareByName)
                setResponsiblesList(res.value)
            }
        })
    }, [])

    function compareByName(a, b) {
        const nameA = a.nombre_completo.toUpperCase();
        const nameB = b.nombre_completo.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    return (
        <div style={{ padding: '25px' }}>
            <h2>Filtros</h2>
            <TextField label="Buscar por..." style={{ paddingBottom: '20px' }} fullWidth></TextField>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Estado"
                    onChange={() => { }}
                >
                    {stateList.map((state) => {
                        return (
                            <MenuItem value={state.id}>{state.estado}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }} >
                <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Prioridad"
                    onChange={() => { }}
                >
                    {priorityList.map((priority) => {
                        return (
                            <MenuItem value={priority.id}>{priority.prioridad}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Tipo de falla</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Tipo de falla"
                    onChange={() => { }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Tipo"
                    onChange={() => { }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Empresa"
                    onChange={() => { }}
                >
                    {companiesList.map((company) => {
                        return (
                            <MenuItem value={company.id}>{company.nombre}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Producto"
                    onChange={() => { }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                <InputLabel id="demo-simple-select-label">Responsable</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Responsable"
                    onChange={() => { }}
                >
                    {responsiblesList.map((responsible) => {
                        return (
                            <MenuItem value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <div>
                <ButtonTrans variant='contained'>Filtrar</ButtonTrans>
                <ButtonTrans variant='outlined' marginLeft>Cancelar</ButtonTrans>
            </div>
        </div>
    )
}
