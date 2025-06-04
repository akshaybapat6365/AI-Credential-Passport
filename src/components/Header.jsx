import React from 'react'
import { Button } from './Button'
import { useWallet } from '../hooks/useWallet'

export function Header() {
  const { connect, disconnect, connected, loading, error, did } = useWallet()

  return (
    <header className="p-4 border-b flex items-center justify-end space-x-2">
      {connected && <span className="text-sm truncate max-w-xs">{did}</span>}
      {error && <span className="text-sm text-destructive">{error.message}</span>}
      {connected ? (
        <Button variant="secondary" onClick={disconnect}>Disconnect</Button>
      ) : (
        <Button onClick={connect} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </header>
  )
}
