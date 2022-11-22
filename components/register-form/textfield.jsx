import { TextField } from "@mui/material";

export default function RegisterInput() {

    return (
        <>
            <TextField sx={{ marginBottom: '10px' }} id="standard-basic" label="Full name" variant="standard" />
            <TextField sx={{ marginBottom: '10px' }} id="standard-basic" label="Email or phone" variant="standard" />
            <TextField sx={{ marginBottom: '15px' }} id="standard-basic" label="Username" variant="standard" />
        </>
    )
}