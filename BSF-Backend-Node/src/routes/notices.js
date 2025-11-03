const express = require('express');
const router = express.Router();
const { Notice } = require('../models');
const authMiddleware = require('../middleware/auth');
const { Op } = require('sequelize');

// @route   GET /api/notices/public
// @desc    Get all active notices (public access)
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;

    const whereClause = {
      active: true,
      [Op.or]: [
        { expiryDate: null },
        { expiryDate: { [Op.gt]: new Date() } }
      ]
    };

    if (category) {
      whereClause.category = category;
    }

    const notices = await Notice.findAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: parseInt(limit),
      attributes: { exclude: ['createdBy'] }
    });

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    console.error('Get public notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/notices
// @desc    Get all notices (admin)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { category, active, page = 1, limit = 50 } = req.query;

    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (active !== undefined) {
      whereClause.active = active === 'true';
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: notices } = await Notice.findAndCountAll({
      where: whereClause,
      order: [
        ['priority', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      success: true,
      count: notices.length,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
      data: notices
    });
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/notices/:id
// @desc    Get single notice
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    console.error('Get notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/notices
// @desc    Create new notice
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      active = true,
      fileUrl,
      publishDate,
      expiryDate,
      priority = 0
    } = req.body;

    // Validation
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and category'
      });
    }

    const notice = await Notice.create({
      title,
      description,
      category,
      active,
      fileUrl,
      publishDate: publishDate || new Date(),
      expiryDate,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/notices/:id
// @desc    Update notice
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    const {
      title,
      description,
      category,
      active,
      fileUrl,
      publishDate,
      expiryDate,
      priority
    } = req.body;

    await notice.update({
      title: title || notice.title,
      description: description !== undefined ? description : notice.description,
      category: category || notice.category,
      active: active !== undefined ? active : notice.active,
      fileUrl: fileUrl !== undefined ? fileUrl : notice.fileUrl,
      publishDate: publishDate !== undefined ? publishDate : notice.publishDate,
      expiryDate: expiryDate !== undefined ? expiryDate : notice.expiryDate,
      priority: priority !== undefined ? priority : notice.priority
    });

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    console.error('Update notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/notices/:id
// @desc    Delete notice
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    await notice.destroy();

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
