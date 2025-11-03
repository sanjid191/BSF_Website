require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/committee', require('./routes/committee'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BSF-GUB Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Database connection and server start
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync models (create tables if they don't exist)
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌐 API: http://localhost:${PORT}/api`);
      console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
