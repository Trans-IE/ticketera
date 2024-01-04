import React from "react"
import { useTheme } from "@mui/styles"

export const NewTicketScreen = () => {
    const theme = useTheme();
    return (
        <div style={{ backgroundColor: theme.palette.background.main, borderRadius: '20px', border: '1px solid', borderColor: theme.palette.background.border, padding: '10px', minHeight: '85vh' }}>
            Hello
        </div>
    )
}