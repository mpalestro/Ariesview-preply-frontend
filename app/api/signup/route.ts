import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

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
    // Get request body
    const body = await req.json();
    console.log("Signup Request Body:", body); // Debugging

    const { firstName, lastName, email, phone, password } = body;
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Get database connection
    pool = getDbConnection();

    // Test database connection before proceeding
    try {
      await pool.query('SELECT NOW()');
      console.log("Database connection successful");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json({ 
        error: 'Database connection failed. Please make sure PostgreSQL is running and properly configured.',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

    // Check if the email already exists
    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword); // Debugging

    try {
      // Insert user into database
      await pool.query(
        "INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES ($1, $2, $3, $4, $5)",
        [firstName, lastName, email, phone, hashedPassword]
      );
    } catch (insertError) {
      console.error("Error inserting user:", insertError);
      return NextResponse.json({ 
        error: 'Error creating user account',
        details: insertError instanceof Error ? insertError.message : 'Unknown error',
        hint: 'Database schema might be missing the phone field. Run setup-postgres.bat to fix this.'
      }, { status: 500 });
    }

    return NextResponse.json({ message: "Signup successful!" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
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

