import { useRoutes, type RouteObject } from 'react-router-dom'
import { APP_HOST, type AppHost } from '@/utils/host'
import { adminRoutes } from './routes/adminRoutes'
import { mainRoutes } from './routes/mainRoutes'
import { errorRoutes } from './routes/errorRoutes'

const routesByHost: Record<AppHost, RouteObject[]> = {
  admin: adminRoutes,
  main: mainRoutes,
}

const appRoutes = [...routesByHost[APP_HOST], ...errorRoutes]

export default function App() {
  return useRoutes(appRoutes)
}