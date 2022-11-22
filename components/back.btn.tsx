import Image from "next/image";
// import styles from '../styles/back.module.scss'
import { Poppins } from '@next/font/google'
import Link from "next/link";

const poppins = Poppins({ weight: '500'})

const Back = () => {
    return (
        <div className='back__container'>
            <Link className='back__button' href={'/'}>
                <Image className='back__image' src='/Vector.svg' width='23' height='22' alt="Back button" />
                <span className={`${poppins.className} back__context`}>Orqaga</span>
            </Link>
        </div>
    )
}

export default Back;