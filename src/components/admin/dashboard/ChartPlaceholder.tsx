interface ChartPlaceholderProps {
  label?: string
  height?: number
  className?: string
}

/**
 * Template vẽ biểu đồ bằng d3 + jQuery nên không dùng lại được.
 * Chỗ này thay bằng recharts (hoặc thư viện khác) khi làm trang thật.
 */
export default function ChartPlaceholder({
  label = 'Chart',
  height = 120,
  className = '',
}: ChartPlaceholderProps) {
  return (
    <div
      style={{ height }}
      className={`flex items-center justify-center border border-dashed border-lt-border text-xs text-lt-muted ${className}`}
    >
      {label}
    </div>
  )
}
