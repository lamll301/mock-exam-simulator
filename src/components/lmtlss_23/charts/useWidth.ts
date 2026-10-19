import { useEffect, useRef, useState } from 'react'

/** Đo kích thước thật của phần tử (cập nhật khi layout đổi) để vẽ SVG đúng tỉ lệ */
export function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}

export function useWidth<T extends HTMLElement>() {
  const [ref, { width }] = useSize<T>()
  return [ref, width] as const
}