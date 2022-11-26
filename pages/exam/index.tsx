import { Poppins } from "@next/font/google";
import { useState } from "react";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import FacultiesSelector from "../../components/science/faculties.selector";
import ScienceProcess from "../../components/science/exam.process";
import ScienceSelector from "../../components/science/science.selector";
import { processInterface, sciencesInterface } from "../../interfaces/science.interface";
import { facultyChange } from "../../interfaces/faculties.interface";
import Router from "next/router";
const poppins = Poppins({ weight: '500'})


export default function Exam({ sciences }: sciencesInterface) {

  const facultyArr = [
    {
      _id: 1,
      faculty_name: 'Amaliy matematika1',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 2,
      faculty_name: 'Amaliy matematika2',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 3,
      faculty_name: 'Amaliy matematika3',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 4,
      faculty_name: 'Amaliy matematika4',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 5,
      faculty_name: 'Amaliy matematika5',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 6,
      faculty_name: 'Amaliy matematika6',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 7,
      faculty_name: 'Amaliy matematika7',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    },
    {
      _id: 8,
      faculty_name: 'Amaliy matematika8',
      hei_name: 'Milliy universitet',
      hei_short_name: `O'zMu`
    }
  ]
  
  let examProcess: processInterface = {
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
  
  const [ useProcess, setProcess ] = useState(examProcess)
  
  const handleChange = (first_science: string, second_science: string) => {
    
    examProcess.actionId = 2
    examProcess.faculties.requires = [first_science, second_science]
    examProcess.sciences.visible = false
    examProcess.faculties.visible = true

    console.log(first_science, second_science)

    setProcess(examProcess)
    Router.push({pathname: '/exam'})
    return

  }

  // const [faculties, setFaculty] = useState<facultyArr[]>([])

  const facultyChange: facultyChange = (array) => {
    console.log(array)
    if (array?.length == 5) {
      examProcess.actionId = 3
      examProcess.sciences.visible = false
      examProcess.faculties.visible = true
      setProcess(examProcess)
    } else {
      examProcess.actionId = 2
      examProcess.sciences.visible = false
      examProcess.faculties.visible = true
      setProcess(examProcess)
    }
  }

  return (
    <>

      <Header />

      <main>

        <section className="science">
          <div className="sciencee__container">

            <Back />

            <h1 className={poppins.className}>Assalomu aleykum imtihonga hush kelibsiz</h1>
            <ScienceProcess scienceProcess={useProcess.actionId} />

            {
              useProcess.sciences.visible && <ScienceSelector sciences={sciences} handleChange={handleChange} />
            }

            {
              useProcess.faculties.visible && useProcess.actionId > 1  &&  <FacultiesSelector facultiesArr={facultyArr} facultyChange={facultyChange} />
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