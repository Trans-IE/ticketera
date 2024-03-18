import React, { useState } from "react"
import { useTheme } from "@mui/styles"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ButtonTrans } from "../ui/ButtonTrans";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const NewTicketScreen = () => {
    const theme = useTheme();
    const [empresa, setEmpresa] = useState()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: theme.palette.background.main, borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, padding: '20px', minHeight: '85vh', width: '60vw' }}>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <NoteAddIcon color="primary" style={{marginRight: '20px'}}/>                <h2>Nuevo Ticket</h2>

                </div>

                <Grid container spacing={4}>
                    <Grid item spacing={2} xs={6}>
                        <Grid container spacing={2}>
                            <Grid item spacing={2} xs={6}>
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empresa}
                                        label="Empresa"
                                        variant="standard" 
                                        onChange={(e) => { setEmpresa(e.target.value) }}
                                    >
                                        <MenuItem value={10}>Arset</MenuItem>
                                        <MenuItem value={20}>PROSEGUR</MenuItem>
                                        <MenuItem value={30}>Trans</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item spacing={2} xs={6}>

                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <InputLabel id="demo-simple-select-label">Contrato</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empresa}
                                        variant="standard" 
                                        label="Contrato"
                                        onChange={(e) => { setEmpresa(e.target.value) }}
                                    >
                                        <MenuItem value={10}>{'24x7 PH => 0, SOS => SI, RP => SI'}</MenuItem>
                                        <MenuItem value={20}>{'24x7 PH => 0, SOS => SI, RP => NO'}</MenuItem>
                                        <MenuItem value={30}>{'24x7 PH => 0, SOS => NO, RP => NO'}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl fullWidth style={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">Creador</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={empresa}
                                label="Creador"
                                variant="standard"
                                onChange={(e) => { setEmpresa(e.target.value) }}
                            >
                                <MenuItem value={10}>Seib, Facundo</MenuItem>
                                <MenuItem value={20}>Siciliano, Juan Pablo</MenuItem>
                                <MenuItem value={30}>Aravena, Gustavo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Numero de serie" variant="standard" style={{ margin: '10px 0' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
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
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControlLabel control={<Checkbox />} label="Proyecto" style={{ margin: '10px 0' }} />

                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} spacing={2}>
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empresa}
                                        label="Producto"
                                        variant="standard"
                                        onChange={(e) => { setEmpresa(e.target.value) }}
                                    >
                                        <MenuItem value={10}>Avaya</MenuItem>
                                        <MenuItem value={20}>CISCO</MenuItem>
                                        <MenuItem value={30}>Trans</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth style={{ margin: '10px 0' }}>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empresa}
                                        label=""
                                        variant="standard"
                                        onChange={(e) => { setEmpresa(e.target.value) }}
                                    >
                                        <MenuItem value={10}>Multimedia</MenuItem>
                                        <MenuItem value={20}>Nortiah</MenuItem>
                                        <MenuItem value={30}>Ticketera</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel control={<Checkbox />} label="Sin Contrato" style={{ margin: '10px 0' }} />
                            </Grid>
                        </Grid>


                        <FormControl fullWidth style={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={empresa}
                                variant="standard"
                                label="Tipo"
                                onChange={(e) => { setEmpresa(e.target.value) }}
                            >
                                <MenuItem value={10}>Falla</MenuItem>
                                <MenuItem value={20}>Consulta</MenuItem>
                                <MenuItem value={30}>Desarrollo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div style={{ margin: '40px 0' }}>
                    <TextField variant="standard" fullWidth label="Titulo" style={{ marginBottom: '20px' }} />
                    <TextField variant="standard" fullWidth multiline minRows={2} maxRows={6} label="Descripcion" />
                </div>
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
                <ButtonTrans variant='contained'>Cancelar</ButtonTrans>
                <ButtonTrans variant='contained' marginLeft>Aceptar</ButtonTrans>
            </div>
        </div>
    )
}