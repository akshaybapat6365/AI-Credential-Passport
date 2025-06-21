import React, { useState } from 'react'
import { Button } from './Button'
import { generateProofForCredential, verifyProof } from '../lib/zkp'
import type { Credential, Proof } from '../lib/types'

export function CredentialCard({ cred }: { cred: Credential }) {
  const [proof, setProof] = useState<Proof | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<{
    title: string
    message: string
  } | null>(null)

  const close = (): void => setModal(null)

  const handleGenerate = async (): Promise<void> => {
    setLoading(true)
    try {
      const p = await generateProofForCredential(cred)
      setProof(p)
      setModal({ title: 'Proof Generated', message: JSON.stringify(p) })
    } catch (err) {
      setModal({ title: 'Generation Failed', message: (err as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (): Promise<void> => {
    setLoading(true)
    try {
      const result = await verifyProof(proof)
      setModal({
        title: 'Verification Result',
        message: result ? 'Valid proof' : 'Invalid proof',
      })
    } catch (err) {
      setModal({ title: 'Verification Failed', message: (err as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card rounded p-4 shadow">
      <p className="font-bold">{cred.name}</p>
      <p className="text-sm text-muted-foreground">{cred.id}</p>
      <div className="mt-2 space-x-2">
        <Button size="sm" onClick={handleGenerate} disabled={loading}>
          Generate Proof
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleVerify}
          disabled={!proof || loading}
        >
          Verify Proof
        </Button>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card rounded p-4 space-y-2 w-72">
            <h2 className="font-bold">{modal.title}</h2>
            <pre className="break-all text-xs whitespace-pre-wrap">{modal.message}</pre>
            <div className="flex justify-end">
              <Button onClick={close}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

