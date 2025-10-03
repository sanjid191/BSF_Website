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

// Notice data with categories
const noticesData = [
  {
    id: 1,
    title: "Upcoming Workshop: Web Development Bootcamp",
    date: "October 10, 2025",
    content: "Join us for a 2-day intensive workshop on modern web development technologies including React, Node.js, and MongoDB. This hands-on workshop will be conducted by industry experts from leading tech companies. Registration is open until October 5th and is limited to 50 participants. BSF members get priority registration.",
    category: "Event",
    important: true,
    link: "#register"
  },
  {
    id: 2,
    title: "BASIS Software Award 2025 - Student Category",
    date: "September 28, 2025",
    content: "Submit your innovative software projects for the annual BASIS Software Awards in the student category. This is a great opportunity to showcase your work to the industry leaders. Projects will be judged by a panel of experts from top tech companies. BSF members get priority registration and mentoring support for their submissions.",
    category: "Opportunity",
    important: true,
    link: "#submit"
  },
  {
    id: 3,
    title: "New Committee Election Notice",
    date: "September 15, 2025",
    content: "Elections for the 2025-2026 executive committee will be held on October 15. Nominations are open from September 20 to October 5. Interested candidates must have been a BSF member for at least one semester and maintain a minimum GPA of 3.0. Election results will be announced on October 20.",
    category: "Important",
    important: true,
    link: "#nominate"
  },
  {
    id: 4,
    title: "Tech Talk: AI and Machine Learning in Industry",
    date: "September 10, 2025",
    content: "We are hosting a tech talk on 'AI and Machine Learning Applications in Industry' on September 20, 2025. The session will feature speakers from Microsoft and Google who will share insights on how AI is transforming various sectors and what skills students need to prepare for future careers in this field.",
    category: "Event",
    important: false,
    link: "#details"
  },
  {
    id: 5,
    title: "Student Membership Renewal",
    date: "September 5, 2025",
    content: "All BSF members are requested to renew their membership for the 2025-2026 academic year. The renewal fee is 500 BDT and can be paid through bKash or at the BSF office. The deadline for renewal is September 30, 2025. Members who fail to renew by the deadline will need to reapply as new members.",
    category: "Membership",
    important: true,
    link: "#renew"
  },
  {
    id: 6,
    title: "Call for Volunteers: Tech Fest 2025",
    date: "August 30, 2025",
    content: "We are looking for enthusiastic volunteers for the upcoming Tech Fest 2025 to be held in November. Volunteers will get hands-on experience in event management, networking opportunities with industry professionals, and a certificate of appreciation. Interested students can apply through the online form by September 15.",
    category: "Volunteer",
    important: false,
    link: "#volunteer"
  },
  {
    id: 7,
    title: "Industry Visit to Samsung R&D Center",
    date: "August 25, 2025",
    content: "BSF is organizing an industry visit to Samsung R&D Center on September 5, 2025. This is a great opportunity to see how a global tech company operates and what career opportunities are available. Only 30 spots are available and will be filled on a first-come, first-served basis.",
    category: "Event",
    important: false,
    link: "#visit"
  },
  {
    id: 8,
    title: "New Course: Blockchain Development",
    date: "August 20, 2025",
    content: "BSF in collaboration with BASIS is offering a new course on Blockchain Development starting from September 10. The course will cover blockchain fundamentals, smart contracts, and decentralized application development. BSF members get a 20% discount on the course fee.",
    category: "Course",
    important: false,
    link: "#course"
  },
  {
    id: 9,
    title: "Internship Opportunities at Local Tech Companies",
    date: "August 15, 2025",
    content: "Several local tech companies have partnered with BSF to offer internship opportunities exclusively for our members. Positions are available in software development, UI/UX design, data analysis, and digital marketing. Interested students can view the detailed job descriptions and apply through the BSF portal.",
    category: "Opportunity",
    important: false,
    link: "#internships"
  },
  {
    id: 10,
    title: "Annual General Meeting",
    date: "August 10, 2025",
    content: "The Annual General Meeting (AGM) of BSF-GUB Chapter will be held on August 25, 2025, at 3:00 PM in the university auditorium. All members are requested to attend this important meeting where we will discuss the achievements of the past year and plans for the coming year.",
    category: "Meeting",
    important: true,
    link: "#agm"
  }
];

// All available categories
const allCategories = ["All", ...new Set(noticesData.map(notice => notice.category))];

export default function Notices() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  // Filter notices based on selected category and importance
  const filteredNotices = noticesData.filter(notice => 
    (selectedCategory === "All" || notice.category === selectedCategory) &&
    (showImportantOnly ? notice.important : true)
  );

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="container py-12"
    >
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-bsf-green to-bsf-teal rounded-xl sm:rounded-2xl mb-8 md:mb-12 lg:mb-16 overflow-hidden max-w-section mx-auto">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="py-16 px-8 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Notices & Announcements
            </h1>
            <p className="text-white/90 text-lg mb-0 max-w-2xl mx-auto">
              Stay updated with the latest announcements, events, and opportunities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter options */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="inline-flex bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-bsf-green text-white shadow-md' 
                    : 'text-bsf-gray hover:text-bsf-green'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showImportantOnly}
                onChange={() => setShowImportantOnly(!showImportantOnly)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-bsf-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bsf-red"></div>
              <span className="ml-3 text-sm font-medium text-bsf-gray">Important only</span>
            </label>
          </div>
        </div>
        <div className="text-sm text-bsf-gray">
          Showing {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {showImportantOnly ? ' (important only)' : ''}
        </div>
      </div>

      {/* Notices list */}
      <div className="space-y-6">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-l-4 ${
                notice.important ? 'border-bsf-red' : 'border-bsf-teal'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-bsf-green">{notice.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notice.important 
                        ? 'bg-bsf-red/10 text-bsf-red' 
                        : 'bg-bsf-teal/10 text-bsf-teal'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-bsf-gray text-xs">{notice.date}</span>
                  </div>
                </div>
                <p className="text-bsf-gray mb-4">{notice.content}</p>
                <div className="flex justify-end">
                  <a 
                    href={notice.link} 
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium ${
                      notice.important ? 'bg-bsf-red hover:bg-bsf-red/90' : 'bg-bsf-teal hover:bg-bsf-teal/90'
                    } transition-colors`}
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.5 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 13.5v3m-3 3h6m-6-3h6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 10.5h.01M4.01 10.5H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-bsf-green">No notices found</h3>
            <p className="mt-1 text-sm text-bsf-gray">Try changing your filters to see more results.</p>
          </div>
        )}
      </div>

      {/* Subscribe to notifications section */}
      <div className="mt-16 bg-gradient-to-r from-bsf-green to-bsf-teal rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/90 mb-6">
              Subscribe to our notification service to get real-time updates on new announcements and opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button 
                type="submit"
                className="bg-bsf-red hover:bg-white hover:text-bsf-red transition-colors text-white px-6 py-3 rounded-lg font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
