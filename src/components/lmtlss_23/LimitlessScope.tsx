import { useLayoutEffect, useState, type ReactNode } from 'react'
import { limitlessCss } from '@/assets/lmtlss_23'

/**
 * Bọc các route /limitless/*. Khi mount: chèn CSS gốc Limitless vào <head>.
 * Khi rời trang: gỡ ra => phần còn lại của app (Tailwind) không bị ảnh hưởng.
 * Children chỉ render sau khi CSS đã chèn để tránh nháy giao diện chưa có style.
 */
export default function LimitlessScope({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-limitless', '')
    style.textContent =
      limitlessCss +
      '\n#root{display:flex;flex-direction:column;flex:1 0 auto;min-height:100vh}' +
      '\n.navbar-collapse.collapse{visibility:visible}'
    document.head.appendChild(style)
    setReady(true)
    return () => {
      style.remove()
      setReady(false)
    }
  }, [])

  return ready ? <>{children}</> : null
}
