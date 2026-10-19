import type { CSSProperties } from 'react'

interface ChartPlaceholderProps {
  label?: string
  height?: number
  className?: string
  /** Dùng trên nền màu (card bg-teal-400...) */
  light?: boolean
  /** Bỏ viền trái/phải để chart sát mép card */
  flush?: boolean
  /** Giãn ra lấp phần còn trống của card (height trở thành chiều cao tối thiểu) */
  grow?: boolean
}

/**
 * Template vẽ biểu đồ bằng d3 + jQuery nên không dùng lại được.
 * Chỗ này thay bằng recharts (hoặc thư viện khác) khi làm trang thật.
 */
export default function ChartPlaceholder({
  label = 'Chart',
  height = 120,
  className = '',
  light = false,
  flush = false,
  grow = false,
}: ChartPlaceholderProps) {
  const border = `1px dashed ${light ? 'rgba(255,255,255,.4)' : '#ddd'}`
  const style: CSSProperties = {
    ...(grow ? { minHeight: height, flex: '1 1 auto' } : { height }),
    border,
    ...(flush ? { borderLeft: 0, borderRight: 0 } : {}),
  }
  return (
    <div
      style={style}
      className={`chart d-flex align-items-center justify-content-center font-size-sm ${
        light ? 'text-white-50' : 'text-muted'
      } ${className}`}
    >
      {label}
    </div>
  )
}
