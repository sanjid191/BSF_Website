import { Navigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function ProtectedRoute({ children }) {
  const authenticated = authAPI.isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}
