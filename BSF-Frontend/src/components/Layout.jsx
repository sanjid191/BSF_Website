import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full overflow-x-hidden">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
