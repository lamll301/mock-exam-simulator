export type AppHost = 'admin' | 'main'

const ADMIN_SUBDOMAIN = 'admin'

export function resolveAppHost(hostname: string = window.location.hostname): AppHost {
  const subdomain = hostname.split('.')[0]
  return subdomain === ADMIN_SUBDOMAIN ? 'admin' : 'main'
}