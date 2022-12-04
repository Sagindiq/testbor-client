import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import FacultiesSelector from "../../components/science/faculties.selector";
import ScienceProcess from "../../components/science/exam.process";
import ScienceSelector from "../../components/science/science.selector";
import { facultyArr } from "../../interfaces/faculties.interface";
import { processInterface, examInterface } from "../../interfaces/science.interface";
import { facultyChange } from "../../interfaces/faculties.interface";
import Router from "next/router";
const poppins = Poppins({ weight: '500'})


export default function Exam({ sciences }: examInterface) {
  
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

  const [faculties, setFaculty] = useState<facultyArr[]>([])
  
  const handleChange = async (first_science: string, second_science: string) => {
    
    examProcess.actionId = 2
    examProcess.faculties.requires = [first_science, second_science]
    examProcess.sciences.visible = false
    examProcess.faculties.visible = true

    setProcess(examProcess)
    Router.push({pathname: '/exam'})
    return
  }
  


  const facultyChange: facultyChange = (array) => {
    console.log(array)
    if (array?.length > 0) {
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
              useProcess.faculties.visible && useProcess.actionId > 1  &&  <FacultiesSelector scienceCouple={useProcess.faculties.requires} facultyChange={facultyChange} />
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