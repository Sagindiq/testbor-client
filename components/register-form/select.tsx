import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react";
import regions from '../../data/regions.json'

export default function Selector() {

    const [region, setRegion] = useState('');

    const selectorChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    };

    return (
        <>
            <FormControl sx={{ marginBottom: '20px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Viloyat</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Viloyat"
                    variant='standard'
                    onChange={selectorChange}
                >
                    <MenuItem key={'default'} defaultValue="" disabled selected><em>Viloyatni tanlang</em></MenuItem>
                    {
                        regions.map((el, index)=> {
                            return <MenuItem key={index} value={el.value}>{el.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    )
}