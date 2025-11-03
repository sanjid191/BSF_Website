const User = require('./User');
const Notice = require('./Notice');
const CommitteeMember = require('./CommitteeMember');

// Define associations
User.hasMany(Notice, {
  foreignKey: 'createdBy',
  as: 'notices'
});

Notice.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

module.exports = {
  User,
  Notice,
  CommitteeMember
};
