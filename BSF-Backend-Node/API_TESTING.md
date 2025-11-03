# BSF-GUB Backend API Testing Guide

## Quick Start

### 1. Install & Setup

```bash
cd BSF-Backend-Node
npm install
copy .env.example .env
# Edit .env and set your MySQL password
```

### 2. Run Database Seeder

```bash
npm run seed
```

### 3. Start Server

```bash
npm run dev
```

Server runs on: **http://localhost:8080**

---

## API Testing with PowerShell

### Step 1: Login and Get Token

```powershell
$loginBody = @{
    email = "admin@bsf.gub.edu.bd"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"

# Save the token
$token = $loginResponse.data.token

# View the response
$loginResponse
```

**Expected Response:**

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

---

### Step 2: Test Notice Endpoints

#### Get Public Notices

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/notices/public" -Method Get
```

#### Get All Notices (Admin)

```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Method Get -Headers $headers
```

#### Create Notice

```powershell
$headers = @{ Authorization = "Bearer $token" }
$noticeBody = @{
    title = "Test Notice from API"
    description = "This is a test notice created via PowerShell"
    category = "announcement"
    priority = 7
    active = $true
} | ConvertTo-Json

$newNotice = Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Method Post -Headers $headers -Body $noticeBody -ContentType "application/json"
$newNotice
```

#### Update Notice

```powershell
$headers = @{ Authorization = "Bearer $token" }
$updateBody = @{
    title = "Updated Notice Title"
    priority = 10
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/notices/1" -Method Put -Headers $headers -Body $updateBody -ContentType "application/json"
```

#### Delete Notice

```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:8080/api/notices/1" -Method Delete -Headers $headers
```

---

### Step 3: Test Committee Endpoints

#### Get Public Committee Members (Current Year)

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/committee/public?year=2025" -Method Get
```

#### Get Available Years

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/committee/years" -Method Get
```

#### Get All Members (Admin)

```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:8080/api/committee" -Method Get -Headers $headers
```

#### Add Committee Member

```powershell
$headers = @{ Authorization = "Bearer $token" }
$memberBody = @{
    fullName = "Test Member"
    position = "Executive Member"
    email = "test.member@example.com"
    phone = "01712345678"
    studentId = "201-15-14099"
    department = "Computer Science"
    year = "2025"
    displayOrder = 10
    active = $true
} | ConvertTo-Json

$newMember = Invoke-RestMethod -Uri "http://localhost:8080/api/committee" -Method Post -Headers $headers -Body $memberBody -ContentType "application/json"
$newMember
```

#### Update Committee Member

```powershell
$headers = @{ Authorization = "Bearer $token" }
$updateMember = @{
    position = "Senior Executive Member"
    displayOrder = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/committee/1" -Method Put -Headers $headers -Body $updateMember -ContentType "application/json"
```

#### Reorder Member

```powershell
$headers = @{ Authorization = "Bearer $token" }
$reorderBody = @{
    displayOrder = 3
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/committee/1/reorder" -Method Put -Headers $headers -Body $reorderBody -ContentType "application/json"
```

#### Delete Committee Member

```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:8080/api/committee/1" -Method Delete -Headers $headers
```

---

## Testing with cURL (Git Bash / Linux)

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bsf.gub.edu.bd","password":"admin123"}'
```

### Create Notice

```bash
TOKEN="your_token_here"

curl -X POST http://localhost:8080/api/notices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Notice",
    "description": "Notice description",
    "category": "announcement",
    "priority": 5
  }'
```

### Get Public Notices

```bash
curl http://localhost:8080/api/notices/public
```

### Add Committee Member

```bash
TOKEN="your_token_here"

curl -X POST http://localhost:8080/api/committee \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "position": "President",
    "email": "john@example.com",
    "year": "2025",
    "displayOrder": 1
  }'
```

---

## Complete PowerShell Testing Script

Save this as `test-api.ps1`:

```powershell
# BSF-GUB API Test Script
Write-Host "🚀 Testing BSF-GUB Backend API" -ForegroundColor Green
Write-Host ""

# 1. Login
Write-Host "1️⃣ Testing Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "admin@bsf.gub.edu.bd"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginResponse.data.token
Write-Host "✅ Login successful! Token received." -ForegroundColor Green
Write-Host ""

# 2. Get Public Notices
Write-Host "2️⃣ Getting Public Notices..." -ForegroundColor Yellow
$publicNotices = Invoke-RestMethod -Uri "http://localhost:8080/api/notices/public" -Method Get
Write-Host "✅ Found $($publicNotices.count) public notices" -ForegroundColor Green
Write-Host ""

# 3. Create Notice
Write-Host "3️⃣ Creating New Notice..." -ForegroundColor Yellow
$headers = @{ Authorization = "Bearer $token" }
$noticeBody = @{
    title = "API Test Notice"
    description = "Created via PowerShell test script"
    category = "announcement"
    priority = 5
} | ConvertTo-Json

$newNotice = Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Method Post -Headers $headers -Body $noticeBody -ContentType "application/json"
Write-Host "✅ Notice created with ID: $($newNotice.data.id)" -ForegroundColor Green
Write-Host ""

# 4. Get Committee Members
Write-Host "4️⃣ Getting Committee Members..." -ForegroundColor Yellow
$committee = Invoke-RestMethod -Uri "http://localhost:8080/api/committee/public?year=2025" -Method Get
Write-Host "✅ Found $($committee.count) committee members for 2025" -ForegroundColor Green
Write-Host ""

# 5. Add Committee Member
Write-Host "5️⃣ Adding Committee Member..." -ForegroundColor Yellow
$memberBody = @{
    fullName = "API Test Member"
    position = "Test Position"
    email = "test@example.com"
    year = "2025"
    displayOrder = 99
} | ConvertTo-Json

$newMember = Invoke-RestMethod -Uri "http://localhost:8080/api/committee" -Method Post -Headers $headers -Body $memberBody -ContentType "application/json"
Write-Host "✅ Member added with ID: $($newMember.data.id)" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All tests completed successfully!" -ForegroundColor Green
```

Run with:

```powershell
.\test-api.ps1
```

---

## Common Issues

### 1. "Database connection error"

- Make sure MySQL is running
- Check database credentials in `.env`
- Verify database `bsf_gub_db` exists

### 2. "Invalid token"

- Token might be expired (24 hours)
- Login again to get a new token

### 3. "Cannot find module"

- Run `npm install` to install dependencies

### 4. CORS errors

- Add your frontend URL to `CORS_ORIGIN` in `.env`

---

## API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## Default Credentials

**Admin Login:**

- Email: `admin@bsf.gub.edu.bd`
- Password: `admin123`

⚠️ **Change this password in production!**
