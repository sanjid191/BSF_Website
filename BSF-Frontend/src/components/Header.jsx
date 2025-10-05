import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

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

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-mint-50/95 backdrop-blur-md shadow-lg' 
          : 'bg-mint-50/80 backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-9 w-9 md:h-10 md:w-10 bg-gradient-to-r from-bsf-green to-bsf-teal rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            <span className="text-white font-bold text-sm">BSF</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-bsf-green to-bsf-teal">
              BASIS Student Forum
            </span>
            <span className="text-bsf-gray text-sm md:text-base md:ml-1">- GUB</span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-md text-bsf-gray hover:text-bsf-green hover:bg-white/30 transition-all"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/projects" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Projects</Link>
          <Link to="/events" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Events</Link>
          <Link to="/members" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Members</Link>
          <Link to="/notices" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Notices</Link>
          <Link to="/constitution" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">Constitution</Link>
          <Link to="/basis-info" className="px-4 py-2 rounded-full text-bsf-gray hover:text-bsf-green hover:bg-white/50 transition-all">BASIS Info</Link>
          <Link to="/admin/login" className="ml-2 text-white bg-gradient-to-r from-bsf-red to-bsf-red/80 hover:from-bsf-green hover:to-bsf-teal px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
            Admin
          </Link>
        </nav>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-mint-50/95 backdrop-blur-md border-t border-mint-200/50 shadow-lg"
          >
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex flex-col py-4 px-6"
            >
              {[
                { to: "/projects", text: "Projects" },
                { to: "/events", text: "Events" },
                { to: "/members", text: "Members" },
                { to: "/notices", text: "Notices" },
                { to: "/constitution", text: "Constitution" },
                { to: "/basis-info", text: "BASIS Info" }
              ].map((item, index) => (
                <motion.li 
                  key={item.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.15 }}
                  className="border-b border-mint-200/30 last:border-b-0"
                >
                  <Link 
                    to={item.to} 
                    className="flex items-center py-3 text-bsf-gray hover:text-bsf-green transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{item.text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link 
                  to="/admin/login" 
                  className="flex justify-center items-center py-3 px-4 bg-gradient-to-r from-bsf-red to-bsf-red/80 text-white rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
