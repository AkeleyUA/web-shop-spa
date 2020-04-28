import {useCallback, useState, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwt, id, date = new Date().getTime())=>{
    setToken(jwt)
    setUserId(id)
    localStorage.setItem(storageName, JSON.stringify({userId: id, token:jwt, date }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if(data && data.date + 3600000 > new Date().getTime()) {
      login(data.token, data.userId, data.date)
    } else {
      logout()
    }
  }, [login, logout])

  return { login , logout, token, userId}
}