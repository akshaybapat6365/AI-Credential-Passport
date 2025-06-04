import { describe, it, expect } from 'vitest'
import { generateProofForCredential, verifyProof } from '../src/lib/zkp'

describe('zkp helpers', () => {
  it('generates proof for credential', async () => {
    const proof = await generateProofForCredential({ id: '123' })
    expect(proof).toEqual({ proof: 'proof-for-123' })
  })

  it('verifies proof', async () => {
    const result = await verifyProof({ proof: 'anything' })
    expect(result).toBe(true)
  })

  it('throws when proof missing', async () => {
    await expect(verifyProof(null)).rejects.toBeInstanceOf(Error)
  })
})
