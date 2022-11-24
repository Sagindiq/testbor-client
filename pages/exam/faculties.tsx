import { NextPage } from "next";
import Back from "../../components/back.btn";
import Header from "../../components/header";

const Faculties: NextPage = () => {

    return (
        <>
        <section className="faculties">
            <Header />
            <div className="faculties__container container">
                <Back />
            </div>
        </section>
        </>
    )
}

export default Faculties;