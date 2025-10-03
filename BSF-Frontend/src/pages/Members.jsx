import { useState } from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Committee data by year
const committeeData = {
  '2025': [
    {
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Rifat Ahmed",
      position: "President",
      department: "CSE",
      year: "4th Year",
      bio: "Passionate about technology and leadership",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Sanjida Akter",
      position: "General Secretary",
      department: "CSE",
      year: "3rd Year",
      bio: "Dedicated to empowering tech communities",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Tanvir Rahman",
      position: "Treasurer",
      department: "CSE",
      year: "3rd Year",
      bio: "Managing finances with precision and care",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Fahmida Khan",
      position: "Event Coordinator",
      department: "CSE",
      year: "2nd Year",
      bio: "Creating memorable tech events for all",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Rahim Uddin",
      position: "Technical Lead",
      department: "CSE",
      year: "4th Year",
      bio: "Expert in multiple programming languages",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Ayesha Begum",
      position: "Media Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Creative mind behind our digital presence",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Mohammad Hossain",
      position: "Workshop Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Passionate about knowledge sharing",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Nusrat Jahan",
      position: "Public Relations",
      department: "EEE",
      year: "2nd Year",
      bio: "Building bridges between industry and academia",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Kamal Ahmed",
      position: "Design Lead",
      department: "CSE",
      year: "4th Year",
      bio: "UI/UX enthusiast with an eye for detail",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Sabrina Islam",
      position: "Content Writer",
      department: "CSE",
      year: "2nd Year",
      bio: "Passionate about technical writing and documentation",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Jahid Hassan",
      position: "Marketing Lead",
      department: "BBA",
      year: "3rd Year",
      bio: "Strategic thinker with marketing expertise",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Maliha Rahman",
      position: "Academic Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Dedicated to academic excellence and peer learning",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Imran Khan",
      position: "Dev Relations",
      department: "CSE",
      year: "4th Year",
      bio: "Connecting developers with opportunities",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Ahmed Ali",
      position: "Research Coordinator",
      department: "CSE",
      year: "4th Year",
      bio: "Driving innovation through research initiatives",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Sultana Begum",
      position: "Outreach Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Expanding our community beyond campus",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Rahima Akter",
      position: "Membership Lead",
      department: "CSE",
      year: "2nd Year",
      bio: "Growing our community with passionate members",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Farhan Uddin",
      position: "Project Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Managing projects with precision and excellence",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Nafisa Rahman",
      position: "Community Manager",
      department: "CSE",
      year: "3rd Year",
      bio: "Building a thriving tech community at GUB",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Rakib Hasan",
      position: "Hackathon Coordinator",
      department: "CSE",
      year: "4th Year",
      bio: "Organizing coding competitions and hackathons",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Abdul Karim",
      position: "Student Advisor",
      department: "CSE",
      year: "4th Year",
      bio: "Guiding the next generation of tech enthusiasts",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    }
  ],
  '2024': [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Mahbub Rahman",
      position: "President",
      department: "CSE",
      year: "4th Year",
      bio: "Former president, established key industry partnerships",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Nasrin Akter",
      position: "General Secretary",
      department: "CSE",
      year: "4th Year",
      bio: "Organized the first major tech summit at GUB",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Kamal Hassan",
      position: "Treasurer",
      department: "CSE",
      year: "3rd Year",
      bio: "Managed budget for 15+ successful events",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Israt Jahan",
      position: "Event Coordinator",
      department: "CSE",
      year: "3rd Year",
      bio: "Organized the annual Tech Fest 2024",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    }
  ],
  '2023': [
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Rafi Ahmed",
      position: "President",
      department: "CSE",
      year: "4th Year",
      bio: "Founding president of BSF-GUB chapter",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Tasnia Islam",
      position: "General Secretary",
      department: "CSE",
      year: "3rd Year",
      bio: "Established the initial framework and vision",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      name: "Arif Hossain",
      position: "Treasurer",
      department: "CSE",
      year: "4th Year",
      bio: "Set up financial processes for the forum",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    }
  ]
};

export default function Members() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMember, setSelectedMember] = useState(null);

  // All available years
  const years = Object.keys(committeeData).sort((a, b) => b - a); // Sort in descending order

  // Get members for selected year
  const members = committeeData[selectedYear] || [];

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    // Scroll to top when member selected on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="container py-12"
    >
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-bsf-green to-bsf-teal rounded-2xl mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="py-16 px-8 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Committee Members
            </h1>
            <p className="text-white/90 text-lg mb-0 max-w-2xl mx-auto">
              Meet the dedicated individuals who lead BASIS Student Forum at Green University of Bangladesh
            </p>
          </motion.div>
        </div>
      </div>

      {/* Year filter */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedYear === year 
                    ? 'bg-bsf-green text-white shadow-md' 
                    : 'text-bsf-gray hover:text-bsf-green'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-bsf-green text-center mb-2">
          Committee of {selectedYear}
        </h2>
        <p className="text-center text-bsf-gray mb-8">
          {selectedYear === '2025' 
            ? 'Current committee members for the academic year 2025' 
            : `Past committee members for the academic year ${selectedYear}`}
        </p>
      </div>

      {/* Members grid with detailed view */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left side: Members grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { 
                    opacity: 1, 
                    scale: 1, 
                    transition: { delay: 0.05 * index, duration: 0.4 } 
                  }
                }}
                className={`group cursor-pointer ${
                  selectedMember === member ? 'ring-2 ring-bsf-green ring-offset-2 rounded-xl' : ''
                }`}
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bsf-green/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex space-x-3">
                      <a href={member.social.facebook} className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a href={member.social.linkedin} className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-bsf-green">{member.name}</h3>
                <p className="text-bsf-gray text-xs">{member.position}</p>
              </motion.div>
            ))}
          </div>

          {/* Right side: Selected member detail */}
          <div className="md:col-span-4 md:sticky md:top-24 self-start">
            {selectedMember ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
              >
                <div className="relative mb-6">
                  <div className="aspect-square max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-bsf-green text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                    {selectedMember.position}
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-bsf-green mb-1">{selectedMember.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-bsf-gray text-sm">
                    <span>{selectedMember.department}</span>
                    <span>•</span>
                    <span>{selectedMember.year}</span>
                  </div>
                </div>

                <p className="text-bsf-gray text-sm mb-6 text-center">
                  "{selectedMember.bio}"
                </p>

                <div className="flex justify-center space-x-4">
                  <a href={selectedMember.social.facebook} className="bg-bsf-green/10 hover:bg-bsf-green/20 text-bsf-green p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href={selectedMember.social.twitter} className="bg-bsf-green/10 hover:bg-bsf-green/20 text-bsf-green p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href={selectedMember.social.linkedin} className="bg-bsf-green/10 hover:bg-bsf-green/20 text-bsf-green p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>

                {/* Additional info could be added here */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-bsf-green mb-2">Contact Information:</h4>
                  <div className="text-sm text-bsf-gray">
                    <p className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {selectedMember.name.toLowerCase().replace(' ', '.')}@example.com
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      +880 1XX XXX XXXX
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center">
                <div className="bg-gray-100 w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-bsf-green mb-1">Select a Member</h3>
                <p className="text-sm text-bsf-gray">
                  Click on any committee member to view their details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
