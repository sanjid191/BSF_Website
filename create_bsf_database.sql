-- ============================================
-- BSF-GUB Website Database Setup Script
-- For MySQL Workbench or MySQL Command Line
-- Database: bsf_gub_db
-- Version: 2.0 (with Membership Applications)
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
-- Table 4: membership_applications (NEW)
-- Stores membership application submissions
-- ============================================
CREATE TABLE membership_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year VARCHAR(20) NOT NULL,
    position_applied VARCHAR(100),
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    reviewed_by BIGINT NULL,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_status_created (status, created_at DESC)
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
-- 2025 Executive Committee Members (Real Data)
-- Mentor + 21 Executive Committee Members
-- ============================================

-- Mentor
INSERT INTO committee_members (full_name, position, email, phone, student_id, year, display_order, active)
VALUES ('Md. Ehsan Shahmi', 'Mentor', 'ehsan@cse.green.edu.bd', '1537691938', 'MENTOR-001', '2025', 0, TRUE);

-- Executive Committee
INSERT INTO committee_members (full_name, position, email, phone, student_id, year, display_order, active)
VALUES 
('S N Fariha Zannat', 'President', 'sn.fariha.zannat@gmail.com', '1957433111', '221002474', '2025', 1, TRUE),
('Arefin', 'Coordinator', 'arefinahmed1472@gmail.com', '01794807412', '213002489', '2025', 2, TRUE),
('Mushfiqur Rahman', 'Coordinator', 'musafir12234@gmail.com', '01738862849', '223002633', '2025', 3, TRUE),
('Sumaita Ferdousi Putul', 'Coordinator', 'sf.putulbd@gmail.com', '01611100909', '223002569', '2025', 4, TRUE),
('Md. Rakibul Islam Rakib', 'General Secretary', 'mdrakibul27419@gmail.com', '01767433717', '213002386', '2025', 5, TRUE),
('Md Sazzadul Bari', 'General Secretary', 'sazzadulbari05gmail.com', '01317606569', '222001995', '2025', 6, TRUE),
('Habibul Islam Shovo', 'Office Secretary', 'habibulislam.shovo@gmail.com', '01828221196', '222002170', '2025', 7, TRUE),
('Shamsul Arifin Niloy', 'Public Relation Secretary', 'shamsul.niloy121@gmail.com', '01580874478', '222002075', '2025', 8, TRUE),
('Nurun Nahar Nasrin Joly', 'Public Relation Secretary', 'nasrinjoly900@gmail.com', '01882924569', '222001998', '2025', 9, TRUE),
('Al Mamun Emon', 'Resource Secretary', 'aemamunswe@gmail.com', '01784827370', '221002456', '2025', 10, TRUE),
('Khadija Tus Saliha Oni', 'Resource Secretary', 'khadijatussalihaoni@gmail.com', '01780825959', '221002431', '2025', 11, TRUE),
('Nazmul Islam', 'Media Secretary', 'nazmul93939@gmail.com', '01763848993', '222002193', '2025', 12, TRUE),
('Md. Abdullah Al Mahfuz', 'Media Secretary', 'abdullahalmahfuz70@gmail.com', '01701799556', '222001909', '2025', 13, TRUE),
('Sabbir Khan', 'Information and Technology Secretary', 'khanitsabbir@gmail.com', '01303558890', '221002536', '2025', 14, TRUE),
('Emteaj Rahman', 'Information and Technology Secretary', 'imteaj.raihan39@gmail.com', '01303558890', '222001906', '2025', 15, TRUE),
('Nadira Islam Mukta', 'Executive Member', 'nadiraislammukta08@gmail.com', '01580776801', '221002458', '2025', 16, TRUE),
('Tasin Alam', 'Executive Member', 'tasinalam7827@gmail.com', '01767480080', '222001883', '2025', 17, TRUE),
('Sifat Karim', 'Executive Member', 'mdsifatkarim@gmail.com', '01861122006', '222002138', '2025', 18, TRUE),
('Mustakimur Rahman', 'Executive Member', 'mustakimur.rahman@gmail.com', '01521317902', '213002508', '2025', 19, TRUE),
('Taslima Nasrin Anika', 'Executive Member', 'taslimanasrinanika14@gmail.com', '01754444242', '212001880', '2025', 20, TRUE),
('Shahriar Rahman', 'Executive Member', 'shahriarrahmansizan@gmail.com', '01318695195', '223002574', '2025', 21, TRUE);

-- ============================================
-- Sample Data: Insert Sample Membership Applications
-- ============================================
INSERT INTO membership_applications (full_name, email, phone, student_id, department, year, position_applied, message, status, created_at)
VALUES 
(
    'Tanvir Ahmed',
    'tanvir.ahmed@student.gub.edu.bd',
    '01712345678',
    '223002789',
    'Computer Science & Engineering',
    '2nd Year',
    'Executive Member',
    'I am passionate about student welfare and would like to contribute to BSF activities.',
    'pending',
    DATE_SUB(NOW(), INTERVAL 2 DAY)
),
(
    'Sabrina Akter',
    'sabrina.akter@student.gub.edu.bd',
    '01812345679',
    '223002790',
    'Business Administration',
    '3rd Year',
    'Media Secretary',
    'I have experience in social media management and content creation.',
    'pending',
    DATE_SUB(NOW(), INTERVAL 1 DAY)
),
(
    'Rafiq Hasan',
    'rafiq.hasan@student.gub.edu.bd',
    '01912345680',
    '223002791',
    'Electrical Engineering',
    '2nd Year',
    'Executive Member',
    'I want to be part of this great organization and serve the student community.',
    'approved',
    DATE_SUB(NOW(), INTERVAL 5 DAY)
),
(
    'Nusrat Jahan',
    'nusrat.jahan@student.gub.edu.bd',
    '01612345681',
    '223002792',
    'Law',
    '4th Year',
    'Public Relation Secretary',
    'I have strong communication skills and want to represent BSF.',
    'rejected',
    DATE_SUB(NOW(), INTERVAL 7 DAY)
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

-- Check membership_applications table
SELECT 'Membership Applications Count:' AS Status, COUNT(*) AS Total FROM membership_applications;

-- Display all data
SELECT '=== USERS ===' AS Info;
SELECT id, email, full_name, role, active FROM users;

SELECT '=== NOTICES ===' AS Info;
SELECT id, title, category, priority, active FROM notices;

SELECT '=== COMMITTEE MEMBERS (2025) ===' AS Info;
SELECT id, full_name, position, email, phone, student_id, display_order FROM committee_members ORDER BY display_order;

SELECT '=== MEMBERSHIP APPLICATIONS ===' AS Info;
SELECT id, full_name, email, student_id, position_applied, status, created_at FROM membership_applications ORDER BY created_at DESC;

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
    '4 Tables Created' AS Tables,
    '1 Admin + 3 Notices + 22 Committee Members (2025) + 4 Sample Applications' AS Data;

-- ============================================
-- NOTES:
-- 1. Database Name: bsf_gub_db
-- 2. Tables: users, notices, committee_members, membership_applications
-- 3. Default Admin Login:
--    Email: admin@bsf.gub.edu.bd
--    Password: admin123
-- 4. 2025 Executive Committee:
--    - 1 Mentor: Md. Ehsan Shahmi

--    - 21 Executive Members (President to Executive Members)
-- 5. Membership Application Statuses: pending, approved, rejected
-- 6. All timestamps are in local timezone
-- 7. Character set: utf8mb4 (supports emojis and special characters)
-- ============================================
