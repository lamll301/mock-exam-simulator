import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

interface DropdownProps {
  /** Nội dung nút mở dropdown */
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  /** Đóng menu khi bấm vào bên trong (dùng cho menu dạng danh sách lệnh) */
  closeOnClick?: boolean
  /** Thẻ bọc ngoài: "li" khi nằm trong ul.navbar-nav, còn lại dùng "div" */
  as?: 'div' | 'li'
  /** Class của nút mở, ví dụ "navbar-nav-link dropdown-toggle caret-0" */
  triggerClassName?: string
  /** Class thêm cho .dropdown-menu, ví dụ "dropdown-content wmin-md-350" */
  panelClassName?: string
  /** Class thêm cho thẻ bọc (bên cạnh ".dropdown"), ví dụ "nav-item" */
  className?: string
  /**
   * Đặt menu bằng position: fixed (tính từ vị trí nút) để không bị cắt bởi cha có overflow,
   * ví dụ dropdown trong .table-responsive. Tự lật lên trên nếu không đủ chỗ phía dưới.
   */
  fixed?: boolean
}

/**
 * Dropdown dùng class gốc của Bootstrap/Limitless (.dropdown, .dropdown-menu.show...).
 * Thay cho bootstrap.bundle.js (data-toggle="dropdown") vì JS đó không chạy trong React.
 */
export default function Dropdown({
  trigger,
  children,
  align = 'left',
  closeOnClick = false,
  as = 'div',
  triggerClassName = 'dropdown-toggle',
  panelClassName = '',
  className = '',
  fixed = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [fixedStyle, setFixedStyle] = useState<CSSProperties | undefined>()
  const setRoot = (el: HTMLElement | null) => {
    rootRef.current = el
  }

  // Tính vị trí fixed ngay sau khi menu hiện (trước khi trình duyệt vẽ)
  useLayoutEffect(() => {
    if (!fixed || !open || !rootRef.current || !menuRef.current) return
    const rect = rootRef.current.getBoundingClientRect()
    const menuH = menuRef.current.offsetHeight
    const menuW = menuRef.current.offsetWidth
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight
    const flipUp = rect.bottom + menuH > vh && rect.top > menuH
    const left = align === 'right' ? rect.right - menuW : rect.left
    setFixedStyle({
      position: 'fixed',
      top: flipUp ? rect.top - menuH - 2 : rect.bottom + 2,
      left: Math.max(4, Math.min(left, vw - menuW - 4)),
      right: 'auto',
      margin: 0,
    })
  }, [fixed, open, align])

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
    // Menu fixed không đi theo nút khi cuộn / đổi cỡ cửa sổ => đóng lại
    const onMove = () => setOpen(false)
    if (fixed) {
      window.addEventListener('scroll', onMove, true)
      window.addEventListener('resize', onMove)
    }
    return () => {
      window.removeEventListener('scroll', onMove, true)
      window.removeEventListener('resize', onMove)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, fixed])

  const inner = (
    <>
      <a
        href="#"
        aria-expanded={open}
        className={triggerClassName}
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          setOpen((v) => !v)
        }}
      >
        {trigger}
      </a>

      <div
        ref={menuRef}
        style={fixed && open ? fixedStyle : undefined}
        onClick={closeOnClick ? () => setOpen(false) : undefined}
        className={`dropdown-menu ${align === 'right' ? 'dropdown-menu-right' : ''} ${panelClassName} ${open ? 'show' : ''}`}
      >
        {children}
      </div>
    </>
  )

  const cls = `dropdown ${className}`.trim()
  return as === 'li' ? (
    <li ref={setRoot} className={cls}>
      {inner}
    </li>
  ) : (
    <div ref={setRoot} className={cls}>
      {inner}
    </div>
  )
}

/** Một dòng trong menu dropdown (.dropdown-item) */
export function DropdownItem({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <a href="#" className="dropdown-item" onClick={(e) => e.preventDefault()}>
      {icon}
      {children}
    </a>
  )
}

export function DropdownDivider() {
  return <div className="dropdown-divider" />
}
