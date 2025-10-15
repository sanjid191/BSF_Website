# BSF-GUB Backend API

Spring Boot backend for BASIS Student Forum - GUB Website

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Setup Database

```sql
CREATE DATABASE bsf_gub_db;
```

### Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Run Application

```bash
mvn clean install
mvn spring-boot:run
```

The backend will run on `http://localhost:8080`

## 🔐 Default Admin Credentials

**Email:** `admin@bsf.gub.edu.bd`  
**Password:** `admin123`

⚠️ **IMPORTANT:** Change these credentials in production!

## 📚 API Endpoints

### Authentication (`/api/auth`)

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@bsf.gub.edu.bd",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "type": "Bearer",
    "email": "admin@bsf.gub.edu.bd",
    "fullName": "BSF Admin",
    "role": "ADMIN"
  }
}
```

### Notices (`/api/notices`)

#### Get Public Notices (No Auth Required)

```http
GET /api/notices/public
```

#### Get All Notices (Admin Only)

```http
GET /api/notices
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Create Notice (Admin Only)

```http
POST /api/notices
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Annual Tech Fest 2025",
  "description": "Join us for the biggest tech event of the year!",
  "category": "event",
  "priority": 5,
  "active": true,
  "fileUrl": "https://example.com/notice.pdf",
  "expiryDate": "2025-12-31T23:59:59"
}
```

#### Update Notice (Admin Only)

```http
PUT /api/notices/{id}
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "category": "announcement",
  "priority": 10,
  "active": true
}
```

#### Delete Notice (Admin Only)

```http
DELETE /api/notices/{id}
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Toggle Notice Status (Admin Only)

```http
PATCH /api/notices/{id}/toggle-status
Authorization: Bearer YOUR_JWT_TOKEN
```

### Committee Members (`/api/committee`)

#### Get Public Committee Members (No Auth Required)

```http
GET /api/committee/public
GET /api/committee/public?year=2025
```

#### Get All Committee Members (Admin Only)

```http
GET /api/committee
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Create Committee Member (Admin Only)

```http
POST /api/committee
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fullName": "John Doe",
  "position": "President",
  "email": "john@example.com",
  "phone": "01712345678",
  "studentId": "2021001",
  "department": "CSE",
  "imageUrl": "https://example.com/photo.jpg",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "bio": "Passionate tech enthusiast",
  "year": "2025",
  "displayOrder": 1,
  "active": true
}
```

#### Update Committee Member (Admin Only)

```http
PUT /api/committee/{id}
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fullName": "John Doe Updated",
  "position": "Vice President",
  ...
}
```

#### Delete Committee Member (Admin Only)

```http
DELETE /api/committee/{id}
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Toggle Member Status (Admin Only)

```http
PATCH /api/committee/{id}/toggle-status
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🗂️ Project Structure

```
BSF-Backend/
├── src/main/java/com/bsf/gub/
│   ├── config/           # Configuration classes
│   │   ├── CorsConfig.java
│   │   ├── DataInitializer.java
│   │   └── SecurityConfig.java
│   ├── controller/       # REST Controllers
│   │   ├── AuthController.java
│   │   ├── CommitteeController.java
│   │   └── NoticeController.java
│   ├── dto/             # Data Transfer Objects
│   │   ├── ApiResponse.java
│   │   ├── CommitteeMemberRequest.java
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   └── NoticeRequest.java
│   ├── model/           # Entity classes
│   │   ├── CommitteeMember.java
│   │   ├── Notice.java
│   │   └── User.java
│   ├── repository/      # JPA Repositories
│   │   ├── CommitteeMemberRepository.java
│   │   ├── NoticeRepository.java
│   │   └── UserRepository.java
│   ├── security/        # Security components
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtUtil.java
│   ├── service/         # Business logic
│   │   ├── AuthService.java
│   │   ├── CommitteeMemberService.java
│   │   └── NoticeService.java
│   └── BsfGubApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## 🔒 Security Features

- JWT-based authentication
- BCrypt password encryption
- Role-based access control (RBAC)
- CORS configuration for React frontend
- Stateless session management

## 🌐 CORS Configuration

Allowed origins (configured in `application.properties`):

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

## 📝 Notice Categories

- `announcement` - General announcements
- `event` - Event notifications
- `general` - General notices
- `urgent` - Urgent/important notices

## 👥 Committee Member Fields

- Basic Info: Name, Position, Email, Phone
- Academic: Student ID, Department
- Profile: Photo, LinkedIn, Facebook, Bio
- Year Tracking: For yearly committee changes
- Display Order: Custom ordering of members
- Status: Active/Inactive toggle

## 🔄 Testing with Postman

1. Import the Postman collection (if provided)
2. Login to get JWT token
3. Add token to Authorization header for protected endpoints
4. Test CRUD operations

## 🚧 Future Enhancements

- File upload for notices and member photos
- Email notifications
- Event management
- Member application system
- Analytics dashboard

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for BASIS Student Forum - GUB**
