INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES ('Admin', 'User', 'admin@example.com', '555-1234', '/SOWf2SAeVwC1CDuHXnY17x/kB2WRxG4mi') ON CONFLICT (email) DO NOTHING;
