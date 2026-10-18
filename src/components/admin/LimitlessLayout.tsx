import { useState, type ReactNode } from 'react'
import { demoNavigation } from './demoNavigation'
import Footer, { type FooterLink } from './Footer'
import Navbar from './Navbar'
import type { NavNode } from './navTypes'
import Sidebar from './Sidebar'

interface LimitlessLayoutProps {
  children: ReactNode
  /** Menu sidebar; mặc định dùng menu demo của template */
  navigation?: NavNode[]
  /** false cho các trang không có sidebar (trang lỗi...) */
  sidebar?: boolean
  brand?: string
  user?: { name: string; location?: string }
  footerLinks?: FooterLink[]
}

function isDesktop() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
}

export default function LimitlessLayout({
  children,
  navigation = demoNavigation,
  sidebar = true,
  brand,
  user = { name: 'Victoria Baker', location: 'Santa Ana, CA' },
  footerLinks,
}: LimitlessLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop)

  return (
    <div className="flex min-h-screen flex-col bg-lt-page font-sans text-[13px] leading-[1.5385] text-lt-text">
      <Navbar
        brand={brand}
        userName={user.name.split(' ')[0]}
        onToggleSidebar={sidebar ? () => setSidebarOpen((v) => !v) : undefined}
      />

      <div className="flex flex-1">
        {sidebar && <Sidebar open={sidebarOpen} navigation={navigation} user={user} />}

        {/* Nền mờ phía sau sidebar trên mobile */}
        {sidebar && sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer links={footerLinks} />
        </div>
      </div>
    </div>
  )
}
