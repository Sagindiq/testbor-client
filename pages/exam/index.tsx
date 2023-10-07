import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import FacultiesSelector from "../../components/science/faculties.selector";
import ScienceProcess from "../../components/science/exam.process";
import ScienceSelector from "../../components/science/science.selector";
import { processInterface, examInterface } from "../../interfaces/science.interface";
import { facultyChange } from "../../interfaces/faculties.interface";
import Router from "next/router";
const poppins = Poppins({ weight: '500'})
import { facultyArr } from "../../interfaces/faculties.interface";
import { toast } from "react-toastify";
import config from "../../config/config";

export default function Exam({ sciences }: examInterface) {
  
  let examProcess: processInterface = {
    actionId: 1,
    sciences: {
      visible: true
    },
    faculties: {
      visible: false,
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
  const [ faculties, setFaculties ] = useState<facultyArr[] | any[]>([])
  
  const handleChange = async (first_science: string, second_science: string) => {
    
    
    if (first_science && second_science) {

      localStorage.setItem('first_science', first_science)
      localStorage.setItem('second_science', second_science)

      fetch('http://192.168.59.55:9000/faculties', {
        headers: {
          first_science,
          second_science
        }
      }).then(res => res.json()).then(data => {
        if (data.length > 0) {

          examProcess.actionId = 2
          examProcess.sciences.visible = false
          examProcess.faculties.visible = true
          setFaculties(data)
          setProcess(examProcess)
          Router.push({pathname: '/exam'})
          return

        } else {
          toast.warning(`bu fan bo'yicha fakultetlar mavjud emas`)
          return
        }
      })
    }

    return
  }
  


  const facultyChange: facultyChange = (array) => {
    if (array?.length > 0) {
      examProcess.actionId = 3
      examProcess.sciences.visible = false
      examProcess.faculties.visible = true
      setProcess(examProcess)
      let faculties: string[] = []
      array.map(el => {
        faculties.push(el._id)
      })
      localStorage.setItem('faculties', JSON.stringify(faculties))
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
              useProcess.faculties.visible && useProcess.actionId > 1  &&  <FacultiesSelector allFaculties={faculties} facultyChange={facultyChange} />
            }

          </div>
        </section>

      </main>

    </>
  )
}


export async function getStaticProps() {
  const data = await fetch(config.server + '/sciences').then(res => res.json())

  return {
    props: {
      sciences: data
    }
  }
}