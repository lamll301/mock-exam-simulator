import type { ReactNode } from 'react'

type Align = 'left' | 'center' | 'right'

interface HelpTextProps {
  /** Màu chữ Bootstrap: muted (mặc định), success, danger... */
  tone?: string
  align?: Align
  children: ReactNode
}

/** Dòng chú thích dưới input (.form-text) */
export function HelpText({ tone = 'muted', align, children }: HelpTextProps) {
  return <span className={['form-text', `text-${tone}`, align && `text-${align}`].filter(Boolean).join(' ')}>{children}</span>
}

interface HelpBadgeProps {
  color: 'primary' | 'danger' | 'info'
  align?: Align
  /** true = badge tràn hết chiều ngang input; false = badge nhỏ nằm trong dòng .form-text */
  fullWidth?: boolean
  children: ReactNode
}

/** Chú thích dạng badge dưới input */
export function HelpBadge({ color, align, fullWidth = false, children }: HelpBadgeProps) {
  if (fullWidth) {
    return (
      <span className={['badge d-block', `badge-${color}`, 'form-text', align && `text-${align}`].filter(Boolean).join(' ')}>
        {children}
      </span>
    )
  }
  return (
    <div className={['d-block form-text', align && `text-${align}`].filter(Boolean).join(' ')}>
      <span className={`badge badge-${color}`}>{children}</span>
    </div>
  )
}
