import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const FeedbackContext = createContext()

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem('feedback')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback))
  }, [feedback])

  const addFeedback = useCallback((item) => {
    setFeedback((prev) => [...prev, item])
  }, [])

  return React.createElement(
    FeedbackContext.Provider,
    { value: { feedback, addFeedback } },
    children
  )
}

export function useFeedback() {
  return useContext(FeedbackContext)
}
