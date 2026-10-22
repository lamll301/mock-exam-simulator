import { useState } from 'react'
import Icon from './Icon'

export interface FooterLink {
  icon: string
  label: string
  href: string
  className?: string
  textClassName?: string
}

interface FooterProps {
  text?: React.ReactNode
  links?: FooterLink[]
}

const defaultLinks: FooterLink[] = [
  {
    icon: 'lifebuoy',
    label: 'Hỗ trợ',
    href: 'https://github.com/lamll301',
  },
  {
    icon: 'file-text2',
    label: 'Tài liệu',
    href: 'https://github.com/lamll301',
  },
  {
    icon: 'heart6',
    label: 'Ủng hộ',
    href: 'https://github.com/sponsors/lamll301',
    className: 'font-weight-semibold',
    textClassName: 'text-pink-400',
  },
]

export default function Footer({
  text,
  links = defaultLinks,
}: FooterProps) {
  const [open, setOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  const footerText = text ?? (
    <>
      &copy; 2026 - {currentYear}.{' '}
      <a
        href="https://github.com/lamll301/mock-exam-simulator"
        target="_blank"
        rel="noreferrer"
      >
        Crafted with ❤️
      </a>{' '}
      by{' '}
      <a
        href="https://github.com/lamll301"
        target="_blank"
        rel="noreferrer"
      >
        lamll301
      </a>
    </>
  )

  return (
    <div className="navbar navbar-expand-lg navbar-light">
      <div className="text-center d-lg-none w-100">
        <button
          type="button"
          className="navbar-toggler dropdown-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="unfold" className="mr-2" />
          Chân trang
        </button>
      </div>

      <div className={`navbar-collapse collapse ${open ? 'show' : ''}`} id="navbar-footer">
        <span className="navbar-text">{footerText}</span>

        <ul className="navbar-nav ml-lg-auto">
          {links.map((l) => (
            <li key={l.label} className="nav-item">
              <a href={l.href} className={`navbar-nav-link ${l.className ?? ''}`.trim()} target="_blank" rel="noreferrer">
                <span className={l.textClassName}>
                  <Icon name={l.icon} className="mr-2" /> {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}