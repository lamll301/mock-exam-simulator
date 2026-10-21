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
  children: ReactNode
}

/** Card "ví dụ bảng" của template: tiêu đề h5 + 3 nút collapse/reload/remove + mô tả + bảng */
export default function TableCard({ title, description, inBody = false, children }: TableCardProps) {
  return (
    <Card title={title} titleAs="h5" tools={['collapse', 'reload', 'remove']} bodyClassName="">
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
