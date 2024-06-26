import { Box, Button, Checkbox, Fab, FormControlLabel, IconButton, MenuItem, Modal, Select, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
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
import { useTheme } from '@mui/material/styles';
import { ButtonTrans } from '../../ui/ButtonTrans';
import { toast } from "sonner";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllTicketStates, getTicketDetail, getTicketMessages, getTicketStatesByTicketId, getTotalHours, sendNewHiddenNote, sendNewNote, uploadFiles } from '../../../redux/actions/ticketActions';
import { NOTIFICATION_EVENTS, PAYLOAD_TYPES, TICKETS_ROOMS_PREFIX, ticketType, userType } from '../../../helpers/constants';
import { NotesMessage } from '../../messages/NotesMessage';
import { UpdatedMessage } from '../../messages/UpdatedMessage';
import { getAllTicketPriorities, setTicketPriority } from '../../../redux/actions/priorityActions';
import { getAllAreas, getAllResponsibles, getResponsiblesByArea, getResponsiblesByCompany, setTicketResponsible } from '../../../redux/actions/responsibleActions';
import { setTicketState } from '../../../redux/actions/stateActions';
import WorkingHoursModal from '../WorkingHoursModal/WorkingHoursModal';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ProjectsDrawer from '../ProjectsDrawer/ProjectsDrawer';
import { SocketContext } from '../../../context/SocketContext';
import { ticketActionsDataAddNewRedux, ticketActionsDataLoadedRedux } from '../../../redux/slices/ticketSlice';
import { AttachmentMessage } from '../../messages/AttachmentMessage';

