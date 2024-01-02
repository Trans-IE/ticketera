import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
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


export const TicketDetail = () => {
    const theme = useTheme()
    const [responsible, setResponsible] = useState('')
    const messages = [
        {
            messageType: 1,
            type: 'Nota oculta',
            author: 'Dragone, Gustavo',
            date: '14/12/2023 17:26',
            body: 'Estimados;  el interno qué debe apuntar es 7082, en el DDI externo.'
        },
        {
            messageType: 2,
            type: 'Nota',
            author: 'Dragone, Gustavo',
            date: '14/12/2023 17:26',
            body: ' Se configuró el DDE 4709-8033 para ser enrutado a la extensión 7082 (árbol de preatención, enlace con España). Previamente fue necesario realizar el relevamiento de configuraciones para obtener la lista de DDEs libres y los detalles de los ruteos posibles. Las pruebas realizadas dieron resultados positivos. De todos modos, se aguarda confirmación para dar por finalizada la tarea.'
        },
        {
            messageType: 3,
            type: 'Accion',
            author: 'Noguera, Alejandro',
            date: '14/12/2023 17:26',
            body: 'Actualizado por cliente'
        },
        {
            messageType: 2,
            type: 'Nota',
            author: 'Noguera, Alejandro',
            date: '14/12/2023 17:26',
            body: 'La numeración 70XX de España corresponde al 3470XX dentro del CM y los 70XX sin el prefijo apuntan hacia el CM 5.2.1 del Call Center.'
        },
        {
            messageType: 3,
            type: 'Accion',
            author: 'Noguera, Alejandro',
            date: '14/12/2023 17:26',
            body: 'Actualizado por cliente'
        },
        {
            messageType: 2,
            type: 'Nota',
            author: 'Noguera, Alejandro',
            date: '14/12/2023 17:26',
            body: 'La numeración 70XX de España corresponde al 3470XX dentro del CM y los 70XX sin el prefijo apuntan hacia el CM 5.2.1 del Call Center.'
        },
    ]


    const messageColor = (messageType) => {
        let icon = <SpeakerNotesIcon style={{ color: 'white' }} />

        if (messageType === 1) {
            icon = <SpeakerNotesOffIcon style={{ color: 'red' }} />
        }
        else if (messageType === 2) {
            icon = <SpeakerNotesIcon style={{ color: theme.palette.primary.main }} />
        }

        console.log(messageType)

        return icon;
    }

    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(data)
        toast.success('Copiado al portapapeles')
    }

    return (
        <div style={{ maxWidth: '1600px', height: '100vh', margin: ' 0 auto', padding: '25px 25px 25px 25px' }} >
            <div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Info */}
                    <div>
                        <ButtonTrans variant="text" style={{ borderRadius: '20px' }} >Ticket N°: 19279</ButtonTrans>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >Producto: Reporting</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >Creador: Palacio, Sergio</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" style={{ borderRadius: '20px' }} >Empresa: PROSEGUR</Button>
                        <span style={{ color: theme.palette.primary.main, margin: '0, 5px' }}>|</span>
                        <Button variant="text" color="error" style={{ borderRadius: '20px' }} >Contrato: Vencido</Button>
                    </div>
                    {/* Botones */}
                    <div>
                        <ButtonTrans variant="contained">Agregar Horas</ButtonTrans>
                        <ButtonTrans variant="contained" marginLeft>Cargar Archivos</ButtonTrans>
                        <ButtonTrans variant="contained" marginLeft>Editar Ticket</ButtonTrans>
                        <ButtonTrans variant="contained" marginLeft>Soporte</ButtonTrans>
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
                                    if (message.messageType === 3) {
                                        return (
                                            <div style={{ backgroundColor: theme.palette.background.light, borderRadius: '15px', margin: '15px', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                <div> </div>
                                                <div style={{ minHeight: '30px', textAlign: 'center' }}>
                                                    <b>{message.author}</b> cambio el estado a <b>{message.body}</b>
                                                </div>
                                                <div>{message.date}
                                                </div>

                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div style={{ backgroundColor: theme.palette.background.dark, borderRadius: '25px', border: '1px solid', borderColor: theme.palette.background.border, margin: '15px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 15px 15px 15px', borderRadius: '25px 25px 0 0' }}>
                                                    <div style={{ paddingRight: '25px', display: 'flex', fontSize: '16px' }}>
                                                        {messageColor(message.messageType)}
                                                        <div style={{ marginLeft: '5px' }}>{message.type} de <b>{message.author}</b></div>
                                                    </div>
                                                    <div style={{ color: '#bbb' }}>{message.date}</div>
                                                </div>
                                                <div style={{ padding: '25px', borderRadius: '0 0 25px 25px' }}>
                                                    {message.body}
                                                </div>
                                            </div>
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
                                <TextareaAutosize placeholder="Agrega una nueva nota..." autoFocus style={{ backgroundColor: theme.palette.background.main, color: '#ccc', width: '100%', resize: 'none', borderRadius: '15px', padding: '10px', boxSizing: 'border-box', marginRight: '10px' }} minRows={3} maxRows={8} />
                                <IconButton aria-label="delete" size="large" color="primary">
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
                                Requemiento - DDI EXTERNO y enrutarlo por la troncal SIP Internacional
                            </h3>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '150px', color: '#bbb' }}>
                                    Prioridad:
                                </div>
                                <div className='selectState' style={{ display: 'flex', alignItems: 'center' }}>
                                    Media  <CircleIcon style={{ color: 'yellow', marginLeft: '5px' }} fontSize='small' />
                                </div>
                            </div >
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '150px', color: '#bbb' }}>
                                    Responsable:
                                </div>
                                <div className='selectState'>
                                    Siciliano, Juan Pablo
                                </div>
                            </div>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                                <div style={{ width: '150px', color: '#bbb' }}>
                                    Estado:
                                </div>
                                <div className='selectState'>
                                    Pendiente de Trans
                                </div>

                            </div>
                            <div style={{ minHeight: '40px', paddingBottom: '10px', }}>
                                <span style={{ paddingRight: '20px', color: '#bbb' }}>
                                    Descripcion:
                                </span>
                                <span>
                                    Estimados;   Requerimos  un DDI  exteno  que no este uso.  Y  enrutarlo a  por la troncal SIP que hay actualmente hacia 4444. (Que esta en España)
                                    Aguardo comentarios.
                                </span>

                            </div>
                        </div>

                        {/* Contacto */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: theme.palette.background.border, borderRadius: '25px' }}>
                            <div style={{ padding: '10px', margin: '2px', width: '50%' }}>
                                <div className='contactInfo'>
                                    <BusinessIcon fontSize='small' style={{ marginRight: '5px' }} />  PROSEGUR:
                                </div>
                                <div className='contactInfo'>
                                    <LocalPhoneIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>3533-8895/3533-8892</div>

                                </div>
                                <div className='contactInfo'>
                                    <PlaceIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>Peru 553, CABA</div>

                                </div>
                                <div className='contactInfo'>
                                    <MailIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>soporte@prosegur.com</div>
                                </div>
                            </div>
                            <div style={{ padding: '10px', margin: '2px', width: '50%' }}>
                                <div className='contactInfo'>
                                    <PersonIcon fontSize='small' style={{ marginRight: '5px' }} /> Noguera, Alejandro:
                                </div>
                                <div className='contactInfo'>
                                    <LocalPhoneIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>11-5726-2888</div>
                                </div>
                                <div className='contactInfo'>
                                    <PlaceIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>Peru 553, CABA</div>
                                </div>
                                <div className='contactInfo'>
                                    <MailIcon fontSize='small' style={{ marginRight: '5px' }} />
                                    <div className='selectState' onClick={(e) => copyToClipboard(e.target.outerText)}>
                                        alejandro.noguera@ext.prosegur.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
