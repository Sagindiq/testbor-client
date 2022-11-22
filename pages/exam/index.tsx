import { Poppins } from "@next/font/google";
import { useState } from "react";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import ScienceProcess from "../../components/science/science.process";
import ScienceSelector from "../../components/science/select";

const poppins = Poppins({ weight: '500'})

export default function Exam() {

  // const [firstScience, setFirstScience] = useState<string>('')
  // const [secondScience, setSecondScience] = useState<string>('')


  return (
    <>

    <Header />

    <main>

      <section className="science">
        <div className="sciencee__container">

            <Back />

            <h1 className={poppins.className}>Assalomu aleykum imtihonga hush kelibsiz</h1>
            <ScienceProcess />

            <ScienceSelector />
        </div>
      </section>

    </main>

    </>
  )
}
