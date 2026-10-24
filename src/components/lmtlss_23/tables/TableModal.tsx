import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface TableModalProps {
  open: boolean
  onClose: () => void
  title: string
  /** modal-lg cho modal có bảng bên trong */
  large?: boolean
  /** Class thêm cho .modal-header, ví dụ "bg-transparent" */
  headerClassName?: string
  /** Class thêm cho .modal-footer */
  footerClassName?: string
  /** true: không bọc children trong .modal-body (dùng khi children là bảng sát mép) */
  bare?: boolean
  footer: ReactNode
  children: ReactNode
}

/** Modal kiểu Bootstrap 4 dựng bằng React (portal ra body, đóng bằng Esc / click nền / nút ×) */
export default function TableModal({
  open,
  onClose,
  title,
  large,
  headerClassName,
  footerClassName,
  bare,
  footer,
  children,
}: TableModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <>
      <div
        className="modal fade show"
        role="dialog"
        style={{ display: 'block' }}
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className={`modal-dialog${large ? ' modal-lg' : ''}`}>
          <div className="modal-content">
            <div className={['modal-header', headerClassName].filter(Boolean).join(' ')}>
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={onClose}>
                &times;
              </button>
            </div>
            {bare ? children : <div className="modal-body">{children}</div>}
            <div className={['modal-footer', footerClassName].filter(Boolean).join(' ')}>{footer}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>,
    document.body,
  )
}
