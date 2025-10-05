import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

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

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const aboutRef = useRef(null);
  
  return (
    <motion.div 
      initial="initial"
      animate="animate" 
      exit="exit"
      variants={staggerContainer}
      className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 pb-0"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bsf-green to-bsf-teal py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-tl-full -mb-10 -mr-10 sm:-mb-20 sm:-mr-20 blur-xl"></div>
        <div className="absolute top-20 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-bsf-red/20 rounded-full blur-xl"></div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <motion.div 
            variants={fadeIn} 
            className="max-w-narrow mx-auto text-center"
          >
            <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
              <span className="font-medium">BASIS Student Forum — Green University Chapter</span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Bridging Academia with <span className="text-bsf-teal">Industry</span>
            </h1>
            <p className="text-white/90 text-sm xs:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
              Connecting students with the tech industry through innovation, collaboration, and professional development opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/projects" className="w-full xs:w-auto text-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg bg-white text-bsf-green font-medium hover:bg-bsf-red hover:text-white transition-colors">
                Explore Projects
              </Link>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full xs:w-auto text-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-bsf-green transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        id="about"
        variants={fadeIn} 
        className="container py-8 sm:py-10 px-4 sm:px-6"
      >
        <div className="max-w-section mx-auto grid gap-6 sm:gap-8 lg:gap-12 items-center">
          <motion.div variants={slideIn} className="order-2 md:order-1 md:col-span-1">
            <div className="relative">
              <div className="aspect-video bg-bsf-gray/10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/src/assets/logo/BSF-new.png" 
                  alt="BASIS Student Forum Logo" 
                  className="object-contain w-full h-full p-4 sm:p-6"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-bsf-red rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                SINCE<br/>2023
              </div>
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-bsf-teal/20 rounded-full blur-xl -z-10"></div>
            </div>
          </motion.div>

          <motion.div variants={slideRight} className="order-1 md:order-2 md:col-span-1">
            <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">ABOUT US</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 text-bsf-green">What is BSF-GUB?</h2>
            <p className="text-bsf-gray mb-3 sm:mb-4 text-sm sm:text-base">
              The BASIS Student Forum at Green University of Bangladesh is a platform that bridges the gap between academia and industry, preparing students for successful careers in IT and tech.
            </p>
            <p className="text-bsf-gray mb-4 sm:mb-6 text-sm sm:text-base">
              Established in partnership with Bangladesh Association of Software and Information Services (BASIS), we focus on practical skill development, industry connections, and real-world projects.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-start">
                <div className="bg-bsf-green/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-bsf-gray">Industry-aligned training</span>
              </div>
              <div className="flex items-start">
                <div className="bg-bsf-green/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-bsf-gray">Professional networking</span>
              </div>
              <div className="flex items-start">
                <div className="bg-bsf-green/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-bsf-gray">Hands-on workshops</span>
              </div>
              <div className="flex items-start">
                <div className="bg-bsf-green/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-bsf-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-bsf-gray">Skill development</span>
              </div>
            </div>
            <Link to="/basis-info" className="inline-flex items-center text-bsf-red hover:text-bsf-green font-medium text-sm sm:text-base">
              Learn more about us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        variants={fadeIn}
        className="bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="container px-4 sm:px-6">
          <div className="max-w-section mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">BENEFITS</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-3 sm:mb-4">Why Join BSF?</h2>
              <p className="text-bsf-gray mt-2 max-w-2xl mx-auto text-sm sm:text-base">
                Membership opens doors to exclusive opportunities and resources to advance your tech career
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Industry Connections",
                  description: "Direct access to leading tech companies and professionals in Bangladesh's IT sector"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                  title: "Skill Development",
                  description: "Workshops, bootcamps, and training sessions focused on in-demand tech skills"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Networking",
                  description: "Connect with like-minded peers, industry mentors, and potential employers"
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
                  className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-bsf-teal transform hover:-translate-y-1"
                >
                  <div className="text-bsf-red mb-4 sm:mb-6">{benefit.icon}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-bsf-green">{benefit.title}</h3>
                  <p className="text-bsf-gray text-xs sm:text-sm md:text-base">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 md:mt-16 text-center">
              <Link to="/basis-info" className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg border-2 border-bsf-red text-bsf-red font-medium hover:bg-bsf-red hover:text-white transition-colors text-sm sm:text-base">
                View All Benefits
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Committee Section */}
      <motion.section 
        variants={fadeIn}
        className="container py-10 md:py-14 lg:py-16 px-4 sm:px-6"
      >
        <div className="max-w-section mx-auto">
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">OUR TEAM</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-3 sm:mb-4">Committee Members</h2>
            <p className="text-bsf-gray mt-2 max-w-2xl mx-auto text-sm sm:text-base">
              Meet the dedicated team leading BASIS Student Forum at GUB
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
                name: "Rifat Ahmed",
                position: "President"
              },
              {
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
                name: "Sanjida Akter",
                position: "General Secretary"
              },
              {
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
                name: "Tanvir Rahman",
                position: "Treasurer"
              },
              {
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
                name: "Fahmida Khan",
                position: "Event Coordinator"
              },
              {
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
                name: "Mahfuz Alam",
                position: "Technical Lead"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { 
                    opacity: 1, 
                    scale: 1, 
                    transition: { delay: 0.15 * index, duration: 0.5 } 
                  }
                }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bsf-green/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                    <div className="flex space-x-2">
                      <a href="#" className="bg-white/20 hover:bg-white/40 p-1.5 rounded-full backdrop-blur-sm">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 hover:bg-white/40 p-1.5 rounded-full backdrop-blur-sm">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-bsf-green">{member.name}</h3>
                <p className="text-bsf-gray text-xs md:text-sm">{member.position}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <Link to="/members" className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-bsf-green text-white text-sm sm:text-base font-medium hover:bg-bsf-red transition-colors">
              View All Members
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Events Showcase */}
      <motion.section 
        variants={fadeIn}
        className="bg-gradient-to-r from-bsf-gray/5 to-white py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="container px-4 sm:px-6">
          <div className="max-w-section mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">PORTFOLIO</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-3 sm:mb-4">Events</h2>
              <p className="text-bsf-gray mt-2 max-w-2xl mx-auto text-sm sm:text-base">
                Discover our latest activities and successful initiatives
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  title: "Tech Innovation Summit 2025",
                  description: "Annual hackathon bringing together the brightest minds from GUB",
                  tag: "Hackathon",
                  date: "March 15, 2025"
                },
                {
                  image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  title: "Industry Connect 2025",
                  description: "Networking event with top tech companies for internship opportunities",
                  tag: "Networking",
                  date: "April 23, 2025"
                },
                {
                  image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  title: "Career Development Workshop",
                  description: "Hands-on training for students on in-demand industry skills",
                  tag: "Workshop",
                  date: "August 22, 2025"
                },
                {
                  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  title: "Tech Fest 2025",
                  description: "Annual technology festival showcasing student innovations and research",
                  tag: "Festival",
                  date: "October 5, 2025"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: 0.15 * index, duration: 0.5 } 
                    }
                  }}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <span className="bg-bsf-red/10 text-bsf-red px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                        {item.tag}
                      </span>
                      <span className="text-bsf-gray text-xs mt-1 sm:mt-0">{item.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-md md:text-lg font-bold mb-1 sm:mb-2 text-bsf-green group-hover:text-bsf-red transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-bsf-gray text-xs md:text-sm mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                    <Link 
                      to="/events" 
                      className="text-bsf-red font-medium hover:text-bsf-green transition-colors inline-flex items-center text-xs md:text-sm"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <Link 
                to="/events" 
                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg border-2 border-bsf-green text-bsf-green text-sm sm:text-base font-medium hover:bg-bsf-green hover:text-white transition-colors"
              >
                View All Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Collaborations Section */}
      <motion.section 
        variants={fadeIn}
        className="container py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6"
      >
        <div className="max-w-section mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">PARTNERS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-3 sm:mb-4">Our Collaborations</h2>
            <p className="text-bsf-gray mt-2 max-w-2xl mx-auto text-sm sm:text-base">
              Working with industry leaders to create opportunities for students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex items-center justify-center h-20 sm:h-24 md:h-28">
              <img src="/src/assets/logo/BASIS.jpg" alt="BASIS Logo" className="max-h-10 sm:max-h-12 md:max-h-16 object-contain" />
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex items-center justify-center h-20 sm:h-24 md:h-28">
              <img src="/src/assets/logo/GUB-New-Logo_PNG.png" alt="GUB Logo" className="max-h-10 sm:max-h-12 md:max-h-16 object-contain" />
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex items-center justify-center h-20 sm:h-24 md:h-28">
              <img src="/src/assets/logo/DEPT OF CSE.png" alt="CSE Department Logo" className="max-h-10 sm:max-h-12 md:max-h-16 object-contain" />
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex items-center justify-center h-20 sm:h-24 md:h-28">
              <div className="font-bold text-bsf-gray text-sm sm:text-base">+ More Partners</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Notice & Announcement Board */}
      <motion.section 
        variants={fadeIn}
        className="bg-gradient-to-bl from-bsf-green/10 to-transparent py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="container px-4 sm:px-6">
          <div className="max-w-section mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <span className="text-bsf-red font-semibold mb-1 sm:mb-2 inline-block text-sm sm:text-base">UPDATES</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-3 sm:mb-4">Notice Board</h2>
              <p className="text-bsf-gray mt-2 max-w-2xl mx-auto text-sm sm:text-base">
                Stay updated with the latest announcements and opportunities
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  title: "Upcoming Workshop: Web Development Bootcamp",
                  date: "October 10, 2025",
                  content: "Join us for a 2-day intensive workshop on modern web development technologies. Registration open until October 5.",
                  category: "Event"
                },
                {
                  title: "BASIS Software Award 2025 - Student Category",
                  date: "September 28, 2025",
                  content: "Submit your innovative software projects for the annual BASIS awards. BSF members get priority registration.",
                  category: "Opportunity"
                },
                {
                  title: "New Committee Election Notice",
                  date: "September 15, 2025",
                  content: "Elections for the 2025-2026 executive committee will be held on October 15. Nominations open from September 20.",
                  category: "Important"
                }
              ].map((notice, index) => (
                <motion.div
                  key={index}
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { delay: 0.15 * index, duration: 0.5 } 
                    }
                  }}
                  className="bg-white mb-3 sm:mb-4 rounded-lg shadow-md overflow-hidden border-l-4 border-bsf-teal hover:border-bsf-red transition-colors"
                >
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <h3 className="font-bold text-sm sm:text-md md:text-lg text-bsf-green line-clamp-1">{notice.title}</h3>
                      <span className="bg-bsf-red/10 text-bsf-red px-2 py-0.5 sm:py-1 rounded text-xs font-medium mt-1 sm:mt-0 self-start sm:self-auto">
                        {notice.category}
                      </span>
                    </div>
                    <p className="text-bsf-gray text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{notice.content}</p>
                    <div className="flex flex-wrap justify-between items-center">
                      <span className="text-bsf-gray text-xs">{notice.date}</span>
                      <Link to="/notices" className="text-bsf-teal hover:text-bsf-red text-xs sm:text-sm font-medium">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <Link 
                to="/notices" 
                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg bg-bsf-teal text-white text-sm sm:text-base font-medium hover:bg-bsf-red transition-colors"
              >
                View All Notices
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Membership Section */}
      <motion.section 
        variants={fadeIn}
        id="join"
        className="container py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-section mx-auto">
          <div className="bg-gradient-to-r from-bsf-green to-bsf-teal rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-white/80 font-semibold mb-2 inline-block">JOIN US</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Become a Member Today</h2>
                <p className="text-white/90 mb-6 md:mb-8">
                  Take the first step towards building your professional network and accelerating your tech career with BASIS Student Forum.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Student ID" 
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option value="" disabled selected>Select Department</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="eee">Electrical & Electronic Engineering</option>
                    <option value="bba">Business Administration</option>
                  </select>
                  <button type="submit" className="w-full bg-bsf-red hover:bg-white hover:text-bsf-red text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                    Apply for Membership
                  </button>
                </form>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-bsf-green to-transparent opacity-90"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Students collaborating" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Stats Section */}
      <motion.section 
        variants={fadeIn}
        className="bg-bsf-gray/5 py-12 md:py-16"
      >
        <div className="container">
          <div className="max-w-section mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { number: "300+", label: "Members" },
                { number: "25+", label: "Events" },
                { number: "10+", label: "Industry Partners" },
                { number: "15+", label: "Completed Projects" }
              ].map((stat, index) => (
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
                  className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-bsf-red mb-1 md:mb-2">{stat.number}</div>
                  <div className="text-bsf-gray text-sm md:text-base font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}