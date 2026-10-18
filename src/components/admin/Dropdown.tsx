import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DropdownProps {
  /** Nội dung nút mở dropdown */
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  /** Đóng menu khi bấm vào bên trong (dùng cho menu dạng danh sách lệnh) */
  closeOnClick?: boolean
  triggerClassName?: string
  panelClassName?: string
  className?: string
}

export default function Dropdown({
  trigger,
  children,
  align = 'left',
  closeOnClick = false,
  triggerClassName = '',
  panelClassName = '',
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {open && (
        <div
          onClick={closeOnClick ? () => setOpen(false) : undefined}
          className={`absolute top-full z-50 mt-1 rounded border border-lt-border bg-white text-lt-text shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${panelClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/** Một dòng trong menu dropdown (dropdown-item) */
export function DropdownItem({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="flex items-center gap-2 px-4 py-2 whitespace-nowrap hover:bg-black/5"
    >
      {icon}
      {children}
    </a>
  )
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-lt-border" />
}
