const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommitteeMember = sequelize.define('CommitteeMember', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'full_name'
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  studentId: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'student_id'
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'image_url'
  },
  linkedinUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'linkedin_url'
  },
  facebookUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'facebook_url'
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  year: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'display_order'
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'committee_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['year']
    },
    {
      fields: ['active']
    },
    {
      fields: ['display_order']
    },
    {
      fields: ['year', 'active', 'display_order']
    }
  ]
});

module.exports = CommitteeMember;
