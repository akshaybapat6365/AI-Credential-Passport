import React from 'react'
import { Button } from "./components/Button"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Button variant="default" className="mr-2">Default</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}

export default App
