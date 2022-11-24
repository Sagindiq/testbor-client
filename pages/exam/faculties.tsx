import { NextPage } from "next";
import Back from "../../components/back.btn";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { withRouter } from 'next/router'

const Faculties: NextPage = () => {
    
    const router = useRouter()

    const { first_science, second_science } = router.query

    return (
        <>
        <section className="faculties">
            <Header />
            <div className="faculties__container container">
                <Back />

                {first_science} {second_science}
            </div>
        </section>
        </>
    )
}

export default withRouter(Faculties);