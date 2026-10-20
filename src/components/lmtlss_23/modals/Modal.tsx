import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'full'
export type ModalTitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'

/** Class kích thước của Limitless: modal-xs = 300px, sm = 400px, md = 600px, lg = 900px, full = 94% */
const sizeClass: Record<ModalSize, string> = {
  xs: 'modal-xs',
  sm: 'modal-sm',
  md: '',
  lg: 'modal-lg',
  full: 'modal-full',
}

/** Thời gian transition của .fade trong Bootstrap (ms) */
const FADE_MS = 300

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

// Khoá cuộn trang dùng chung cho mọi modal đang mở (thay cho body.modal-open của bootstrap.bundle.js)
let lockCount = 0
let savedPadding = ''

function lockBody() {
  if (lockCount++ === 0) {
    const body = document.body
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    savedPadding = body.style.paddingRight
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    body.classList.add('modal-open')
  }
}

function unlockBody() {
  if (lockCount > 0 && --lockCount === 0) {
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = savedPadding
  }
}

const ModalContext = createContext<{ close: () => void }>({ close: () => {} })

/** Lấy hàm đóng modal hiện tại (thay cho data-dismiss="modal") */
export const useModal = () => useContext(ModalContext)

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: ModalSize
  /** false = bỏ class .fade, modal hiện ra ngay không hiệu ứng */
  fade?: boolean
  /** false = không có lớp nền mờ; 'static' = có nền nhưng bấm ra ngoài không đóng */
  backdrop?: boolean | 'static'
  /** false = bấm Esc không đóng modal */
  keyboard?: boolean
  /** Cuộn trong thân modal (.modal-dialog-scrollable) */
  scrollable?: boolean
  centered?: boolean
  /** Class thêm cho .modal-dialog */
  className?: string
  /** Class thêm cho .modal-content, ví dụ "bg-teal-300" */
  contentClassName?: string
  /** Tương ứng các sự kiện show/shown/hide/hidden.bs.modal */
  onShow?: () => void
  onShown?: () => void
  onHide?: () => void
  onHidden?: () => void
  children: ReactNode
}

/**
 * Modal dùng class gốc của Bootstrap/Limitless (.modal, .modal-dialog, .modal-content, .modal-backdrop).
 * Thay cho bootstrap.bundle.js (data-toggle="modal") vì JS đó không chạy trong React.
 * Render qua portal vào <body>; children là ModalHeader / ModalBody / ModalFooter (hoặc <form> bọc body + footer).
 */
export default function Modal({
  open,
  onClose,
  size = 'md',
  fade = true,
  backdrop = true,
  keyboard = true,
  scrollable = false,
  centered = false,
  className = '',
  contentClassName = '',
  onShow,
  onShown,
  onHide,
  onHidden,
  children,
}: ModalProps) {
  // mounted = có trong DOM; shown = đã thêm class .show (để transition fade chạy được)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const pressedOnBackdrop = useRef(false)
  const wasOpen = useRef(false)
  const latest = useRef({ onClose, onShow, onShown, onHide, onHidden, fade })
  console.log('[modal v2] render', { open, mounted, shown })

  // Luôn giữ callback mới nhất mà không phải đưa vào dependency của effect bên dưới
  useEffect(() => {
    latest.current = { onClose, onShow, onShown, onHide, onHidden, fade }
  })

  useEffect(() => {
    const was = wasOpen.current
    wasOpen.current = open
    const ms = latest.current.fade ? FADE_MS : 0

    if (open) {
      latest.current.onShow?.()
      setMounted(true)
      // Việc thêm .show nằm ở effect riêng bên dưới (chạy sau khi modal đã vào DOM)
      return undefined
    }

    if (was) {
      latest.current.onHide?.()
      setShown(false)
      const timer = window.setTimeout(() => {
        setMounted(false)
        latest.current.onHidden?.()
      }, ms)
      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [open])

  // Khi modal đã có trong DOM và đang open: đợi 1 frame rồi thêm .show để transition fade chạy.
  // Tách riêng khỏi effect [open] vì lúc đó modalRef.current có thể còn null (React chưa render xong).
  useEffect(() => {
    if (!open || !mounted) return undefined
    console.log('[modal v2] effect start')
    let timer: number | undefined
    const raf = requestAnimationFrame(() => {
      console.log('[modal] raf fired, el =', modalRef.current)
      const el = modalRef.current
      if (!el) return
      void el.offsetHeight // ép reflow để transition chạy
      setShown(true)
      console.log('[modal v2] timer fired, el =', modalRef.current)
      if (!el.contains(document.activeElement)) el.focus()
      timer = window.setTimeout(() => latest.current.onShown?.(), latest.current.fade ? FADE_MS : 0)
    })
    return () => {
      console.log('[modal] effect cleanup')
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [open, mounted])

  useEffect(() => {
    if (!mounted) return undefined
    lockBody()
    return unlockBody
  }, [mounted])

  useEffect(() => {
    if (!open || !keyboard) return undefined
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') latest.current.onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, keyboard])

  if (!mounted) return null

  const state = cx(fade && 'fade', shown && 'show')

  return createPortal(
    <ModalContext.Provider value={{ close: onClose }}>
      <div
        ref={modalRef}
        className={cx('modal', state)}
        style={{ display: 'block' }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        // Chỉ đóng khi bấm VÀ nhả chuột trên nền, tránh đóng nhầm khi bôi đen chữ kéo ra ngoài
        onMouseDown={(e) => {
          pressedOnBackdrop.current = e.target === e.currentTarget
        }}
        onClick={(e) => {
          if (backdrop === true && pressedOnBackdrop.current && e.target === e.currentTarget) onClose()
        }}
      >
        <div
          className={cx(
            'modal-dialog',
            sizeClass[size],
            scrollable && 'modal-dialog-scrollable',
            centered && 'modal-dialog-centered',
            className,
          )}
          role="document"
        >
          <div className={cx('modal-content', contentClassName)}>{children}</div>
        </div>
      </div>
      {backdrop !== false && <div className={cx('modal-backdrop', state)} />}
    </ModalContext.Provider>,
    document.body,
  )
}

// ---------- các phần của modal ----------

interface ModalHeaderProps {
  title: ReactNode
  /** Thẻ của tiêu đề; mặc định h5, "span" cho kiểu tiêu đề cơ bản */
  as?: ModalTitleTag
  titleClassName?: string
  /** Class thêm cho .modal-header, ví dụ "bg-primary" hoặc "pb-3" */
  className?: string
  closeButton?: boolean
}

export function ModalHeader({ title, as: Title = 'h5', titleClassName = '', className = '', closeButton = true }: ModalHeaderProps) {
  const { close } = useModal()
  return (
    <div className={cx('modal-header', className)}>
      <Title className={cx('modal-title', titleClassName)}>{title}</Title>
      {closeButton && (
        <button type="button" className="close" aria-label="Close" onClick={close}>
          &times;
        </button>
      )}
    </div>
  )
}

export function ModalBody({ className = '', children }: { className?: string; children?: ReactNode }) {
  return <div className={cx('modal-body', className)}>{children}</div>
}

export function ModalFooter({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={cx('modal-footer', className)}>{children}</div>
}

/** Nút đóng modal (thay cho data-dismiss="modal") */
export function ModalDismiss({ className = 'btn btn-link', children }: { className?: string; children: ReactNode }) {
  const { close } = useModal()
  return (
    <button type="button" className={className} onClick={close}>
      {children}
    </button>
  )
}
