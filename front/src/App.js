import React from 'react'
import { useRoutes } from './routes/routes';
import { useAuth } from './Hooks/auth.hool';
import 'materialize-css'
import { AuthContext } from './context/AuthContext';


function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider
      value={{token, userId, login, logout, isAuthenticated}}
    >
      {routes}
    </AuthContext.Provider>
  );
}

export default App
