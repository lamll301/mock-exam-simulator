import { Routes, Route } from 'react-router-dom'
import Toeic from '@/pages/mock-exam/toeic/Toeic'
import { NotFound } from "@/pages/ErrorPage"

export default function MockExamRoutes() {
  return (
    <Routes>
      <Route path="/toeic" element={<Toeic />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}