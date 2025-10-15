# Database Schema Documentation

## Overview

Database Name: `bsf_gub_db`
Auto-created by Hibernate based on JPA entities.

---

## Tables

### 1. `users` Table

Stores admin user accounts for authentication.

| Column     | Type         | Constraints                 | Description               |
| ---------- | ------------ | --------------------------- | ------------------------- |
| id         | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier         |
| email      | VARCHAR(255) | UNIQUE, NOT NULL            | Admin email               |
| password   | VARCHAR(255) | NOT NULL                    | BCrypt encrypted password |
| full_name  | VARCHAR(255) | NOT NULL                    | Admin full name           |
| role       | VARCHAR(50)  | NOT NULL                    | Role (ADMIN, SUPER_ADMIN) |
| active     | BOOLEAN      | NOT NULL, DEFAULT TRUE      | Account status            |
| created_at | TIMESTAMP    | NOT NULL                    | Record creation time      |
| updated_at | TIMESTAMP    |                             | Last update time          |

**Default Data:**

- Email: admin@bsf.gub.edu.bd
- Password: admin123 (BCrypt encrypted)
- Role: ADMIN

---

### 2. `notices` Table

Stores notice board posts and announcements.

| Column       | Type         | Constraints                 | Description                                     |
| ------------ | ------------ | --------------------------- | ----------------------------------------------- |
| id           | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                               |
| title        | VARCHAR(255) | NOT NULL                    | Notice title                                    |
| description  | TEXT         |                             | Notice content/description                      |
| category     | VARCHAR(50)  | NOT NULL                    | Category (announcement, event, general, urgent) |
| active       | BOOLEAN      | NOT NULL, DEFAULT TRUE      | Visibility status                               |
| file_url     | VARCHAR(500) |                             | URL to PDF/image attachment                     |
| publish_date | TIMESTAMP    |                             | Publication date                                |
| expiry_date  | TIMESTAMP    |                             | Expiration date                                 |
| priority     | INT          | NOT NULL, DEFAULT 0         | Display priority (higher first)                 |
| created_at   | TIMESTAMP    | NOT NULL                    | Record creation time                            |
| updated_at   | TIMESTAMP    |                             | Last update time                                |
| created_by   | BIGINT       | FOREIGN KEY (users.id)      | Admin who created                               |

**Indexes:**

- Index on `active` for faster filtering
- Index on `category` for category queries
- Index on `priority` for sorting

**Categories:**

- `announcement` - General announcements
- `event` - Event notifications
- `general` - General notices
- `urgent` - Urgent/important notices

---

### 3. `committee_members` Table

Stores committee member information with yearly tracking.

| Column        | Type         | Constraints                 | Description                       |
| ------------- | ------------ | --------------------------- | --------------------------------- |
| id            | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                 |
| full_name     | VARCHAR(255) | NOT NULL                    | Member full name                  |
| position      | VARCHAR(100) | NOT NULL                    | Committee position                |
| email         | VARCHAR(255) | NOT NULL                    | Member email                      |
| phone         | VARCHAR(20)  |                             | Contact phone number              |
| student_id    | VARCHAR(50)  |                             | GUB student ID                    |
| department    | VARCHAR(100) |                             | Department/Faculty                |
| image_url     | VARCHAR(500) |                             | Profile photo URL                 |
| linkedin_url  | VARCHAR(500) |                             | LinkedIn profile URL              |
| facebook_url  | VARCHAR(500) |                             | Facebook profile URL              |
| bio           | TEXT         |                             | Member biography                  |
| year          | VARCHAR(10)  | NOT NULL                    | Committee year (2024, 2025, etc.) |
| display_order | INT          | NOT NULL, DEFAULT 0         | Custom ordering                   |
| active        | BOOLEAN      | NOT NULL, DEFAULT TRUE      | Visibility status                 |
| created_at    | TIMESTAMP    | NOT NULL                    | Record creation time              |
| updated_at    | TIMESTAMP    |                             | Last update time                  |

**Indexes:**

- Index on `year` for yearly queries
- Index on `active` for filtering
- Index on `display_order` for sorting

**Common Positions:**

- President
- Vice President
- General Secretary
- Treasurer
- Executive Member

---

## Relationships

### users → notices

- One-to-Many relationship
- A user (admin) can create multiple notices
- `notices.created_by` references `users.id`

---

## Sample Queries

### Create Default Admin

```sql
INSERT INTO users (email, password, full_name, role, active, created_at, updated_at)
VALUES (
    'admin@bsf.gub.edu.bd',
    '$2a$10$...', -- BCrypt hash of 'admin123'
    'BSF Admin',
    'ADMIN',
    TRUE,
    NOW(),
    NOW()
);
```

### Get Active Notices Ordered by Priority

```sql
SELECT * FROM notices
WHERE active = TRUE
  AND (expiry_date IS NULL OR expiry_date > NOW())
ORDER BY priority DESC, created_at DESC;
```

### Get Committee Members for Current Year

```sql
SELECT * FROM committee_members
WHERE year = '2025'
  AND active = TRUE
ORDER BY display_order ASC;
```

### Get Notices by Category

```sql
SELECT * FROM notices
WHERE category = 'event'
  AND active = TRUE
ORDER BY priority DESC;
```

---

## Migration Notes

### For Production:

1. Change `spring.jpa.hibernate.ddl-auto` from `update` to `validate`
2. Use Flyway or Liquibase for schema migrations
3. Create proper database backups
4. Set up read replicas if needed

### Index Optimization:

Consider adding composite indexes for frequently used queries:

```sql
CREATE INDEX idx_notices_active_priority ON notices(active, priority DESC);
CREATE INDEX idx_committee_year_active ON committee_members(year, active, display_order);
```

---

## Database Size Estimates

### Small Organization (500 members):

- Users: ~10 records
- Notices: ~200 records/year
- Committee Members: ~20 records/year

**Estimated Size:** ~5-10 MB/year

### Medium Organization (2000 members):

- Users: ~20 records
- Notices: ~500 records/year
- Committee Members: ~30 records/year

**Estimated Size:** ~20-30 MB/year

---

## Backup Strategy

1. **Daily Backups:**

   ```bash
   mysqldump -u root -p bsf_gub_db > backup_$(date +%Y%m%d).sql
   ```

2. **Weekly Full Backups:**

   - Store offsite
   - Keep for 1 month

3. **Monthly Archives:**
   - Compress and archive
   - Keep for 1 year

---

## Security Considerations

1. **Passwords:**

   - All passwords BCrypt encrypted
   - Minimum 60 characters in DB

2. **Access Control:**

   - Grant minimal required permissions
   - Separate read-only user for reports

3. **Data Validation:**

   - All inputs validated in application layer
   - SQL injection prevention through JPA

4. **Sensitive Data:**
   - Email addresses
   - Phone numbers
   - Student IDs

---

## Monitoring Queries

### Check Database Size

```sql
SELECT
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "bsf_gub_db"
ORDER BY (data_length + index_length) DESC;
```

### Check Record Counts

```sql
SELECT 'users' AS table_name, COUNT(*) AS count FROM users
UNION
SELECT 'notices', COUNT(*) FROM notices
UNION
SELECT 'committee_members', COUNT(*) FROM committee_members;
```

### Find Expired Notices

```sql
SELECT id, title, expiry_date
FROM notices
WHERE expiry_date < NOW()
  AND active = TRUE;
```

---

**Auto-generated by Hibernate based on JPA entities**
