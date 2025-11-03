const express = require('express');
const router = express.Router();
const { CommitteeMember } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/committee/public
// @desc    Get committee members for a specific year (public access)
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const { year = new Date().getFullYear().toString() } = req.query;

    const members = await CommitteeMember.findAll({
      where: {
        year: year,
        active: true
      },
      order: [
        ['displayOrder', 'ASC'],
        ['id', 'ASC']
      ]
    });

    res.json({
      success: true,
      year: year,
      count: members.length,
      data: members
    });
  } catch (error) {
    console.error('Get public committee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/committee/years
// @desc    Get all available years
// @access  Public
router.get('/years', async (req, res) => {
  try {
    const years = await CommitteeMember.findAll({
      attributes: [[require('sequelize').fn('DISTINCT', require('sequelize').col('year')), 'year']],
      where: { active: true },
      order: [['year', 'DESC']],
      raw: true
    });

    res.json({
      success: true,
      data: years.map(y => y.year)
    });
  } catch (error) {
    console.error('Get years error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/committee
// @desc    Get all committee members (admin)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { year, active, page = 1, limit = 100 } = req.query;

    const whereClause = {};

    if (year) {
      whereClause.year = year;
    }

    if (active !== undefined) {
      whereClause.active = active === 'true';
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: members } = await CommitteeMember.findAndCountAll({
      where: whereClause,
      order: [
        ['year', 'DESC'],
        ['displayOrder', 'ASC'],
        ['id', 'ASC']
      ],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      success: true,
      count: members.length,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
      data: members
    });
  } catch (error) {
    console.error('Get committee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/committee/:id
// @desc    Get single committee member
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const member = await CommitteeMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Get committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/committee
// @desc    Create new committee member
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      fullName,
      position,
      email,
      phone,
      studentId,
      department,
      imageUrl,
      linkedinUrl,
      facebookUrl,
      bio,
      year,
      displayOrder = 0,
      active = true
    } = req.body;

    // Validation
    if (!fullName || !position || !email || !year) {
      return res.status(400).json({
        success: false,
        message: 'Please provide fullName, position, email, and year'
      });
    }

    const member = await CommitteeMember.create({
      fullName,
      position,
      email,
      phone,
      studentId,
      department,
      imageUrl,
      linkedinUrl,
      facebookUrl,
      bio,
      year,
      displayOrder,
      active
    });

    res.status(201).json({
      success: true,
      message: 'Committee member added successfully',
      data: member
    });
  } catch (error) {
    console.error('Create committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/committee/:id
// @desc    Update committee member
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const member = await CommitteeMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    const {
      fullName,
      position,
      email,
      phone,
      studentId,
      department,
      imageUrl,
      linkedinUrl,
      facebookUrl,
      bio,
      year,
      displayOrder,
      active
    } = req.body;

    await member.update({
      fullName: fullName || member.fullName,
      position: position || member.position,
      email: email || member.email,
      phone: phone !== undefined ? phone : member.phone,
      studentId: studentId !== undefined ? studentId : member.studentId,
      department: department !== undefined ? department : member.department,
      imageUrl: imageUrl !== undefined ? imageUrl : member.imageUrl,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : member.linkedinUrl,
      facebookUrl: facebookUrl !== undefined ? facebookUrl : member.facebookUrl,
      bio: bio !== undefined ? bio : member.bio,
      year: year || member.year,
      displayOrder: displayOrder !== undefined ? displayOrder : member.displayOrder,
      active: active !== undefined ? active : member.active
    });

    res.json({
      success: true,
      message: 'Committee member updated successfully',
      data: member
    });
  } catch (error) {
    console.error('Update committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/committee/:id
// @desc    Delete committee member
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const member = await CommitteeMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    await member.destroy();

    res.json({
      success: true,
      message: 'Committee member deleted successfully'
    });
  } catch (error) {
    console.error('Delete committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/committee/:id/reorder
// @desc    Update display order
// @access  Private
router.put('/:id/reorder', authMiddleware, async (req, res) => {
  try {
    const { displayOrder } = req.body;

    if (displayOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide displayOrder'
      });
    }

    const member = await CommitteeMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    await member.update({ displayOrder: parseInt(displayOrder) });

    res.json({
      success: true,
      message: 'Display order updated successfully',
      data: member
    });
  } catch (error) {
    console.error('Reorder committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
