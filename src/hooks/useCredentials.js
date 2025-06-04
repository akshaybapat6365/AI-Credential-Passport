import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CredentialsContext = createContext()

export function CredentialsProvider({ children }) {
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('credentials')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  }, [credentials])

  const addCredential = useCallback((cred) => {
    setCredentials((prev) => [...prev, cred])
  }, [])

  return React.createElement(
    CredentialsContext.Provider,
    { value: { credentials, addCredential } },
    children
  )
}

export function useCredentials() {
  return useContext(CredentialsContext)
}
