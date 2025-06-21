/**
 * Generate a zero‑knowledge proof for the given credential.
 *
 * This implementation acts as a stub until the Midnight SDK
 * is available. It simply returns a deterministic object so
 * that the rest of the demo can operate.
 *
 * Expected behaviour when the SDK is integrated:
 *   1. Use the Midnight prover to create a valid ZKP for the
 *      supplied credential.
 *   2. Return the proof in whatever format the verifier
 *      requires.
 */
import type { Credential, Proof } from './types'

export async function generateProofForCredential(
  credential: Credential
): Promise<Proof> {
  if (!credential) {
    throw new Error('Credential required')
  }
  // In lieu of real proving logic we return a predictable object.
  return { proof: `proof-for-${credential.id}` }
}

/**
 * Verify a zero‑knowledge proof.
 *
 * Currently this stub accepts any provided proof. With the
 * Midnight SDK it should validate the proof and return the
 * verification result.
 */
export async function verifyProof(proof: Proof | null): Promise<boolean> {
  if (!proof) {
    throw new Error('Proof required')
  }
  // Stubbed verification always succeeds for non‑null input.
  return true
}
