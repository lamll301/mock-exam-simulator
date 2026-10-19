import { DashboardDemo, LimitlessLayout } from '@/components/lmtlss_23'

// Tương ứng index.html của template (dashboard mặc định).
// Route chứa trang này cần được bọc trong <LimitlessScope> để CSS gốc Limitless được nạp.
export default function IndexPage() {
  return (
    <LimitlessLayout>
      <DashboardDemo />
    </LimitlessLayout>
  )
}
