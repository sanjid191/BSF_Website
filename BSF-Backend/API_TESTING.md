# BSF-GUB Backend - API Testing Guide

## Quick Test with cURL

### 1. Test Connection

```bash
curl http://localhost:8080/api/auth/test
```

### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@bsf.gub.edu.bd\",\"password\":\"admin123\"}"
```

**Save the token from response!**

### 3. Get Public Notices (No Auth)

```bash
curl http://localhost:8080/api/notices/public
```

### 4. Create Notice (With Auth)

```bash
curl -X POST http://localhost:8080/api/notices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"title\":\"Test Notice\",\"description\":\"This is a test\",\"category\":\"general\",\"priority\":5,\"active\":true}"
```

### 5. Get All Notices (With Auth)

```bash
curl http://localhost:8080/api/notices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Create Committee Member (With Auth)

```bash
curl -X POST http://localhost:8080/api/committee \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"fullName\":\"John Doe\",\"position\":\"President\",\"email\":\"john@example.com\",\"year\":\"2025\",\"displayOrder\":1,\"active\":true}"
```

### 7. Get Public Committee Members (No Auth)

```bash
curl http://localhost:8080/api/committee/public
curl http://localhost:8080/api/committee/public?year=2025
```

## PowerShell Testing

### Login

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@bsf.gub.edu.bd","password":"admin123"}'
$token = $response.data.token
Write-Host "Token: $token"
```

### Create Notice

```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = @{
    title = "PowerShell Test Notice"
    description = "Created from PowerShell"
    category = "announcement"
    priority = 10
    active = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Method POST -Headers $headers -Body $body
```

### Get Notices

```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "http://localhost:8080/api/notices" -Headers $headers
```

## Common HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Default admin created
- [ ] Login successful and returns JWT token
- [ ] Public endpoints accessible without token
- [ ] Admin endpoints require valid token
- [ ] CRUD operations work for Notices
- [ ] CRUD operations work for Committee Members
- [ ] Invalid credentials rejected
- [ ] Expired/invalid tokens rejected
