import { Alert, AlertTitle } from "@mui/material";
import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

interface AlertInterface {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setAlert: React.Dispatch<React.SetStateAction<string>>
}

export const AlertContext = createContext<AlertInterface | null>(null);

const AlertProvider = ({ children }: PropsWithChildren) => {

    const alertRef = useRef<HTMLDivElement>(null)

    const [ message, setMessage ] = useState('')
    const [ alert, setAlert ] = useState('')

    useEffect(() => {
        setTimeout(() => {
            alertRef.current?.classList.add('alert--disable')
        }, 3000);

        setTimeout(() => {
            setAlert('')
            setMessage('')
        }, 4000);
    }, [alert])
    

    return (
        <AlertContext.Provider value={{ setMessage, setAlert }}>
            {children}

            {
                alert == 'error' ? <>
                    <Alert className="alert" ref={alertRef} severity='error'>
                        <AlertTitle>Xato!</AlertTitle>
                        {message}
                    </Alert>
                </>
                :
                alert == 'info' ? <>
                    <Alert className="alert" ref={alertRef} severity='info'>
                        <AlertTitle>Malumot!</AlertTitle>
                        {message}
                    </Alert>
                </>
                :
                alert == 'warning' ? <>
                    <Alert className="alert" ref={alertRef} severity='warning'>
                        <AlertTitle>Ogohlantirish!</AlertTitle>
                        {message}
                    </Alert>
                </>
                :
                alert == 'success' && <>
                    <Alert className="alert" ref={alertRef} severity='success'>
                        <AlertTitle>Muvaffaqiyatli!</AlertTitle>
                        {message}
                    </Alert>
                </>
            }
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext);
}

export default AlertProvider;