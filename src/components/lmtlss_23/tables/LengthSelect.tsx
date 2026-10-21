import { useEffect, useRef, useState } from 'react'

interface LengthSelectProps {
  value: number
  options: number[]
  onChange: (value: number) => void
}

/** Giả lập select2 (không có ô tìm kiếm) bằng chính class của select2, dùng cho ô "Show" của DataTable */
export default function LengthSelect({ value, options, onChange }: LengthSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // click ra ngoài / nhấn Esc thì đóng
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span
      ref={ref}
      className={`select2 select2-container select2-container--default${open ? ' select2-container--open' : ''}`}
      style={{ width: 'auto' }}
    >
      <span className="selection">
        <span
          className="select2-selection select2-selection--single"
          role="combobox"
          aria-expanded={open}
          tabIndex={0}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpen((o) => !o)
            }
          }}
        >
          <span className="select2-selection__rendered">{value}</span>
          <span className="select2-selection__arrow" role="presentation">
            <b role="presentation" />
          </span>
        </span>
      </span>

      {open && (
        <span className="select2-dropdown select2-dropdown--below" style={{ minWidth: '100%' }}>
          <span className="select2-results">
            <ul className="select2-results__options" role="listbox">
              {options.map((n) => (
                <li
                  key={n}
                  role="option"
                  aria-selected={n === value}
                  className={`select2-results__option${n === value ? ' select2-results__option--highlighted' : ''}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(n)
                    setOpen(false)
                  }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </span>
        </span>
      )}
    </span>
  )
}
