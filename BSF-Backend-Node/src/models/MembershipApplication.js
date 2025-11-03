const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MembershipApplication = sequelize.define('MembershipApplication', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Full name is required' },
      len: {
        args: [2, 255],
        msg: 'Full name must be between 2 and 255 characters'
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Email is required' },
      isEmail: { msg: 'Must be a valid email address' }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Phone number is required' }
    }
  },
  student_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Student ID is required' }
    }
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Department is required' }
    }
  },
  year: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Year is required' }
    }
  },
  position_applied: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: {
        args: [['pending', 'approved', 'rejected']],
        msg: 'Status must be pending, approved, or rejected'
      }
    }
  },
  reviewed_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'membership_applications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['status'] },
    { fields: ['created_at'] },
    { fields: ['status', 'created_at'] }
  ]
});

// Instance methods
MembershipApplication.prototype.approve = async function(adminId) {
  this.status = 'approved';
  this.reviewed_by = adminId;
  this.reviewed_at = new Date();
  return await this.save();
};

MembershipApplication.prototype.reject = async function(adminId) {
  this.status = 'rejected';
  this.reviewed_by = adminId;
  this.reviewed_at = new Date();
  return await this.save();
};

// Class methods
MembershipApplication.getPendingApplications = async function() {
  return await this.findAll({
    where: { status: 'pending' },
    order: [['created_at', 'DESC']]
  });
};

MembershipApplication.getApplicationsByStatus = async function(status) {
  return await this.findAll({
    where: { status },
    order: [['created_at', 'DESC']]
  });
};

MembershipApplication.getRecentApplications = async function(limit = 10) {
  return await this.findAll({
    limit,
    order: [['created_at', 'DESC']]
  });
};

module.exports = MembershipApplication;
