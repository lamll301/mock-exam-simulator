import { Routes, Route, Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import LoginPage from '@/pages/limitless/LoginPage'
import Error403Page from './pages/limitless/Error403Page'
import Error404Page from './pages/limitless/Error404Page'
import Error405Page from './pages/limitless/Error405Page'
import Error500Page from './pages/limitless/Error500Page'
import Error503Page from './pages/limitless/Error503Page'
import ErrorOfflinePage from './pages/limitless/ErrorOfflinePage'

export default function App() {
  return (
    <Routes>
      <Route path="/limitless/login" element={<LoginPage />} />
      <Route path="/limitless/error/403" element={<Error403Page />} />
      <Route path="/limitless/error/404" element={<Error404Page />} />
      <Route path="/limitless/error/405" element={<Error405Page />} />
      <Route path="/limitless/error/500" element={<Error500Page />} />
      <Route path="/limitless/error/503" element={<Error503Page />} />
      <Route path="/limitless/error/offline" element={<ErrorOfflinePage />} />

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