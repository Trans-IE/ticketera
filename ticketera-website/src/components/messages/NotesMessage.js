import React, { useEffect, useState } from "react"
import { getFullDateString } from "../../helpers/dateHelper"
import { useTheme } from "@mui/material/styles"
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { ticketType } from "../../helpers/constants";

export const NotesMessage = ({ message }) => {
    const theme = useTheme()
    const [icon, setIcon] = useState(<SpeakerNotesIcon style={{ color: 'white' }} />)
    const [wording, setWording] = useState('')

    useEffect(() => {
        let color = message.tipo === 1 ? theme.palette.primary.main : 'lime'

        switch (message.tipo_accion) {
            case ticketType.Note:
                setIcon(<SpeakerNotesIcon style={{ color: color }} />);
                setWording(<div style={{ marginLeft: '5px' }}> Nota de <b>{`${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b></div>)
                break;
            case ticketType.SecretNote:
                setIcon(<SpeakerNotesOffIcon style={{ color: 'red' }} />)
                setWording(<div style={{ marginLeft: '5px' }}> Nota oculta de <b>{`${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b></div>)
                break
            case ticketType.Creation:
                setIcon(<SpeakerNotesIcon style={{ color: color }} />);
                setWording(<div style={{ marginLeft: '5px' }}><b>{`${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b> creó un ticket</div>)
                break
        }

    }, [])

    return (
        <div
            key={message.id}
            style={{ backgroundColor: message.tipo_accion !== 7 ? theme.palette.background.dark : theme.palette.background.reddishBackground, borderRadius: '25px', border: '1px solid', borderColor: theme.palette.background.border, margin: '15px', marginLeft: message.tipo === 1 ? '150px' : '15px', marginRight: message.tipo !== 1 ? '150px' : '15px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 15px 15px 15px', borderRadius: '25px 25px 0 0' }}>
                <div style={{ paddingRight: '25px', display: 'flex', fontSize: '16px' }}>
                    {icon}
                    {wording}
                </div>
                <div style={{ color: theme.palette.text.tertiary }}>{message.fecha ? getFullDateString(message.fecha) : ''}</div>
            </div>
            <div style={{ padding: '25px', borderRadius: '0 0 25px 25px' }}>
                {message.notas}
            </div>
        </div>
    )
}