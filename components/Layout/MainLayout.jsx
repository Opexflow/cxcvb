import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import Loader from '../auxiliary-elements/Loader/Loader'
import { IntlProvider } from 'react-intl'
import useLang from '../../content/locale'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function MainLayout({ children }) {
  const { messages, locale, defaultLocale } = useLang()

  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <>
      <Head>
        <title>cxcbv</title>
        <meta name="description" content="Generated by create next app"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Header />
        {loading && <Loader />} {children}
        <Footer />
      </IntlProvider>
    </>
  )
}
