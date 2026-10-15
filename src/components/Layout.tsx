import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-6 py-4 font-semibold">My App</header>
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  )
}