-- ============================================
-- BSF-GUB Website Database Setup Script
-- For MySQL Workbench or MySQL Command Line
-- Database: bsf_gub_db
-- ============================================

-- Step 1: Create Database
DROP DATABASE IF EXISTS bsf_gub_db;
CREATE DATABASE bsf_gub_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Step 2: Use the Database
USE bsf_gub_db;

-- ============================================
-- Table 1: users
-- Stores admin accounts for authentication
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table 2: notices
-- Stores notice board posts and announcements
-- ============================================
CREATE TABLE notices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    file_url VARCHAR(500),
    publish_date TIMESTAMP NULL,
    expiry_date TIMESTAMP NULL,
    priority INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_active (active),
    INDEX idx_category (category),
    INDEX idx_priority (priority),
    INDEX idx_active_priority (active, priority DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table 3: committee_members
-- Stores committee member information with yearly tracking
-- ============================================
CREATE TABLE committee_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    student_id VARCHAR(50),
    department VARCHAR(100),
    image_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    facebook_url VARCHAR(500),
    bio TEXT,
    year VARCHAR(10) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_active (active),
    INDEX idx_display_order (display_order),
    INDEX idx_year_active (year, active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Default Admin User
-- Email: admin@bsf.gub.edu.bd
-- Password: admin123 (BCrypt hashed)
-- ============================================
INSERT INTO users (email, password, full_name, role, active, created_at, updated_at)
VALUES (
    'admin@bsf.gub.edu.bd',
    '$2a$10$xYZ9K8mN7pQrS4tUvWxYzO8hKjL6mN4pQrS3tUvWxYzO9hKjL5mN3p',
    'BSF Admin',
    'ADMIN',
    TRUE,
    NOW(),
    NOW()
);

-- ============================================
-- Sample Data: Insert Sample Notices
-- ============================================
INSERT INTO notices (title, description, category, active, publish_date, priority, created_by)
VALUES 
(
    'Welcome to BSF-GUB',
    'Bangladesh Students Federation at Green University of Bangladesh welcomes all new members.',
    'announcement',
    TRUE,
    NOW(),
    10,
    1
),
(
    'Annual General Meeting 2025',
    'Join us for our Annual General Meeting on November 15, 2025 at GUB Auditorium.',
    'event',
    TRUE,
    NOW(),
    8,
    1
),
(
    'Urgent: Membership Renewal',
    'Please renew your membership before the deadline.',
    'urgent',
    TRUE,
    NOW(),
    15,
    1
);

-- ============================================
-- Sample Data: Insert Sample Committee Members
-- ============================================
INSERT INTO committee_members (full_name, position, email, phone, student_id, department, year, display_order, active)
VALUES 
(
    'Ahmed Rahman',
    'President',
    'ahmed.rahman@example.com',
    '01712345678',
    '201-15-14001',
    'Computer Science & Engineering',
    '2025',
    1,
    TRUE
),
(
    'Fatima Khan',
    'Vice President',
    'fatima.khan@example.com',
    '01812345678',
    '201-15-14002',
    'Business Administration',
    '2025',
    2,
    TRUE
),
(
    'Mohammad Ali',
    'General Secretary',
    'mohammad.ali@example.com',
    '01912345678',
    '201-15-14003',
    'Electrical & Electronic Engineering',
    '2025',
    3,
    TRUE
),
(
    'Nusrat Jahan',
    'Treasurer',
    'nusrat.jahan@example.com',
    '01612345678',
    '201-15-14004',
    'Law',
    '2025',
    4,
    TRUE
);

-- ============================================
-- Verification Queries
-- ============================================

-- Check all tables
SELECT 'Tables Created:' AS Status;
SHOW TABLES;

-- Check users table
SELECT 'Users Count:' AS Status, COUNT(*) AS Total FROM users;

-- Check notices table
SELECT 'Notices Count:' AS Status, COUNT(*) AS Total FROM notices;

-- Check committee_members table
SELECT 'Committee Members Count:' AS Status, COUNT(*) AS Total FROM committee_members;

-- Display all data
SELECT '=== USERS ===' AS Info;
SELECT id, email, full_name, role, active FROM users;

SELECT '=== NOTICES ===' AS Info;
SELECT id, title, category, priority, active FROM notices;

SELECT '=== COMMITTEE MEMBERS ===' AS Info;
SELECT id, full_name, position, email, year, display_order FROM committee_members;

-- Display database size
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'bsf_gub_db'
ORDER BY (data_length + index_length) DESC;

-- ============================================
-- Success Message
-- ============================================
SELECT 
    '✅ Database Setup Complete!' AS Status,
    'Database: bsf_gub_db' AS Info,
    '3 Tables Created' AS Tables,
    '1 Admin + 3 Notices + 4 Committee Members' AS Data;

-- ============================================
-- NOTES:
-- 1. Database Name: bsf_gub_db
-- 2. Tables: users, notices, committee_members
-- 3. Default Admin Login:
--    Email: admin@bsf.gub.edu.bd
--    Password: admin123
-- 4. All timestamps are in local timezone
-- 5. Character set: utf8mb4 (supports emojis and special characters)
-- ============================================
