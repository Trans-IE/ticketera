import React, { useEffect, useState } from "react"
import { useTheme } from "@mui/styles"
import { getFullDateString, getShortDateString } from "../../helpers/dateHelper"
import BoltIcon from '@mui/icons-material/Bolt';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ticketType } from "../../helpers/constants";
import ReplyIcon from '@mui/icons-material/Reply';
import CircleIcon from '@mui/icons-material/Circle';

export const UpdatedMessage = ({ message, extra }) => {
    const theme = useTheme()
    const [icon, setIcon] = useState(<></>)
    const [wording, setWording] = useState('')
    const [userTypeColor, setUserTypeColor] = useState('')

    useEffect(() => {
        setUserTypeColor(message.tipo === 1 ? theme.palette.primary.main : 'lime')

        switch (message.tipo_accion) {
            case ticketType.StateChange:
                setWording(<> cambió el estado a <b>{extra}</b></>)
                setIcon(<BoltIcon fontSize='large' style={{ color: 'yellow' }} />)
                break;
            case ticketType.PriorityChange:
                setWording(<> cambio la prioridad a <b>{extra}</b></>)
                setIcon(<PriorityHighIcon fontSize='large' />)
                break;
            case ticketType.Hours:
                setWording(<> registró <b>{message.horas}</b> horas correspondientes al dia <b>{getShortDateString(message.fecha_accion_hs)}</b></>)
                setIcon(<AccessTimeIcon fontSize='large' style={{ color: 'red' }} />)
                break;
            case ticketType.Asigned:
                setWording(<> reasignó el caso a <CircleIcon style={{ color: theme.palette.primary.main }} sx={{ fontSize: 12 }} /> <b>{message.responsable_nombres}</b></>)
                setIcon(<ReplyIcon fontSize='large' style={{ color: theme.palette.primary.main }} />)
                break;
        }
    }, [])


    return (
        <div key={message.id}
            style={{
                backgroundColor: message.tipo_accion === ticketType.Hours ? theme.palette.background.reddishBackground : theme.palette.background.light,
                border: message.tipo_accion === ticketType.Hours ? '1px solid' : 'none',
                borderColor: theme.palette.background.border,
                borderRadius: '15px',
                margin: '15px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <div>
                {icon}
            </div>
            <div style={{ minHeight: '30px', textAlign: 'center' }}>
                <>
                    <CircleIcon style={{ color: userTypeColor }} sx={{ fontSize: 12 }} />
                    <b>{` ${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b>
                    {wording}
                </>
            </div>
            <div style={{ minHeight: '30px' }}>
                {message.fecha ? getFullDateString(message.fecha) : ''}
            </div>

        </div>
    )
}