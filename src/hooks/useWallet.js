import { useState, useCallback } from 'react'

export function useWallet() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [did, setDid] = useState(null)
  const [api, setApi] = useState(null)

  const connect = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (!window?.cardano?.lace) {
        throw new Error('Lace wallet not found')
      }
      const walletApi = await window.cardano.lace.enable()
      setApi(walletApi)
      const rewards = await walletApi.getRewardAddresses()
      if (rewards && rewards[0]) {
        setDid(`did:cardano:${rewards[0]}`)
      }
      setConnected(true)
    } catch (err) {
      setError(err)
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setConnected(false)
    setApi(null)
    setDid(null)
  }, [])

  return { connect, disconnect, connected, loading, error, did, api }
}
