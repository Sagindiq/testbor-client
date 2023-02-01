import { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { testInterface } from "../interfaces/test.initerface";
import { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/header";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const Test = () => {
    const [ tests, setTests ] = useState([] as testInterface[])
    const [ secondTests, setSecondTests ] = useState([] as testInterface[])
    
    useEffect(() => {
        
        const first_science = window.localStorage.getItem('first_science')
        const second_science = window.localStorage.getItem('second_science')

        axios.get('http://localhost:9000/tests', {
            headers: {
                science_id: first_science,
            }
        }).then(res => {
            setTests(res.data)
        })

        axios.get('http://localhost:9000/tests', {
            headers: {
                science_id: second_science
            }
        }).then(res => {
            setSecondTests(res.data)
        })
    }, [])

    const [selectedOptions, setOptions] = useState([] as string[]);
    const [secondSelectedOptions, setSecondOptions] = useState([] as string[]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index: string | any = event.target.ariaColIndex
    selectedOptions[index] = event.target.value
    setOptions(selectedOptions)
    };
  
    const secondHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index: string | any = event.target.ariaColIndex
        
    secondSelectedOptions[index] = event.target.value
    setSecondOptions(secondSelectedOptions)
    console.log(secondSelectedOptions[index])
    };

    const handleTest = (evt: MouseEvent): void => {
        evt.preventDefault()w
        
        const sd = selectedOptions.forEach(el => el == el)
        console.log(sd)
        console.log(secondSelectedOptions)
    }

    return (
        <>
            <Head>
                <title>Test boshlandi !</title>
            </Head>
            
            <section className="test">
                <div className="test__container">
                    <h2 className="test__title">Blok 1</h2>
                    <ul className="test__list">
                        {
                            tests.map((test, index) => {
                                return (
                                    <li className='test__item' key={index}>
                                        <h3 className="test__question">#{index+1} {test.question} Lorem ipsum dolor sit amet consectetur adipisicing elit. At aspernatur dolore, molestias soluta cum culpa non vel impedit et iste libero, natus quod tempora veritatis.</h3>

                                        <RadioGroup className="option__list" aria-label="quiz" name="quiz" value={selectedOptions[index]} onChange={handleChange}>
                                                {
                                                    test.options.map((option, i) => {
                                                        return (
                                                            // <li key={i} className="option__item">

                                                            //     <label className="test__label">
                                                            //         <input type="radio" name={test.question} id="" />
                                                            //         <span>{option}</span>
                                                            //     </label>
                                                            // </li>

                                                            <FormControlLabel className="option__item" key={i} value={option} control={<Radio inputProps={{'aria-colindex': index}}  />} label={option} />
                                                        )
                                                    })
                                                }
                                        </RadioGroup>
                                        
                                        <hr />
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <h2 className="test__title">Blok 2</h2>
                    <ul className="test__list">
                        {
                            secondTests.map((test, index) => {
                                return (
                                    <li className='test__item' key={index}>
                                        <h3 className="test__question">#{index+1} {test.question} Lorem ipsum dolor sit amet consectetur adipisicing elit. At aspernatur dolore, molestias soluta cum culpa non vel impedit et iste libero, natus quod tempora veritatis.</h3>

                                        <RadioGroup className="option__list" aria-label="quiz" name="quiz" value={secondSelectedOptions[index]} onChange={secondHandleChange}>
                                                {
                                                    test.options.map((option, i) => {
                                                        return (
                                                            <FormControlLabel className="option__item" key={i} value={option} control={<Radio inputProps={{'aria-colindex': index}} />} label={option} />
                                                        )
                                                    })
                                                }
                                        </RadioGroup>
                                        
                                        <hr />
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <button onClick={handleTest} className="test__btn">Testni tugatish</button>
                </div>
            </section>
        </>
    );
}

export default Test;