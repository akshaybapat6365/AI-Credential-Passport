import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { Credential } from '../lib/types'

const CredentialsContext = createContext<
  | {
      credentials: Credential[]
      addCredential: (cred: Credential) => void
    }
  | null
>(null)

export function CredentialsProvider({ children }: { children: React.ReactNode }) {
  const [credentials, setCredentials] = useState<Credential[]>(() => {
    const saved = localStorage.getItem('credentials')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  }, [credentials])

  const addCredential = useCallback((cred: Credential) => {
    setCredentials((prev) => [...prev, cred])
  }, [])

  return React.createElement(
    CredentialsContext.Provider,
    { value: { credentials, addCredential } },
    children
  )
}

export function useCredentials() {
  const ctx = useContext(CredentialsContext)
  if (!ctx) {
    throw new Error('useCredentials must be used within CredentialsProvider')
  }
  return ctx
}
