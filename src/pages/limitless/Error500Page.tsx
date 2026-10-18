import ErrorPage from '@/components/limitless/ErrorPage'

export default function Error500Page() {
  return <ErrorPage code="500" message="Oops, an error has occurred. Internal server error!" />
}
