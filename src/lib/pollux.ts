import type { Credential } from './types'

export async function issueCredential(
  subjectDid: string,
  data: Pick<Credential, 'name'>
): Promise<Credential> {
  if (!subjectDid) {
    throw new Error('No DID provided')
  }
  // Simulate Prism Pollux issuance
  return { id: Date.now().toString(), subjectId: subjectDid, ...data }
}
