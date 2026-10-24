// src/routes/lmtlssRoutes.tsx
import { Routes, Route, Outlet } from 'react-router-dom'
import LimitlessScope from '@/components/lmtlss_23/LimitlessScope'
import IndexPage from '@/pages/lmtlss_23/IndexPage'
import FormInputs from '@/pages/lmtlss_23/FormInputs'
import TableBasic from '@/pages/lmtlss_23/TableBasic'
import DatatableBasic from '@/pages/lmtlss_23/DatatableBasic'
import DatatableExtensionReorder from '@/pages/lmtlss_23/DatatableExtensionReorder'
import DatatableExtensionRowReorder from '@/pages/lmtlss_23/DatatableExtensionRowReorder'
import TableSizing from '@/pages/lmtlss_23/TableSizing'
import ComponentsModals from '@/pages/lmtlss_23/ComponentsModals'
import LoginPage from '@/pages/lmtlss_23/LoginPage'
import Error403Page from '@/pages/lmtlss_23/Error403Page'
import Error404Page from '@/pages/lmtlss_23/Error404Page'
import Error405Page from '@/pages/lmtlss_23/Error405Page'
import Error500Page from '@/pages/lmtlss_23/Error500Page'
import Error503Page from '@/pages/lmtlss_23/Error503Page'
import ErrorOfflinePage from '@/pages/lmtlss_23/ErrorOfflinePage'
import TableBorders from '@/pages/lmtlss_23/TableBorders'
import TableStyling from '@/pages/lmtlss_23/TableStyling'
import TableElements from '@/pages/lmtlss_23/TableElements'

export default function LmtlssRoutes() {
  return (
    <Routes>
      <Route
        element={
          <LimitlessScope>
            <Outlet />
          </LimitlessScope>
        }
      >
        <Route index element={<IndexPage />} />
        <Route path="form-inputs" element={<FormInputs />} />
        <Route path="table-basic" element={<TableBasic />} />
        <Route path="datatable-basic" element={<DatatableBasic />} />
        <Route path="datatable-extension-reorder" element={<DatatableExtensionReorder />} />
        <Route path="datatable-extension-row-reorder" element={<DatatableExtensionRowReorder />} />
        <Route path="table-sizing" element={<TableSizing />} />
        <Route path="table-borders" element={<TableBorders />} />
        <Route path="table-styling" element={<TableStyling />} />
        <Route path="table-elements" element={<TableElements />} />
        <Route path="components-modals" element={<ComponentsModals />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="error/403" element={<Error403Page />} />
        <Route path="error/404" element={<Error404Page />} />
        <Route path="error/405" element={<Error405Page />} />
        <Route path="error/500" element={<Error500Page />} />
        <Route path="error/503" element={<Error503Page />} />
        <Route path="error/offline" element={<ErrorOfflinePage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  )
}