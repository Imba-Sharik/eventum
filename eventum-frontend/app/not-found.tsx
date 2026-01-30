import ErrorPage from '@/components/shared/ErrorPage'

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Страница не найдена"
      description="Запрашиваемая страница не существует или была перемещена."
    />
  )
}
