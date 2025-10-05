import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 }
};

const slideIn = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const slideRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

export default function Constitution() {
  return (
    <motion.div 
      initial="initial"
      animate="animate" 
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bsf-green to-bsf-teal py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-tl-full -mb-20 -mr-20 blur-xl"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-bsf-red/20 rounded-full blur-xl"></div>
        
        <div className="container relative z-10">
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <span className="font-medium">BASIS Student Forum — Green University Chapter</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Constitution & <span className="text-bsf-teal">Bylaws</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-8 md:mb-10 max-w-3xl mx-auto">
              The official governing documents that define our organization's structure, rules, and procedures
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Sidebar */}
              <motion.div 
                variants={slideIn}
                className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-md"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-bsf-green mb-6 pb-4 border-b border-gray-100">
                  BSF-GUB Constitution
                </h2>
                
                <div className="mb-8">
                  <div className="flex items-start mb-4">
                    <div className="bg-bsf-green/10 p-2 rounded-lg mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-bsf-green">Official Document</h3>
                      <p className="text-bsf-gray text-sm mt-1">Ratified on January 15, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-bsf-green/10 p-2 rounded-lg mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-bsf-green">Last Updated</h3>
                      <p className="text-bsf-gray text-sm mt-1">September 30, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-bsf-green/10 p-2 rounded-lg mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-bsf-green">File Details</h3>
                      <p className="text-bsf-gray text-sm mt-1">12 pages, PDF format</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-bsf-green mb-4">Overview</h3>
                  <p className="text-bsf-gray mb-4">
                    Our constitution outlines the fundamental principles, organizational structure, and operational 
                    framework of the BASIS Student Forum at Green University of Bangladesh.
                  </p>
                  <p className="text-bsf-gray">
                    This document serves as the primary governance document for all BSF-GUB activities 
                    and initiatives, establishing clear guidelines for membership, elections, and responsibilities.
                  </p>
                </div>

                <div className="flex flex-col space-y-4">
                  <a 
                    href="/src/BSF-GUB_Constitution_2025.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-bsf-green text-white rounded-lg hover:bg-bsf-teal transition-colors w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Document Online
                  </a>
                  <a 
                    href="/src/BSF-GUB_Constitution_2025.pdf" 
                    download="BSF-GUB_Constitution_2025.pdf" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-bsf-red text-white rounded-lg hover:bg-bsf-red/80 transition-colors w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </a>
                </div>
              </motion.div>
              
              {/* PDF Viewer */}
              <motion.div 
                variants={slideRight}
                className="lg:col-span-3"
              >
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <div className="w-full aspect-[3/4] bg-white rounded-md shadow-md overflow-hidden">
                      <object
                        data="/src/BSF-GUB_Constitution_2025.pdf#view=FitH"
                        type="application/pdf"
                        className="w-full h-full"
                        style={{ height: '700px' }}
                      >
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-bsf-red mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-xl font-bold text-bsf-green mb-2">PDF Preview Not Available</h3>
                          <p className="text-bsf-gray mb-6">
                            Your browser doesn't support embedded PDFs or the file couldn't be loaded.
                          </p>
                          <div className="flex flex-wrap justify-center gap-4">
                            <a 
                              href="/src/BSF-GUB_Constitution_2025.pdf" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2 bg-bsf-green text-white rounded-lg hover:bg-bsf-teal transition-colors"
                            >
                              Open PDF in New Tab
                            </a>
                            <a 
                              href="/src/BSF-GUB_Constitution_2025.pdf"
                              download="BSF-GUB_Constitution_2025.pdf"
                              className="px-6 py-2 bg-bsf-red text-white rounded-lg hover:bg-bsf-red/80 transition-colors"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </object>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm text-bsf-gray font-medium">BSF-GUB_Constitution_2025.pdf</span>
                    <div className="flex items-center space-x-2">
                      <a 
                        href="/src/BSF-GUB_Constitution_2025.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bsf-green/10 text-bsf-green transition-colors"
                        title="Open in New Tab"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a 
                        href="/src/BSF-GUB_Constitution_2025.pdf"
                        download="BSF-GUB_Constitution_2025.pdf"
                        className="p-2 rounded-lg hover:bg-bsf-red/10 text-bsf-red transition-colors"
                        title="Download"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                      <button 
                        className="p-2 rounded-lg hover:bg-gray-200 text-bsf-gray transition-colors"
                        title="Print"
                        onClick={() => window.open('/src/BSF-GUB_Constitution_2025.pdf', '_blank')?.print()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div 
              variants={fadeIn}
              className="mt-12 lg:mt-16"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-bsf-green mb-6">Key Sections</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Membership Requirements",
                        description: "Guidelines for becoming a member of the BSF-GUB chapter, including eligibility criteria and application process."
                      },
                      {
                        title: "Executive Committee",
                        description: "Structure, roles, and responsibilities of the elected executive committee members."
                      },
                      {
                        title: "Elections Procedure",
                        description: "Detailed process for nominating and electing officers to various positions within the organization."
                      },
                      {
                        title: "Code of Conduct",
                        description: "Expected behavior, ethical guidelines, and disciplinary procedures for all members."
                      }
                    ].map((section, index) => (
                      <div key={index} className="border-l-4 border-bsf-teal pl-4">
                        <h3 className="text-lg font-bold text-bsf-green mb-2">{section.title}</h3>
                        <p className="text-bsf-gray text-sm">{section.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="mt-10 flex justify-center space-x-6">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-2.5 rounded-lg bg-mint-100 text-bsf-green hover:bg-mint-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
              <Link 
                to="/members" 
                className="inline-flex items-center px-6 py-2.5 rounded-lg bg-bsf-green/10 text-bsf-green hover:bg-bsf-green/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Meet the Committee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}