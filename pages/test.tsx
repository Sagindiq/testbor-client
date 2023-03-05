import { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { testInterface } from "../interfaces/test.initerface";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import config from "../config/config";

const Test = () => {
  const [tests, setTests] = useState([] as testInterface[]);
  const [secondTests, setSecondTests] = useState([] as testInterface[]);
  const router = useRouter();

  useEffect(() => {
    const first_science = window.localStorage.getItem("first_science");
    const second_science = window.localStorage.getItem("second_science");

    axios
      .get(config.server + "/tests", {
        headers: {
          science_id: first_science,
        },
      })
      .then((res) => {
        setTests(res.data);
      });

    axios
      .get(config.server + "/tests", {
        headers: {
          science_id: second_science,
        },
      })
      .then((res) => {
        setSecondTests(res.data);
      });
  }, []);

  useEffect(() => {
    const halfTime = setTimeout(() => {
      toast.warn("1 soat vaqt qoldi");
    }, 3600000);
    const endTime = setTimeout(() => {
      router.push('/exam')
    }, 7200000);
    
    return () => {
      toast.warn('Siz 2 soat davomida 60 ta savolga javob berishingiz kerak. Vaqt boshlandi')
        clearTimeout(halfTime);
        clearTimeout(endTime);
    };
  }, [])

  const [selectedOptions, setOptions] = useState([] as object[]);
  const [secondSelectedOptions, setSecondOptions] = useState([] as object[]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index: string | any = event.target.ariaColIndex;
    const id: string | any = event.target.ariaLabel;
    selectedOptions[index] = {
      _id: id,
      answer: event.target.value,
    };
    setOptions(selectedOptions);
  };

  const secondHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index: string | any = event.target.ariaColIndex;
    const id: string | any = event.target.ariaLabel;
    secondSelectedOptions[index] = {
      _id: id,
      answer: event.target.value,
    };

    setSecondOptions(secondSelectedOptions);
    console.log(secondSelectedOptions[index]);
  };

  const handleTest = (evt: MouseEvent): void => {
    evt.preventDefault();
    const firstOptioins: object[] = selectedOptions.filter((e) => e);
    const secondOptioins: object[] = secondSelectedOptions.filter((e) => e);
    console.log(firstOptioins, secondOptioins);

    if (firstOptioins.length !== 30 || secondOptioins.length !== 30) {
      alert("Barcha savollarni to`ldiring");
      return;
    }

    const first_science: any = window.localStorage.getItem("first_science");
    const second_science: any = window.localStorage.getItem("second_science");
    const lFaculties: any = window.localStorage.getItem("faculties");
    const faculties: any[] = JSON.parse(lFaculties);
    router.push({
      pathname: "/result",
      query: {
        faculties,
        sciences: [first_science, second_science],
        first_options: JSON.stringify(firstOptioins),
        second_options: JSON.stringify(secondOptioins),
      },
    });
  };

  return (
    <>
      <Head>
        <title>Test boshlandi !</title>
      </Head>

      <section className="test">
        <div className="test__container">
          <h2 className="test__title">Blok 1</h2>
          <ul className="test__list">
            {tests.map((test, index) => {
              return (
                <li className="test__item" key={index}>
                  <h3 className="test__question">
                    #{index + 1} {test.question} Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. At aspernatur dolore,
                    molestias soluta cum culpa non vel impedit et iste libero,
                    natus quod tempora veritatis.
                  </h3>

                  <RadioGroup
                    className="option__list"
                    aria-label="quiz"
                    name="quiz"
                    value={selectedOptions[index]}
                    onChange={handleChange}
                  >
                    {test.options.map((option, i) => {
                      return (
                        // <li key={i} className="option__item">

                        //     <label className="test__label">
                        //         <input type="radio" name={test.question} id="" />
                        //         <span>{option}</span>
                        //     </label>
                        // </li>

                        <FormControlLabel
                          className="option__item"
                          key={i}
                          value={option}
                          control={
                            <Radio
                              inputProps={{
                                "aria-colindex": index,
                                "aria-label": test._id,
                              }}
                            />
                          }
                          label={option}
                        />
                      );
                    })}
                  </RadioGroup>

                  <hr />
                </li>
              );
            })}
          </ul>

          <h2 className="test__title">Blok 2</h2>
          <ul className="test__list">
            {secondTests.map((test, index) => {
              return (
                <li className="test__item" key={index}>
                  <h3 className="test__question">
                    #{index + 1} {test.question} Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. At aspernatur dolore,
                    molestias soluta cum culpa non vel impedit et iste libero,
                    natus quod tempora veritatis.
                  </h3>

                  <RadioGroup
                    className="option__list"
                    aria-label="quiz"
                    name="quiz"
                    value={secondSelectedOptions[index]}
                    onChange={secondHandleChange}
                  >
                    {test.options.map((option, i) => {
                      return (
                        <FormControlLabel
                          className="option__item"
                          key={i}
                          value={option}
                          control={
                            <Radio
                              inputProps={{
                                "aria-colindex": index,
                                "aria-label": test._id,
                              }}
                            />
                          }
                          label={option}
                        />
                      );
                    })}
                  </RadioGroup>

                  <hr />
                </li>
              );
            })}
          </ul>

          <button onClick={handleTest} className="test__btn">
            Testni tugatish
          </button>
        </div>
      </section>
    </>
  );
};

export default Test;
