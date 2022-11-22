import Link from "next/link";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Stack } from "@mui/system";
import { Button } from "@mui/material";

const inter = Inter({ weight: '500'})

export default function Header() {


    return (
        <header className='header'>
            
            <div className='header__container'>
                <Link className='logo__link' href={'/'}>
                    <Image className='logo__image' src='/logo.png' alt="logo image" width='32' height='25' />

                    <div className='logo__context'>
                        <h3 className={inter.className}>TESTBOR</h3>
                        <p>practice tests</p>
                    </div>
                </Link>

                <nav className='header__navbar'>
                    <ul className='header__list'>

                        <li className='header__item'>
                            <Stack direction="row" spacing={2}>
                                <Button style={{color: 'white'}}>
                                    <Link className='header__link' href='/exam'>Testni boshlash</Link>
                                </Button>
                            </Stack>
                        </li>
                        <li className='header__item'>
                            <Stack direction="row" spacing={2}>
                                <Button style={{color: 'white'}}>
                                    <Link className='header__link' href='/top'>G'oliblar</Link>
                                </Button>
                            </Stack>
                        </li>
                        <li className='header__item'>
                            <Stack direction="row" spacing={2}>
                                <Button style={{color: 'white'}}>
                                    <Link className='header__link' href='/achievments'>Yutuqlarim</Link>
                                </Button>
                            </Stack> 
                        </li>

                    </ul>
                </nav>
            </div>

        </header>
    )
}