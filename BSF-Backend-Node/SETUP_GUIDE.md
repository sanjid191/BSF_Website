# 🚀 BSF-GUB Node.js Backend - Quick Setup Guide

## ✅ Complete Node.js Backend Created!

All three features implemented:

1. ✅ **Login Logic** - JWT authentication with bcrypt
2. ✅ **Notice Board Management** - Full CRUD with categories & priorities
3. ✅ **Committee Member Management** - Yearly tracking with custom ordering

---

## 📦 What's Been Created

```
BSF-Backend-Node/
├── src/
│   ├── config/
│   │   └── database.js              # Sequelize MySQL connection
│   ├── models/
│   │   ├── User.js                  # Admin user model
│   │   ├── Notice.js                # Notice board model
│   │   ├── CommitteeMember.js       # Committee member model
│   │   └── index.js                 # Model associations
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js                  # Login & auth routes
│   │   ├── notices.js               # Notice CRUD routes
│   │   └── committee.js             # Committee CRUD routes
│   ├── seeders/
│   │   └── seed.js                  # Database seeder
│   └── server.js                    # Main Express app
├── .env                             # Environment configuration ✅
├── .env.example                     # Template
├── .gitignore                       # Git ignore file
├── package.json                     # Dependencies ✅
├── start.bat                        # Windows start script
├── README.md                        # Full documentation
└── API_TESTING.md                   # API testing guide
```

---

## ⚡ Quick Start (3 Steps)

### Step 1: Configure Database Password

Edit `.env` file and set your MySQL password:

```env
DB_PASSWORD=your_mysql_password_here
```

**Example:**

```env
# If your MySQL root password is "mypassword"
DB_PASSWORD=mypassword

# If you have no password (not recommended)
DB_PASSWORD=
```

### Step 2: Run Database Seeder

```powershell
cd "g:\React Applications\BSF_Website\BSF-Backend-Node"
npm run seed
```

This will:

- ✅ Create all tables automatically (users, notices, committee_members)
- ✅ Insert default admin user (admin@bsf.gub.edu.bd / admin123)
- ✅ Insert 3 sample notices
- ✅ Insert 4 sample committee members

### Step 3: Start the Server

**Option A - Development mode (auto-reload):**

```powershell
npm run dev
```

**Option B - Production mode:**

```powershell
npm start
```

**Option C - Use the start script:**

```powershell
.\start.bat
```

Server will run on: **http://localhost:8080**

---

## 🧪 Test the API

### Quick Test with PowerShell

```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get

# Login
$body = @{
    email = "admin@bsf.gub.edu.bd"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$response

# Get public notices
Invoke-RestMethod -Uri "http://localhost:8080/api/notices/public" -Method Get

# Get committee members for 2025
Invoke-RestMethod -Uri "http://localhost:8080/api/committee/public?year=2025" -Method Get
```

---

## 📡 API Endpoints Summary

### Authentication

- `POST /api/auth/login` - Login (get JWT token)
- `GET /api/auth/me` - Get current user (protected)

### Notices

- `GET /api/notices/public` - Get active notices (public)
- `GET /api/notices` - Get all notices (admin)
- `POST /api/notices` - Create notice (admin)
- `PUT /api/notices/:id` - Update notice (admin)
- `DELETE /api/notices/:id` - Delete notice (admin)

### Committee Members

- `GET /api/committee/public` - Get members by year (public)
- `GET /api/committee/years` - Get available years (public)
- `GET /api/committee` - Get all members (admin)
- `POST /api/committee` - Add member (admin)
- `PUT /api/committee/:id` - Update member (admin)
- `DELETE /api/committee/:id` - Delete member (admin)
- `PUT /api/committee/:id/reorder` - Change display order (admin)

---

## 🔐 Default Admin Credentials

```
Email: admin@bsf.gub.edu.bd
Password: admin123
```

**⚠️ IMPORTANT:** Change this password after first login in production!

---

## 📚 Full Documentation

- **README.md** - Complete setup and API documentation
- **API_TESTING.md** - Detailed testing guide with examples

---

## 🎯 Key Features

### 1. Login Logic ✅

- JWT token authentication
- BCrypt password hashing (10 rounds)
- Token expiry (24 hours, configurable)
- Protected route middleware

### 2. Notice Board ✅

- Create, Read, Update, Delete notices
- Categories: announcement, event, general, urgent
- Priority system for ordering
- Expiry date support
- Public & protected endpoints

### 3. Committee Members ✅

- Yearly committee tracking
- Add/Modify/Remove members for any year
- Custom display ordering
- Full member profiles (name, position, email, phone, student ID, etc.)
- Social media links (LinkedIn, Facebook)
- Public & protected endpoints

---

## 🆚 Differences from Java Backend

| Feature   | Java (Spring Boot)       | Node.js (Express)  |
| --------- | ------------------------ | ------------------ |
| Framework | Spring Boot 3.2          | Express 4.18       |
| ORM       | Spring Data JPA          | Sequelize 6.35     |
| Password  | BCrypt (Spring Security) | bcrypt npm package |
| JWT       | JJWT library             | jsonwebtoken npm   |
| Config    | application.properties   | .env file          |
| Start     | `mvn spring-boot:run`    | `npm start`        |
| Port      | 8080                     | 8080               |

**Same database:** Both use `bsf_gub_db` with same table structure!

---

## 🔧 Environment Variables

```env
PORT=8080                           # Server port
NODE_ENV=development                # Environment
DB_HOST=localhost                   # MySQL host
DB_PORT=3306                        # MySQL port
DB_NAME=bsf_gub_db                  # Database name
DB_USER=root                        # MySQL username
DB_PASSWORD=                        # MySQL password ⚠️ SET THIS!
JWT_SECRET=change_in_production     # JWT secret key
JWT_EXPIRES_IN=24h                  # Token expiry
CORS_ORIGIN=http://localhost:5173   # Allowed origins
```

---

## ✨ Next Steps

1. **Set MySQL Password** in `.env`
2. **Run Seeder:** `npm run seed`
3. **Start Server:** `npm run dev`
4. **Test API:** Use PowerShell commands above
5. **Connect React Frontend:** Update API base URL
6. **Production:** Change JWT secret & admin password

---

## 🆘 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

- **Solution:** Set correct MySQL password in `.env` file

### Error: "Database 'bsf_gub_db' doesn't exist"

- **Solution:** Create database in MySQL Workbench:
  ```sql
  CREATE DATABASE bsf_gub_db;
  ```

### Error: "Cannot find module 'express'"

- **Solution:** Install dependencies: `npm install`

### Error: "Port 8080 is already in use"

- **Solution:** Change PORT in `.env` or stop the Java backend

---

## 📞 Support

Check the detailed documentation:

- `README.md` - Full documentation
- `API_TESTING.md` - API testing examples

---

**Your Node.js backend is ready! Just set the MySQL password and run it.** 🎉
