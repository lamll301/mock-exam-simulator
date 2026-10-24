import type { ReactNode } from 'react'
import Card from '../Card'

interface TableCardProps {
  title: string
  /** Đoạn mô tả phía trên bảng */
  description: ReactNode
  /**
   * false (mặc định): bảng sát mép card, nằm dưới phần mô tả.
   * true: mô tả và bảng cùng nằm trong .card-body (bảng có khoảng trắng xung quanh).
   */
  inBody?: boolean
  /** Class thêm cho .card, ví dụ "bg-indigo-400" (card có màu nền) */
  cardClassName?: string
  /** Thẻ tiêu đề; mặc định h5 (card có màu nền trong template dùng h6) */
  titleAs?: 'h5' | 'h6'
  children: ReactNode
}

/** Card "ví dụ bảng" của template: tiêu đề h5 + 3 nút collapse/reload/remove + mô tả + bảng */
export default function TableCard({ title, description, inBody = false, cardClassName, titleAs = 'h5', children }: TableCardProps) {
  return (
    <Card title={title} titleAs={titleAs} className={cardClassName} tools={['collapse', 'reload', 'remove']} bodyClassName="">
      {inBody ? (
        <div className="card-body">
          <p className="mb-3">{description}</p>
          {children}
        </div>
      ) : (
        <>
          <div className="card-body">{description}</div>
          {children}
        </>
      )}
    </Card>
  )
}
