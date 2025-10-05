import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function BasisInfo() {
  return (
    <motion.div 
      initial="initial"
      animate="animate" 
      exit="exit"
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bsf-green to-bsf-teal py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-tl-full -mb-20 -mr-20 blur-xl"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-bsf-red/20 rounded-full blur-xl"></div>
        
        <div className="container relative z-10">
          <motion.div 
            variants={fadeIn} 
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <span className="font-medium">Everything You Need To Know</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              About BASIS & <span className="text-bsf-teal">Membership Benefits</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto">
              Discover how the Bangladesh Association of Software and Information Services 
              empowers students and the advantages of joining BSF-GUB
            </p>
          </motion.div>
        </div>
      </section>

      {/* About BASIS Section */}
      <motion.section 
        variants={fadeIn} 
        className="container py-12 md:py-16"
      >
        <div className="max-w-section mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-bsf-red font-semibold mb-2 inline-block">ABOUT BASIS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-bsf-green mb-4">Bangladesh Association of Software and Information Services</h2>
            <p className="text-bsf-gray mt-2 max-w-2xl mx-auto">
              The national trade association for the ICT industry in Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div className="relative">
              <div className="aspect-video bg-bsf-gray/10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/src/assets/logo/BASIS.jpg" 
                  alt="BASIS Logo" 
                  className="object-contain w-full h-full p-6"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-bsf-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                SINCE<br/>1997
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-bsf-teal/20 rounded-full blur-xl -z-10"></div>
            </div>

            <div>
              <p className="text-bsf-gray mb-4">
                BASIS (Bangladesh Association of Software and Information Services) is the national trade body for the ICT industry in Bangladesh. 
                Established in 1997, BASIS has been working to develop the software & IT service industry in Bangladesh.
              </p>
              <p className="text-bsf-gray mb-4">
                With over 1600 member companies, BASIS represents the majority of the software and IT services companies in Bangladesh and 
                has played a pivotal role in building the ICT sector and facilitating business for its member organizations.
              </p>
              <p className="text-bsf-gray mb-4">
                BASIS actively promotes the IT industry of Bangladesh both locally and globally, 
                creating opportunities for business, employment, and economic growth through technology innovation.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="bg-bsf-green/10 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-bsf-gray">1600+ Member Companies</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-bsf-green/10 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-bsf-gray">300,000+ IT Professionals</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-bsf-green/10 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-bsf-gray">$1.3 Billion Export Industry</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-bsf-green/10 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-bsf-gray">25+ Years of Excellence</span>
                </div>
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://basis.org.bd" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-bsf-red hover:text-bsf-green font-medium"
                >
                  Visit the official BASIS website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BASIS Student Forum Section */}
      <motion.section 
        variants={fadeIn}
        className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16"
      >
        <div className="container">
          <div className="max-w-section mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-bsf-red font-semibold mb-2 inline-block">BSF INITIATIVE</span>
              <h2 className="text-3xl md:text-4xl font-bold text-bsf-green mb-4">BASIS Student Forum</h2>
              <p className="text-bsf-gray mt-2 max-w-2xl mx-auto">
                Connecting students to the IT industry through knowledge, opportunities, and innovation
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 lg:p-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-bsf-green">What is BASIS Student Forum?</h3>
                  <p className="text-bsf-gray mb-4">
                    BASIS Student Forum (BSF) is an initiative of BASIS to bridge the gap between academia and industry. 
                    It aims to develop skilled resources for the IT industry by connecting students directly with tech companies and professionals.
                  </p>
                  <p className="text-bsf-gray mb-4">
                    BSF chapters are established in different universities across Bangladesh, including Green University of Bangladesh (BSF-GUB), 
                    to create a platform for students to develop their skills, knowledge, and career prospects in the ICT sector.
                  </p>
                  <p className="text-bsf-gray mb-4">
                    Through various activities, training programs, workshops, and industry visits, BSF prepares students to meet industry 
                    requirements and become valuable contributors to Bangladesh's growing IT sector.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-bsf-green to-bsf-teal p-6 md:p-8 lg:p-10 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">BSF Objectives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Bridge the gap between academia and industry requirements</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Develop skilled human resources for the IT/ITES industry</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Create internship and job placement opportunities for students</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Promote technology entrepreneurship among students</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Enhance soft skills and professional development of members</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Membership Benefits Section */}
      <motion.section 
        variants={fadeIn}
        className="container py-12 md:py-16"
      >
        <div className="max-w-section mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-bsf-red font-semibold mb-2 inline-block">ADVANTAGES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-bsf-green mb-4">Benefits of Joining BSF-GUB</h2>
            <p className="text-bsf-gray mt-2 max-w-2xl mx-auto">
              Discover how membership can enhance your academic journey and professional prospects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Industry Connections",
                description: "Direct access to leading tech companies and professionals in Bangladesh's IT sector through networking events, industry visits, and guest lectures"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "Skill Development",
                description: "Access to specialized workshops, bootcamps, and training sessions on cutting-edge technologies and in-demand skills in the IT industry"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Networking Opportunities",
                description: "Connect with like-minded peers, industry mentors, and potential employers, building a professional network that can help launch your career"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Internship Opportunities",
                description: "Priority access to internship programs with BASIS member companies, giving you real-world industry experience while still studying"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Innovation Support",
                description: "Access to innovation labs, hackathons, and project mentorship to develop your tech ideas and showcase your creativity"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "Leadership Experience",
                description: "Opportunities to organize events, lead projects, and develop essential soft skills and leadership abilities valued by employers"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: "Certification Programs",
                description: "Access to special certification programs offered by BASIS and its partners at discounted rates to boost your credentials"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Community Support",
                description: "Be part of a supportive community of tech enthusiasts, sharing knowledge, resources, and opportunities with like-minded peers"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Job Placement Assistance",
                description: "Graduate with better job prospects through BSF's industry connections and placement assistance programs"
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: 0.1 * index, duration: 0.5 } 
                  }
                }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-bsf-teal transform hover:-translate-y-1"
              >
                <div className="text-bsf-red mb-6">{benefit.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-bsf-green">{benefit.title}</h3>
                <p className="text-bsf-gray text-sm md:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join BSF Section */}
      <motion.section 
        variants={fadeIn}
        id="join"
        className="bg-gradient-to-r from-bsf-green/5 to-white py-12 md:py-16"
      >
        <div className="container">
          <div className="max-w-section mx-auto">
            <div className="bg-gradient-to-r from-bsf-green to-bsf-teal rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-white/80 font-semibold mb-2 inline-block">BECOME A MEMBER</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Ready to Join BSF-GUB?</h2>
                  <p className="text-white/90 mb-6 md:mb-8">
                    Take the first step towards building your professional network and accelerating your tech career with BASIS Student Forum.
                  </p>
                  <Link 
                    to="/#join" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-bsf-red hover:bg-white hover:text-bsf-red text-white font-medium transition-colors"
                  >
                    Apply for Membership
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-bsf-green to-transparent opacity-70"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Students collaborating" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}