-- Create the database if it doesn't exist
CREATE DATABASE ariesview;

-- Connect to the database
\c ariesview;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create a default admin user (password: password123)
INSERT INTO users (email, password_hash, first_name, last_name)
VALUES (
    'admin@example.com',
    '$2a$10$YourHashedPasswordHere', -- This will be replaced with actual hash
    'Admin',
    'User'
)
ON CONFLICT (email) DO NOTHING; 