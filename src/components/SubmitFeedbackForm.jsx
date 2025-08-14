import React, { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useFeedback } from '../hooks/useFeedback'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function SubmitFeedbackForm() {
  const { did } = useWallet()
  const { addFeedback } = useFeedback()
  const [text, setText] = useState('')

  const handleSubmit = async () => {
    if (!text.trim()) return
    // In the future, we would generate a ZK proof here to submit anonymously
    addFeedback({ id: Date.now().toString(), text })
    setText('')
  }

  if (!did) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please connect your wallet to provide feedback.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
      </Header>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="What's on your mind? Your feedback is anonymous."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit Anonymously</Button>
      </CardContent>
    </Card>
  )
}
