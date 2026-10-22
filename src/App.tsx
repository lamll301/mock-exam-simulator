import { Routes, Route } from 'react-router-dom'
import LmtlssRoutes from './routes/lmtlssRoutes'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import Error404Page from '@/pages/lmtlss_23/Error404Page'

export default function App() {
  return (
    <Routes>
      {/* Tách phần lmtlss ra một cụm riêng */}
      <Route path="/lmtlss_23/*" element={<LmtlssRoutes />} />

      {/* Phần app chính */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Error404Page />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}