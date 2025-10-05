import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-mint-50/90 backdrop-blur-md shadow-lg' 
          : 'bg-mint-50/70 backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 bg-gradient-to-r from-bsf-green to-bsf-teal rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            <span className="text-white font-bold text-sm">BSF</span>
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-bsf-green to-bsf-teal">
            BASIS Student Forum <span className="text-bsf-gray">- GUB</span>
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-bsf-gray hover:text-bsf-green"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/projects" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Projects</Link>
          <Link to="/events" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Events</Link>
          <Link to="/members" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Members</Link>
          <Link to="/notices" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Notices</Link>
          <Link to="/constitution" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Constitution</Link>
          <Link to="/admin/login" className="ml-2 text-white bg-gradient-to-r from-bsf-red to-bsf-red/80 hover:from-bsf-green hover:to-bsf-teal px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
            Admin
          </Link>
        </nav>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden py-6 px-6 bg-mint-50/90 backdrop-blur-md border-t border-mint-200/50">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link 
                to="/projects" 
                className="block text-bsf-gray hover:text-bsf-green transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/events" 
                className="block text-bsf-gray hover:text-bsf-green transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link 
                to="/members" 
                className="block text-bsf-gray hover:text-bsf-green transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Members
              </Link>
            </li>
            <li>
              <Link 
                to="/notices" 
                className="block text-bsf-gray hover:text-bsf-green transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Notices
              </Link>
            </li>
            <li>
              <Link 
                to="/constitution" 
                className="block text-bsf-gray hover:text-bsf-green transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Constitution
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/login" 
                className="block text-bsf-red hover:text-bsf-green font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
