import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20 }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    totalApplications: 45,
    pendingApplications: 12,
    approvedMembers: 156,
    totalEvents: 24,
    upcomingEvents: 8,
    totalNotices: 35,
    activeNotices: 15,
    committeeMembers: 18
  });

  // Sample data for applications
  const [applications] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', studentId: '2021001', department: 'CSE', status: 'pending', date: '2025-10-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: '2021002', department: 'EEE', status: 'pending', date: '2025-10-09' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', studentId: '2021003', department: 'CSE', status: 'approved', date: '2025-10-08' },
  ]);

  const [notices] = useState([
    { id: 1, title: 'Annual Tech Fest 2025', date: '2025-10-05', status: 'active' },
    { id: 2, title: 'Workshop on AI/ML', date: '2025-10-01', status: 'active' },
    { id: 3, title: 'Membership Drive', date: '2025-09-28', status: 'expired' },
  ]);

  const [events] = useState([
    { id: 1, title: 'Hackathon 2025', date: '2025-11-15', status: 'upcoming', participants: 0 },
    { id: 2, title: 'Tech Talk: Cloud Computing', date: '2025-10-25', status: 'upcoming', participants: 45 },
    { id: 3, title: 'Code Sprint', date: '2025-09-20', status: 'completed', participants: 67 },
  ]);

  const dashboardCards = [
    {
      title: 'Applications',
      icon: '📝',
      stats: [
        { label: 'Total', value: stats.totalApplications, color: 'text-blue-600' },
        { label: 'Pending', value: stats.pendingApplications, color: 'text-orange-600' }
      ],
      gradient: 'from-blue-500 to-cyan-500',
      link: 'applications'
    },
    {
      title: 'Members',
      icon: '👥',
      stats: [
        { label: 'Total', value: stats.approvedMembers, color: 'text-green-600' },
        { label: 'Committee', value: stats.committeeMembers, color: 'text-purple-600' }
      ],
      gradient: 'from-green-500 to-teal-500',
      link: 'members'
    },
    {
      title: 'Events',
      icon: '🎯',
      stats: [
        { label: 'Total', value: stats.totalEvents, color: 'text-purple-600' },
        { label: 'Upcoming', value: stats.upcomingEvents, color: 'text-pink-600' }
      ],
      gradient: 'from-purple-500 to-pink-500',
      link: 'events'
    },
    {
      title: 'Notices',
      icon: '📢',
      stats: [
        { label: 'Total', value: stats.totalNotices, color: 'text-orange-600' },
        { label: 'Active', value: stats.activeNotices, color: 'text-red-600' }
      ],
      gradient: 'from-orange-500 to-red-500',
      link: 'notices'
    }
  ];

  const quickActions = [
    { title: 'Review Applications', icon: '📋', description: 'Review pending membership applications', link: 'applications', color: 'from-blue-500 to-blue-600' },
    { title: 'Update Committee', icon: '👔', description: 'Manage committee member information', link: 'committee', color: 'from-green-500 to-green-600' },
    { title: 'Post Event', icon: '📅', description: 'Create and publish new events', link: 'events', color: 'from-purple-500 to-purple-600' },
    { title: 'Upload Notice', icon: '📣', description: 'Upload important notices and announcements', link: 'notices', color: 'from-orange-500 to-orange-600' },
    { title: 'Manage Members', icon: '🎓', description: 'View and manage all members', link: 'members', color: 'from-teal-500 to-teal-600' },
    { title: 'Settings', icon: '⚙️', description: 'Configure system settings', link: 'settings', color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-bsf-green via-bsf-teal to-blue-600 text-white py-8 px-4 sm:px-6 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Manage BASIS Student Forum - GUB</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/30"
              >
                View Website
              </Link>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-all shadow-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => setActiveTab(card.link)}
            >
              <div className={`bg-gradient-to-r ${card.gradient} p-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{card.icon}</span>
                  <span className="text-white text-2xl font-bold">{card.stats[0].value}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{card.title}</h3>
                <div className="space-y-2">
                  {card.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-bsf-green to-bsf-teal bg-clip-text text-transparent">⚡ Quick Actions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => setActiveTab(action.link)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-left group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-2 p-4 min-w-max">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'applications', label: 'Applications', icon: '📝' },
                { id: 'members', label: 'Members', icon: '👥' },
                { id: 'committee', label: 'Committee', icon: '👔' },
                { id: 'events', label: 'Events', icon: '🎯' },
                { id: 'notices', label: 'Notices', icon: '📢' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-bsf-green to-bsf-teal text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📈</span>
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">New application received</p>
                          <p className="text-xs text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-blue-500 text-xl">📅</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Event published: Hackathon 2025</p>
                          <p className="text-xs text-gray-600">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-500 text-xl">👥</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">3 new members approved</p>
                          <p className="text-xs text-gray-600">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      Pending Actions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700">Applications to review</span>
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">12</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700">Upcoming events to manage</span>
                        <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">8</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm text-gray-700">Expired notices</span>
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Membership Applications</h3>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bsf-green">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-gray-800">{app.name}</div>
                              <div className="text-sm text-gray-500">{app.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{app.studentId}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{app.department}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{app.date}</td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              app.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              app.status === 'approved' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                              {app.status === 'pending' && (
                                <>
                                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">Approve</button>
                                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Reject</button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Manage Members</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-bsf-green to-bsf-teal text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    + Add Member
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Member management interface will be displayed here.</p>
                  <p className="text-sm text-gray-500 mt-2">View, edit, and manage all forum members.</p>
                </div>
              </div>
            )}

            {activeTab === 'committee' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Committee Members</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    + Add Committee Member
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-bsf-green to-bsf-teal rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {String.fromCharCode(65 + i - 1)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Member Name</h4>
                          <p className="text-sm text-gray-600">Position Title</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">Edit</button>
                        <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Events Management</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    + Create Event
                  </button>
                </div>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              📅 {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              👥 {event.participants} participants
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                              event.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">Edit</button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notices' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Notices Management</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    + Upload Notice
                  </button>
                </div>
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{notice.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>📅 Posted: {notice.date}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              notice.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">Edit</button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">System Settings</h3>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bsf-green" defaultValue="BASIS Student Forum - GUB" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bsf-green" defaultValue="bsf@gub.edu.bd" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-gray-800 mb-4">Application Settings</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-bsf-green rounded focus:ring-bsf-green" defaultChecked />
                        <span className="text-gray-700">Accept new membership applications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-bsf-green rounded focus:ring-bsf-green" defaultChecked />
                        <span className="text-gray-700">Send email notifications for new applications</span>
                      </label>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-gradient-to-r from-bsf-green to-bsf-teal text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
