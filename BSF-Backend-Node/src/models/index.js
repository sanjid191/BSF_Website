const User = require('./User');
const Notice = require('./Notice');
const CommitteeMember = require('./CommitteeMember');
const MembershipApplication = require('./MembershipApplication');

// Define associations
User.hasMany(Notice, {
  foreignKey: 'createdBy',
  as: 'notices'
});

Notice.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

User.hasMany(MembershipApplication, {
  foreignKey: 'reviewed_by',
  as: 'reviewed_applications'
});

MembershipApplication.belongsTo(User, {
  foreignKey: 'reviewed_by',
  as: 'reviewer'
});

module.exports = {
  User,
  Notice,
  CommitteeMember,
  MembershipApplication
};
