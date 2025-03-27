@echo off
echo =========== Ariesview with PostgreSQL ===========
echo.

REM Check if Docker is running
docker info > nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Remove existing container if it exists
echo Cleaning up existing containers...
docker rm -f ariesview51-postgres > nul 2>&1

REM Start Docker database
echo Starting PostgreSQL database in Docker...
docker run --rm -d ^
    --name ariesview51-postgres ^
    -p 5432:5432 ^
    -e POSTGRES_USER=ariesview ^
    -e POSTGRES_PASSWORD=Ariesview123 ^
    -e POSTGRES_DB=ariesview ^
    postgres:15-alpine

REM Wait for database to start
echo Waiting for database to be ready...
timeout /t 10 /nobreak > nul

REM Verify database connection
echo Verifying database connection...
docker exec ariesview51-postgres pg_isready -U ariesview -d ariesview
if errorlevel 1 (
    echo Error: Database is not ready. Check the logs:
    docker logs ariesview51-postgres
    pause
    exit /b 1
)

echo [DEBUG] Database connection information:
echo - Container: ariesview51-postgres
echo - Username: ariesview
echo - Password: Ariesview123
echo - Database: ariesview
echo - Port: 5432
echo.

REM Create tables and users
echo Creating database tables...
type create-tables.sql | docker exec -i ariesview51-postgres psql -U ariesview -d ariesview
echo Creating default admin user...
type insert-admin-user.sql | docker exec -i ariesview51-postgres psql -U ariesview -d ariesview

REM Start the Next.js application
echo.
echo =======================================================================
echo   ARIESVIEW APPLICATION READY
echo =======================================================================
echo   - Frontend: http://localhost:3000
echo   - Database: PostgreSQL on localhost:5432
echo   - Default login: admin@example.com / password123
echo   - Press Ctrl+C to stop the application
echo =======================================================================
echo.
call npx next dev

pause
