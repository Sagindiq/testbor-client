import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import config from "../config/config";

interface Props {
  data: {
    faculties: string[];
    sciences: string[];
    first_options: string;
    second_options: string;
  };
}

const Result = ({ data }: Props) => {
  const [result, setResult] = useState({} as any);
  const progressRef: LegacyRef<any> = useRef();
  const secondProgressRef: LegacyRef<any> = useRef();

  useEffect(() => {
    window.localStorage.removeItem("faculties");
    window.localStorage.removeItem("first_science");
    window.localStorage.removeItem("second_science");

    axios
      .post(config.server + '/check', {
        faculties: data.faculties,
        sciences: data.sciences,
        first_options: JSON.parse(data.first_options),
        second_options: JSON.parse(data.second_options),
      })
      .then((res) => setResult(res.data));
  }, [data]);

  const first_science_precentage = Math.floor((result.first_result / 30) * 100);
  const second_science_precentage = Math.floor(
    (result.second_result / 30) * 100
  );

  useEffect(() => {
    progressRef.current.style.width = `${first_science_precentage}%`;
    secondProgressRef.current.style.width = `${second_science_precentage}%`;
  }, [result]);

  return (
    <>
      <Head>
        <title>Natija</title>
      </Head>
      <div className="result">
        <div className="result__container container">
          <header>
            <Link className="logo__link result-logo" href={"/"}>
              <Image
                className="logo__image"
                src="/logo.png"
                alt="logo image"
                width="32"
                height="25"
              />

              <div className="logo__context">
                <h3 className="title">TESTBOR</h3>
                <p>practice tests</p>
              </div>
            </Link>
          </header>

          <h1 className="result__title">Asosiy</h1>
          <ol className="result__science-list">
            <li className="result__science-item">
              <h3 className="result__science-title">{result.first_science}</h3>
              <div className="result__science-progress first-progress">
                <div
                  ref={progressRef}
                  className="result__science-progress--inner first-inner"
                >
                  <span className="result__science-progress-precentage first-precentage">
                    {first_science_precentage}%
                  </span>
                </div>
              </div>
              <p className="result__science-precentage">
                {first_science_precentage}%
              </p>
              <p className="result__science-score">{result.first_result}/30</p>
            </li>
            <li className="result__science-item">
              <h3 className="result__science-title">{result.second_science}</h3>
              <div className="result__science-progress second-progress">
                <div
                  ref={secondProgressRef}
                  className="result__science-progress--inner second-inner"
                >
                  <span className="result__science-progress-precentage second-precentage">
                    {second_science_precentage}%
                  </span>
                </div>
              </div>
              <p className="result__science-precentage">
                {second_science_precentage}%
              </p>
              <p className="result__science-score">{result.second_result}/30</p>
            </li>
          </ol>

          <div className="result__details">
            {result.isEntered && (
              <>
                <h3>
                  {result.isEntered.status
                    ? "Natija (tavsiya etildi)"
                    : "Natija (tavsiya etilmadi)"}
                </h3>
                <ol className="result__otm-list">
                  {result.isEntered.otm.map((el: any, i: number) => {
                    return (
                      <li className="result__otm-item" key={i}>
                        <h4>Talim muassasi: {el.hei.hei_name}</h4>
                        <p>Talim yo'nalishi: {el.faculty_name}</p>
                      </li>
                    );
                  })}
                </ol>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;

Result.getInitialProps = ({ query }: any) => {
  return { data: query };
};
