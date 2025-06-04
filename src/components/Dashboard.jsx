import React from 'react'
import { useCredentials } from '../hooks/useCredentials'
import { AddCredentialModal } from './AddCredentialModal'

export function Dashboard() {
  const { credentials } = useCredentials()

  return (
    <div className="p-4 space-y-4">
      <AddCredentialModal />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((cred) => (
          <div key={cred.id} className="bg-card rounded p-4 shadow">
            <p className="font-bold">{cred.name}</p>
            <p className="text-sm text-muted-foreground">{cred.id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
