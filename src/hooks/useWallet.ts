import { useState, useCallback } from 'react'
import { createOrLoadDID } from '../lib/prism'
import type { WalletApi } from '../lib/types'

declare global {
  interface Window {
    cardano?: {
      lace?: {
        enable: () => Promise<WalletApi>
      }
    }
  }
}

export function useWallet() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [did, setDid] = useState<string | null>(null)
  const [api, setApi] = useState<WalletApi | null>(null)

  const connect = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      if (!window?.cardano?.lace) {
        throw new Error('Lace wallet not found')
      }
      const walletApi: WalletApi = await window.cardano.lace.enable()
      setApi(walletApi)
      if (!walletApi.getRewardAddresses || !walletApi.getNetworkId) {
        throw new Error('Wallet missing required capabilities')
      }
      const networkId = await walletApi.getNetworkId()
      if (networkId !== 0) {
        throw new Error('Unsupported network')
      }
      const rewards = await walletApi.getRewardAddresses()
      if (rewards && rewards[0]) {
        const prismDid = await createOrLoadDID(rewards[0])
        setDid(prismDid)
      }
      setConnected(true)
    } catch (err) {
      setError(err as Error)
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const disconnect = useCallback((): void => {
    setConnected(false)
    setApi(null)
    setDid(null)
  }, [])

  return { connect, disconnect, connected, loading, error, did, api }
}
