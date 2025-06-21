export async function issueCredential(subjectDid, data) {
  if (!subjectDid) {
    throw new Error('No DID provided')
  }

  const SDK = typeof window === 'undefined'
    ? (await import('@atala/prism-wallet-sdk/build/node/index.cjs')).default
    : (await import('@atala/prism-wallet-sdk')).default

  const apollo = new SDK.Apollo()
  const castor = new SDK.Castor(apollo)
  const pollux = new SDK.Pollux(castor)
  const keyPair = SDK.Secp256k1KeyPair.generateKeyPair()
  const issuerDid = await castor.createPrismDID(keyPair)
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: issuerDid.toString(),
    sub: subjectDid,
    nbf: now,
    exp: now + 60 * 60 * 24 * 365,
    jti: `${Date.now()}${Math.random().toString(16).slice(2)}`,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: { id: subjectDid, ...data },
    },
  }

  const jws = await pollux.jwt.sign({
    issuerDID: issuerDid,
    privateKey: keyPair.privateKey,
    payload,
  })

  const credential = SDK.JWTCredential.fromJWS(jws)

  return { id: credential.id, subjectId: subjectDid, name: data.name, jws }
}
