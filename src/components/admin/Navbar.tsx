import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Badge, BadgeMark } from './Badge'
import Dropdown, { DropdownDivider, DropdownItem } from './Dropdown'
import Icon from './Icon'
import { gitUpdates, messages, onlineUsers } from './navbarData'

interface NavbarProps {
  /** Không truyền thì ẩn nút bật/tắt sidebar (trang không có sidebar) */
  onToggleSidebar?: () => void
  brand?: string
  userName?: string
}

// Class tĩnh để Tailwind nhận diện
const gitColor = {
  primary: 'border-lt-primary text-lt-primary',
  warning: 'border-lt-warning-400 text-lt-warning-400',
  info: 'border-lt-blue-400 text-lt-blue-400',
  success: 'border-lt-success text-lt-success',
} as const

// ---------- helper layout ----------

const iconButton = 'flex items-center gap-2 px-3 py-3 text-white/85 hover:bg-black/15 hover:text-white'

/** Khung chung của dropdown dạng nội dung: header - body cuộn - footer */
function PanelContent({
  title,
  headerIcon,
  footer,
  children,
}: {
  title: string
  headerIcon: string
  footer: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-lt-border px-4 py-2.5">
        <span className="font-medium">{title}</span>
        <Icon name={headerIcon} className="text-lt-muted" />
      </div>
      <ul className="max-h-80 divide-y divide-lt-border/60 overflow-y-auto">{children}</ul>
      <div className="flex items-center justify-between border-t border-lt-border bg-black/[0.03] px-4 py-2 text-lt-muted">
        {footer}
      </div>
    </>
  )
}

// ---------- 3 dropdown ----------

function GitUpdatesMenu() {
  return (
    <Dropdown
      trigger={
        <>
          <Icon name="git-compare" />
          <Badge color="warning" pill>
            {gitUpdates.length}
          </Badge>
        </>
      }
      triggerClassName={iconButton}
      panelClassName="w-80"
    >
      <PanelContent title="Git updates" headerIcon="sync" footer={<span>All updates</span>}>
        {gitUpdates.map((u, i) => (
          <li key={i} className="flex gap-3 px-4 py-3">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 ${gitColor[u.color]}`}
            >
              <Icon name={u.icon} />
            </span>
            <div>
              {u.text}
              <div className="text-xs text-lt-muted">{u.time}</div>
            </div>
          </li>
        ))}
      </PanelContent>
    </Dropdown>
  )
}

function UsersMenu() {
  return (
    <Dropdown
      align="right"
      trigger={<Icon name="people" />}
      triggerClassName={iconButton}
      panelClassName="w-72"
    >
      <PanelContent title="Users online" headerIcon="search4" footer={<span>All users</span>}>
        {onlineUsers.map((u) => (
          <li key={u.name} className="flex items-center gap-3 px-4 py-3">
            <Avatar name={u.name} />
            <div className="flex-1">
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-lt-muted">{u.role}</div>
            </div>
            <BadgeMark color={u.status} />
          </li>
        ))}
      </PanelContent>
    </Dropdown>
  )
}

function MessagesMenu() {
  return (
    <Dropdown
      align="right"
      trigger={
        <>
          <Icon name="bubbles4" />
          <Badge color="warning" pill>
            2
          </Badge>
        </>
      }
      triggerClassName={iconButton}
      panelClassName="w-80"
    >
      <PanelContent title="Messages" headerIcon="compose" footer={<span>Load more</span>}>
        {messages.map((m) => (
          <li key={m.from} className="flex gap-3 px-4 py-3">
            <Avatar name={m.from} />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{m.from}</span>
                <span className="text-xs text-lt-muted">{m.time}</span>
              </div>
              <div className="truncate text-lt-muted">{m.text}</div>
            </div>
          </li>
        ))}
      </PanelContent>
    </Dropdown>
  )
}

function UserMenu({ name }: { name: string }) {
  return (
    <Dropdown
      align="right"
      closeOnClick
      trigger={
        <>
          <Avatar name={name} size={34} />
          <span>{name}</span>
        </>
      }
      triggerClassName={`${iconButton} py-2`}
      panelClassName="min-w-48 py-1"
    >
      <DropdownItem icon={<Icon name="user-plus" />}>My profile</DropdownItem>
      <DropdownItem icon={<Icon name="coins" />}>My balance</DropdownItem>
      <DropdownItem icon={<Icon name="comment-discussion" />}>Messages</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<Icon name="cog5" />}>Account settings</DropdownItem>
      <DropdownItem icon={<Icon name="switch2" />}>Logout</DropdownItem>
    </Dropdown>
  )
}

// ---------- component chính ----------

export default function Navbar({ onToggleSidebar, brand = 'Limitless', userName = 'Victoria' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="relative z-30 flex flex-wrap items-center bg-lt-navbar px-4 text-white md:flex-nowrap md:px-0">
      <div className="py-2.5 md:w-[16.875rem] md:px-5">
        <Link to="/" className="text-xl font-medium tracking-wide">
          {brand}
        </Link>
      </div>

      {/* Nút mobile */}
      <div className="ml-auto flex md:hidden">
        <button type="button" className={iconButton} onClick={() => setMobileOpen((v) => !v)}>
          <Icon name="tree5" />
        </button>
        {onToggleSidebar && (
          <button type="button" className={iconButton} onClick={onToggleSidebar}>
            <Icon name="paragraph-justify3" />
          </button>
        )}
      </div>

      <div
        className={`${mobileOpen ? 'flex' : 'hidden'} w-full flex-col md:flex md:w-auto md:flex-1 md:flex-row md:items-center`}
      >
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className={`${iconButton} hidden md:flex`}
            aria-label="Toggle sidebar"
          >
            <Icon name="paragraph-justify3" />
          </button>
        )}

        <GitUpdatesMenu />

        <Badge color="success" className="my-2 self-start md:mr-auto md:ml-3 md:self-center">
          Online
        </Badge>

        <UsersMenu />
        <MessagesMenu />
        <UserMenu name={userName} />
      </div>
    </header>
  )
}
