import { Poppins } from '@next/font/google'

const poppins = Poppins({weight: '500'})

export default function ScienceProcess() {

    return (
        <ul className='stage__list'>
            <li className='stage__item stage__item--active'>
                <p className={poppins.className}>1</p>
            </li>
            <li className='stage__item stage__item--line'></li>
            <li className='stage__item'>
                <p className={poppins.className}>2</p>
            </li>
            <li className='stage__item stage__item--line'></li>
            <li className='stage__item'>
                <p className={poppins.className}>3</p>
            </li>
        </ul>
    )
}