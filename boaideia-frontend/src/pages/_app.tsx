import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './struct/Header'
import Footer from './struct/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
export default MyApp
