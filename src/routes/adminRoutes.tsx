// routes/adminRoutes.tsx
import { Navigate, type RouteObject } from 'react-router-dom'
import type { ReactNode } from 'react'
import LimitlessScope from '@/components/lmtlss_23/LimitlessScope'
import LmtlssRoutes from './lmtlssRoutes'
import AdminLoginPage from '@/pages/lmtlss_23/LoginPage'

const withLimitless = (page: ReactNode) => <LimitlessScope>{page}</LimitlessScope>

export const adminRoutes: RouteObject[] = [
  { path: '/', element: <Navigate to="/lmtlss_23" replace /> },
  { path: '/login', element: withLimitless(<AdminLoginPage />) },
  { path: '/lmtlss_23/*', element: <LmtlssRoutes /> },
]