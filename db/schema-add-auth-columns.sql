-- Run this against sahayak-db to add what app.js's signup/signin actually needs.
-- Safe to run even if columns already exist (IF NOT EXISTS guards).

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'student';

-- Optional but recommended: only allow known roles
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('student','faculty','admin'));