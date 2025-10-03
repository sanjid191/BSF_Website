import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const authenticated = false // placeholder; wire real auth here
  if (!authenticated) return <Navigate to="/admin/login" replace />
  return children
}
