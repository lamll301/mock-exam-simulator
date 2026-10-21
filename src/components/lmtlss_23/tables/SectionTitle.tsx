import type { ReactNode } from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: ReactNode
  /** Class thêm cho vùng bọc, ví dụ "pt-2" để cách nhóm phía trên */
  className?: string
}

/** Tiêu đề nhóm ví dụ phía trên các card ("Basic tables", "Card body tables"...) */
export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={['mb-3', className].filter(Boolean).join(' ')}>
      <h6 className="mb-0 font-weight-semibold">{title}</h6>
      {subtitle && <span className="text-muted d-block">{subtitle}</span>}
    </div>
  )
}
