import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Router } from 'next/router'
import AlertProvider from '../context/alert.context'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {

  const [ cname, setCName ] = useState('')

    Router.events.on('routeChangeStart', (url: string): void => {
      
      if (url !=='/exam') {
        setCName('loading--active')
      }

    })

    Router.events.on('routeChangeComplete', (url: string): void => {

      if (url !== '/exam') {
        setCName('')
      }
    })

    // Router.events.on('hashChangeStart', (): void => {
    //   setCName('loading--active')
    // })

  return (
    <>
      <AlertProvider>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </AlertProvider>

      <div className={`loading ${cname}`}>
        <div className='loader'>Loading...</div>
      </div>
    </>
  )
}
