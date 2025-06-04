import React, { useState } from 'react'
import { Button } from './Button'
import { useCredentials } from '../hooks/useCredentials'

function issueCredential(data) {
  // Simulate Prism SDK issuing
  return Promise.resolve({ id: Date.now().toString(), ...data })
}

export function AddCredentialModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const { addCredential } = useCredentials()

  const submit = async (e) => {
    e.preventDefault()
    const cred = await issueCredential({ name })
    addCredential(cred)
    setName('')
    setOpen(false)
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
          <Button type="submit">Issue</Button>
        </div>
      </form>
    </div>
  )
}
