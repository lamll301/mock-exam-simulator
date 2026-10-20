import { useState, type ReactNode } from 'react'
import Icon from './Icon'

export type CardTool = 'collapse' | 'reload' | 'remove'

interface CardProps {
  title?: string
  /** Thẻ tiêu đề: template dùng h6 ở hầu hết card, h5 ở các trang form */
  titleAs?: 'h5' | 'h6'
  /** Phần bên phải header (.header-elements) */
  actions?: ReactNode
  /** Các nút nhỏ góc phải header, thay cho data-action của template (collapse / reload / remove) */
  tools?: CardTool[]
  children?: ReactNode
  className?: string
  /** Class của .card-header, ví dụ "header-elements-sm-inline" */
  headerClassName?: string
  /** Class cho vùng body (mặc định "card-body"); truyền "" nếu muốn nội dung (bảng, chart) sát mép card */
  bodyClassName?: string
}

const toolIcon: Record<CardTool, string> = {
  collapse: 'arrow-down12',
  reload: 'sync',
  remove: 'cross2',
}

/** Cụm nút collapse / reload / remove (.list-icons > a.list-icons-item[data-action]) */
function CardTools({
  tools,
  collapsed,
  spinning,
  onCollapse,
  onReload,
  onRemove,
}: {
  tools: CardTool[]
  collapsed: boolean
  spinning: boolean
  onCollapse: () => void
  onReload: () => void
  onRemove: () => void
}) {
  const handlers: Record<CardTool, () => void> = { collapse: onCollapse, reload: onReload, remove: onRemove }

  return (
    <div className="list-icons">
      {tools.map((t) => (
        <a
          key={t}
          href="#"
          className="list-icons-item"
          onClick={(e) => {
            e.preventDefault()
            handlers[t]()
          }}
        >
          <Icon
            name={toolIcon[t]}
            className={t === 'reload' && spinning ? 'spinner' : t === 'collapse' && collapsed ? 'rotate-180' : ''}
          />
        </a>
      ))}
    </div>
  )
}

export default function Card({
  title,
  titleAs: Title = 'h6',
  actions,
  tools,
  children,
  className = '',
  headerClassName = 'header-elements-inline',
  bodyClassName = 'card-body',
}: CardProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [spinning, setSpinning] = useState(false)

  if (removed) return null

  const reload = () => {
    if (spinning) return
    setSpinning(true)
    setTimeout(() => setSpinning(false), 1000)
  }

  const hidden = collapsed ? { display: 'none' } : undefined
  const hasHeaderElements = actions || (tools && tools.length > 0)

  return (
    <div className={`card ${className}`.trim()}>
      {title && (
        <div className={`card-header ${headerClassName}`}>
          <Title className="card-title">{title}</Title>
          {hasHeaderElements && (
            <div className="header-elements">
              {actions}
              {tools && tools.length > 0 && (
                <CardTools
                  tools={tools}
                  collapsed={collapsed}
                  spinning={spinning}
                  onCollapse={() => setCollapsed((v) => !v)}
                  onReload={reload}
                  onRemove={() => setRemoved(true)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {bodyClassName ? (
        <div className={bodyClassName} style={hidden}>
          {children}
        </div>
      ) : tools?.includes('collapse') ? (
        <div style={hidden}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}
