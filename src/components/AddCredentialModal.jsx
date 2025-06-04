import React, { useState } from 'react'
import { Button } from './Button'
import { useCredentials } from '../hooks/useCredentials'
import { useWallet } from '../hooks/useWallet'
import { issueCredential as polluxIssueCredential } from '../lib/pollux'

export function AddCredentialModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { addCredential } = useCredentials()
  const { did } = useWallet()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const cred = await polluxIssueCredential(did, { name })
      addCredential(cred)
      setName('')
      setOpen(false)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return <Button onClick={() => setOpen(true)}>Add Credential</Button>
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form onSubmit={submit} className="bg-card rounded p-4 space-y-2 w-72">
        <input
          className="border w-full p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Issuing...' : 'Issue'}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-500 break-all">{error.message}</p>
        )}
      </form>
    </div>
  )
}
