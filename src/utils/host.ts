export type AppHost = 'admin' | 'main'

function readAppHost(): AppHost {
  return import.meta.env.VITE_APP_HOST === 'admin' ? 'admin' : 'main'
}

export const APP_HOST: AppHost = readAppHost()