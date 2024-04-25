import React, { useEffect, useState } from "react"
import { getFullDateString } from "../../helpers/dateHelper"
import { useTheme } from "@mui/styles"
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { ticketType } from "../../helpers/constants";
import CircleIcon from '@mui/icons-material/Circle';

export const NotesMessage = ({ message }) => {
    const theme = useTheme()
    const [icon, setIcon] = useState(<SpeakerNotesIcon style={{ color: 'white' }} />)
    const [wording, setWording] = useState('')
    const [userTypeColor, setUserTypeColor] = useState('')

    useEffect(() => {
        setUserTypeColor(message.tipo === 1 ? theme.palette.primary.main : 'lime')

        switch (message.tipo_accion) {
            case ticketType.Note:
                setIcon(<SpeakerNotesIcon style={{ color: theme.palette.primary.main }} />);
                setWording('Nota')
                break;
            case ticketType.SecretNote:
                setIcon(<SpeakerNotesOffIcon style={{ color: 'red' }} />)
                setWording('Nota oculta')
                break
            case ticketType.Creation:
                setWording('Informacion de creacion del ticket')
                break
        }

    }, [])

    return (
        <div key={message.id} style={{ backgroundColor: message.tipo_accion !== 7 ? theme.palette.background.dark : theme.palette.background.reddishBackground, borderRadius: '25px', border: '1px solid', borderColor: theme.palette.background.border, margin: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 15px 15px 15px', borderRadius: '25px 25px 0 0' }}>
                <div style={{ paddingRight: '25px', display: 'flex', fontSize: '16px' }}>
                    {icon}
                    <div style={{ marginLeft: '5px' }}> {wording} de   <CircleIcon style={{ color: userTypeColor }} sx={{ fontSize: 12, marginLeft: '10px' }} /> <b>{`${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b></div>
                </div>
                <div style={{ color: theme.palette.text.tertiary }}>{message.fecha ? getFullDateString(message.fecha) : ''}</div>
            </div>
            <div style={{ padding: '25px', borderRadius: '0 0 25px 25px' }}>
                {message.notas}
            </div>
        </div>
    )
}