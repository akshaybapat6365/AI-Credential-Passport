import React from 'react'
import { useFeedback } from '../hooks/useFeedback'
import { SubmitFeedbackForm } from './SubmitFeedbackForm'
import { FeedbackItem } from './FeedbackItem'

export function FeedbackSpace() {
  const { feedback } = useFeedback()

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <SubmitFeedbackForm />
      <div className="space-y-4">
        {feedback.map((item) => (
          <FeedbackItem key={item.id} feedback={item} />
        ))}
      </div>
    </div>
  )
}
