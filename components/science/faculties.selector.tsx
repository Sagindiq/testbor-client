// import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
// import { useState } from "react"

// export default function FacultiesSelector() {

    // const faculties = [
    //     {
    //         _id: 1,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 2,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 3,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 4,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 5,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 6,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 7,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     },
    //     {
    //         _id: 8,
    //         faculty_name: 'Amaliy matematika',
    //         hei_name: 'Milliy universitet',
    //         hei_short_name: `O'zMu`
    //     }
    // ]

//     const selectedFaculties: string[] = []

//     const [facultyies, setFaculty] = useState<string[]>(selectedFaculties)

    
//     const handleFaculty = (evt: SelectChangeEvent) => {
//         selectedFaculties.push()

//         setFaculty(selectedFaculties)

//     }

//     return (
//         <>
//             <div className="faculties">

//                 <FormControl sx={{ marginBottom: '30px', width: '400px' }} fullWidth>
//                     <InputLabel id="demo-simple-select-label">Birinchi fan</InputLabel>
//                     <Select sx={{ borderRadius: '15px' }}
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         multiple
//                         value={facultyies}
//                         label="Birinchi fan"
//                         onChange={handleFaculty}
//                     >
//                         <MenuItem key={'default'} defaultValue="" disabled selected><em>Birinchi fanni tanlang</em></MenuItem>
//                         {
//                             faculties.map((el, index) => {
//                                 return <MenuItem key={index} value={el._id}>{el.faculty_name}</MenuItem>
//                             })
//                         }
//                     </Select>
//                 </FormControl>

//             </div>
//         </>
//     )
// }

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {facultyArr, facultySelector } from '../../interfaces/faculties.interface';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Router from 'next/router';
import { useAlert } from '../../context/alert.context';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, faculties: string[], theme: Theme) {
    return {
        fontWeight:
            faculties.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function FacultiesSelector({ facultiesArr, facultyChange }: facultySelector) {

    const { setAlert, setMessage }: any = useAlert()

    const theme = useTheme();
    const [faculties, setFaculty] = React.useState<string[]>([]);
    const [facultiesData, setFaculties] = React.useState<facultyArr[] | any[]>([])

    const handleChange = (event: SelectChangeEvent<typeof faculties>) => {
        event.preventDefault()
        const {target: { value }} = event;
        const values = typeof value === 'string' ? value.split(',') : value

        if (values.length < 6) {
            setFaculty(values);

            const facultyArr: facultyArr[] | any[] = values.map(f => {
                const faculty = +f
                return facultiesArr.find(el => el._id == faculty)
            })

            setFaculties(facultyArr)

            facultyChange(facultyArr)
        } else {
            setAlert('warning')
            setMessage('5 ta dan ortiq fakultet tanlash mumkin emas!')
        }
    };

    const handleCancel = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const button: HTMLButtonElement = event.currentTarget;
        const id: number = Number(button.dataset?.id)

        const facultyIndex: number = faculties.findIndex(el => {
            const fid = +el
            return fid == id
        });

        const facultyDataIndex = facultiesData.findIndex(el => el._id == id)

        faculties.splice(facultyIndex, 1)
        facultiesData.splice(facultyDataIndex, 1)
        setFaculty(faculties)
        setFaculties(facultiesData)

        facultyChange(facultiesData)

        Router.push({pathname: '/exam'})
        return
    }

    
    return (
        <div className='faculties'>

            <div className='faculties-selector'>
                <FormControl sx={{ m: 1, width: '400px' }}>
                    <InputLabel id="demo-multiple-name-label">Fakultetlar</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={faculties}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                    >
                        {facultiesArr.map(el => (
                            <MenuItem
                                key={el._id}
                                value={el._id}
                                style={getStyles(el.faculty_name, faculties, theme)}
                            >
                                {el.faculty_name} ({el.hei_short_name})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>
            {faculties.length > 0 && <ol className="faculty__list">
                    {
                        facultiesData.map(el => 
                        
                            <li className="faculty__item" key={el._id}>
                                <p>{el.faculty_name} ({el.hei_short_name})</p>
                                <IconButton onClick={handleCancel} className='cancel' sx={{ color: '#181616' }} data-id={el._id} aria-label="add to shopping cart">
                                    <CloseIcon sx={{ pointerEvents: 'none' }} />
                                </IconButton>
                            </li>
                        
                        )
                    }
                </ol>}
        </div>
    );
}