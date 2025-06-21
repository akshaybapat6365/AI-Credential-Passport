import SDK from '@atala/prism-wallet-sdk'

const apollo = new SDK.Apollo()
const castor = new SDK.Castor(apollo)

export async function createOrLoadDID(address: string): Promise<string> {
  const key = `prismDid-${address}`
  const stored = localStorage.getItem(key)
  if (stored) {
    return castor.parseDID(stored).toString()
  }
  // In a real implementation we would create a DID using the Prism SDK.
  // For this demo we simply derive it from the reward address.
  const did = castor.parseDID(`did:prism:${address}`)
  localStorage.setItem(key, did.toString())
  return did.toString()
}
