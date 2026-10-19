import type { ReactNode } from 'react'

/** Vùng nội dung bên dưới PageHeader (class "content" của template) */
export default function Content({ children }: { children: ReactNode }) {
  return <div className="content">{children}</div>
}
