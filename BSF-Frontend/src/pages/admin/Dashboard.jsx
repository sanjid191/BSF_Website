import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authAPI, noticesAPI, committeeAPI, applicationsAPI } from '../../services/api';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20 }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    description: '',
    category: 'announcement',
    priority: 0,
    active: true,
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: ''
  });

  const [committeeForm, setCommitteeForm] = useState({
    fullName: '',
    position: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    year: new Date().getFullYear().toString(),
    displayOrder: 0,
    linkedinUrl: '',
    facebookUrl: '',
    bio: '',
    active: true
  });

  const [editingNotice, setEditingNotice] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = authAPI.getStoredUser();
      setUser(currentUser);
      
      const noticesData = await noticesAPI.getAllNotices();
      setNotices(noticesData.data || []);
      
      const committeeData = await committeeAPI.getAllMembers();
      setCommitteeMembers(committeeData.data || []);
      
      const applicationsData = await applicationsAPI.getAllApplications();
      setApplications(applicationsData.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setErrorMessage('Failed to load data');
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/admin/login');
  };

  // Notice CRUD Operations
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNotice) {
        await noticesAPI.updateNotice(editingNotice.id, noticeForm);
        showSuccess('Notice updated successfully!');
      } else {
        await noticesAPI.createNotice(noticeForm);
        showSuccess('Notice created successfully!');
      }
      resetNoticeForm();
      loadData();
    } catch (error) {
      showError(error.message || 'Failed to save notice');
    }
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setNoticeForm({
      title: notice.title,
      description: notice.description || '',
      category: notice.category,
      priority: notice.priority || 0,
      active: notice.active,
      publishDate: notice.publishDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      expiryDate: notice.expiryDate?.split('T')[0] || ''
    });
    setShowNoticeForm(true);
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticesAPI.deleteNotice(id);
        showSuccess('Notice deleted successfully!');
        loadData();
      } catch (error) {
        showError(error.message || 'Failed to delete notice');
      }
    }
  };

  const resetNoticeForm = () => {
    setNoticeForm({
      title: '',
      description: '',
      category: 'announcement',
      priority: 0,
      active: true,
      publishDate: new Date().toISOString().split('T')[0],
      expiryDate: ''
    });
    setEditingNotice(null);
    setShowNoticeForm(false);
  };

  // Committee CRUD Operations
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await committeeAPI.updateMember(editingMember.id, committeeForm);
        showSuccess('Committee member updated successfully!');
      } else {
        await committeeAPI.createMember(committeeForm);
        showSuccess('Committee member added successfully!');
      }
      resetMemberForm();
      loadData();
    } catch (error) {
      showError(error.message || 'Failed to save committee member');
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setCommitteeForm({
      fullName: member.fullName,
      position: member.position,
      email: member.email,
      phone: member.phone || '',
      studentId: member.studentId || '',
      department: member.department || '',
      year: member.year,
      displayOrder: member.displayOrder || 0,
      linkedinUrl: member.linkedinUrl || '',
      facebookUrl: member.facebookUrl || '',
      bio: member.bio || '',
      active: member.active
    });
    setShowMemberForm(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this committee member?')) {
      try {
        await committeeAPI.deleteMember(id);
        showSuccess('Committee member deleted successfully!');
        loadData();
      } catch (error) {
        showError(error.message || 'Failed to delete committee member');
      }
    }
  };

  const resetMemberForm = () => {
    setCommitteeForm({
      fullName: '',
      position: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      year: new Date().getFullYear().toString(),
      displayOrder: 0,
      linkedinUrl: '',
      facebookUrl: '',
      bio: '',
      active: true
    });
    setEditingMember(null);
    setShowMemberForm(false);
  };

  // Application Management
  const handleApproveApplication = async (id) => {
    if (window.confirm('Are you sure you want to approve this application?')) {
      try {
        await applicationsAPI.approveApplication(id);
        showSuccess('Application approved successfully!');
        loadData();
      } catch (error) {
        showError(error.message || 'Failed to approve application');
      }
    }
  };

  const handleRejectApplication = async (id) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      try {
        await applicationsAPI.rejectApplication(id);
        showSuccess('Application rejected');
        loadData();
      } catch (error) {
        showError(error.message || 'Failed to reject application');
      }
    }
  };

  const handleDeleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsAPI.deleteApplication(id);
        showSuccess('Application deleted successfully!');
        loadData();
      } catch (error) {
        showError(error.message || 'Failed to delete application');
      }
    }
  };

  const filteredApplications = applicationFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === applicationFilter);

  const stats = {
    totalNotices: notices.length,
    activeNotices: notices.filter(n => n.active).length,
    committeeMembers: committeeMembers.length,
    activeMembers: committeeMembers.filter(m => m.active).length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    totalApplications: applications.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bsf-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50"
    >
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-bsf-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                BSF Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user?.fullName || 'Admin'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Notices</p>
                <p className="text-3xl font-bold mt-2">{stats.totalNotices}</p>
              </div>
              <div className="text-4xl">📢</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Committee Members</p>
                <p className="text-3xl font-bold mt-2">{stats.committeeMembers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Pending Applications</p>
                <p className="text-3xl font-bold mt-2">{stats.pendingApplications}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Applications</p>
                <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'notices', label: 'Notices', icon: '📢' },
                { id: 'committee', label: 'Committee', icon: '👥' },
                { id: 'applications', label: 'Applications', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[150px] px-6 py-4 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-bsf-green border-b-4 border-bsf-green bg-green-50'
                      : 'text-gray-600 hover:text-bsf-green hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold text-xl mb-3 text-blue-900 flex items-center gap-2">
                      📢 Recent Notices
                    </h3>
                    <div className="space-y-2">
                      {notices.slice(0, 5).map((notice) => (
                        <div key={notice.id} className="bg-white p-3 rounded border border-blue-100">
                          <p className="font-medium text-sm">{notice.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notice.category} • {notice.active ? '✅ Active' : '❌ Inactive'}
                          </p>
                        </div>
                      ))}
                      {notices.length === 0 && (
                        <p className="text-gray-500 text-sm italic">No notices yet</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                    <h3 className="font-bold text-xl mb-3 text-purple-900 flex items-center gap-2">
                      👥 Committee Members
                    </h3>
                    <div className="space-y-2">
                      {committeeMembers.slice(0, 5).map((member) => (
                        <div key={member.id} className="bg-white p-3 rounded border border-purple-100">
                          <p className="font-medium text-sm">{member.fullName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {member.position} • Year {member.year}
                          </p>
                        </div>
                      ))}
                      {committeeMembers.length === 0 && (
                        <p className="text-gray-500 text-sm italic">No committee members yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notices Tab */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Notice Management</h2>
                  <button
                    onClick={() => {
                      resetNoticeForm();
                      setShowNoticeForm(!showNoticeForm);
                    }}
                    className="px-4 py-2 bg-bsf-green text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    {showNoticeForm ? '✖ Cancel' : '➕ Add Notice'}
                  </button>
                </div>

                {/* Notice Form */}
                {showNoticeForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200"
                  >
                    <h3 className="text-lg font-bold mb-4">
                      {editingNotice ? 'Edit Notice' : 'Add New Notice'}
                    </h3>
                    <form onSubmit={handleNoticeSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={noticeForm.title}
                            onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                          </label>
                          <select
                            value={noticeForm.category}
                            onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          >
                            <option value="announcement">Announcement</option>
                            <option value="event">Event</option>
                            <option value="urgent">Urgent</option>
                            <option value="general">General</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Publish Date
                          </label>
                          <input
                            type="date"
                            value={noticeForm.publishDate}
                            onChange={(e) => setNoticeForm({ ...noticeForm, publishDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (Optional)
                          </label>
                          <input
                            type="date"
                            value={noticeForm.expiryDate}
                            onChange={(e) => setNoticeForm({ ...noticeForm, expiryDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority (0-10)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={noticeForm.priority}
                            onChange={(e) => setNoticeForm({ ...noticeForm, priority: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={noticeForm.active}
                              onChange={(e) => setNoticeForm({ ...noticeForm, active: e.target.checked })}
                              className="w-4 h-4 text-bsf-green border-gray-300 rounded focus:ring-bsf-green"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          rows="4"
                          value={noticeForm.description}
                          onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                        ></textarea>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-bsf-green text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          {editingNotice ? 'Update Notice' : 'Create Notice'}
                        </button>
                        <button
                          type="button"
                          onClick={resetNoticeForm}
                          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Notices List */}
                <div className="space-y-3">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{notice.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              notice.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {notice.active ? 'Active' : 'Inactive'}
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {notice.category}
                            </span>
                          </div>
                          {notice.description && (
                            <p className="text-gray-600 text-sm mb-2">{notice.description}</p>
                          )}
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            <span>📅 Published: {new Date(notice.publishDate).toLocaleDateString()}</span>
                            {notice.expiryDate && (
                              <span>⏰ Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                            )}
                            <span>⭐ Priority: {notice.priority}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditNotice(notice)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {notices.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No notices found. Click "Add Notice" to create one.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Committee Tab */}
            {activeTab === 'committee' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Committee Management</h2>
                  <button
                    onClick={() => {
                      resetMemberForm();
                      setShowMemberForm(!showMemberForm);
                    }}
                    className="px-4 py-2 bg-bsf-green text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    {showMemberForm ? '✖ Cancel' : '➕ Add Member'}
                  </button>
                </div>

                {/* Member Form */}
                {showMemberForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200"
                  >
                    <h3 className="text-lg font-bold mb-4">
                      {editingMember ? 'Edit Committee Member' : 'Add New Committee Member'}
                    </h3>
                    <form onSubmit={handleMemberSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={committeeForm.fullName}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, fullName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position *
                          </label>
                          <input
                            type="text"
                            required
                            value={committeeForm.position}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, position: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={committeeForm.email}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={committeeForm.phone}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID
                          </label>
                          <input
                            type="text"
                            value={committeeForm.studentId}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, studentId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            value={committeeForm.department}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, department: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year *
                          </label>
                          <input
                            type="text"
                            required
                            value={committeeForm.year}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, year: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Display Order
                          </label>
                          <input
                            type="number"
                            value={committeeForm.displayOrder}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, displayOrder: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            value={committeeForm.linkedinUrl}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, linkedinUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Facebook URL
                          </label>
                          <input
                            type="url"
                            value={committeeForm.facebookUrl}
                            onChange={(e) => setCommitteeForm({ ...committeeForm, facebookUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                          />
                        </div>

                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={committeeForm.active}
                              onChange={(e) => setCommitteeForm({ ...committeeForm, active: e.target.checked })}
                              className="w-4 h-4 text-bsf-green border-gray-300 rounded focus:ring-bsf-green"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows="3"
                          value={committeeForm.bio}
                          onChange={(e) => setCommitteeForm({ ...committeeForm, bio: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bsf-green focus:border-transparent"
                        ></textarea>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-bsf-green text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          {editingMember ? 'Update Member' : 'Add Member'}
                        </button>
                        <button
                          type="button"
                          onClick={resetMemberForm}
                          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Members List */}
                <div className="space-y-3">
                  {committeeMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{member.fullName}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              member.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-blue-600 font-medium text-sm mb-1">{member.position}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                            <span>📧 {member.email}</span>
                            {member.phone && <span>📱 {member.phone}</span>}
                            {member.studentId && <span>🎓 {member.studentId}</span>}
                            {member.department && <span>🏢 {member.department}</span>}
                            <span>📅 Year {member.year}</span>
                          </div>
                          {member.bio && (
                            <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {committeeMembers.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No committee members found. Click "Add Member" to create one.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">Membership Applications</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setApplicationFilter('all')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        applicationFilter === 'all'
                          ? 'bg-bsf-green text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      All ({applications.length})
                    </button>
                    <button
                      onClick={() => setApplicationFilter('pending')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        applicationFilter === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Pending ({applications.filter(a => a.status === 'pending').length})
                    </button>
                    <button
                      onClick={() => setApplicationFilter('approved')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        applicationFilter === 'approved'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Approved ({applications.filter(a => a.status === 'approved').length})
                    </button>
                    <button
                      onClick={() => setApplicationFilter('rejected')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        applicationFilter === 'rejected'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Rejected ({applications.filter(a => a.status === 'rejected').length})
                    </button>
                  </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                  {filteredApplications.map((app) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-xl text-gray-900">{app.full_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              app.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : app.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {app.status === 'pending' ? '⏳ ' : app.status === 'approved' ? '✅ ' : '❌ '}
                              {app.status}
                            </span>
                            {app.position_applied && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                🎯 {app.position_applied}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">📧 Email:</span>
                              <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                                {app.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">📱 Phone:</span>
                              <span>{app.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">🎓 Student ID:</span>
                              <span>{app.student_id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">🏢 Department:</span>
                              <span>{app.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">📅 Year:</span>
                              <span>{app.year}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">📆 Applied:</span>
                              <span>{new Date(app.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {app.message && (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">💬 Message:</p>
                              <p className="text-sm text-gray-600">{app.message}</p>
                            </div>
                          )}

                          {app.reviewed_at && (
                            <div className="text-xs text-gray-500">
                              {app.status === 'approved' ? '✅' : '❌'} Reviewed on {new Date(app.reviewed_at).toLocaleString()}
                              {app.reviewer && ` by ${app.reviewer.full_name}`}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveApplication(app.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                              >
                                ✅ Approve
                              </button>
                              <button
                                onClick={() => handleRejectApplication(app.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                              >
                                ❌ Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredApplications.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-gray-500 text-lg">
                        {applicationFilter === 'all' 
                          ? 'No membership applications yet'
                          : `No ${applicationFilter} applications`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
