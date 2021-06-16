import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { UserProvider } from '../services/context/UserContext';
import ProtectedRoute from '../services/ProtectedRoute'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <ProtectedRoute router={router}>
        <Component {...pageProps} />
      </ProtectedRoute>
    </UserProvider>
  )
}
export default MyApp
