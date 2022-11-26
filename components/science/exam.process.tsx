import { Poppins } from '@next/font/google'

const poppins = Poppins({weight: '500'})

export interface scienceProcess {
    scienceProcess: Number | String
}

export default function ScienceProcess({ scienceProcess } : scienceProcess ) {

    const isProcess: string[] = []

    for (let i = 0; i < scienceProcess; i++) {
        isProcess.push('stage__item--active')
    }

    return (
        <ul className='stage__list'>
            <li className={`stage__item ${isProcess[0]}`}>
                <p className={poppins.className}>1</p>
            </li>
            <li className='stage__item stage__item--line'></li>
            <li className={`stage__item ${isProcess[1]}`}>
                <p className={poppins.className}>2</p>
            </li>
            <li className='stage__item stage__item--line'></li>
            <li className={`stage__item ${isProcess[2]}`}>
                <p className={poppins.className}>3</p>
            </li>
        </ul>
    )
}