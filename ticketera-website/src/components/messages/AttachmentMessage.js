import React, { useEffect } from "react"
import { getFullDateString } from "../../helpers/dateHelper"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDispatch } from "react-redux";
import { getFile } from "../../redux/actions/ticketActions";
import { useTheme } from "@mui/material";
import { ButtonTrans } from "../ui/ButtonTrans";

export const AttachmentMessage = ({ message }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(message)
    }, [])

    const getFileName = (filename) => {
        let name = filename.split('/').pop()
        if (name.indexOf('\\') > -1) {
            name = name.split('\\').pop()
        }
        return name
    }

    const downloadFile = () => {
        dispatch(getFile(message.archivo, message.ticket_id)).then(res => {
            const byteNumbers = res.data.data || res.data.data;
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: res.MIMEType });


            // Create a link element
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const name = getFileName(res.filename)

            // Set the file name
            a.download = name;
            document.body.appendChild(a);

            // Trigger the download
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
    }

    return (
        <div key={message.id}
            style={{
                backgroundColor: theme.palette.background.light,
                borderRadius: '15px',
                margin: '15px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
            <div>
                <AttachFileIcon fontSize='large' style={{ color: theme.palette.primary.main }} />
            </div>
            <div style={{ minHeight: '30px', textAlign: 'center' }}>
                <ButtonTrans variant="text" style={{ borderRadius: '20px' }} onClick={downloadFile}>{`Descargar archivo: ${getFileName(message.archivo)}`}</ButtonTrans> de <b>{` ${message.usuarios_apellido}, ${message.usuarios_nombres}`}</b>

            </div>
            <div style={{ minHeight: '30px' }}>
                {message.fecha ? getFullDateString(message.fecha) : ''}
            </div>

        </div>
    )
}