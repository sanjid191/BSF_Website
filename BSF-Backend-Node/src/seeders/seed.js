require('dotenv').config();
const sequelize = require('../config/database');
const { User, Notice, CommitteeMember } = require('../models');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models
    await sequelize.sync({ force: false });
    console.log('✅ Models synchronized');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@bsf.gub.edu.bd' } });

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists, skipping user creation');
    } else {
      // Create default admin user
      const admin = await User.create({
        email: 'admin@bsf.gub.edu.bd',
        password: 'admin123', // Will be hashed by the model hook
        fullName: 'BSF Admin',
        role: 'ADMIN',
        active: true
      });
      console.log('✅ Default admin user created');
      console.log('   Email: admin@bsf.gub.edu.bd');
      console.log('   Password: admin123');
    }

    // Check if notices already exist
    const existingNotices = await Notice.count();

    if (existingNotices > 0) {
      console.log(`ℹ️  ${existingNotices} notices already exist, skipping notice creation`);
    } else {
      // Create sample notices
      const admin = await User.findOne({ where: { email: 'admin@bsf.gub.edu.bd' } });
      
      await Notice.bulkCreate([
        {
          title: 'Welcome to BSF-GUB',
          description: 'Bangladesh Students Federation at Green University of Bangladesh welcomes all new members.',
          category: 'announcement',
          active: true,
          publishDate: new Date(),
          priority: 10,
          createdBy: admin.id
        },
        {
          title: 'Annual General Meeting 2025',
          description: 'Join us for our Annual General Meeting on November 15, 2025 at GUB Auditorium.',
          category: 'event',
          active: true,
          publishDate: new Date(),
          priority: 8,
          createdBy: admin.id
        },
        {
          title: 'Urgent: Membership Renewal',
          description: 'Please renew your membership before the deadline.',
          category: 'urgent',
          active: true,
          publishDate: new Date(),
          priority: 15,
          createdBy: admin.id
        }
      ]);
      console.log('✅ Sample notices created (3)');
    }

    // Check if committee members already exist
    const existingMembers = await CommitteeMember.count();

    if (existingMembers > 0) {
      console.log(`ℹ️  ${existingMembers} committee members already exist, skipping member creation`);
    } else {
      // Create sample committee members
      await CommitteeMember.bulkCreate([
        {
          fullName: 'Ahmed Rahman',
          position: 'President',
          email: 'ahmed.rahman@example.com',
          phone: '01712345678',
          studentId: '201-15-14001',
          department: 'Computer Science & Engineering',
          year: '2025',
          displayOrder: 1,
          active: true
        },
        {
          fullName: 'Fatima Khan',
          position: 'Vice President',
          email: 'fatima.khan@example.com',
          phone: '01812345678',
          studentId: '201-15-14002',
          department: 'Business Administration',
          year: '2025',
          displayOrder: 2,
          active: true
        },
        {
          fullName: 'Mohammad Ali',
          position: 'General Secretary',
          email: 'mohammad.ali@example.com',
          phone: '01912345678',
          studentId: '201-15-14003',
          department: 'Electrical & Electronic Engineering',
          year: '2025',
          displayOrder: 3,
          active: true
        },
        {
          fullName: 'Nusrat Jahan',
          position: 'Treasurer',
          email: 'nusrat.jahan@example.com',
          phone: '01612345678',
          studentId: '201-15-14004',
          department: 'Law',
          year: '2025',
          displayOrder: 4,
          active: true
        }
      ]);
      console.log('✅ Sample committee members created (4)');
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Users: ${await User.count()}`);
    console.log(`   Notices: ${await Notice.count()}`);
    console.log(`   Committee Members: ${await CommitteeMember.count()}`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
