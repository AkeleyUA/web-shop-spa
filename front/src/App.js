import React from 'react'
import { Routes } from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store'
import { orange, blue } from '@material-ui/core/colors';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale'
import { SnackbarProvider } from 'notistack'
import io from 'socket.io-client'


export const socket = io(process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001')

let theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: orange[800]
    },
  },
}, ruRU)

theme = responsiveFontSizes(theme)

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Router>
            <Routes />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
