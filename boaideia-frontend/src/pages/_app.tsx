import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './struct/Header'
import Footer from './struct/Footer'
import { Provider } from 'next-auth/client'
import { UserProvider } from '../services/context/UserContext';
import ProtectedRoute from '../services/ProtectedRoute'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <UserProvider>
        <Header />
        <ProtectedRoute router={router}>
          <Component {...pageProps} />
        </ProtectedRoute>
        <Footer />
      </UserProvider>
    </Provider>
  )
}
export default MyApp
