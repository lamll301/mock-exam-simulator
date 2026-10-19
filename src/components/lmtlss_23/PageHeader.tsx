import { useState, type MouseEvent, type ReactNode } from 'react'
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
  /** Phần tử bên phải thanh breadcrumb (.breadcrumb-elements-item: Support, Settings...) */
  breadcrumbActions?: ReactNode
}

const noop = (e: MouseEvent) => e.preventDefault()

function FloatButton({ icon, label, to }: HeaderButton) {
  const cls = 'btn btn-link btn-float text-default'
  const content = (
    <>
      <Icon name={icon} className="text-primary" />
      <span>{label}</span>
    </>
  )
  return to ? (
    <Link to={to} className={cls}>
      {content}
    </Link>
  ) : (
    <a href="#" className={cls} onClick={noop}>
      {content}
    </a>
  )
}

/** Nút "..." chỉ hiện trên mobile để bật/tắt .header-elements (thay cho app.js) */
function ElementsToggle({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="#"
      className="header-elements-toggle text-default d-md-none"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <Icon name="more" />
    </a>
  )
}

export default function PageHeader({ title, subtitle, breadcrumbs, buttons, breadcrumbActions }: PageHeaderProps) {
  const [showButtons, setShowButtons] = useState(false)
  const [showActions, setShowActions] = useState(false)

  return (
    <div className="page-header page-header-light">
      <div className="page-header-content header-elements-md-inline">
        <div className="page-title d-flex">
          <h4>
            <Icon name="arrow-left52" className="mr-2" /> <span className="font-weight-semibold">{title}</span>
            {subtitle && ` - ${subtitle}`}
          </h4>
          {buttons && <ElementsToggle onClick={() => setShowButtons((v) => !v)} />}
        </div>

        {buttons && (
          <div className={`header-elements ${showButtons ? '' : 'd-none'}`}>
            <div className="d-flex justify-content-center">
              {buttons.map((b) => (
                <FloatButton key={b.label} {...b} />
              ))}
            </div>
          </div>
        )}
      </div>

      {(breadcrumbs || breadcrumbActions) && (
        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
          <div className="d-flex">
            {breadcrumbs && (
              <div className="breadcrumb">
                {breadcrumbs.map((c, i) =>
                  c.to ? (
                    <Link key={i} to={c.to} className="breadcrumb-item">
                      {c.icon && <Icon name={c.icon} className="mr-2" />} {c.label}
                    </Link>
                  ) : (
                    <span key={i} className="breadcrumb-item active">
                      {c.label}
                    </span>
                  ),
                )}
              </div>
            )}
            {breadcrumbActions && <ElementsToggle onClick={() => setShowActions((v) => !v)} />}
          </div>

          {breadcrumbActions && (
            <div className={`header-elements ${showActions ? '' : 'd-none'}`}>
              <div className="breadcrumb justify-content-center">{breadcrumbActions}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
