import { useEffect, useState, type ReactNode } from 'react'
import { demoNavigation } from './demoNavigation'
import Footer, { type FooterLink } from './Footer'
import Navbar from './Navbar'
import type { NavNode } from './navTypes'
import Sidebar from './Sidebar'

interface LimitlessLayoutProps {
  children: ReactNode
  /** Menu sidebar; mặc định dùng menu demo của template */
  navigation?: NavNode[]
  /** false cho các trang không có sidebar */
  sidebar?: boolean
  brand?: string
  logo?: string
  user?: { name: string; location?: string }
  footerLinks?: FooterLink[]
}

/**
 * Khung trang Limitless: navbar + .page-content (sidebar + .content-wrapper).
 * CSS gốc của Limitless điều khiển sidebar qua class trên <body>
 * (sidebar-xs = thu gọn trên desktop, sidebar-mobile-main = mở trên mobile),
 * nên ở đây bật/tắt các class đó bằng state thay cho app.js.
 * Cần bọc trong <LimitlessScope> để CSS gốc được nạp.
 */
export default function LimitlessLayout({
  children,
  navigation = demoNavigation,
  sidebar = true,
  brand,
  logo,
  user = { name: 'Victoria Baker', location: 'Santa Ana, CA' },
  footerLinks,
}: LimitlessLayoutProps) {
  const [mini, setMini] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const body = document.body
    body.classList.toggle('sidebar-xs', sidebar && mini)
    body.classList.toggle('sidebar-mobile-main', sidebar && mobileOpen)
    return () => body.classList.remove('sidebar-xs', 'sidebar-mobile-main')
  }, [sidebar, mini, mobileOpen])

  return (
    <>
      <Navbar
        brand={brand}
        logo={logo}
        userName={user.name.split(' ')[0]}
        onToggleMainSidebar={sidebar ? () => setMini((v) => !v) : undefined}
        onToggleMobileSidebar={sidebar ? () => setMobileOpen((v) => !v) : undefined}
      />

      <div className="page-content">
        {sidebar && <Sidebar navigation={navigation} user={user} onCloseMobile={() => setMobileOpen(false)} />}

        <div className="content-wrapper">
          {children}
          <Footer links={footerLinks} />
        </div>
      </div>
    </>
  )
}
