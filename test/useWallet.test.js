import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWallet } from '../src/hooks/useWallet'

function mockWindow(enableImpl) {
  global.window = Object.create(window)
  global.window.cardano = { lace: { enable: enableImpl } }
}

describe('useWallet', () => {
  it('connects and exposes DID', async () => {
    const reward = 'addr_test1reward'
    const enable = vi.fn().mockResolvedValue({
      getRewardAddresses: vi.fn().mockResolvedValue([reward]),
    })
    mockWindow(enable)

    const { result } = renderHook(() => useWallet())
    await act(async () => {
      await result.current.connect()
    })

    expect(enable).toHaveBeenCalled()
    expect(result.current.connected).toBe(true)
    expect(result.current.did).toBe(`did:cardano:${reward}`)
    expect(result.current.error).toBeNull()
  })

  it('sets error when wallet missing', async () => {
    global.window = {}
    const { result } = renderHook(() => useWallet())
    await act(async () => {
      await result.current.connect()
    })
    expect(result.current.connected).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
