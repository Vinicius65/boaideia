import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './struct/Header';
import Footer from './struct/Footer';
import { UserProvider } from '../services/context/UserContext';
import ProtectedRoute from '../services/ProtectedRoute'
import { ProjectProvider } from '../services/context/ProjectContext';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <ProjectProvider>
        <ProtectedRoute router={router}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ProtectedRoute>
      </ProjectProvider>
    </UserProvider>
  )
}
export default MyApp
