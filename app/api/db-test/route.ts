import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  const isDocker = process.env.NODE_ENV === 'production';
  const host = process.env.DB_HOST || (isDocker ? 'postgres' : 'localhost');
  const port = Number(process.env.DB_PORT) || 5432;
  const user = process.env.DB_USER || 'ariesview';
  const password = process.env.DB_PASSWORD || 'your_secure_password';
  const database = process.env.DB_NAME || 'ariesview';
  
  console.log(`Attempting to connect to database with:`);
  console.log(`- host: ${host}`);
  console.log(`- port: ${port}`);
  console.log(`- user: ${user}`);
  console.log(`- database: ${database}`);
  console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`- isDocker: ${isDocker}`);
  
  try {
    const pool = new Pool({
      user,
      host,
      database,
      password,
      port,
      connectionTimeoutMillis: 5000
    });
    
    const result = await pool.query("SELECT NOW() AS success");
    await pool.end();
    
    return NextResponse.json({ 
      message: "Database connected!", 
      time: result.rows[0].success,
      connectionInfo: {
        host,
        port,
        user,
        database
      }
    });
  } catch (error) {
    // Explicitly cast error to `Error` type
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Database connection failed:", errMessage);
    
    return NextResponse.json({ 
      error: "Database connection failed", 
      details: errMessage,
      connectionInfo: {
        host,
        port,
        user,
        database
      }
    }, { status: 500 });
  }
}
