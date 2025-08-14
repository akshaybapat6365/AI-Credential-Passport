import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function FeedbackItem({ feedback }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anonymous Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{feedback.text}</p>
      </CardContent>
    </Card>
  )
}
