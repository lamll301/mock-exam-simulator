import ErrorPage from '@/components/admin/ErrorPage'

export default function Error503Page() {
  return <ErrorPage code="503" message="Oops, an error has occurred. Service unavailable!" />
}
