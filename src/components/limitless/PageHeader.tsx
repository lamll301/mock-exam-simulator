import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

export interface Crumb {
  label: string
  to?: string
  icon?: string
}

export interface HeaderButton {
  icon: string
  label: string
  to?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  /** Nút lớn bên phải tiêu đề (btn-float) */
  buttons?: HeaderButton[]
  /** Phần tử bên phải thanh breadcrumb (Support, Settings...) */
  breadcrumbActions?: ReactNode
}

function FloatButton({ icon, label, to = '#' }: HeaderButton) {
  return (
    <Link to={to} className="flex flex-col items-center px-4 py-1 text-lt-text hover:bg-black/5">
      <Icon name={icon} className="text-2xl text-lt-primary" />
      <span className="text-xs">{label}</span>
    </Link>
  )
}

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-lt-text">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-lt-muted">/</span>}
          {c.to ? (
            <Link to={c.to} className="hover:text-lt-primary">
              {c.icon && <Icon name={c.icon} className="mr-2" />}
              {c.label}
            </Link>
          ) : (
            <span className="text-lt-muted">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  buttons,
  breadcrumbActions,
}: PageHeaderProps) {
  return (
    <div className="border-b border-lt-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <h4 className="text-lg">
          <Icon name="arrow-left52" className="mr-2" />
          <span className="font-medium">{title}</span>
          {subtitle && <span> - {subtitle}</span>}
        </h4>
        {buttons && (
          <div className="flex">
            {buttons.map((b) => (
              <FloatButton key={b.label} {...b} />
            ))}
          </div>
        )}
      </div>

      {(breadcrumbs || breadcrumbActions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-lt-border bg-black/[0.02] px-5 py-2.5">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {breadcrumbActions}
        </div>
      )}
    </div>
  )
}
