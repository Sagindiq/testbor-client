import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";


export default function Gender() {

    return (
        <>
            <FormControl sx={{ marginBottom: '5px' }}>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="male" control={<Radio />} label="Erkak" />
                    <FormControlLabel value="female" control={<Radio />} label="Ayol" />
                </RadioGroup>
            </FormControl>
        </>
    )
}