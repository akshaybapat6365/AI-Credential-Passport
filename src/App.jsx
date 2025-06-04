import React from 'react'
import { Header } from './components/Header'
import { CredentialsProvider } from './hooks/useCredentials'
import { Dashboard } from './components/Dashboard'

function App() {
  return (
    <CredentialsProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Dashboard />
      </div>
    </CredentialsProvider>
  )
}

export default App
