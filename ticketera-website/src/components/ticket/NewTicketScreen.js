import React, { useEffect, useState } from "react"
import { useTheme } from "@mui/styles"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ButtonTrans } from "../ui/ButtonTrans";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getContractsByCompany } from "../../redux/actions/contractActions";
import { getAllBrands, getBrandsByCompany, getProductsByBrand } from "../../redux/actions/productActions";
import { getResponsiblesByCompany } from "../../redux/actions/responsibleActions";
import { getProjectsByCompany } from "../../redux/actions/projectActions";
import { createNewTicket } from "../../redux/actions/ticketActions";

export const NewTicketScreen = () => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const { responsiblesDataList } = useSelector(state => state.responsible, shallowEqual);
    const { companiesDataList } = useSelector(state => state.company, shallowEqual);
    const { failTypesDataList } = useSelector(state => state.failType, shallowEqual);
    const [contractDataList, setContractDataList] = useState([])
    const [productsDataList, setProductsDataList] = useState([])
    const [brandsDataList, setBrandsDataList] = useState([])
    const [creatorDataList, setCreatorDataList] = useState([])
    const [projectsDataList, setProjectsDataList] = useState([])

    const [empresa, setEmpresa] = useState()
    const [contract, setContract] = useState()
    const [responsible, setResponsible] = useState()
    const [type, setType] = useState()
    const [product, setProduct] = useState()
    const [brand, setBrand] = useState()
    const [creator, setCreator] = useState()
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [node, setNode] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [isProyect, setIsProyect] = useState(false)
    const [project, setProject] = useState('')
    const [partnerTicket, setPartnerTicket] = useState()
    const [noContract, setNoContract] = useState(false)

    useEffect(() => {
        if (companiesDataList.length === 1) {
            setEmpresa(companiesDataList[0].id)

            dispatch(getResponsiblesByCompany(companiesDataList[0].id, 1)).then(res => {
                if (res.ok) {
                    console.log(res)
                    setCreatorDataList(res.value)
                }
            })
        }

    }, [])

    useEffect(() => {
        if (contract === 0) {
            dispatch(getAllBrands()).then(res => {
                if (res.ok) {
                    console.log(res)
                    setBrandsDataList(res.value)
                }
            })
        }
        else {

        }
    }, [contract])

    useEffect(() => {
        if (empresa) {
            dispatch(getContractsByCompany(empresa)).then(res => {
                if (res.ok) {
                    setContractDataList(res.value)
                }
            })

            dispatch(getResponsiblesByCompany(empresa, 1)).then(res => {
                if (res.ok) {
                    console.log(res)
                    setCreatorDataList(res.value)
                }
            })

            dispatch(getProjectsByCompany(empresa)).then(res => {
                setProjectsDataList(res)
            })

            dispatch(getBrandsByCompany(empresa)).then(res => {
                setBrandsDataList(res)
            })
        }
    }, [empresa])

    useEffect(() => {
        if (brand) {
            dispatch(getProductsByBrand(brand)).then(res => {
                if (res.ok) {
                    setProductsDataList(res.value)
                }
            })
        }

    }, [brand])

    const isFormInvalid = () => {
        let invalid = true;

        if (empresa &&
            brand &&
            product &&
            type &&
            title &&
            title !== "" &&
            description &&
            description !== ""
        ) {
            invalid = false
        }

        return invalid
    }

    const handleCreateNewTicket = () => {
        const ticket = {
            companyId: empresa,
            contractId: contract,
            productId: product,
            typeId: type,
            description: description,
            title: title,
            node: node,
            serialNumber: serialNumber,
            isProyect: isProyect,
            creator: creator,
            responsible: responsible
        }
        dispatch(createNewTicket(ticket)).then(res => {
            console.log(res)
        })
        console.log('TICKET', ticket)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: theme.palette.background.main, borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, padding: '20px', width: '60vw' }}>
            <form>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <NoteAddIcon color="primary" style={{ marginRight: '20px' }} />
                        <h2>Nuevo Ticket</h2>
                    </div>

                    <Grid container spacing={4}>
                        <Grid item spacing={2} xs={6}>
                            <Grid container spacing={2}>
                                <Grid item spacing={2} xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={empresa}
                                            label="Empresa"
                                            variant="standard"
                                            onChange={(e) => { setEmpresa(e.target.value) }}
                                        >
                                            {companiesDataList.map((company) => (
                                                <MenuItem value={company.id}>{company.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item spacing={2} xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel id="demo-simple-select-label" disabled={contractDataList.length === 0 && noContract}>Contrato</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={contract}
                                            variant="standard"
                                            label="Contrato"
                                            onChange={(e) => { setContract(e.target.value) }}
                                            disabled={contractDataList.length === 0}
                                        >
                                            <MenuItem value={-1}>Sin Contrato</MenuItem>
                                            {contractDataList?.map((contract) => (
                                                <MenuItem value={contract.id}>{contract.ejecutivo_id}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel id="demo-simple-select-label" disabled={creatorDataList.length === 0}>Creador</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={creator}
                                    label="Creador"
                                    variant="standard"
                                    disabled={creatorDataList.length === 0}
                                    onChange={(e) => { setCreator(e.target.value) }}
                                >
                                    {creatorDataList?.map((creator) => (
                                        <MenuItem value={creator.id}>{creator.nombre_completo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField fullWidth label="Numero de serie" variant="standard" style={{ margin: '10px 0' }} value={serialNumber} onChange={e => setSerialNumber(e.target.value)} />
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <FormControl fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel id="demo-simple-select-label">Proyecto asociado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={empresa}
                                            variant="standard"
                                            label="Proyecto asociado"
                                            onChange={(e) => { setEmpresa(e.target.value) }}
                                        >
                                            <MenuItem value={10}>Ninguno</MenuItem>
                                            {projectsDataList?.map((project) => (
                                                <MenuItem value={project.id}>{project.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControlLabel control={<Checkbox checked={isProyect} onChange={() => { setIsProyect(!isProyect) }} />} label="Proyecto" style={{ margin: '10px 0' }} />
                                </Grid>
                            </Grid>
                            <TextField fullWidth label="Ticket en partner" variant="standard" style={{ margin: '10px 0' }} />

                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} spacing={2}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel id="demo-simple-select-label" disabled={brandsDataList.length === 0}>Marca</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={brand}
                                            label="Marca"
                                            variant="standard"
                                            disabled={brandsDataList.length === 0}
                                            onChange={(e) => { setBrand(e.target.value) }}
                                        >
                                            {brandsDataList.map(brand => (
                                                <MenuItem value={brand.id}>{brand.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel id="demo-simple-select-label" disabled={productsDataList.length === 0}>Producto</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={product}
                                            label="Producto"
                                            variant="standard"
                                            onChange={(e) => { setProduct(e.target.value) }}
                                            disabled={productsDataList.length === 0}
                                        >
                                            {productsDataList.map(product => (
                                                <MenuItem value={product.id}>{product.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>


                            <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    variant="standard"
                                    label="Tipo"
                                    onChange={(e) => { setType(e.target.value) }}
                                >
                                    {failTypesDataList.map(type => (
                                        <MenuItem value={type.id}>{type.descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField fullWidth label="Nodo" variant="standard" value={node} onChange={e => setNode(e.target.value)} style={{ margin: '10px 0' }} />

                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel id="demo-simple-select-label">Responsable</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={responsible}
                                    variant="standard"
                                    label="Responsable"
                                    onChange={(e) => { setResponsible(e.target.value) }}
                                >
                                    {responsiblesDataList.map(responsible => (
                                        <MenuItem value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                    <div style={{ margin: '40px 0' }}>
                        <TextField variant="standard" required fullWidth label="Titulo" style={{ marginBottom: '20px' }} value={title} onChange={e => setTitle(e.target.value)} />
                        <TextField variant="standard" required fullWidth multiline minRows={2} maxRows={6} label="Descripcion" value={description} onChange={e => { setDescription(e.target.value) }} />
                    </div>
                </div>

                <div style={{ alignSelf: 'flex-end' }}>
                    <ButtonTrans variant='contained'>Cancelar</ButtonTrans>
                    <ButtonTrans variant='contained' disabled={isFormInvalid()} type="submit" marginLeft onClick={handleCreateNewTicket}>Aceptar</ButtonTrans>
                </div>
            </form>
        </div>
    )
}