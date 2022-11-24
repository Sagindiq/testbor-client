import { Alert, AlertTitle } from "@mui/material";
import { NextPage } from "next";
import AlertProps from "../../interfaces/alert.interface";


const AlertInfo: NextPage<AlertProps> = ({ message }) => {

    return (
        <>
            <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                {message}
            </Alert>
        </>
    )
}

export default AlertInfo;