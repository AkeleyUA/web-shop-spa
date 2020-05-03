import React from 'react'
import Routes from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store'
import Toast from './components/Toast/Toast'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
      <Toast/>
    </Provider>
  )
}

export default App
