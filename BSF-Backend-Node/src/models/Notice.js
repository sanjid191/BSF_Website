const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notice = sequelize.define('Notice', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['announcement', 'event', 'general', 'urgent']]
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  fileUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'file_url'
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'publish_date'
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'expiry_date'
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdBy: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'created_by',
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'notices',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['active']
    },
    {
      fields: ['category']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['active', 'priority']
    }
  ]
});

module.exports = Notice;
