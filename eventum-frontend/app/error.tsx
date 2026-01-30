'use client'

import { useEffect } from 'react'
import ErrorPage from '@/components/shared/ErrorPage'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <ErrorPage
      code="500"
      title="Что-то пошло не так"
      description="Не удалось загрузить данные. Проверьте подключение к интернету или попробуйте позже."
    />
  )
}
