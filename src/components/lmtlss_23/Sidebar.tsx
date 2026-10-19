import { useState, type MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { Badge, toBadgeColor } from './Badge'
import Icon from './Icon'
import type { NavNode } from './navTypes'

interface SidebarUserInfo {
  name: string
  location?: string
}

interface SidebarProps {
  navigation: NavNode[]
  user?: SidebarUserInfo
  /** Gọi khi bấm mũi tên "Navigation" trên mobile để đóng sidebar */
  onCloseMobile?: () => void
}

type LinkNode = Extract<NavNode, { type: 'link' }>
type GroupNode = Extract<NavNode, { type: 'group' }>

const noop = (e: MouseEvent) => e.preventDefault()

// Markup theo phần "Main navigation" của index.html (Limitless):
// ul.nav.nav-sidebar > li.nav-item(.nav-item-submenu) > a.nav-link + ul.nav.nav-group-sub

function LinkLabel({ node }: { node: { label: string; icon?: string } }) {
  return (
    <>
      {node.icon && <Icon name={node.icon} />}
      {node.icon ? <span>{node.label}</span> : node.label}
    </>
  )
}

function NavLinkItem({ node }: { node: LinkNode }) {
  const badge = node.badge && (
    <Badge color={toBadgeColor(node.badge.color)} className="align-self-center ml-auto">
      {node.badge.text}
    </Badge>
  )

  // Mục disabled hoặc link giữ chỗ ('#') thì không điều hướng
  if (node.disabled || node.to === '#') {
    return (
      <li className="nav-item">
        <a href="#" className={`nav-link ${node.disabled ? 'disabled' : ''}`.trim()} onClick={noop}>
          <LinkLabel node={node} />
          {badge}
        </a>
      </li>
    )
  }

  return (
    <li className="nav-item">
      <NavLink to={node.to} end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
        <LinkLabel node={node} />
        {badge}
      </NavLink>
    </li>
  )
}

function NavGroupItem({ node }: { node: GroupNode }) {
  const [open, setOpen] = useState(false)

  return (
    <li className={`nav-item nav-item-submenu ${open ? 'nav-item-open' : ''}`.trim()}>
      <a
        href="#"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault()
          setOpen((v) => !v)
        }}
      >
        <LinkLabel node={node} />
      </a>
      <ul className="nav nav-group-sub" data-submenu-title={node.label} style={{ display: open ? 'block' : 'none' }}>
        <NavItems nodes={node.children} />
      </ul>
    </li>
  )
}

function NavItems({ nodes }: { nodes: NavNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'header':
            return (
              <li key={i} className="nav-item-header">
                <div className="text-uppercase font-size-xs line-height-xs">{node.title}</div>{' '}
                <i className="icon-menu" title={node.title} />
              </li>
            )
          case 'divider':
            return <li key={i} className="nav-item-divider" />
          case 'group':
            return <NavGroupItem key={i} node={node} />
          case 'link':
            return <NavLinkItem key={i} node={node} />
        }
      })}
    </>
  )
}

// ---------- component chính ----------

export default function Sidebar({ navigation, user, onCloseMobile }: SidebarProps) {
  return (
    <div className="sidebar sidebar-dark sidebar-main sidebar-expand-md">
      {/* Sidebar mobile toggler */}
      <div className="sidebar-mobile-toggler text-center">
        <a
          href="#"
          className="sidebar-mobile-main-toggle"
          onClick={(e) => {
            e.preventDefault()
            onCloseMobile?.()
          }}
        >
          <Icon name="arrow-left8" />
        </a>
        Navigation
      </div>

      <div className="sidebar-content">
        {/* User menu */}
        {user && (
          <div className="sidebar-user">
            <div className="card-body">
              <div className="media">
                <div className="mr-3">
                  <a href="#" onClick={noop}>
                    <Avatar name={user.name} size={38} />
                  </a>
                </div>

                <div className="media-body">
                  <div className="media-title font-weight-semibold">{user.name}</div>
                  {user.location && (
                    <div className="font-size-xs opacity-50">
                      <Icon name="pin" className="font-size-sm" /> &nbsp;{user.location}
                    </div>
                  )}
                </div>

                <div className="ml-3 align-self-center">
                  <a href="#" className="text-white" onClick={noop}>
                    <Icon name="cog3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main navigation */}
        <div className="card card-sidebar-mobile">
          <ul className="nav nav-sidebar" data-nav-type="accordion">
            <NavItems nodes={navigation} />
          </ul>
        </div>
      </div>
    </div>
  )
}
