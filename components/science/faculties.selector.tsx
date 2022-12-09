import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {facultyArr, facultyObject, facultySelector } from '../../interfaces/faculties.interface';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import { useAlert } from '../../context/alert.context';
import { motion } from 'framer-motion'
import { Poppins } from '@next/font/google';

const poppins = Poppins({ weight: '500'})

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

export default function FacultiesSelector({ allFaculties, facultyChange }: facultySelector) {

    const { setAlert, setMessage }: any = useAlert() 

    const theme = useTheme();
    const [faculties, setFaculty] = React.useState<string[]>([]);
    const [facultiesData, setFaculties] = React.useState<facultyArr[] | any[]>([])
    const [bestFaculty, setBestFaculty] = React.useState<facultyObject>()

    const [ loading, setLoading ] = React.useState<boolean>(false)

    const handleChange = (event: SelectChangeEvent<typeof faculties>) => {
        event.preventDefault()
        const {target: { value }} = event;
        const values = typeof value === 'string' ? value.split(',') : value

        if (values.length < 6) {
            setFaculty(values);

            const facultyArr: facultyArr[] | any[] = values.map(f => allFaculties.find(el => el._id == f))

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

    React.useEffect(() => {

        const contracts: number[] = facultiesData?.map(el => el.contract_score)
        const findMin = Math.min(...contracts)
        const foundFaculty = facultiesData.find(el => el.contract_score == findMin)
        console.log(foundFaculty)
        setBestFaculty(foundFaculty)
        
    }, [facultiesData])
    
    const handleSubmit = () => {
        setLoading(true)
    }
    
    return (
        <div className='faculties'>

            {
                allFaculties.length && <motion.div className='faculties-selector' initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
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
                            {allFaculties.map(el => (
                                <MenuItem
                                    key={el._id}
                                    value={el._id}
                                    style={getStyles(el.faculty_name, faculties, theme)}
                                >
                                    {el.faculty_name} ({el.hei.short_name})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </motion.div>
            }
            
            {faculties.length > 0 && 
            <div>
                <motion.ol initial={{x: 500, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.2}} className="faculty__list">
                    {
                        facultiesData.map(el =>

                            <motion.li initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 0.5}} className="faculty__item" key={el._id}>
                                <p className={poppins.className}>{el.faculty_name} ({el.hei.short_name})</p>
                                <IconButton onClick={handleCancel} className='cancel' sx={{ color: '#181616' }} data-id={el._id} aria-label="add to shopping cart">
                                    <CloseIcon sx={{ pointerEvents: 'none' }} />
                                </IconButton>
                            </motion.li>

                        )
                    }
                </motion.ol>

                    {
                        facultiesData.length > 0 ?
                        <motion.div initial={{x: 500, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.2}} className="faculty__info">

                            <h3>{bestFaculty?.hei?.hei_name}</h3>
                            <p>{bestFaculty?.hei?.address}</p>

                            <table>
                                {/* <thead>
                                    <tr>
                                        <th></th>
                                        <th>Limit</th>
                                        <th>ball</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <td className='faculty__title'>Grant</td>
                                        <td className='faculty__limit'>{bestFaculty?.grant_limit}</td>
                                        <td className='faculty__score'>{bestFaculty?.grant_score}</td>
                                    </tr>
                                    <tr>
                                        <td className='faculty__title'>Shartnoma</td>
                                        <td className='faculty__limit'>{bestFaculty?.contract_limit}</td>
                                        <td className='faculty__score'>{bestFaculty?.contract_score}</td>
                                    </tr>
                                </tbody>
                            </table>

                            

                        </motion.div>



                        : null
                    }
                
            </div>}
        </div>
    );
}