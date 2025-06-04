import React from 'react'
import { Header } from './components/Header'
import { Button } from './components/Button'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex items-center justify-center pt-10">
        <Button variant="default" className="mr-2">Default</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  )
}

export default App
