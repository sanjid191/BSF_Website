require('dotenv').config();
const sequelize = require('./src/config/database');
const { User } = require('./src/models');

const resetAdminPassword = async () => {
  try {
    console.log('🔄 Resetting admin password...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Find admin user
    const admin = await User.findOne({ where: { email: 'admin@bsf.gub.edu.bd' } });

    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('Creating new admin user...');
      
      const newAdmin = await User.create({
        email: 'admin@bsf.gub.edu.bd',
        password: 'admin123',
        fullName: 'BSF Admin',
        role: 'ADMIN',
        active: true
      });
      
      console.log('✅ New admin user created successfully!');
    } else {
      // Update password
      admin.password = 'admin123';
      await admin.save();
      console.log('✅ Admin password reset successfully!');
    }

    console.log('');
    console.log('📋 Login Credentials:');
    console.log('   Email: admin@bsf.gub.edu.bd');
    console.log('   Password: admin123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

resetAdminPassword();
