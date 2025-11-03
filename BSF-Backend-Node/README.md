# BSF-GUB Backend - Node.js

Node.js backend for BSF-GUB website built with Express, Sequelize, and MySQL.

## 🚀 Features

- ✅ **Authentication System** - JWT-based login with bcrypt password encryption
- ✅ **Notice Board Management** - Full CRUD with categories, priorities, expiry dates
- ✅ **Committee Member Management** - Yearly tracking with custom ordering
- ✅ **RESTful API** - Clean API design with public and protected endpoints
- ✅ **Database ORM** - Sequelize for MySQL with auto-migrations
- ✅ **Security** - JWT tokens, password hashing, CORS configuration

---

## 📋 Prerequisites

- Node.js 16+ and npm
- MySQL 8.0+

---

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd BSF-Backend-Node
npm install
```

### 2. Configure Environment

```bash
# Copy the example env file
copy .env.example .env

# Edit .env with your settings
notepad .env
```

**Required Configuration:**

```env
PORT=8080
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=bsf_gub_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=change_this_secret_in_production
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 3. Create Database

```sql
-- In MySQL Workbench or command line
CREATE DATABASE bsf_gub_db;
```

### 4. Run Database Seeder

```bash
npm run seed
```

This will:

- Create all tables automatically
- Insert default admin user
- Insert sample notices
- Insert sample committee members

---

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run on: **http://localhost:8080**

---

## 🔐 Default Admin Credentials

```
Email: admin@bsf.gub.edu.bd
Password: admin123
```

**⚠️ Change this in production!**

---

## 📡 API Endpoints

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@bsf.gub.edu.bd",
  "password": "admin123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "admin@bsf.gub.edu.bd",
      "fullName": "BSF Admin",
      "role": "ADMIN"
    }
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Notices

#### Get Public Notices

```http
GET /api/notices/public
GET /api/notices/public?category=event
GET /api/notices/public?limit=10
```

#### Get All Notices (Admin)

```http
GET /api/notices
Authorization: Bearer <token>
```

#### Get Single Notice

```http
GET /api/notices/:id
```

#### Create Notice (Admin)

```http
POST /api/notices
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Notice",
  "description": "Notice description",
  "category": "announcement",
  "priority": 5,
  "active": true,
  "publishDate": "2025-11-03T00:00:00.000Z",
  "expiryDate": "2025-12-31T23:59:59.000Z"
}
```

**Categories:** `announcement`, `event`, `general`, `urgent`

#### Update Notice (Admin)

```http
PUT /api/notices/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "priority": 10
}
```

#### Delete Notice (Admin)

```http
DELETE /api/notices/:id
Authorization: Bearer <token>
```

---

### Committee Members

#### Get Public Committee Members

```http
GET /api/committee/public
GET /api/committee/public?year=2025
```

#### Get Available Years

```http
GET /api/committee/years
```

#### Get All Members (Admin)

```http
GET /api/committee
Authorization: Bearer <token>
```

#### Get Single Member

```http
GET /api/committee/:id
```

#### Add Committee Member (Admin)

```http
POST /api/committee
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "position": "President",
  "email": "john@example.com",
  "phone": "01712345678",
  "studentId": "201-15-14001",
  "department": "CSE",
  "year": "2025",
  "displayOrder": 1,
  "active": true
}
```

#### Update Member (Admin)

```http
PUT /api/committee/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "position": "Vice President",
  "displayOrder": 2
}
```

#### Delete Member (Admin)

```http
DELETE /api/committee/:id
Authorization: Bearer <token>
```

#### Reorder Member (Admin)

```http
PUT /api/committee/:id/reorder
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayOrder": 5
}
```

---

## 🗄️ Database Schema

### users

- id (BIGINT, PK)
- email (VARCHAR 255, UNIQUE)
- password (VARCHAR 255)
- full_name (VARCHAR 255)
- role (VARCHAR 50)
- active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### notices

- id (BIGINT, PK)
- title (VARCHAR 255)
- description (TEXT)
- category (VARCHAR 50)
- active (BOOLEAN)
- file_url (VARCHAR 500)
- publish_date (TIMESTAMP)
- expiry_date (TIMESTAMP)
- priority (INT)
- created_by (BIGINT, FK)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### committee_members

- id (BIGINT, PK)
- full_name (VARCHAR 255)
- position (VARCHAR 100)
- email (VARCHAR 255)
- phone (VARCHAR 20)
- student_id (VARCHAR 50)
- department (VARCHAR 100)
- image_url (VARCHAR 500)
- linkedin_url (VARCHAR 500)
- facebook_url (VARCHAR 500)
- bio (TEXT)
- year (VARCHAR 10)
- display_order (INT)
- active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

---

## 🧪 Testing API

### Using PowerShell

**Login:**

```powershell
$body = @{
    email = "admin@bsf.gub.edu.bd"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.data.token
```

**Get Notices:**

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/notices/public" -Method Get
```

**Create Notice:**

```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{
    title = "Test Notice"
    description = "Test description"
    category = "announcement"
    priority = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Method Post -Headers $headers -Body $body -ContentType "application/json"
```

---

## 📁 Project Structure

```
BSF-Backend-Node/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Notice.js            # Notice model
│   │   ├── CommitteeMember.js   # Committee member model
│   │   └── index.js             # Model associations
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── notices.js           # Notice routes
│   │   └── committee.js         # Committee routes
│   ├── seeders/
│   │   └── seed.js              # Database seeder
│   └── server.js                # Main application file
├── .env.example                 # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔒 Security Best Practices

1. **Change Default Credentials** - Update admin password after first login
2. **Update JWT Secret** - Use a strong, random secret in production
3. **Use HTTPS** - Enable HTTPS in production
4. **Environment Variables** - Never commit `.env` file
5. **Rate Limiting** - Add rate limiting middleware (future)
6. **Input Validation** - Validate all user inputs

---

## 🚀 Deployment

### Production Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET to a strong random value
- [ ] Set NODE_ENV=production
- [ ] Configure production database
- [ ] Update CORS_ORIGIN to production domain
- [ ] Enable HTTPS
- [ ] Set up process manager (PM2)
- [ ] Configure logging
- [ ] Set up database backups

---

## 📝 License

MIT

---

## 👨‍💻 Author

BSF-GUB Development Team
