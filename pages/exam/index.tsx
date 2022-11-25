import { Poppins } from "@next/font/google";
import { useState } from "react";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import FacultiesSelector from "../../components/science/faculties.selector";
import ScienceProcess from "../../components/science/exam.process";
import ScienceSelector from "../../components/science/science.selector";
import { processInterface, sciencesInterface } from "../../interfaces/science.interface";
import { facultyArr, facultyChange } from "../../interfaces/faculties.interface";
import Router from "next/router";
const poppins = Poppins({ weight: '500'})

export default function Exam({ sciences }: sciencesInterface) {

  const facultyArr = [
    {
      _id: 1,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 2,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 3,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 4,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 5,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 6,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 7,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 8,
      faculty_name: 'Amaliy matematika',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    }
  ]

  let process: processInterface = {
    actionId: 1,
    sciences: {
      visible: true
    },
    faculties: {
      visible: false,
      requires: []
    },
    
    tests: {
      visible: false,
      requires: []
    },

    result: {
      visible: false,
      requires: {
        first_science_score: NaN,
        second_science_score: NaN,
        status: '',
        faculties: []
      }
    }
  }

  const [ useProcess, setProcess ] = useState(process)

  const handleChange = (first_science: string, second_science: string) => {
    
    process.actionId = 2
    process.faculties.requires = [first_science, second_science]
    process.sciences.visible = false
    process.faculties.visible = true

    console.log(first_science, second_science)

    setProcess(process)
    Router.push({pathname: '/exam'})
    return

  }

  const [faculties, setFaculty] = useState<facultyArr[]>([])

  const facultyChange: facultyChange = (array) => {
    setFaculty(array)
    console.log(array)
  }

  return (
    <>

      <Header />

      <main>

        <section className="science">
          <div className="sciencee__container">

            <Back />

            <h1 className={poppins.className}>Assalomu aleykum imtihonga hush kelibsiz</h1>
            <ScienceProcess process={useProcess.actionId} />

            {
              useProcess.sciences.visible && <ScienceSelector sciences={sciences} handleChange={handleChange} />
            }

            {
              useProcess.faculties.visible && useProcess.actionId == 2  && <FacultiesSelector facultiesArr={facultyArr} facultyChange={facultyChange} />     
            }

          </div>
        </section>

      </main>

    </>
  )
}


export async function getStaticProps() {
  const data = await fetch(process.env.SERVER_URL + '/sciences').then(res => res.json())

  return {
    props: {
      sciences: data
    }
  }
}