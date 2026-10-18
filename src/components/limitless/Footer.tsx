import type { ReactNode } from 'react'
import Icon from './Icon'

export interface FooterLink {
  icon: string
  label: string
  href: string
}

interface FooterProps {
  text?: ReactNode
  links?: FooterLink[]
}

export default function Footer({
  text = <>&copy; {new Date().getFullYear()} Limitless Web App Kit</>,
  links = [],
}: FooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-lt-border bg-white px-5 py-3 text-lt-muted">
      <span>{text}</span>
      <ul className="flex gap-4">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-lt-text">
              <Icon name={l.icon} className="mr-2" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
