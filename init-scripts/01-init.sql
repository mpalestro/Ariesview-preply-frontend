-- Create organizations table
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    '$2a$10$oqYI3ohV2zPRWLjH52xIQepL6a6k5Qi3xhGkJRYTKC8xzf8kxYEcK',
    'Admin',
    'User'
)
ON CONFLICT (email) DO NOTHING; 