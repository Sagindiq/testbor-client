import Head from 'next/head';
import { Button } from '@mui/material'
import { Stack } from '@mui/system';
import Link from 'next/link';
import Header from '../../components/header';
import { RegisterInput, Selector, Password, Gender} from '../../components/register-form'
import { NextPage } from 'next';

const Register: NextPage = () => {
    
    return (
        <>
            <Head>
                <title>TESTBOR | Ro'yhatdan o'tish</title>
            </Head>

            <div className='register'>

                <Header />

                <div className='register__container'>
                    <h2>Ro'yhatdan o'tish</h2>

                    <form className='register__form'>

                        <RegisterInput />

                        <Selector />

                        <Password />

                        <Gender />

                        <Stack direction="row" spacing={2}>
                            <Button type='submit' sx={{ width: '393px', textAlign: 'center', borderColor: '#18A0FB', borderRadius: '20px', paddingTop: '17px', paddingBottom: '16px', color: '#000', fontWeight: '500', textTransform: 'none', marginBottom: '14px'}} 
                            variant="outlined">Ro'yhatdan o'tish</Button>
                        </Stack>

                        <Link href={'/auth/login'}>Hisobingiz bormi? Kirish</Link>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Register;