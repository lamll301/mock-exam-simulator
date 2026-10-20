import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import LoginPage from '@/pages/lmtlss_23/LoginPage'
import Error403Page from './pages/lmtlss_23/Error403Page'
import Error404Page from './pages/lmtlss_23/Error404Page'
import Error405Page from './pages/lmtlss_23/Error405Page'
import Error500Page from './pages/lmtlss_23/Error500Page'
import Error503Page from './pages/lmtlss_23/Error503Page'
import ErrorOfflinePage from './pages/lmtlss_23/ErrorOfflinePage'
import LimitlessScope from '@/components/lmtlss_23/LimitlessScope'
import IndexPage from './pages/lmtlss_23/IndexPage'
import FormInputs from './pages/lmtlss_23/FormInputs'
import ComponentsModals from './pages/lmtlss_23/ComponentsModals'

export default function App() {
  return (
    <Routes>
      <Route
        path="/lmtlss_23"
        element={
          <LimitlessScope>
            <Outlet />
          </LimitlessScope>
        }
      >
        <Route index element={<IndexPage />} />
        <Route path="form-inputs" element={<FormInputs />} />
        <Route path="components-modals" element={<ComponentsModals />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="error/403" element={<Error403Page />} />
        <Route path="error/404" element={<Error404Page />} />
        <Route path="error/405" element={<Error405Page />} />
        <Route path="error/500" element={<Error500Page />} />
        <Route path="error/503" element={<Error503Page />} />
        <Route path="error/offline" element={<ErrorOfflinePage />} />
      </Route>

      <Route
        path="*"
        element={
          <Layout>
            <nav className="mb-4 flex gap-4 text-blue-600">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}