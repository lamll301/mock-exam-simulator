import type { ReactNode } from 'react'

// Class màu của Limitless (colors.min.css)
const bgClass = {
  blue: 'bg-blue',
  'blue-400': 'bg-blue-400',
  success: 'bg-success',
  'success-400': 'bg-success-400',
  danger: 'bg-danger',
  warning: 'bg-warning-400',
  grey: 'bg-grey-400',
  'teal-800': 'bg-teal-800',
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
  return <span className={`badge ${bgClass[color]} ${pill ? 'badge-pill' : ''} ${className}`.trim()}>{children}</span>
}

const markClass = {
  blue: 'border-blue',
  success: 'border-success',
  danger: 'border-danger',
  warning: 'border-warning-300',
  grey: 'border-grey-400',
} as const

export type BadgeMarkColor = keyof typeof markClass

/** Chấm tròn trạng thái (badge badge-mark của template) */
export function BadgeMark({ color, className = '' }: { color: BadgeMarkColor; className?: string }) {
  return <span className={`badge badge-mark ${markClass[color]} ${className}`.trim()} />
}

/** Chuyển màu dạng chuỗi trong dữ liệu menu ("blue-400"...) sang BadgeColor */
export function toBadgeColor(value?: string): BadgeColor {
  return value && value in bgClass ? (value as BadgeColor) : 'none'
}
