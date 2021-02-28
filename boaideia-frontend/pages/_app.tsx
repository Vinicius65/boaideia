import UserProvider from '../services/context/userContext'
import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export default function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <div className='container-full'>
          <Component Component={Component} pageProps={pageProps} />
        </div>
      </ThemeProvider>
    </UserProvider>
  )
}

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#141412',
      secondary: '#13131193',
    },
    primary: {
      main: '#f7ce3e',
      dark: '#F5C20D'
    },
    secondary: {
      main: '#F7723E',

    },
  },
});