import { Alert, AlertTitle } from "@mui/material";
import { NextPage } from "next";
import AlertProps from "../../interfaces/alert.interface";


const AlertError: NextPage<AlertProps> = ({ message }) => {
    
    return (
        <>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        </>
    )
}

export default AlertError;