import { Button, Checkbox, FormControlLabel, IconButton, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import './TicketDetail.scss'
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/styles';
import { ButtonTrans } from '../ui/ButtonTrans';
import { toast } from "sonner";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllTicketStates, getAllUsersByCompany, getTicketDetail, getTicketMessages, sendNewHiddenNote, sendNewNote } from '../../redux/actions/ticketActions';
import { ticketType } from '../../helpers/constants';
import { NotesMessage } from '../messages/NotesMessage';
import { UpdatedMessage } from '../messages/UpdatedMessage';
import { getAllTicketPriorities, setTicketPriority } from '../../redux/actions/priorityActions';
import { getAllResponsibles, setTicketResponsible } from '../../redux/actions/responsibleActions';
import { setTicketState } from '../../redux/actions/stateActions';

export const TicketDetail = ({ ticketID }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { ticketsGridDataList } = useSelector((state) => state.ticket, shallowEqual);
    const [messages, setMessages] = useState([])
    const [selectedTicket, setSelectedTicket] = useState({})
    const [ticketDetail, setTicketDetail] = useState({})

    const [ticketStates, setTicketStates] = useState([])
    const [responsibles, setResponsibles] = useState([])
    const [priorities, setPriorities] = useState([])

    const [isNoteHidden, setIsNoteHidden] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [tempDependencyNewNote, setTempDependencyNewNote] = useState(false)

    const [selectedPriority, setSelectedPriority] = useState('')
    const [selectedResponsible, setSelectedResponsible] = useState('')
    const [selectedState, setSelectedState] = useState('')

    useEffect(() => {

        dispatch(getTicketDetail(ticketID)).then(res => {
            if (res.ok) {
                setTicketDetail(res.value[0])
                console.log(res.value[0])

                setSelectedTicket(res.value[0].t_id)
                setSelectedPriority(res.value[0].t_prioridadid)
                setSelectedState(res.value[0].t_estado)
                setSelectedResponsible(res.value[0].t_responsable_id)
            }
        })

        dispatch(getAllTicketStates()).then(res => {
            if (res.ok) {
                setTicketStates(res.value)
            }
        })

        dispatch(getAllResponsibles()).then(res => {
            setResponsibles(res)
        })

        dispatch(getAllTicketPriorities()).then(res => {
            if (res.ok) {
                setPriorities(res.value)
            }
        })

        dispatch(getTicketMessages(ticketID)).then(res => {
            if (res.ok) {
                res.value.sort(compareByDate)
                setMessages(res.value)
            }
        })
    }, [selectedState, selectedPriority, selectedResponsible, tempDependencyNewNote])

    const findStateByID = (id) => {
        const state = ticketStates.find(obj => obj.id === id);
        return state.estado
    }

    const findPriorityByID = (id) => {
        const priority = priorities.find(obj => obj.id === id);
        return priority.prioridad
    }

    const setPriority = (priority) => {
        let color = 'black';

        switch (priority) {
            case 1:
                color = 'red'
                break;
            case 2:
                color = 'orange'
                break;
            case 3:
                color = 'green'
                break;
            case 4:
                color = theme.palette.trans.main
                break;
        }

        return (
            <CircleIcon style={{ color: color }} sx={{ fontSize: 12 }} />
        );
    }

    function compareByDate(a, b) {
        const dateA = convertToDate(a.fecha);
        const dateB = convertToDate(b.fecha);

        if (dateA > dateB) {
            return -1;
        }
        if (dateA < dateB) {
            return 1;
        }
        return 0;
    }

    function convertToDate(dateString) {
        return new Date(dateString);
    }


    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(data)
        toast.success('Copiado al portapapeles')
    }

    const changePriority = (e) => {
        dispatch(setTicketPriority(ticketDetail.t_id, e.target.value)).then(res => {
            if (res) {
                toast.success('Prioridad editada exitosamente')
                setSelectedPriority(e.target.value)
            }
        })
    }

    const changeResponsible = (e) => {
        dispatch(setTicketResponsible(ticketDetail.t_id, e.target.value)).then(res => {
            console.log(res)
            if (res) {
                toast.success('Responsable cambiado exitosamente')
                setSelectedResponsible(e.target.value)
            }
        })
    }

    const changeState = (e) => {
        dispatch(setTicketState(ticketDetail.t_id, e.target.value)).then(res => {
            console.log(res)
            if (res) {
                toast.success('Estado editado exitosamente')
                setSelectedState(e.target.value)
            }
        })
    }

    const handleSendNote = () => {
        if (noteText !== '') {
            if (isNoteHidden) {
                dispatch(sendNewHiddenNote(ticketDetail.t_id, noteText)).then(res => {
                    toast.success(res)
                    setNoteText('')
                    setTempDependencyNewNote(!tempDependencyNewNote)
                })
            }
            else {
                dispatch(sendNewNote(ticketDetail.t_id, noteText)).then(res => {
                    toast.success(res)
                    setNoteText('')
                    setTempDependencyNewNote(!tempDependencyNewNote)
                })
            }
        }
    }

    return (
        <div style={{ maxWidth: '2000px', height: '100vh', margin: ' 0 auto', padding: '25px 25px 25px 25px', backgroundColor: theme.palette.background.background }} >
            <div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Info */}
                    <div>
                        <ButtonTrans variant="text" style={{ borderRadius: '20px' }} >{`Ticket N°: ${ticketDetail.t_id}`}</ButtonTrans>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >{`Producto: ${ticketDetail.t_producto}`}</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >{`Creador: ${ticketDetail.t_creador}`}</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >{`Empresa: ${ticketDetail.t_empresa}`}</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" color="error" style={{ borderRadius: '20px' }} >Contrato: Vencido</Button>
                    </div>
                    {/* Botones */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <ButtonTrans variant="contained">Agregar Horas</ButtonTrans>
                        </div>
                        <div>
                            <ButtonTrans variant="contained" marginLeft>Cargar Archivos</ButtonTrans>
                        </div>
                        <div>
                            <ButtonTrans variant="contained" marginLeft>Editar Ticket</ButtonTrans>
                        </div>
                        <div>
                            <ButtonTrans variant="contained" marginLeft>Soporte</ButtonTrans>
                        </div>
                    </div>
                </div>



                <div style={{ display: 'flex', marginTop: '25px', marginBottom: '25px', justifyContent: 'space-between', height: '70vh' }}>

                    {/* Panel Izquierdo */}
                    <div style={{ width: '65%', backgroundColor: theme.palette.background.main, height: '80vh', borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, display: 'flex', flexDirection: 'column' }}>
                        <div className="messages">
                            <div className='style-1' style={{
                                display: 'flex', overflow: 'auto',
                                flexDirection: 'column-reverse', height: '100%', scrollBehavior: 'smooth'
                            }}>

                                {messages.map((message) => {
                                    if (message.tipo_accion === ticketType.StateChange ||
                                        message.tipo_accion === ticketType.PriorityChange ||
                                        message.tipo_accion === ticketType.Hours ||
                                        message.tipo_accion === ticketType.Asigned) {
                                        let extra = '';
                                        switch (message.tipo_accion) {
                                            case ticketType.StateChange:
                                                extra = findStateByID(message.estado);
                                                break;
                                            case ticketType.PriorityChange:
                                                extra = findPriorityByID(message.prioridad);
                                                break;
                                        }
                                        return (
                                            <UpdatedMessage key={message.action_id} message={message} extra={extra} />
                                        )
                                    }
                                    else if (message.tipo_accion === ticketType.Note ||
                                        message.tipo_accion === ticketType.SecretNote ||
                                        message.tipo_accion === ticketType.Creation
                                    ) {
                                        return (
                                            <NotesMessage key={message.action_id} message={message} />
                                        )
                                    }
                                    else {
                                        // console.log('message', message)
                                    }
                                })}
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ marginBottom: '15px', backgroundColor: theme.palette.background.border, borderRadius: '25px', padding: '5px 15px', marginTop: '15px' }}>Inicio de ticket</div>
                                </div>

                            </div>
                        </div>
                        {/* Input bar */}
                        <div className="input_msg" style={{ marginTop: '10px' }}>
                            <form className="input">
                                <FormControlLabel control={<Checkbox checked={isNoteHidden} onChange={() => { setIsNoteHidden(!isNoteHidden) }} />} labelPlacement="top" label="Oculta" />
                                <TextareaAutosize value={noteText} onChange={(e) => { setNoteText(e.target.value) }} placeholder={isNoteHidden ? "Agrega una nueva nota oculta..." : "Agrega una nueva nota..."} autoFocus style={{ backgroundColor: isNoteHidden ? theme.palette.background.reddishBackground : theme.palette.background.main, color: '#ccc', width: '100%', resize: 'none', borderRadius: '15px', padding: '10px', boxSizing: 'border-box', marginRight: '10px' }} minRows={3} maxRows={8} />
                                <IconButton disabled={noteText === ''} onClick={handleSendNote} aria-label="delete" size="large" color="primary">
                                    <SendIcon />
                                </IconButton>
                                <IconButton aria-label="delete" size="large" color="primary">
                                    <AttachFileIcon />
                                </IconButton>
                            </form>
                        </div>

                    </div>



                    {/* Panel Derecho */}
                    <div style={{ backgroundColor: theme.palette.background.main, height: '80vh', width: '30%', borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between ' }}>
                        {/* Datos */}
                        <div>
                            <h3 style={{ minHeight: '40px', paddingBottom: '10px' }}>
                                {ticketDetail.t_titulo}
                            </h3>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '100px', color: theme.palette.text.tertiary }}>
                                    Prioridad:
                                </div>
                                <div >
                                    <Select variant='standard' onChange={(e) => { changePriority(e) }} value={selectedPriority}>
                                        {priorities.map((priority) => {
                                            return (
                                                <MenuItem key={priority.id} value={priority.id} >
                                                    <div>
                                                        {setPriority(priority.id)}  {priority.prioridad}
                                                    </div>
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </div >
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '100px', color: theme.palette.text.tertiary }}>
                                    Responsable:
                                </div>
                                <div >
                                    <Select fullWidth variant='standard' onChange={(e) => { changeResponsible(e) }} value={selectedResponsible}>
                                        {responsibles.map((responsible) => {
                                            return (
                                                <MenuItem key={responsible.id} value={responsible.id} >
                                                    {responsible.nombre_completo}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </div>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                                <div style={{ width: '100px', color: theme.palette.text.tertiary }}>
                                    Estado:
                                </div>
                                <div>
                                    <Select variant='standard' onChange={(e) => { changeState(e) }} value={selectedState}>
                                        {ticketStates.map((state) => {
                                            return (
                                                <MenuItem key={state.id} value={state.id} >
                                                    {state.estado}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>

                            </div>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', }}>
                                <span style={{ paddingRight: '20px', color: theme.palette.text.tertiary }}>
                                    Descripcion:
                                </span>
                                <div style={{ overflow: 'auto', maxHeight: '30vh' }}>
                                    {ticketDetail.t_descripcion}
                                </div>

                            </div>
                        </div>

                        {/* Contacto */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: theme.palette.background.border, borderRadius: '15px' }}>
                            <div style={{ padding: '10px', margin: '2px', width: '50%' }}>
                                <div className='contactInfo'>
                                    <BusinessIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {ticketDetail.t_empresa}: </div>
                                </div>
                                <div className='contactInfo'>
                                    <LocalPhoneIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    {ticketDetail.t_empresa_telefono ?
                                        <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>{ticketDetail.t_empresa_telefono}</div>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className='contactInfo'>
                                    <MailIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    {ticketDetail.t_empresa_mail ?
                                        <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>{ticketDetail.t_empresa_mail}</div>
                                        :
                                        <></>}
                                </div>
                                <div className='contactInfo'>
                                    <PlaceIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    {ticketDetail.t_empresa_direccion ?
                                        <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>{ticketDetail.t_empresa_direccion}</div>
                                        :
                                        <></>}
                                </div>
                            </div>
                            <div style={{ padding: '10px', margin: '2px', width: '50%' }}>
                                <div className='contactInfo'>
                                    <PersonIcon fontSize='small' style={{ marginRight: '5px' }} /> {ticketDetail.t_creador}:
                                </div>
                                <div className='contactInfo'>
                                    <LocalPhoneIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    {ticketDetail.t_creador_telefono ?
                                        <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>{ticketDetail.t_creador_telefono}</div>
                                        :
                                        <></>
                                    }
                                </div>

                                <div className='contactInfo'>
                                    <MailIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    {ticketDetail.t_creador_mail ?
                                        <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>{ticketDetail.t_creador_mail} </div>
                                        :
                                        <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
