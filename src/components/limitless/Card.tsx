import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  /** Phần bên phải header (header-elements) */
  actions?: ReactNode
  children?: ReactNode
  className?: string
  /** Class cho vùng body; truyền "" nếu muốn nội dung (bảng...) sát mép card */
  bodyClassName?: string
}

export default function Card({
  title,
  actions,
  children,
  className = '',
  bodyClassName = 'p-5',
}: CardProps) {
  return (
    <section className={`mb-5 rounded border border-lt-border bg-white ${className}`}>
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-lt-border px-5 py-3">
          <h6 className="text-[15px] font-medium">{title}</h6>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