export const TicketDetail = ({ ticketID }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth, shallowEqual);
    const { ticketActionsDataList } = useSelector(state => state.ticket, shallowEqual);

    const [isLoading, setIsLoading] = useState(true)
    const [ticketDetail, setTicketDetail] = useState({})
    const { online, socket } = useContext(SocketContext);

    const [ticketStates, setTicketStates] = useState([])
    const [states, setStates] = useState([])
    const [responsibles, setResponsibles] = useState([])
    const [priorities, setPriorities] = useState([])
    const [areas, setAreas] = useState([])

    const [isNoteHidden, setIsNoteHidden] = useState(false)
    const [noteText, setNoteText] = useState('')

    const [selectedArea, setSelectedArea] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')
    const [selectedResponsible, setSelectedResponsible] = useState('')
    const [selectedState, setSelectedState] = useState('')

    const [isWorkingHoursModalOpen, setIsWorkingHoursModalOpen] = useState(false)
    const [loadedTotalHours, setLoadedTotalHours] = useState()
    const [isProyectDrawerOpen, setIsProyectDrawerOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
    }, [ticketID])

    useEffect(() => {
        dispatch(getTotalHours(ticketID)).then(res => {
            setLoadedTotalHours(res[0])
        })
        dispatch(getAllAreas()).then(res => {
            setAreas(res)
        })
    }, [])

    useEffect(() => {
        if (selectedArea) {
            dispatch(getResponsiblesByArea(selectedArea)).then(res => {
                console.log('rererer', res)
                setResponsibles(res)
            })
        }
    }, [selectedArea])


    useEffect(() => {
        let prefix = user.tipo === userType.host ? TICKETS_ROOMS_PREFIX.EMPRESA : TICKETS_ROOMS_PREFIX.CLIENTE;


        socket?.on(PAYLOAD_TYPES.TICKET_NOTE_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
            console.log('objCallBack llego', objCallback)
        });

        socket?.on(PAYLOAD_TYPES.TICKET_STATE_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.on(PAYLOAD_TYPES.TICKET_PRIORITY_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.on(PAYLOAD_TYPES.TICKET_RESPONSIBLE_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.on(PAYLOAD_TYPES.TICKET_HIDDEN_NOTE_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.on(PAYLOAD_TYPES.TICKET_HOURS_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.on(PAYLOAD_TYPES.TICKET_PROJECTED_HOURS_ADD, (objCallback) => {
            dispatch(ticketActionsDataAddNewRedux(objCallback.data.result))
        });

        socket?.emit(NOTIFICATION_EVENTS.JOIN, prefix + ticketID);
        console.log(`Unido a sala: ${prefix + ticketID}`)

        return () => {
            socket?.off(PAYLOAD_TYPES.TICKET_NOTE_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_HIDDEN_NOTE_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_HOURS_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_PROJECTED_HOURS_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_STATE_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_PRIORITY_ADD);
            socket?.off(PAYLOAD_TYPES.TICKET_RESPONSIBLE_ADD);
            socket?.emit(NOTIFICATION_EVENTS.LEAVE, ticketID);
        }
    }, [socket])


    useEffect(() => {
        setIsLoading(true)
        let isCancelled = false;

        if (online) {

            console.log('socket en tickets conectado');
            if (!isCancelled) {
                dispatch(getTicketDetail(ticketID)).then(res => {
                    if (res.ok) {
                        console.log('EL DETALLE', res.value[0])
                        setTicketDetail(res.value[0])

                        setSelectedPriority(res.value[0]?.t_prioridadid)
                        setSelectedState(res.value[0]?.t_estado)
                        setSelectedResponsible(res.value[0]?.t_responsable_id)
                        setSelectedArea(res.value[0]?.area_id)
                        setIsLoading(false)
                    }
                })

                dispatch(getTicketStatesByTicketId(ticketID)).then(res => {
                    if (res.ok) {
                        setTicketStates(res.value)
                    }
                })

                dispatch(getAllTicketStates()).then(res => {
                    if (res.ok) {
                        setStates(res.value)
                    }
                })

                dispatch(getResponsiblesByCompany(3, 1)).then(res => {
                    setResponsibles(res)
                })

                dispatch(getAllTicketPriorities()).then(res => {
                    if (res.ok) {
                        setPriorities(res.value)
                    }
                })

                dispatch(getTicketMessages(ticketID))

            }

        } else {
            console.log('socket en tickets desconectado');
        }
        return () => {
            isCancelled = true
        }
    }, [online])



    const findStateByID = (id) => {
        const state = states?.find(obj => obj.id === id);
        return state?.estado || ''
    }

    const findPriorityByID = (id) => {
        let priority = priorities?.find(obj => obj.id === id);
        return priority?.prioridad || ''
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

    const formatTotalHours = (hour, minute) => {
        let hours = isNaN(hour) ? 0 : hour;
        let minutes = isNaN(minute) ? 0 : minute;

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    const getTotalHoursString = () => {
        let regularHours = '';
        let extraHours = '';

        if (loadedTotalHours?.total_hours_horas_extras) {
            extraHours = <span style={{ color: 'red' }}>{formatTotalHours(loadedTotalHours.total_hours_horas_extras.hours, loadedTotalHours.total_hours_horas_extras.minutes)}</span>
        }
        if (loadedTotalHours?.total_hours_tickets_acciones) {
            regularHours = <span style={{ color: 'green' }}>{formatTotalHours(loadedTotalHours.total_hours_tickets_acciones.hours, loadedTotalHours.total_hours_tickets_acciones.minutes)}</span>
        }

        if (regularHours !== '' || extraHours !== '') {
            return <>{regularHours} comunes{extraHours !== '' && regularHours !== '' && ' - '}{extraHours} projectadas</>
        }
        else {
            return ''
        }
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
            if (res) {
                toast.success('Responsable cambiado exitosamente')
                setSelectedResponsible(e.target.value)
            }
        })
    }

    const changeState = (e) => {
        dispatch(setTicketState(ticketDetail.t_id, e.target.value)).then(res => {
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
                })
            }
            else {
                dispatch(sendNewNote(ticketDetail.t_id, noteText)).then(res => {
                    toast.success(res)
                    setNoteText('')
                })
            }
        }
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];
        dispatch(uploadFiles(file, ticketID)).then(() => {
            toast.success('Archivo subido exitosamente')
        })
    };

    return (
        <div style={{ height: '100%' }}>
            {((!isLoading && ticketDetail.t_padre && ticketDetail.t_padre > 1) || (!isLoading && ticketDetail.t_esproject === '1')) ?
                <>
                    <Fab color="primary" style={{ position: 'fixed', left: '75px', top: '75px' }} onClick={() => { setIsProyectDrawerOpen(true) }}>
                        <AccountTreeIcon />
                    </Fab>
                    <div className={`overlay ${isProyectDrawerOpen ? 'show' : ''}`} onClick={() => { setIsProyectDrawerOpen(false) }}></div>
                    <div className={`projectDrawer ${isProyectDrawerOpen ? 'open' : ''}`} style={{ backgroundColor: theme.palette.background.main }}>
                        <ProjectsDrawer ticketId={ticketID} handleCloseDrawer={() => { setIsProyectDrawerOpen(false) }} />
                    </div>
                </> :
                <></>}
            {!isLoading ?
                <div style={{ maxWidth: '90%', height: '100%', margin: ' 0 auto', padding: '25px 25px 25px 25px', backgroundColor: theme.palette.background.background }} >
                    <div>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', maxHeight: '33px', flexWrap: 'no-wrap' }}>
                            {/* Info */}
                            <div style={{ display: 'flex', flexWrap: 'no-wrap', alignItems: 'center' }}>
                                <ButtonTrans variant="text" style={{ borderRadius: '20px' }} >{`Ticket N°: ${ticketDetail.t_id}`}</ButtonTrans>
                                <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                                <Button variant="text" style={{ borderRadius: '20px' }} >{`Producto: ${ticketDetail.t_producto}`}</Button>
                                <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                                <Button variant="text" style={{ borderRadius: '20px' }} >{`Creador: ${ticketDetail.t_creador}`}</Button>
                                <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                                <Button variant="text" style={{ borderRadius: '20px' }} >{`Empresa: ${ticketDetail.t_empresa}`}</Button>
                                {/* <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span> */}
                                {/* <Button variant="text" color="error" style={{ borderRadius: '20px' }} >Contrato: Vencido</Button> */}
                            </div>
                            {/* Botones */}
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                {user.tipo === 1 &&
                                    <div>
                                        <ButtonTrans
                                            style={{ whiteSpace: 'nowrap' }}
                                            variant="contained"
                                            onClick={() => setIsWorkingHoursModalOpen(true)}
                                        >
                                            Agregar Horas
                                        </ButtonTrans>
                                    </div>
                                }

                                <Modal
                                    BackdropProps={{
                                        onClick: (event) => event.stopPropagation(), // Prevent closing on backdrop click
                                    }}
                                    open={isWorkingHoursModalOpen}
                                    onClose={() => { setIsWorkingHoursModalOpen(false) }}
                                >
                                    <WorkingHoursModal ticketId={ticketID} closeModal={() => setIsWorkingHoursModalOpen(false)} />
                                </Modal>
                                <div>
                                    <ButtonTrans style={{ whiteSpace: 'nowrap' }} variant="contained" marginLeft>Ver Archivos</ButtonTrans>
                                </div>
                                <div>
                                    <ButtonTrans disabled style={{ whiteSpace: 'nowrap' }} variant="contained" marginLeft>Editar Ticket</ButtonTrans>
                                </div>
                                <div>
                                    <ButtonTrans disabled style={{ whiteSpace: 'nowrap' }} variant="contained" marginLeft>Soporte</ButtonTrans>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '25px', marginBottom: '25px', justifyContent: 'space-between', height: 'calc(90vh - 117px)' }}>

                            {/* Panel Izquierdo */}
                            <div style={{ width: '65%', backgroundColor: theme.palette.background.main, height: '100%', borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, display: 'flex', flexDirection: 'column' }}>
                                <div className="messages">
                                    <div className='style-1' style={{
                                        display: 'flex', overflow: 'auto',
                                        flexDirection: 'column-reverse', height: '100%', scrollBehavior: 'smooth'
                                    }}>

                                        {ticketActionsDataList.map((message) => {
                                            if (message.tipo_accion === ticketType.StateChange ||
                                                message.tipo_accion === ticketType.PriorityChange ||
                                                message.tipo_accion === ticketType.Hours ||
                                                message.tipo_accion === ticketType.Asigned) {
                                                let extra = '';
                                                switch (message.tipo_accion) {
                                                    case ticketType.StateChange:
                                                        if (message.estado) {
                                                            extra = findStateByID(message?.estado);

                                                        }
                                                        break;
                                                    case ticketType.PriorityChange:
                                                        if (message.prioridad) {
                                                            extra = findPriorityByID(message.prioridad);
                                                        }
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
                                            else if (message.tipo_accion === ticketType.Attatchment) {
                                                return (
                                                    <AttachmentMessage key={message.action_id} message={message} />
                                                )
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
                                        {user.tipo === 1 &&
                                            <FormControlLabel
                                                control={<Checkbox checked={isNoteHidden}
                                                    style={{ color: theme.palette.text.primary }}
                                                    onChange={() => { setIsNoteHidden(!isNoteHidden) }} />}
                                                labelPlacement="top"
                                                label="Oculta"
                                            />
                                        }
                                        <TextareaAutosize
                                            value={noteText}
                                            className='messageBox'
                                            onChange={(e) => { setNoteText(e.target.value) }}
                                            placeholder={isNoteHidden ? "Agrega una nueva nota oculta..." : "Agrega una nueva nota..."}
                                            autoFocus
                                            style={{ backgroundColor: isNoteHidden ? theme.palette.background.reddishBackground : theme.palette.background.main, color: theme.palette.text.primary }}
                                            minRows={3}
                                            maxRows={8} />
                                        <Tooltip title='Enviar'>
                                            <span>
                                                <IconButton disabled={noteText === ''} onClick={handleSendNote} size="large" color="primary">
                                                    <SendIcon />
                                                </IconButton>
                                            </span>

                                        </Tooltip>
                                        <Tooltip title='Cargar archivos'>
                                            <>
                                                <label htmlFor="file-upload">
                                                    <IconButton size="large" color="primary" component="span">
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx" // You can specify the file types you want to accept
                                                    style={{ display: "none" }}
                                                    onChange={handleUpload}
                                                />
                                            </>

                                        </Tooltip>
                                    </form>
                                </div>

                            </div>



                            {/* Panel Derecho */}
                            <div style={{ backgroundColor: theme.palette.background.main, height: '100%', width: '30%', borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between ' }}>
                                {/* Datos */}
                                <div>
                                    <h3 style={{ minHeight: '40px', paddingBottom: '10px' }}>
                                        {ticketDetail.t_titulo}
                                    </h3>
                                    <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '100px', color: theme.palette.text.tertiary }}>
                                            Prioridad:
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Select disabled={user.tipo !== 1} fullWidth variant='standard' onChange={(e) => { changePriority(e) }} value={selectedPriority}>
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
                                        <div style={{ width: '50%' }}>
                                            {selectedResponsible ?
                                                <Select disabled={user.tipo !== 1} fullWidth variant='standard' onChange={(e) => { changeResponsible(e) }} value={selectedResponsible}>
                                                    {responsibles.map((responsible) => {
                                                        return (
                                                            <MenuItem key={responsible.id} value={responsible.id} >
                                                                {responsible.nombre_completo}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                                :
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <Select disabled={user.tipo !== 1} fullWidth variant='standard' onChange={(e) => { setSelectedArea(e.target.value) }} value={selectedArea}>
                                                        {areas.map((area) => {
                                                            return (
                                                                <MenuItem key={area.id} value={area.id} >
                                                                    {area.nombre}
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                    <Select disabled={user.tipo !== 1 || !selectedArea} fullWidth variant='standard' onChange={(e) => { changeResponsible(e) }} value={selectedResponsible}>
                                                        {responsibles.map((responsible) => {
                                                            return (
                                                                <MenuItem key={responsible.id} value={responsible.id} >
                                                                    {responsible.nombre_completo}
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                    <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                                        <div style={{ width: '100px', color: theme.palette.text.tertiary }}>
                                            Estado:
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <Select disabled={user.tipo !== 1} fullWidth variant='standard' onChange={(e) => { changeState(e) }} value={selectedState}>
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
                                        <span style={{ paddingRight: '20px' }}>
                                            <span style={{ paddingRight: '15px', color: theme.palette.text.tertiary }}>Horas:</span>
                                            <span>{getTotalHoursString()}</span>
                                        </span>
                                    </div>
                                    <div style={{ minHeight: '40px', paddingBottom: '10px', }}>
                                        <span style={{ paddingRight: '20px', color: theme.palette.text.tertiary }}>
                                            Descripción:
                                        </span>
                                        <div style={{ overflow: 'auto', maxHeight: '30vh' }}>
                                            {ticketDetail.t_descripcion}
                                        </div>
                                    </div>
                                </div>

                                {/* Contacto */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: theme.palette.background.border, borderRadius: '15px', overflowY: 'auto', overflowX: 'hidden' }}>
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
                :
                <></>
            }
        </div>

    )
}
