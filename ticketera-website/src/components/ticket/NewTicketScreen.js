import React, { useEffect, useState } from "react"
import { useTheme } from "@mui/styles"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ButtonTrans } from "../ui/ButtonTrans";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getContractsByCompany } from "../../redux/actions/contractActions";
import { getAllBrands, getBrandsByCompany, getProductsByBrand, getProductsByBrandAndCompany } from "../../redux/actions/productActions";
import { getResponsiblesByCompany } from "../../redux/actions/responsibleActions";
import { getProjectsByCompany } from "../../redux/actions/projectActions";
import { createNewTicket } from "../../redux/actions/ticketActions";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { styled } from '@mui/material/styles';
import { arrayTabsClose, editTicketTabShownChange } from "../../redux/actions/userInterfaceActions";

export const NewTicketScreen = () => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const { arrayTabs } = useSelector((state) => state.ui, shallowEqual);
    const { user } = useSelector(state => state.auth, shallowEqual);

    // const { responsiblesDataList } = useSelector(state => state.responsible, shallowEqual);
    const { companiesDataList } = useSelector(state => state.company, shallowEqual);
    const { failTypesDataList } = useSelector(state => state.failType, shallowEqual);
    const [contractDataList, setContractDataList] = useState([])
    const [productsDataList, setProductsDataList] = useState([])
    const [brandsDataList, setBrandsDataList] = useState([])
    const [creatorDataList, setCreatorDataList] = useState([])
    const [projectsDataList, setProjectsDataList] = useState([])
    const [responsiblesDataList, setResponsiblesDataList] = useState([])

    const [empresa, setEmpresa] = useState('')
    const [contract, setContract] = useState('')
    const [responsible, setResponsible] = useState('')
    const [type, setType] = useState('')
    const [product, setProduct] = useState('')
    const [brand, setBrand] = useState('')
    const [creator, setCreator] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [node, setNode] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [isProject, setisProject] = useState(false)
    const [project, setProject] = useState('')
    const [partnerTicket, setPartnerTicket] = useState()
    const [vendor, setVendor] = useState()
    const [preSale, setPreSale] = useState()


    useEffect(() => {
        console.log('user', user)
        dispatch(getResponsiblesByCompany(3, 1)).then(res => {
            setCreatorDataList(res)
        })
        setCreator(user.id)

        if (companiesDataList.length === 1) {
            setEmpresa(companiesDataList[0].id)

            dispatch(getResponsiblesByCompany(companiesDataList[0].id, 1)).then(res => {
                setCreatorDataList(res)
            })
        }
        dispatch(getResponsiblesByCompany(3, 1)).then(res => {
            setResponsiblesDataList(res)
        })
    }, [])

    useEffect(() => {
        if (contract === 0) {
            dispatch(getAllBrands()).then(res => {
                if (res.ok) {
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
                    console.log(res)
                    setContractDataList(res.value)
                }
            })

            dispatch(getResponsiblesByCompany(empresa, 1)).then(res => {
                setCreatorDataList(res)
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
        if (brand && empresa) {
            console.log('se')
            dispatch(getProductsByBrandAndCompany(brand, empresa)).then(res => {
                if (res.ok) {
                    console.log(res)
                    setProductsDataList(res.value)
                }
            })
        }

    }, [brand, empresa])

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
            isProject: isProject,
            creator: creator,
            responsible: responsible,
            presaleId: isProject ? preSale : 0,
            vendorId: isProject ? vendor : 0
        }
        dispatch(createNewTicket(ticket)).then(res => {
            console.log('RES', res)
            toast.success('Ticket creado con éxito')
            goToTicketList()
        })
    }

    const goToTicketList = () => {
        dispatch(arrayTabsClose(0))
        dispatch(editTicketTabShownChange(-1));
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
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Empresa</InputLabel>
                                        <Select
                                            value={empresa}
                                            label="Empresa"
                                            variant="standard"
                                            onChange={(e) => { setEmpresa(e.target.value) }}
                                        >
                                            {companiesDataList.map((company) => (
                                                <MenuItem key={company.id} value={company.id}>{company.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} disabled={contractDataList.length === 0}>Contrato</InputLabel>
                                        <Select
                                            value={contract}
                                            variant="standard"
                                            label="Contrato"
                                            onChange={(e) => { setContract(e.target.value) }}
                                            disabled={contractDataList.length === 0}
                                        >
                                            <MenuItem value={-1}>Sin Contrato</MenuItem>
                                            {contractDataList?.map((contract) => (
                                                <MenuItem key={contract.id} value={contract.id}>{contract.descripcion}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} disabled={creatorDataList.length === 0}>Creador</InputLabel>
                                <Select
                                    value={creator}
                                    label="Creador"
                                    variant="standard"
                                    disabled={creatorDataList.length === 0 || user.tipo !== 1}
                                    onChange={(e) => { setCreator(e.target.value) }}
                                >
                                    {creatorDataList?.map((creator) => (
                                        <MenuItem key={creator.id} value={creator.id}>{creator.nombre_completo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Numero de serie"
                                variant="standard"
                                value={serialNumber}
                                onChange={e => setSerialNumber(e.target.value)}
                                sx={{
                                    '& label': {
                                        color: theme.palette.text.primary
                                    }
                                }}
                            />

                            {user.tipo === 1 &&
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                                <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Proyecto asociado</InputLabel>
                                                <Select
                                                    value={empresa}
                                                    variant="standard"
                                                    label="Proyecto asociado"
                                                    onChange={(e) => { setEmpresa(e.target.value) }}
                                                >
                                                    <MenuItem value={10}>Ninguno</MenuItem>
                                                    {projectsDataList?.map((project) => (
                                                        <MenuItem key={project.id} value={project.id}>{project.nombre}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControlLabel control={<Checkbox checked={isProject} onChange={() => { setisProject(!isProject) }} style={{ color: theme.palette.text.primary }} />} label="Proyecto" style={{ margin: '10px 0' }} />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        fullWidth
                                        label="Ticket en partner"
                                        variant="standard"
                                        value={partnerTicket}
                                        onChange={e => setPartnerTicket(e.target.value)}
                                        sx={{
                                            '& label': {
                                                color: theme.palette.text.primary
                                            },
                                            margin: '10px 0'
                                        }}
                                    />
                                </>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} >
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} disabled={brandsDataList.length === 0}>Marca</InputLabel>
                                        <Select
                                            value={brand}
                                            label="Marca"
                                            variant="standard"
                                            disabled={brandsDataList.length === 0}
                                            onChange={(e) => { setBrand(e.target.value) }}
                                        >
                                            {brandsDataList.map(brand => (
                                                <MenuItem key={brand.id} value={brand.id}>{brand.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} disabled={productsDataList.length === 0}>Producto</InputLabel>
                                        <Select
                                            value={product}
                                            label="Producto"
                                            variant="standard"
                                            onChange={(e) => { setProduct(e.target.value) }}
                                            disabled={productsDataList.length === 0}
                                        >
                                            {productsDataList.map(product => (
                                                <MenuItem key={product.id} value={product.id}>{product.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>


                            <FormControl required fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Tipo</InputLabel>
                                <Select
                                    value={type}
                                    variant="standard"
                                    label="Tipo"
                                    onChange={(e) => { setType(e.target.value) }}
                                >
                                    {failTypesDataList.map(type => (
                                        <MenuItem key={type.id} value={type.id}>{type.descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Nodo"
                                variant="standard"
                                value={node}
                                onChange={e => setNode(e.target.value)}
                                sx={{
                                    '& label': {

                                        color: theme.palette.text.primary
                                    },
                                    margin: '10px 0'
                                }}
                            />

                            {user.tipo === 1 &&
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Responsable</InputLabel>
                                    <Select
                                        value={responsible}
                                        variant="standard"
                                        label="Responsable"
                                        onChange={(e) => { setResponsible(e.target.value) }}
                                    >
                                        {responsiblesDataList.map(responsible => (
                                            <MenuItem key={responsible.id} value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }


                        </Grid>
                    </Grid>
                    {
                        isProject ?
                            <Grid container spacing={2}>
                                <Grid item xs={6} >
                                    <FormControl fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Preventa</InputLabel>
                                        <Select
                                            value={preSale}
                                            label="Preventa"
                                            variant="standard"
                                            onChange={(e) => { setPreSale(e.target.value) }}
                                        >
                                            {responsiblesDataList.map(responsible => (
                                                <MenuItem key={responsible.id} value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth style={{ margin: '10px 0' }}>
                                        <InputLabel variant="standard" sx={{ color: theme.palette.text.primary }} >Vendedor</InputLabel>
                                        <Select
                                            value={vendor}
                                            label="Vendedor"
                                            variant="standard"
                                            onChange={(e) => { setVendor(e.target.value) }}
                                        >
                                            {responsiblesDataList.map(responsible => (
                                                <MenuItem key={responsible.id} value={responsible.id}>{responsible.nombre_completo}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            : <></>
                    }

                    <div style={{ margin: '20px 0' }}>
                        <TextField
                            variant="standard"
                            required fullWidth
                            label="Título"
                            style={{ marginBottom: '20px' }}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            sx={{
                                '& label': {

                                    color: theme.palette.text.primary
                                },
                                margin: '10px 0'
                            }}
                        />
                        <TextField
                            variant="standard"
                            style={{ margin: '10px 0' }}
                            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                            required
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={6}
                            label="Descripcion"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </div>
                </div>

                <div style={{ alignSelf: 'flex-end' }}>
                    <ButtonTrans variant='contained' onClick={goToTicketList}>Cancelar</ButtonTrans>
                    <ButtonTrans variant='contained' disabled={isFormInvalid()} type="submit" marginLeft onClick={handleCreateNewTicket}>Aceptar</ButtonTrans>
                </div>
            </form>
        </div>
    )
}