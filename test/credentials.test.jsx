import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { CredentialsProvider } from '../src/hooks/useCredentials'
import { Dashboard } from '../src/components/Dashboard'
vi.mock('../src/lib/pollux', () => ({
  issueCredential: vi.fn().mockResolvedValue({
    id: '1',
    name: 'Test',
    subjectId: 'did:test',
    jws: 'token',
  }),
}))

vi.mock('../src/hooks/useWallet', () => ({
  useWallet: () => ({ did: 'did:test' }),
}))

function Wrapper({ children }) {
  return React.createElement(CredentialsProvider, null, children)
}

beforeEach(() => {
  localStorage.clear()
})

describe('credential dashboard', () => {
  it('creates and displays credential', async () => {
    render(React.createElement(Dashboard), { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Add Credential'))
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByText('Issue'))
    expect(await screen.findByText('Test')).not.toBeNull()
  })
})
