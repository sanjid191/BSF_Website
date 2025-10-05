import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Members from './pages/Members'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Constitution from './pages/Constitution'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="events" element={<Events />} />
          <Route path="members" element={<Members />} />
          <Route path="notices" element={<Notices />} />
          <Route path="constitution" element={<Constitution />} />
          <Route path="admin/login" element={<Login />} />
          <Route
            path="admin/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
