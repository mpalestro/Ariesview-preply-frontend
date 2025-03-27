import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Create a function to get database connection
const getDbConnection = () => {
  // Check if we're running in Docker (NODE_ENV will be 'production')
  const isDocker = process.env.NODE_ENV === 'production';
  
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || (isDocker ? 'postgres' : 'localhost'), 
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    // Add connection timeout
    connectionTimeoutMillis: 5000
  });

  return pool;
};

export async function POST(req: Request) {
  let pool;
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Get database connection
    pool = getDbConnection();

    // Test database connection before proceeding
    try {
      await pool.query('SELECT NOW()');
      console.log("Database connection successful for signin");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json({ 
        error: 'Database connection failed. Please make sure PostgreSQL is running and properly configured.',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

    // Check if user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found. Please sign up.' }, { status: 404 });
    }

    const user = result.rows[0];

    // Compare passwords - ensure we're using the right field name (password_hash)
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Update last login time
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    // If credentials are correct, return success (exclude password_hash from response)
    const { password_hash, ...userWithoutPassword } = user;
    return NextResponse.json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    }, { status: 200 });

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Please check server logs for more details'
    }, { status: 500 });
  } finally {
    // Close the pool connection if it was opened
    if (pool) {
      pool.end().catch(err => console.error("Error closing pool:", err));
    }
  }
}


