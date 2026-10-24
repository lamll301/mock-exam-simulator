import type { RouteObject } from 'react-router-dom'
import MockExamRoutes from './mockExamRoutes'
import MainLoginPage from '@/pages/HomePage'

export const mainRoutes: RouteObject[] = [
  { path: '/login', element: <MainLoginPage /> },
  { path: '/mock-exam/*', element: <MockExamRoutes /> },
  // Phần app chính (Layout, HomePage, AboutPage) khi mở lại thì thêm vào đây
]