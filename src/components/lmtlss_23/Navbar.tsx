import { useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { BadgeMark } from './Badge'
import Dropdown, { DropdownDivider, DropdownItem } from './Dropdown'
import Icon from './Icon'
import { gitUpdates, messages, onlineUsers } from './navbarData'
import logoLight from '@/assets/lmtlss_23/global_assets/images/logo_light.png'

interface NavbarProps {
  /** Thu gọn / mở rộng sidebar trên desktop. Không truyền thì ẩn nút (trang không có sidebar) */
  onToggleMainSidebar?: () => void
  /** Bật / tắt sidebar trên mobile. Không truyền thì ẩn nút */
  onToggleMobileSidebar?: () => void
  brand?: string
  /** Đường dẫn ảnh logo (logo_light.png của template); không truyền thì hiện chữ */
  logo?: string
  userName?: string
}

const noop = (e: MouseEvent) => e.preventDefault()

// Cấu trúc markup theo phần "Main navbar" của index.html (Limitless).
// Dropdown/collapse của Bootstrap JS được thay bằng state React.

function GitUpdatesMenu() {
  return (
    <Dropdown
      as="li"
      className="nav-item"
      triggerClassName="navbar-nav-link dropdown-toggle caret-0"
      panelClassName="dropdown-content wmin-md-350"
      trigger={
        <>
          <Icon name="git-compare" />
          <span className="d-md-none ml-2">Git updates</span>
          <span className="badge badge-pill bg-warning-400 ml-auto ml-md-0">{gitUpdates.length}</span>
        </>
      }
    >
      <div className="dropdown-content-header">
        <span className="font-weight-semibold">Git updates</span>
        <a href="#" className="text-default" onClick={noop}>
          <Icon name="sync" />
        </a>
      </div>

      <div className="dropdown-content-body dropdown-scrollable">
        <ul className="media-list">
          {gitUpdates.map((u, i) => (
            <li key={i} className="media">
              <div className="mr-3">
                <a
                  href="#"
                  onClick={noop}
                  className={`btn bg-transparent border-${u.color} text-${u.color} rounded-round border-2 btn-icon`}
                >
                  <Icon name={u.icon} />
                </a>
              </div>
              <div className="media-body">
                {u.text}
                <div className="text-muted font-size-sm">{u.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown-content-footer bg-light">
        <a href="#" className="text-grey mr-auto" onClick={noop}>
          All updates
        </a>
        <div>
          <a href="#" className="text-grey" title="Mark all as read" onClick={noop}>
            <Icon name="radio-unchecked" />
          </a>
          <a href="#" className="text-grey ml-2" title="Bug tracker" onClick={noop}>
            <Icon name="bug2" />
          </a>
        </div>
      </div>
    </Dropdown>
  )
}

function UsersMenu() {
  return (
    <Dropdown
      as="li"
      className="nav-item"
      align="right"
      triggerClassName="navbar-nav-link dropdown-toggle caret-0"
      panelClassName="dropdown-content wmin-md-300"
      trigger={
        <>
          <Icon name="people" />
          <span className="d-md-none ml-2">Users</span>
        </>
      }
    >
      <div className="dropdown-content-header">
        <span className="font-weight-semibold">Users online</span>
        <a href="#" className="text-default" onClick={noop}>
          <Icon name="search4" className="font-size-base" />
        </a>
      </div>

      <div className="dropdown-content-body dropdown-scrollable">
        <ul className="media-list">
          {onlineUsers.map((u) => (
            <li key={u.name} className="media">
              <div className="mr-3">
                <Avatar name={u.name} />
              </div>
              <div className="media-body">
                <a href="#" className="media-title font-weight-semibold" onClick={noop}>
                  {u.name}
                </a>
                <span className="d-block text-muted font-size-sm">{u.role}</span>
              </div>
              <div className="ml-3 align-self-center">
                <BadgeMark color={u.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown-content-footer bg-light">
        <a href="#" className="text-grey mr-auto" onClick={noop}>
          All users
        </a>
        <a href="#" className="text-grey" onClick={noop}>
          <Icon name="gear" />
        </a>
      </div>
    </Dropdown>
  )
}

function MessagesMenu() {
  return (
    <Dropdown
      as="li"
      className="nav-item"
      align="right"
      triggerClassName="navbar-nav-link dropdown-toggle caret-0"
      panelClassName="dropdown-content wmin-md-350"
      trigger={
        <>
          <Icon name="bubbles4" />
          <span className="d-md-none ml-2">Messages</span>
          <span className="badge badge-pill bg-warning-400 ml-auto ml-md-0">2</span>
        </>
      }
    >
      <div className="dropdown-content-header">
        <span className="font-weight-semibold">Messages</span>
        <a href="#" className="text-default" onClick={noop}>
          <Icon name="compose" />
        </a>
      </div>

      <div className="dropdown-content-body dropdown-scrollable">
        <ul className="media-list">
          {messages.map((m) => (
            <li key={m.from} className="media">
              <div className="mr-3 position-relative">
                <Avatar name={m.from} />
              </div>
              <div className="media-body">
                <div className="media-title">
                  <a href="#" onClick={noop}>
                    <span className="font-weight-semibold">{m.from}</span>
                    <span className="text-muted float-right font-size-sm">{m.time}</span>
                  </a>
                </div>
                <span className="text-muted">{m.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown-content-footer justify-content-center p-0">
        <a href="#" className="bg-light text-grey w-100 py-2" title="Load more" onClick={noop}>
          <Icon name="menu7" className="d-block top-0" />
        </a>
      </div>
    </Dropdown>
  )
}

function UserMenu({ name }: { name: string }) {
  return (
    <Dropdown
      as="li"
      className="nav-item dropdown-user"
      align="right"
      closeOnClick
      triggerClassName="navbar-nav-link d-flex align-items-center dropdown-toggle"
      trigger={
        <>
          <Avatar name={name} size={34} className="mr-2" />
          <span style={{ paddingLeft: 0 }}>{name}</span>
        </>
      }
    >
      <DropdownItem icon={<Icon name="user-plus" />}>My profile</DropdownItem>
      <DropdownItem icon={<Icon name="coins" />}>My balance</DropdownItem>
      <DropdownItem icon={<Icon name="comment-discussion" />}>
        Messages <span className="badge badge-pill bg-blue ml-auto">58</span>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<Icon name="cog5" />}>Account settings</DropdownItem>
      <DropdownItem icon={<Icon name="switch2" />}>Logout</DropdownItem>
    </Dropdown>
  )
}

// ---------- component chính ----------

export default function Navbar({
  onToggleMainSidebar,
  onToggleMobileSidebar,
  brand = 'Limitless',
  logo = logoLight,
  userName = 'Victoria',
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="navbar navbar-expand-md navbar-dark">
      <div className="navbar-brand">
        <Link to="/" className="d-inline-block">
          {logo ? <img src={logo} alt={brand} /> : brand}
        </Link>
      </div>

      <div className="d-md-none">
        <button className="navbar-toggler" type="button" onClick={() => setMobileOpen((v) => !v)}>
          <Icon name="tree5" />
        </button>
        {onToggleMobileSidebar && (
          <button className="navbar-toggler sidebar-mobile-main-toggle" type="button" onClick={onToggleMobileSidebar}>
            <Icon name="paragraph-justify3" />
          </button>
        )}
      </div>

      <div className={`collapse navbar-collapse ${mobileOpen ? 'show' : ''}`} id="navbar-mobile">
        <ul className="navbar-nav">
          {onToggleMainSidebar && (
            <li className="nav-item">
              <a
                href="#"
                className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block"
                onClick={(e) => {
                  e.preventDefault()
                  onToggleMainSidebar()
                }}
              >
                <Icon name="paragraph-justify3" />
              </a>
            </li>
          )}

          <GitUpdatesMenu />
        </ul>

        <span className="badge bg-success ml-md-3 mr-md-auto">Online</span>

        <ul className="navbar-nav">
          <UsersMenu />
          <MessagesMenu />
          <UserMenu name={userName} />
        </ul>
      </div>
    </div>
  )
}
