import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

// Event data
const eventsData = [
  // Past events
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    location: "GUB Auditorium",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Annual hackathon bringing together the brightest minds from GUB. The event featured 20+ teams competing to solve real-world problems with innovative tech solutions.",
    type: "past",
    category: "Hackathon",
    gallery: [
      "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 2,
    title: "Career Development Workshop",
    date: "August 22, 2024",
    location: "CSE Department",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Hands-on training for students on in-demand industry skills. Industry professionals from leading tech companies provided valuable insights on career paths and skill development.",
    type: "past",
    category: "Workshop",
    gallery: [
      "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 3,
    title: "BASIS Student Forum Inauguration",
    date: "January 10, 2024",
    location: "GUB Main Hall",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Official inauguration of the BASIS Student Forum at Green University of Bangladesh. The event was attended by university officials, industry leaders, and students.",
    type: "past",
    category: "Ceremony",
    gallery: [
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 4,
    title: "AI & ML Workshop Series",
    date: "May 5-8, 2024",
    location: "Online (Virtual)",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Four-day workshop series on artificial intelligence and machine learning fundamentals. Participants learned about data preprocessing, model building, and deployment strategies.",
    type: "past",
    category: "Workshop",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 5,
    title: "Industry Tour: Samsung R&D",
    date: "June 15, 2024",
    location: "Samsung R&D Center",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Educational visit to Samsung's Research & Development center. Students got a behind-the-scenes look at how a global tech company operates and develops cutting-edge products.",
    type: "past",
    category: "Industry Visit",
    gallery: [
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ]
  },
  
  // Upcoming events
  {
    id: 6,
    title: "Web Development Bootcamp",
    date: "October 10-11, 2025",
    location: "GUB Computer Lab",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Two-day intensive bootcamp on modern web development technologies. Participants will learn React, Node.js, and MongoDB through hands-on projects guided by industry experts.",
    type: "upcoming",
    category: "Workshop",
    registrationLink: "#register"
  },
  {
    id: 7,
    title: "Tech Fest 2025",
    date: "November 15-17, 2025",
    location: "GUB Campus",
    image: "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Annual technology festival featuring competitions, exhibitions, and talks. Join us for hackathons, coding contests, project showcases, and networking with industry professionals.",
    type: "upcoming",
    category: "Festival",
    registrationLink: "#register-techfest"
  },
  {
    id: 8,
    title: "Tech Talk: Future of AI",
    date: "October 25, 2025",
    location: "GUB Auditorium",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "An enlightening talk on the future of artificial intelligence and its impact on various industries. The session will be conducted by renowned AI researchers and industry practitioners.",
    type: "upcoming",
    category: "Seminar",
    registrationLink: "#register-techtalk"
  },
  {
    id: 9,
    title: "Blockchain Development Workshop",
    date: "December 5-6, 2025",
    location: "Virtual (Online)",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Learn blockchain fundamentals, smart contracts, and decentralized application development in this two-day virtual workshop. Suitable for beginners and intermediate developers.",
    type: "upcoming",
    category: "Workshop",
    registrationLink: "#register-blockchain"
  },
  {
    id: 10,
    title: "BASIS Software Award Ceremony",
    date: "January 20, 2026",
    location: "Radisson Blu Dhaka",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Annual award ceremony recognizing outstanding software projects and innovations in the student category. Join us for this prestigious event celebrating student achievements.",
    type: "upcoming",
    category: "Ceremony",
    registrationLink: "#register-awards"
  }
];

// All available categories
const allCategories = ["All", ...new Set(eventsData.map(event => event.category))];

export default function Events() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter events based on active tab and selected category
  const filteredEvents = eventsData.filter(event => 
    event.type === activeTab && 
    (selectedCategory === "All" || event.category === selectedCategory)
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Scroll to top when event selected on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get categories specific to the active tab
  const tabCategories = ["All", ...new Set(
    eventsData
      .filter(event => event.type === activeTab)
      .map(event => event.category)
  )];

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
              Events & Activities
            </h1>
            <p className="text-white/90 text-lg mb-0 max-w-2xl mx-auto">
              Discover our past achievements and upcoming events that connect students with the tech industry
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab and filter controls */}
      <div className="mb-10 flex flex-col space-y-6">
        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md">
            <button
              onClick={() => {
                setActiveTab('upcoming');
                setSelectedCategory("All");
                setSelectedEvent(null);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'upcoming' 
                  ? 'bg-bsf-red text-white shadow-md' 
                  : 'text-bsf-gray hover:text-bsf-red'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => {
                setActiveTab('past');
                setSelectedCategory("All");
                setSelectedEvent(null);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'past' 
                  ? 'bg-bsf-green text-white shadow-md' 
                  : 'text-bsf-gray hover:text-bsf-green'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center bg-white/50 backdrop-blur-sm p-1.5 rounded-xl shadow-sm">
            {tabCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedEvent(null);
                }}
                className={`m-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === category 
                    ? (activeTab === 'upcoming' ? 'bg-bsf-red text-white shadow-sm' : 'bg-bsf-green text-white shadow-sm')
                    : 'bg-white/50 text-bsf-gray hover:bg-white/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area - split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Events grid */}
        <div className={`${selectedEvent ? 'lg:col-span-7' : 'lg:col-span-12'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${selectedEvent ? '2' : '3'} gap-6`}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
                  selectedEvent?.id === event.id ? 'ring-2 ring-offset-2 ' + (activeTab === 'upcoming' ? 'ring-bsf-red' : 'ring-bsf-green') : ''
                }`}
                onClick={() => handleEventClick(event)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                      activeTab === 'upcoming' ? 'bg-bsf-red/80' : 'bg-bsf-green/80'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-bsf-green line-clamp-1">{event.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-bsf-gray mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <p className="text-bsf-gray text-sm line-clamp-2 mb-3">
                    {event.description.substring(0, 80)}...
                  </p>
                  <div className="flex justify-end">
                    <span className="text-sm font-medium text-bsf-red hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-bsf-green">No events found</h3>
              <p className="mt-1 text-sm text-bsf-gray">Try selecting a different category or tab.</p>
            </div>
          )}
        </div>

        {/* Event details */}
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 lg:sticky lg:top-24 self-start bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative aspect-video">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  activeTab === 'upcoming' ? 'bg-bsf-red/80' : 'bg-bsf-green/80'
                }`}>
                  {selectedEvent.category}
                </span>
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-bsf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-bsf-gray">{selectedEvent.date}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-bsf-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-bsf-gray">{selectedEvent.location}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-bsf-green mb-2">About this event</h3>
                <p className="text-bsf-gray">{selectedEvent.description}</p>
              </div>
              
              {activeTab === 'past' && selectedEvent.gallery && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-bsf-green mb-3">Event Gallery</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedEvent.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${selectedEvent.title} gallery ${index + 1}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'upcoming' && (
                <div className="mt-6">
                  <a 
                    href={selectedEvent.registrationLink} 
                    className="block w-full bg-bsf-red hover:bg-bsf-red/90 text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              )}
              
              {activeTab === 'past' && (
                <Link 
                  to="/gallery" 
                  className="block w-full bg-bsf-green hover:bg-bsf-green/90 text-white text-center py-3 rounded-lg font-medium transition-colors"
                >
                  View Full Gallery
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Calendar section */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-bsf-green">Event Calendar</h2>
          <p className="text-bsf-gray mt-2">
            Stay updated with all our upcoming events and activities
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-center items-center mb-8">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5 text-bsf-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-bsf-green px-6">October 2025</h3>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5 text-bsf-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="text-sm font-medium text-bsf-gray">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Empty days from previous month */}
            {[...Array(3)].map((_, index) => (
              <div key={`prev-${index}`} className="aspect-square rounded-lg flex items-center justify-center text-gray-400 text-sm">
                {28 + index}
              </div>
            ))}
            
            {/* Days of current month */}
            {[...Array(31)].map((_, index) => {
              const day = index + 1;
              const hasEvent = [10, 11, 25].includes(day); // Days with events
              
              return (
                <div 
                  key={`current-${index}`} 
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm cursor-pointer hover:bg-gray-100 ${
                    day === 3 ? 'bg-gray-100 font-bold' : '' // Current day
                  } ${
                    hasEvent ? 'border border-bsf-red' : ''
                  }`}
                >
                  {day}
                  {hasEvent && <span className="w-1 h-1 bg-bsf-red rounded-full mt-1"></span>}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-bsf-green mb-3">Upcoming in October</h4>
            <div className="space-y-3">
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                <div className="bg-bsf-red/10 text-bsf-red font-bold text-xl w-12 h-12 rounded flex items-center justify-center mr-4">
                  10
                </div>
                <div>
                  <h5 className="font-medium text-bsf-green">Web Development Bootcamp</h5>
                  <p className="text-sm text-bsf-gray">10:00 AM - 4:00 PM, GUB Computer Lab</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                <div className="bg-bsf-red/10 text-bsf-red font-bold text-xl w-12 h-12 rounded flex items-center justify-center mr-4">
                  11
                </div>
                <div>
                  <h5 className="font-medium text-bsf-green">Web Development Bootcamp (Day 2)</h5>
                  <p className="text-sm text-bsf-gray">10:00 AM - 4:00 PM, GUB Computer Lab</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                <div className="bg-bsf-red/10 text-bsf-red font-bold text-xl w-12 h-12 rounded flex items-center justify-center mr-4">
                  25
                </div>
                <div>
                  <h5 className="font-medium text-bsf-green">Tech Talk: Future of AI</h5>
                  <p className="text-sm text-bsf-gray">2:00 PM - 4:00 PM, GUB Auditorium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subscription banner */}
      <div className="mt-16 bg-gradient-to-r from-bsf-green to-bsf-teal rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Never Miss an Event</h2>
            <p className="text-white/90 mb-6">
              Subscribe to our calendar and get notified about upcoming events and activities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href="#google-calendar" 
                className="bg-white text-bsf-green hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5z"/>
                </svg>
                Google Calendar
              </a>
              <a 
                href="#outlook" 
                className="bg-white text-bsf-green hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,4H5C3.89,4,3,4.89,3,6v12c0,1.11,0.89,2,2,2h14c1.11,0,2-0.89,2-2V6C21,4.89,20.11,4,19,4z M19,18H5V8h14V18z"/>
                </svg>
                Outlook Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}