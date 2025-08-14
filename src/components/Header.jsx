import React from 'react'
import { Button } from './Button'
import { useWallet } from '../hooks/useWallet'

import { truncate } from '../lib/utils'

export function Header() {
  const { connect, disconnect, connected, loading, error, did } = useWallet()

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">Aura</h1>
      <div className="flex items-center space-x-4">
        {connected && (
          <span className="text-sm font-mono" title={did}>
            {truncate(did, 20)}
          </span>
        )}
        {error && <span className="text-sm text-destructive">{error.message}</span>}
        {connected ? (
          <Button variant="outline" onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button onClick={connect} disabled={loading}>
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </header>
  )
}
