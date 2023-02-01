import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'
import { Play } from '@next/font/google'
import { NextPage } from 'next'

const play = Play({ weight: '400' })

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TESTBOR</title>
        <meta name="description" content="Test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>

        <section className='intro'>

          <div className='intro__container'>

            <div className='intro__context'>

              <p className={play.className}>Assalomu aleykum. Bizning saytimiz orqali bilimlaringiz qaysi oliy talim muasasalariga kirish uchun yetishi mumkin ekanligini aniqlab olasiz. Yani bepul DTM test. Boshlash uchun <Link className='intro__link' href={'/test'}>bu yerni</Link> bosing</p>

            </div>

            <Image className='intro__img' src='/test2.webp' width='650' height='466' alt='intro' />

          </div>
          
        </section>

      </main>
      
    </>
  )
}

export default Home;