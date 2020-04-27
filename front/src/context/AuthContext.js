import {createContext} from 'react'

function noop () {}

export const AuthContext = createContext({
  token: null,
  userIf: null,
  login: noop,
  logout: noop,
})