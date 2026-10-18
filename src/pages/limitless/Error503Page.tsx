import ErrorPage from '@/components/limitless/ErrorPage'

export default function Error503Page() {
  return <ErrorPage code="503" message="Oops, an error has occurred. Service unavailable!" />
}
