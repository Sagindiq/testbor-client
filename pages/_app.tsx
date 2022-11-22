import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Router } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {

  const [ cname, setCName ] = useState('')

    Router.events.on('routeChangeStart', (): void => {
        setCName('loading--active')
    })

    Router.events.on('routeChangeComplete', (): void => {
      setCName('')
    })

    // Router.events.on('hashChangeStart', (): void => {
    //   setCName('loading--active')
    // })

  return (
    <>
      <Component {...pageProps} />

      <div className={`loading ${cname}`}>
        <div className='loader'>Loading...</div>
      </div>
    </>
  )
}
