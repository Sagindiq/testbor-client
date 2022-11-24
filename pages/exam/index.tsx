import { Poppins } from "@next/font/google";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import ScienceProcess from "../../components/science/science.process";
import ScienceSelector from "../../components/science/select";
import { sciencesInterface } from "../../interfaces/science.interface";
import Router from "next/router";
const poppins = Poppins({ weight: '500'})

export const getStaticProps = async() => {
  const data = await fetch(process.env.SERVER_URL + '/sciences').then(res => res.json())

  return {
    props: {
      sciences: data
    }
  }
}

export default function Exam({ sciences }: sciencesInterface) {

  const handleChange = (first_science: string, second_science: string) => {
    
    if (first_science && second_science) {
      Router.push({
        pathname: '/faculties',
        
      })
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
            <ScienceProcess />

            <ScienceSelector sciences={sciences} handleChange={handleChange} />
          </div>
        </section>

      </main>

    </>
  )
}
