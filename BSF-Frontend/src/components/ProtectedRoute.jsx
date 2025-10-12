import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  // Temporarily set to true for testing UI
  // TODO: Implement proper authentication logic later
  const authenticated = true // placeholder; wire real auth here
  if (!authenticated) return <Navigate to="/admin/login" replace />
  return children
}
