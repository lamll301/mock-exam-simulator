import type { RouteObject } from 'react-router-dom'
import { NotFound, Forbidden, MethodNotAllowed, ServerError, ServiceUnavailable } from '@/pages/ErrorPage'

export const errorRoutes: RouteObject[] = [
  { path: '/403', element: <Forbidden /> },
  { path: '/405', element: <MethodNotAllowed /> },
  { path: '/500', element: <ServerError /> },
  { path: '/503', element: <ServiceUnavailable /> },
  { path: '*', element: <NotFound /> },
]