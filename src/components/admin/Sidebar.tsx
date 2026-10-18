import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import { Badge, toBadgeColor } from './Badge'
import Icon from './Icon'
import type { NavNode } from './navTypes'

interface SidebarUserInfo {
  name: string
  location?: string
}

interface SidebarProps {
  open: boolean
  navigation: NavNode[]
  user?: SidebarUserInfo
}

// ---------- helper ----------

/** Thụt lề chữ theo cấp menu (cấp 0 có icon, cấp con căn theo chữ của cấp cha) */
function indentOf(level: number) {
  return level === 0 ? '1.25rem' : `${2.5 + level * 1.25}rem`
}

/** Nhóm có chứa trang đang mở thì mặc định xổ ra */
function groupHasPath(nodes: NavNode[], pathname: string): boolean {
  return nodes.some((n) =>
    n.type === 'link' ? n.to === pathname : n.type === 'group' && groupHasPath(n.children, pathname),
  )
}

// ---------- phần tử menu ----------

function NavBadge({ text, color }: { text: string; color?: string }) {
  return (
    <Badge color={toBadgeColor(color)} className="ml-auto self-center">
      {text}
    </Badge>
  )
}

function NavLinkItem({ node, level }: { node: Extract<NavNode, { type: 'link' }>; level: number }) {
  const base = 'flex items-center gap-3 py-2.5 pr-5 transition-colors'
  const style = { paddingLeft: indentOf(level) }
  const content = (
    <>
      {node.icon && <Icon name={node.icon} className="text-base" />}
      <span>{node.label}</span>
      {node.badge && <NavBadge {...node.badge} />}
    </>
  )

  if (node.disabled) {
    return (
      <span style={style} className={`${base} cursor-not-allowed text-white/40`}>
        {content}
      </span>
    )
  }

  return (
    <NavLink
      to={node.to}
      end
      style={style}
      className={({ isActive }) =>
        `${base} ${isActive ? 'bg-black/25 text-white' : 'text-white/75 hover:bg-black/15 hover:text-white'}`
      }
    >
      {content}
    </NavLink>
  )
}

function NavGroupItem({ node, level }: { node: Extract<NavNode, { type: 'group' }>; level: number }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => groupHasPath(node.children, pathname))

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ paddingLeft: indentOf(level) }}
        className={`flex w-full items-center gap-3 py-2.5 pr-5 text-left transition-colors hover:bg-black/15 hover:text-white ${
          open ? 'text-white' : 'text-white/75'
        }`}
      >
        {node.icon && <Icon name={node.icon} className="text-base" />}
        <span>{node.label}</span>
        <Icon
          name="arrow-down12"
          className={`ml-auto text-[10px] transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && (
        <ul className="bg-black/20">
          <NavItems nodes={node.children} level={level + 1} />
        </ul>
      )}
    </>
  )
}

function NavItems({ nodes, level }: { nodes: NavNode[]; level: number }) {
  return nodes.map((node, i) => {
    switch (node.type) {
      case 'header':
        return (
          <li key={i} className="px-5 pt-4 pb-2 text-[11px] tracking-wide text-white/50 uppercase">
            {node.title}
          </li>
        )
      case 'divider':
        return <li key={i} className="my-1.5 border-t border-white/10" />
      case 'group':
        return (
          <li key={i}>
            <NavGroupItem node={node} level={level} />
          </li>
        )
      case 'link':
        return (
          <li key={i}>
            <NavLinkItem node={node} level={level} />
          </li>
        )
    }
  })
}

function SidebarUser({ name, location }: SidebarUserInfo) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <Avatar name={name} size={38} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{name}</div>
        {location && (
          <div className="text-xs opacity-50">
            <Icon name="pin" className="mr-1 text-[11px]" />
            {location}
          </div>
        )}
      </div>
      <Icon name="cog3" className="text-white/80" />
    </div>
  )
}

// ---------- component chính ----------

export default function Sidebar({ open, navigation, user }: SidebarProps) {
  return (
    <aside
      className={`${open ? 'block' : 'hidden'} fixed inset-y-0 left-0 z-50 w-[16.875rem] overflow-y-auto bg-lt-sidebar text-[13px] text-white md:static md:z-auto md:shrink-0`}
    >
      {user && <SidebarUser {...user} />}
      <ul className="pb-4">
        <NavItems nodes={navigation} level={0} />
      </ul>
    </aside>
  )
}
