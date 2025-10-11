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

export default function MembershipApply() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    
    // Academic Information
    studentId: '',
    department: '',
    semester: '',
    cgpa: '',
    expectedGraduation: '',
    
    // Contact Information
    presentAddress: '',
    permanentAddress: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Professional Information
    linkedin: '',
    github: '',
    portfolio: '',
    skills: '',
    
    // Interests & Motivation
    areasOfInterest: [],
    whyJoin: '',
    expectations: '',
    previousExperience: '',
    
    // Additional
    heardAboutUs: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'areasOfInterest') {
      setFormData(prev => ({
        ...prev,
        areasOfInterest: checked
          ? [...prev.areasOfInterest, value]
          : prev.areasOfInterest.filter(item => item !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Phone number must be 11 digits';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please tell us why you want to join';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual backend call later
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        studentId: '',
        department: '',
        semester: '',
        cgpa: '',
        expectedGraduation: '',
        presentAddress: '',
        permanentAddress: '',
        emergencyContact: '',
        emergencyPhone: '',
        linkedin: '',
        github: '',
        portfolio: '',
        skills: '',
        areasOfInterest: [],
        whyJoin: '',
        expectations: '',
        previousExperience: '',
        heardAboutUs: '',
        agreeTerms: false
      });
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const areasOfInterestOptions = [
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
    'Data Science',
    'Cybersecurity',
    'Cloud Computing',
    'UI/UX Design',
    'Game Development',
    'IoT',
    'Blockchain'
  ];

  if (submitSuccess) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bsf-green mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-bsf-gray text-base sm:text-lg mb-8">
            Thank you for applying to join BASIS Student Forum at GUB. We'll review your application and get back to you within 3-5 business days via email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-bsf-green text-white rounded-lg font-medium hover:bg-bsf-green/90 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-3 border-2 border-bsf-green text-bsf-green rounded-lg font-medium hover:bg-bsf-green hover:text-white transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-bsf-green to-bsf-teal py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Membership Application
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-0 max-w-2xl mx-auto">
              Join BASIS Student Forum and take the first step towards building your professional network in the tech industry
            </p>
          </motion.div>
        </div>
      </div>

      {/* Application Form */}
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Benefits Overview */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-br from-bsf-green/5 to-bsf-teal/5 rounded-xl p-6 sm:p-8 mb-8 border border-bsf-green/10"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-bsf-green mb-4">Why Become a Member?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🎓', text: 'Industry-aligned training & workshops' },
                { icon: '🤝', text: 'Networking with tech professionals' },
                { icon: '💼', text: 'Internship & job opportunities' },
                { icon: '🚀', text: 'Real-world project experience' },
                { icon: '🏆', text: 'Participate in competitions' },
                { icon: '📚', text: 'Access to exclusive resources' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-sm sm:text-base text-bsf-gray">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeIn}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10"
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-bsf-green mb-6 pb-3 border-b-2 border-bsf-green/20">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="error-message text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="error-message text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && <p className="error-message text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-bsf-green mb-6 pb-3 border-b-2 border-bsf-green/20">
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.studentId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                    placeholder="Your GUB Student ID"
                  />
                  {errors.studentId && <p className="error-message text-red-500 text-sm mt-1">{errors.studentId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.department ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                  >
                    <option value="">Select Department</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="eee">Electrical & Electronic Engineering</option>
                    <option value="ce">Civil Engineering</option>
                    <option value="bba">Business Administration</option>
                    <option value="english">English</option>
                    <option value="law">Law</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.department && <p className="error-message text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Current Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.semester ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sem => (
                      <option key={sem} value={sem}>{sem}{sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester</option>
                    ))}
                  </select>
                  {errors.semester && <p className="error-message text-red-500 text-sm mt-1">{errors.semester}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Current CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="e.g., 3.75"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Expected Graduation
                  </label>
                  <input
                    type="month"
                    name="expectedGraduation"
                    value={formData.expectedGraduation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-bsf-green mb-6 pb-3 border-b-2 border-bsf-green/20">
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Present Address
                  </label>
                  <textarea
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="Your current address"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Permanent Address
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="Your permanent address"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bsf-gray mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                      placeholder="Guardian/Parent name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bsf-gray mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-bsf-green mb-6 pb-3 border-b-2 border-bsf-green/20">
                Professional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Portfolio/Personal Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-bsf-gray mb-2">
                    Technical Skills
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                    placeholder="e.g., JavaScript, Python, React, Node.js, etc."
                  ></textarea>
                  <p className="text-xs text-bsf-gray mt-1">Separate skills with commas</p>
                </div>
              </div>
            </div>

            {/* Interests & Motivation */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-bsf-green mb-6 pb-3 border-b-2 border-bsf-green/20">
                Interests & Motivation
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-bsf-gray mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {areasOfInterestOptions.map((area) => (
                    <label key={area} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="areasOfInterest"
                        value={area}
                        checked={formData.areasOfInterest.includes(area)}
                        onChange={handleChange}
                        className="w-4 h-4 text-bsf-green border-gray-300 rounded focus:ring-bsf-green"
                      />
                      <span className="ml-2 text-sm text-bsf-gray">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-bsf-gray mb-2">
                  Why do you want to join BASIS Student Forum? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.whyJoin ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-bsf-green/50`}
                  placeholder="Share your motivation for joining BSF..."
                ></textarea>
                {errors.whyJoin && <p className="error-message text-red-500 text-sm mt-1">{errors.whyJoin}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-bsf-gray mb-2">
                  What do you expect to gain from this membership?
                </label>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  placeholder="Your expectations..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-bsf-gray mb-2">
                  Previous Experience (Clubs, Organizations, Projects)
                </label>
                <textarea
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                  placeholder="Tell us about your previous involvement in clubs or projects..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-bsf-gray mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="heardAboutUs"
                  value={formData.heardAboutUs}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bsf-green/50"
                >
                  <option value="">Select an option</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend">Friend/Classmate</option>
                  <option value="university-event">University Event</option>
                  <option value="website">Website</option>
                  <option value="email">Email</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-5 h-5 text-bsf-green border-gray-300 rounded focus:ring-bsf-green mt-0.5"
                  />
                  <span className="ml-3 text-sm text-bsf-gray">
                    I agree to the{' '}
                    <Link to="/constitution" className="text-bsf-green hover:text-bsf-red font-medium">
                      terms and conditions
                    </Link>{' '}
                    and understand that my application will be reviewed by the BSF committee. I confirm that all information provided is accurate and complete. <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agreeTerms && <p className="error-message text-red-500 text-sm mt-2 ml-8">{errors.agreeTerms}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                to="/"
                className="px-6 py-3 border-2 border-bsf-gray text-bsf-gray rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-bsf-green text-white rounded-lg font-semibold hover:bg-bsf-green/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
