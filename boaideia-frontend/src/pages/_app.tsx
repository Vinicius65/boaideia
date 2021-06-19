import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './struct/Header';
import Footer from './struct/Footer';
import { UserProvider } from '../services/context/UserContext';
import ProtectedRoute from '../services/ProtectedRoute'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <ProtectedRoute router={router}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ProtectedRoute>
    </UserProvider>
  )
}
export default MyApp
