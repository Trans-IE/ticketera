import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ButtonTrans } from '../ui/ButtonTrans'
import { useDispatch } from 'react-redux';
import { getAllTicketTypes } from '../../redux/actions/ticketActions';
import './TicketFilterDrawer.scss'
import { styled, useTheme } from '@mui/styles';
import { getAllTicketPriorities } from '../../redux/actions/priorityActions';
import { getAllResponsibles } from '../../redux/actions/responsibleActions';
import { getAllCompanies } from '../../redux/actions/companyActions';
import { getAllTicketStates } from '../../redux/actions/stateActions';
import { getAllBrands, getAllProducts, getProductsByBrand } from '../../redux/actions/productActions';
import { getAllFailTypes } from '../../redux/actions/failTypeActions';

export default function TicketFilterDrawer({ handleCancelFilter, filter }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [title, setTitle] = useState("")
    const [cause, setCause] = useState("")
    const [number, setNumber] = useState(undefined)
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedFailType, setSelectedFailType] = useState("")
    const [selectedState, setselectedState] = useState("")
    const [selectedPriority, setSelectedPriority] = useState("")
    const [selectedCompany, setSelectedCompany] = useState("")
    const [selectedResponsible, setSelectedResponsible] = useState("")

    const [brandsList, setBrandsList] = useState([])
    const [selectedBrand, setSelectedBrand] = useState("")

    const [productList, setProductList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [failTypeList, setFailTypeList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [priorityList, setPriorityList] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [responsiblesList, setResponsiblesList] = useState([]);

    useEffect(() => {
        dispatch(getAllTicketStates()).then(res => {
            setStateList(res.value)
        })

        dispatch(getAllTicketPriorities()).then(res => {
            setPriorityList(res.value)
        })

        dispatch(getAllCompanies()).then(res => {
            setCompaniesList(res.value)
        })

        dispatch(getAllTicketTypes()).then(res => {
            setTypeList(res.value)
        })

        dispatch(getAllBrands()).then(res => {
            setBrandsList(res.value)
        })

        dispatch(getAllFailTypes()).then(res => {
            setFailTypeList(res.value)
        })

        dispatch(getAllResponsibles()).then(res => {
            setResponsiblesList(res)
        })
    }, [])

    useEffect(() => {
        if (selectedBrand) {
            dispatch(getProductsByBrand(selectedBrand)).then(res => {
                setProductList(res.value)
            })
        }
        else {
            setProductList([])
        }
    }, [selectedBrand])


    const resetFilters = () => {
        setSelectedCompany("")
        setSelectedFailType("")
        setSelectedPriority("")
        setSelectedProduct("")
        setSelectedResponsible("")
        setSelectedType("")
        setselectedState("")
        setTitle("")
        setCause("")
        setNumber(undefined)
    }

    const StyledTextField = styled((props) => <TextField {...props} />)(
        ({ theme }) => ({
            '& label': {
                color: theme.palette.text.primary
            },
        }),
    );


    const handleFilter = () => {
        let filters = {
            type: selectedType,
            company: selectedCompany,
            responsible: selectedResponsible,
            product: selectedProduct,
            priority: selectedPriority,
            failType: selectedFailType,
            state: selectedState,
            title: title,
            number: number,
            cause: cause
        }

        console.log('TOY', filters)
        filter(filters)
    }

    return (
        <div style={{ height: '100%', margin: ' 0 auto', scroll: 'auto' }}>
            <div style={{ height: '100%', overflow: 'auto', padding: '25px' }}>
                <h2>Filtros</h2>
                <StyledTextField label="Titulo" value={title} onChange={e => setTitle(e.target.value)} style={{ paddingBottom: '20px', color: theme.palette.text.primary }} fullWidth />
                <StyledTextField label="Numero" value={number === undefined ? '' : number} onChange={e => setNumber(e.target.value)} type="number" style={{ paddingBottom: '20px', color: theme.palette.text.primary }} fullWidth />
                <StyledTextField label="Causa raiz" value={cause} onChange={e => setCause(e.target.value)} style={{ paddingBottom: '20px', color: theme.palette.text.primary }} fullWidth />
                <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                    <InputLabel style={{ color: theme.palette.text.primary }}>Estado</InputLabel>
                    <Select
                        value={selectedState}
                        label="Estado"
                        onChange={(e) => { setselectedState(e.target.value) }}
                    >
                        {stateList.map((state) => {
                            return (
                                <MenuItem key={state.id} value={state.id}>{state.estado}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ paddingBottom: '20px' }} >
                    <InputLabel style={{ color: theme.palette.text.primary }}>Prioridad</InputLabel>
                    <Select
                        value={selectedPriority}
                        label="Prioridad"
                        onChange={(e) => { setSelectedPriority(e.target.value) }}
                    >
                        {priorityList.map((priority) => {
                            return (
                                <MenuItem key={priority.id} value={priority.id}>{priority.prioridad}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                    <InputLabel style={{ color: theme.palette.text.primary }}>Tipo de falla</InputLabel>
                    <Select
                        value={selectedFailType}
                        label="Tipo de falla"
                        onChange={(e) => { setSelectedFailType(e.target.value) }}
                    >
                        {failTypeList.map((failType) => {
                            return (
                                <MenuItem key={failType.id} value={failType.id}>{failType.descripcion}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                    <InputLabel style={{ color: theme.palette.text.primary }}>Tipo</InputLabel>
                    <Select
                        value={selectedType}
                        label="Tipo"
                        onChange={(e) => { setSelectedType(e.target.value) }}
                    >
                        {typeList.map((type) => {
                            return (
                                <MenuItem key={type.id_tipo} value={type.id_tipo}>{type.descripcion}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                    <InputLabel style={{ color: theme.palette.text.primary }}>Empresa</InputLabel>
                    <Select
                        value={selectedCompany}
                        label="Empresa"
                        onChange={(e) => { setSelectedCompany(e.target.value) }}
                    >
                        {companiesList.map((company) => {
                            return (
                                <MenuItem key={company.id} value={company.id}>{company.nombre}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                        <InputLabel style={{ color: theme.palette.text.primary }}>Marca</InputLabel>
                        <Select
                            value={selectedBrand}
                            label="Marca"
                            onChange={(e) => { setSelectedBrand(e.target.value) }}
                        >
                            {brandsList.map((brand) => (
                                <MenuItem key={brand.id} value={brand.id}>{brand.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                        <InputLabel disabled={productList.length === 0}>Producto</InputLabel>
                        <Select
                            value={selectedProduct}
                            label="Producto"
                            onChange={(e) => { setSelectedProduct(e.target.value) }}
                            disabled={productList.length === 0}
                        >
                            {productList.map((product) => (
                                <MenuItem key={product.id} value={product.id}>{product.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <FormControl fullWidth style={{ paddingBottom: '20px' }}>
                    <InputLabel style={{ color: theme.palette.text.primary }}>Responsable</InputLabel>
                    <Select
                        value={selectedResponsible}
                        label="Responsable"
                        onChange={(e) => { setSelectedResponsible(e.target.value) }}
                    >
                        {responsiblesList.map((responsible) => {
                            return (
                                <MenuItem key={responsible.id} value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <ButtonTrans variant='contained' onClick={handleFilter}>Filtrar</ButtonTrans>
                        <ButtonTrans variant='outlined' onClick={handleCancelFilter} marginLeft>Cancelar</ButtonTrans>
                    </div>

                    <div>
                        <ButtonTrans color='error' variant='outlined' onClick={resetFilters} marginLeft>Reiniciar Filtros</ButtonTrans>
                    </div>
                </div>
            </div>
        </div>
    )
}
