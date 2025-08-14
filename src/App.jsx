import React from 'react'
import { Header } from './components/Header'
import { FeedbackProvider } from './hooks/useFeedback'
import { FeedbackSpace } from './components/FeedbackSpace'
import { WalletProvider } from './hooks/useWallet'

function App() {
  return (
    <WalletProvider>
      <FeedbackProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <FeedbackSpace />
        </div>
      </FeedbackProvider>
    </WalletProvider>
  )
}

export default App
