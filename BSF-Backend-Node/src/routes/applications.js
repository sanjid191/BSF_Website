const express = require('express');
const router = express.Router();
const { MembershipApplication } = require('../models');
const auth = require('../middleware/auth');

// Public route - Submit new application
router.post('/', async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      student_id,
      department,
      year,
      position_applied,
      message
    } = req.body;

    // Validation
    if (!full_name || !email || !phone || !student_id || !department || !year) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: full_name, email, phone, student_id, department, year'
      });
    }

    // Check for duplicate application (same student_id with pending status)
    const existingApplication = await MembershipApplication.findOne({
      where: {
        student_id,
        status: 'pending'
      }
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'You already have a pending application. Please wait for review.'
      });
    }

    // Create application
    const application = await MembershipApplication.create({
      full_name,
      email,
      phone,
      student_id,
      department,
      year,
      position_applied,
      message,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review your application soon.',
      data: application
    });

  } catch (error) {
    console.error('Error creating application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// Admin routes - Require authentication
router.use(auth);

// Get all applications (with optional status filter)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    const whereClause = status ? { status } : {};
    
    const applications = await MembershipApplication.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      include: [{
        model: require('../models').User,
        as: 'reviewer',
        attributes: ['id', 'email', 'full_name']
      }]
    });

    // Get counts by status
    const counts = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };

    return res.json({
      success: true,
      data: applications,
      counts
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Get single application by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const application = await MembershipApplication.findByPk(id, {
      include: [{
        model: require('../models').User,
        as: 'reviewer',
        attributes: ['id', 'email', 'full_name']
      }]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message
    });
  }
});

// Approve application
router.put('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const application = await MembershipApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Application is already ${application.status}`
      });
    }

    await application.approve(adminId);

    return res.json({
      success: true,
      message: 'Application approved successfully',
      data: application
    });

  } catch (error) {
    console.error('Error approving application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to approve application',
      error: error.message
    });
  }
});

// Reject application
router.put('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const application = await MembershipApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Application is already ${application.status}`
      });
    }

    await application.reject(adminId);

    return res.json({
      success: true,
      message: 'Application rejected',
      data: application
    });

  } catch (error) {
    console.error('Error rejecting application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reject application',
      error: error.message
    });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const application = await MembershipApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    await application.destroy();

    return res.json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message
    });
  }
});

module.exports = router;
