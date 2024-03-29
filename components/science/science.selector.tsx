import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React, { useState } from "react";
import { examInterface } from "../../interfaces/science.interface";
import { motion } from 'framer-motion'
import { Poppins } from "@next/font/google";
import { toast } from "react-toastify";

const poppins = Poppins({ weight: '500'})

const ScienceSelector = ({ sciences, handleChange }: examInterface) => {

    const [firstScience, setFirstScience] = useState('');
    const [secondScience, setSecondScience] = useState('');

    const handleFirst = (event: SelectChangeEvent) => {
        event.preventDefault()
        
        if(event.target.value == secondScience) {
            toast.error('Bitta fanni ikki marta tanlash mumkin emas')
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
            toast.error('Bitta fanni ikki marta tanlash mumkin emas')
            return
        }
        
        setSecondScience(event.target.value as string);

        if (firstScience) {
            return handleChange(firstScience, event.target.value)
        }

    };

    return (
        <div className="science__selector">
            
            <motion.div className="science__selector-box" initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.2}} >

                <h2 className={`science__selector-title ${poppins.className}`}>Birinchi fan</h2>

                <FormControl sx={{ marginBottom: '30px', width: '400px' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Blok 1</InputLabel>
                    <Select sx={{ borderRadius: '15px' }}
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
                
            </motion.div>

            <motion.div className="science__selector-box" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.3 }} >

                <h2 className={`science__selector-title ${poppins.className}`}>Ikkinchi fan</h2>

                <FormControl sx={{ width: '400px' }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Blok 2</InputLabel>
                    <Select sx={{ borderRadius: '15px' }}
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

            </motion.div>
            
        </div>
    )
}

export default ScienceSelector;