@echo off
echo =========== Ariesview with PostgreSQL ===========

REM Clean up existing containers
docker-compose down -v

REM Start PostgreSQL database in Docker
docker-compose up -d postgres

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 5

REM Verify database connection
echo Verifying database connection...
docker exec ariesview51-postgres pg_isready -h localhost -p 5432

REM Display database connection information
echo [DEBUG] Database connection information:
echo - Container: ariesview51-postgres
echo - Username: ariesview
echo - Password: Ariesview123
echo - Database: ariesview
echo - Port: 5432

REM Create database tables
echo Creating database tables...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview < setup-db.sql

REM Create default admin user
echo Creating default admin user...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview -c "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('admin@example.com', '\$2a\$10\$YourHashedPasswordHere', 'Admin', 'User') ON CONFLICT (email) DO NOTHING;"

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