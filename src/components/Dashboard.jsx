import React from 'react'
import { useCredentials } from '../hooks/useCredentials'
import { AddCredentialModal } from './AddCredentialModal'
import { CredentialCard } from './CredentialCard'

export function Dashboard() {
  const { credentials } = useCredentials()

  return (
    <div className="p-4 space-y-4">
      <AddCredentialModal />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((cred) => (
          <CredentialCard key={cred.id} cred={cred} />
        ))}
      </div>
    </div>
  )
}
