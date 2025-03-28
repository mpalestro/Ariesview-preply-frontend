@echo off
echo =========== Ariesview: Complete Development Setup ===========
echo ================================================================
echo Frontend: Next.js (Local)
echo Backend: PostgreSQL (Docker)
echo ================================================================

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Docker is not running. Please start Docker Desktop and try again.
  pause
  exit /b 1
)

REM Clear .next directory for clean build
echo Cleaning build directory...
if exist ".next\" (
  rmdir /s /q .next
)

REM Stop any existing postgres container
echo Stopping existing PostgreSQL container...
docker stop ariesview-postgres 2>nul
docker rm ariesview-postgres 2>nul

REM Start postgres container
echo Starting PostgreSQL container...
docker run --name ariesview-postgres -e POSTGRES_USER=ariesview -e POSTGRES_PASSWORD=Ariesview123 -e POSTGRES_DB=ariesview -p 5432:5432 -d postgres:15-alpine

echo Waiting for PostgreSQL to initialize...
timeout /t 5 /nobreak

REM Check if PostgreSQL is ready
echo Verifying database connection...
docker exec ariesview-postgres pg_isready -h localhost -U ariesview
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: PostgreSQL is not ready. Please check Docker logs.
  pause
  exit /b 1
)

REM Create users table and default admin
echo Creating database schema and default admin user...
docker exec -i ariesview-postgres psql -U ariesview -d ariesview -c "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, last_login TIMESTAMP WITH TIME ZONE);"
docker exec -i ariesview-postgres psql -U ariesview -d ariesview -c "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('admin@example.com', '$2a$10$oqYI3ohV2zPRWLjH52xIQepL6a6k5Qi3xhGkJRYTKC8xzf8kxYEcK', 'Admin', 'User') ON CONFLICT (email) DO NOTHING;"

REM Display database connection information
echo [DEBUG] Database connection information:
echo - Container: ariesview-postgres
echo - Username: ariesview
echo - Password: Ariesview123
echo - Database: ariesview
echo - Port: 5432

REM Create .env.local file
echo Creating .env.local file...
(
echo # Database Configuration
echo DB_HOST=localhost
echo DB_PORT=5432
echo DB_USER=ariesview
echo DB_PASSWORD=Ariesview123
echo DB_NAME=ariesview
echo # Authentication
echo NEXTAUTH_SECRET=your-secret-key-here
echo NEXTAUTH_URL=http://localhost:3000
echo # Environment
echo NODE_ENV=development
) > .env.local

REM Install dependencies if needed
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    call npm install pg bcryptjs dotenv @types/pg
)

echo.
echo ========================================================================
echo   ARIESVIEW APPLICATION READY
echo ========================================================================
echo   - Frontend: http://localhost:3000
echo   - Database: PostgreSQL on localhost:5432
echo   - Default login: admin@example.com / password123
echo   - Press Ctrl+C to stop the application
echo ========================================================================
echo.

REM Start the Next.js development server
call npx next dev 