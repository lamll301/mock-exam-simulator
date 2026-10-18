import type { ReactNode } from 'react'

// Tailwind chỉ sinh class khi thấy nguyên chuỗi, nên map đầy đủ ở đây.
const bgClass = {
  blue: 'bg-lt-primary text-white',
  'blue-400': 'bg-lt-blue-400 text-white',
  success: 'bg-lt-success text-white',
  'success-400': 'bg-lt-success-400 text-white',
  danger: 'bg-lt-danger text-white',
  warning: 'bg-lt-warning-400 text-white',
  grey: 'bg-lt-grey-400 text-white',
  'teal-800': 'bg-lt-teal-800 text-white',
  none: 'bg-transparent',
} as const

export type BadgeColor = keyof typeof bgClass

interface BadgeProps {
  color?: BadgeColor
  pill?: boolean
  className?: string
  children: ReactNode
}

export function Badge({ color = 'blue', pill = false, className = '', children }: BadgeProps) {
  const shape = pill ? 'rounded-full px-2' : 'rounded px-1.5'
  return (
    <span
      className={`inline-block py-0.5 text-[11px] leading-tight font-medium ${shape} ${bgClass[color]} ${className}`}
    >
      {children}
    </span>
  )
}

const markClass = {
  blue: 'border-lt-primary',
  success: 'border-lt-success',
  danger: 'border-lt-danger',
  warning: 'border-lt-warning-400',
  grey: 'border-lt-grey-400',
} as const

export type BadgeMarkColor = keyof typeof markClass

/** Chấm tròn trạng thái (badge-mark của template) */
export function BadgeMark({ color, className = '' }: { color: BadgeMarkColor; className?: string }) {
  return (
    <span className={`inline-block size-2 rounded-full border-2 bg-white ${markClass[color]} ${className}`} />
  )
}

/** Chuyển màu dạng chuỗi trong dữ liệu menu ("blue-400"...) sang BadgeColor */
export function toBadgeColor(value?: string): BadgeColor {
  return value && value in bgClass ? (value as BadgeColor) : 'none'
}
