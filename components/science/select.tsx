import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Router } from "next/router";
import React, { useState } from "react";
import { useAlert } from "../../context/alert.context";
import { sciencesInterface } from "../../interfaces/science.interface";
import AlertError from "../alerts/error";
// const sciences = [
//     {
//         id: 1,
//         name: 'Fizika'
//     }
// ]

const ScienceSelector = ({ sciences, handleChange }: sciencesInterface) => {

    const { setAlert, setMessage }: any = useAlert()

    const [firstScience, setFirstScience] = useState('');
    const [secondScience, setSecondScience] = useState('');

    const handleFirst = (event: SelectChangeEvent) => {
        event.preventDefault()
        
        if(event.target.value == secondScience) {
            setAlert('error')
            setMessage('Bitta fanni ikki marta tanlash mumkin emas');
            return
        }

        setFirstScience(event.target.value as string);

        if (secondScience) {
            return handleChange(event.target.value, secondScience)
        }

    };

    const handleSecond = (event: SelectChangeEvent) => {
        event.preventDefault()
        
        if (firstScience == event.target.value) {
            setAlert('error')
            setMessage('Bitta fanni ikki marta tanlash mumkin emas')
            return
        }
        
        setSecondScience(event.target.value as string);

        if (firstScience) {
            return handleChange(firstScience, event.target.value)
        }

    };

    return (
        <div className="science__selector">
            <FormControl sx={{ marginBottom: '30px', width: '400px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Birinchi fan</InputLabel>
                <Select sx={{borderRadius: '15px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={firstScience}
                    label="Birinchi fan"
                    onChange={handleFirst}
                >
                    <MenuItem key={'default'} defaultValue="" disabled selected><em>Birinchi fanni tanlang</em></MenuItem>
                    {
                        sciences.map((el, index) => {
                            return <MenuItem key={index} value={el._id}>{el.science_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ width: '400px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Ikkinchi fan</InputLabel>
                <Select sx={{borderRadius: '15px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={secondScience}
                    label="Ikkinchi fan"
                    onChange={handleSecond}
                >
                    <MenuItem key={'default'} defaultValue="" disabled selected><em>Ikkinchi fanni tanlang</em></MenuItem>
                    {
                        sciences.map((el, index) => {
                            return <MenuItem key={index} value={el._id}>{el.science_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default ScienceSelector;