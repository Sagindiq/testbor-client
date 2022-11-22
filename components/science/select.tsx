import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react";
const sciences = [
    {
        id: 1,
        name: 'Fizika'
    }
]

export default function ScienceSelector() {

    const [region, setRegion] = useState('');

    const handleFirst = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    };

    const handleSecond = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    };

    return (
        <div className="science__selector">
            <FormControl sx={{ marginBottom: '30px', width: '400px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Birinchi fan</InputLabel>
                <Select sx={{borderRadius: '15px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Birinchi fan"
                    onChange={handleFirst}
                >
                    <MenuItem key={'default'} defaultValue="" disabled selected><em>Birinchi fanni tanlang</em></MenuItem>
                    {
                        sciences.map((el, index) => {
                            return <MenuItem key={index} value={el.id}>{el.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ width: '400px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Ikkinchi fan</InputLabel>
                <Select sx={{borderRadius: '15px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Ikkinchi fan"
                    onChange={handleSecond}
                >
                    <MenuItem key={'default'} defaultValue="" disabled selected><em>Ikkinchi fanni tanlang</em></MenuItem>
                    {
                        sciences.map((el, index) => {
                            return <MenuItem key={index} value={el.id}>{el.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}