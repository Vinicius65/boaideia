import UserProvider from '../services/context/userContext'
import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import FeedbackCP from '../components/Feedback/FeedbackCP';
import FeedbackProvider from '../services/context/feedbackContext';
import ApiProvider from '../services/context/apiContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <FeedbackProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <div className='container-full'>
              <Component Component={Component} pageProps={pageProps} />
              <FeedbackCP />
            </div>
          </ThemeProvider>
        </UserProvider>
      </FeedbackProvider>
    </ApiProvider>

  )
}

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#141412',
      secondary: '#13131193',
    },
    primary: {
      main: '#F7723E'
    }
  }
});