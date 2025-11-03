# 🗄️ Database Setup Instructions

## 📍 File Location

**SQL Script:** `G:\React Applications\BSF_Website\create_bsf_database.sql`

---

## 🚀 How to Run (MySQL Workbench)

### Method 1: Using MySQL Workbench (Recommended)

1. **Open MySQL Workbench**

   - Launch MySQL Workbench on your computer

2. **Connect to MySQL Server**

   - Click on your local MySQL connection
   - Username: `root`
   - Password: `12345`

3. **Open the SQL Script**

   - Click **File** → **Open SQL Script**
   - Navigate to: `G:\React Applications\BSF_Website\create_bsf_database.sql`
   - Click **Open**

4. **Execute the Script**

   - Click the ⚡ **Execute** button (or press `Ctrl + Shift + Enter`)
   - Wait for completion (should take 1-2 seconds)

5. **Verify Success**
   - Check the output panel for success messages
   - You should see:
     - ✅ Database created
     - ✅ 3 tables created
     - ✅ 1 admin user
     - ✅ 3 sample notices
     - ✅ 4 sample committee members

---

### Method 2: Using MySQL Command Line

```bash
# Navigate to the SQL file directory
cd "G:\React Applications\BSF_Website"

# Run the script
mysql -u root -p12345 < create_bsf_database.sql

# Or login first, then execute
mysql -u root -p12345
mysql> source G:/React Applications/BSF_Website/create_bsf_database.sql
```

---

## ✅ What Gets Created

### Database

- **Name:** `bsf_gub_db`
- **Character Set:** utf8mb4 (supports all languages and emojis)

### Tables (3)

#### 1. `users` Table

- Stores admin accounts
- Fields: id, email, password, full_name, role, active, created_at, updated_at

#### 2. `notices` Table

- Stores notice board posts
- Fields: id, title, description, category, active, file_url, publish_date, expiry_date, priority, created_by, created_at, updated_at

#### 3. `committee_members` Table

- Stores committee members with yearly tracking
- Fields: id, full_name, position, email, phone, student_id, department, image_url, linkedin_url, facebook_url, bio, year, display_order, active, created_at, updated_at

### Sample Data

#### Default Admin User

- **Email:** admin@bsf.gub.edu.bd
- **Password:** admin123
- **Role:** ADMIN

#### Sample Notices (3)

1. Welcome to BSF-GUB
2. Annual General Meeting 2025
3. Urgent: Membership Renewal

#### Sample Committee Members (4)

1. Ahmed Rahman - President
2. Fatima Khan - Vice President
3. Mohammad Ali - General Secretary
4. Nusrat Jahan - Treasurer

---

## 🔍 Verify Database Creation

After running the script, verify in MySQL Workbench:

```sql
-- Show databases
SHOW DATABASES;

-- Use the database
USE bsf_gub_db;

-- Show tables
SHOW TABLES;

-- Check users
SELECT * FROM users;

-- Check notices
SELECT * FROM notices;

-- Check committee members
SELECT * FROM committee_members;
```

---

## 🎯 Next Steps

### After Database is Created:

1. **Test Node.js Backend Connection**

   ```powershell
   cd "G:\React Applications\BSF_Website\BSF-Backend-Node"
   npm run dev
   ```

2. **The server should start successfully:**

   ```
   ✅ Database connection established successfully
   ✅ Database models synchronized
   ✅ Server is running on port 8080
   ```

3. **Test the Login API:**

   ```powershell
   $body = @{
       email = "admin@bsf.gub.edu.bd"
       password = "admin123"
   } | ConvertTo-Json

   Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $body -ContentType "application/json"
   ```

---

## ⚠️ Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Solution:** Your MySQL password is incorrect

- Verify password is `12345`
- Or update `.env` file in BSF-Backend-Node folder

### Error: "Database 'bsf_gub_db' already exists"

**Solution:** This is fine! The script will drop and recreate it

- Make sure you want to delete existing data
- Or comment out the `DROP DATABASE` line in the SQL script

### Error: "Cannot connect to MySQL server"

**Solution:** MySQL service is not running

- Start MySQL service from Windows Services
- Or start MySQL Workbench and check connection

---

## 📊 Database Summary

| Component      | Count | Details                           |
| -------------- | ----- | --------------------------------- |
| Database       | 1     | bsf_gub_db                        |
| Tables         | 3     | users, notices, committee_members |
| Admin Users    | 1     | admin@bsf.gub.edu.bd              |
| Sample Notices | 3     | Various categories                |
| Sample Members | 4     | 2025 committee                    |
| Indexes        | 8+    | For performance optimization      |

---

## 🔐 MySQL Credentials Used

```
Host: localhost
Port: 3306
Username: root
Password: 12345
Database: bsf_gub_db
```

---

## ✨ You're All Set!

After running this SQL script:

- ✅ Database is created
- ✅ Tables are created
- ✅ Sample data is inserted
- ✅ Ready for Node.js backend

**Next:** Start your Node.js backend and test the API!
