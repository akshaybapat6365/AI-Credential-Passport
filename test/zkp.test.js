import { describe, it, expect } from 'vitest'
import { generateProofForCredential, verifyProof } from '../src/lib/zkp'

describe('zkp helpers', () => {
  it('generates and verifies proof for credential', async () => {
    const cred = { id: '123', name: 'Test' }
    const proof = await generateProofForCredential(cred)
    expect(proof.credential).toEqual(cred)
    expect(typeof proof.signature).toBe('string')
    expect(typeof proof.verifyingKey).toBe('string')
    const result = await verifyProof(proof)
    expect(result).toBe(true)
  })

  it('fails verification when credential mutated', async () => {
    const cred = { id: 'a' }
    const proof = await generateProofForCredential(cred)
    const tampered = { ...proof, credential: { id: 'b' } }
    const ok = await verifyProof(tampered)
    expect(ok).toBe(false)
  })

  it('throws when proof missing', async () => {
    await expect(verifyProof(null)).rejects.toBeInstanceOf(Error)
  })
})
