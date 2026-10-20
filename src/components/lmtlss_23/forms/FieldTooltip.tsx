import { useState, type ReactNode } from 'react'

interface FieldTooltipProps {
  text: string
  /** Hiện khi rê chuột (hover) hoặc khi input được focus */
  trigger?: 'hover' | 'focus'
  children: ReactNode
}

/** Tooltip phía trên input, dùng class .tooltip của Bootstrap (thay cho data-popup="tooltip") */
export default function FieldTooltip({ text, trigger = 'hover', children }: FieldTooltipProps) {
  const [show, setShow] = useState(false)

  const handlers =
    trigger === 'focus'
      ? { onFocus: () => setShow(true), onBlur: () => setShow(false) }
      : { onMouseEnter: () => setShow(true), onMouseLeave: () => setShow(false) }

  return (
    <div className="position-relative" {...handlers}>
      {children}
      <div
        role="tooltip"
        aria-hidden={!show}
        className={`tooltip bs-tooltip-top ${show ? 'show' : ''}`.trim()}
        style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', width: 'max-content', pointerEvents: 'none' }}
      >
        <div className="arrow" style={{ left: '50%', marginLeft: '-0.4rem' }} />
        <div className="tooltip-inner">{text}</div>
      </div>
    </div>
  )
}
