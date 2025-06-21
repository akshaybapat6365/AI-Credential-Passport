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
import {
  sampleSigningKey,
  signData,
  signatureVerifyingKey,
  verifySignature,
} from '@midnight-ntwrk/ledger'

const signingKey = sampleSigningKey()
const verifyingKey = signatureVerifyingKey(signingKey)
const encoder = new TextEncoder()

export async function generateProofForCredential(credential) {
  if (!credential) {
    throw new Error('Credential required')
  }
  const payload = encoder.encode(JSON.stringify(credential))
  const signature = signData(signingKey, payload)
  return { credential, signature, verifyingKey }
}

/**
 * Verify a zero‑knowledge proof.
 *
 * Currently this stub accepts any provided proof. With the
 * Midnight SDK it should validate the proof and return the
 * verification result.
 */
export async function verifyProof(proof) {
  if (!proof) {
    throw new Error('Proof required')
  }
  const { credential, signature, verifyingKey: vk } = proof
  if (!credential || !signature || !vk) {
    throw new Error('Invalid proof format')
  }
  const payload = encoder.encode(JSON.stringify(credential))
  return verifySignature(vk, payload, signature)
}
