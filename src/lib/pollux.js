export async function issueCredential(subjectDid, data) {
  if (!subjectDid) {
    throw new Error('No DID provided')
  }
  // Simulate Prism Pollux issuance
  return { id: Date.now().toString(), subjectId: subjectDid, ...data }
}
