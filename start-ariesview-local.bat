@echo off
echo ===================================================
echo   Handsontable Integration for Ariesview Italy
echo ===================================================
echo.

REM Check if Docker is running
docker info > nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Remove any existing containers
echo Cleaning up existing containers...
docker rm -f ariesview51-postgres > nul 2>&1
docker rm -f ariesview-postgres > nul 2>&1

REM Start Docker database without --rm flag
echo Starting PostgreSQL database in Docker...
docker run -d ^
    --name ariesview51-postgres ^
    -p 5432:5432 ^
    -e POSTGRES_USER=ariesview ^
    -e POSTGRES_PASSWORD=Ariesview123 ^
    -e POSTGRES_DB=ariesview ^
    -v "%cd%\init-scripts:/docker-entrypoint-initdb.d" ^
    postgres:15-alpine

REM Check if container started successfully
timeout /t 2 /nobreak > nul
docker ps | findstr ariesview51-postgres > nul
if errorlevel 1 (
    echo Error: Container failed to start properly. Checking logs:
    docker logs ariesview51-postgres
    pause
    exit /b 1
)

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 10 /nobreak

REM Verify database connection
echo Verifying database connection...
docker exec ariesview51-postgres pg_isready -U ariesview -d ariesview
if errorlevel 1 (
    echo Error: Database is not ready. Check the logs:
    docker logs ariesview51-postgres
    pause
    exit /b 1
)

echo Database is ready! Tables and users are set up.
echo.

REM Create or update .env.local with correct credentials
echo Updating environment variables...
echo NODE_ENV=development > .env.local
echo DB_USER=ariesview >> .env.local
echo DB_PASSWORD=Ariesview123 >> .env.local
echo DB_NAME=ariesview >> .env.local
echo DB_HOST=localhost >> .env.local
echo DB_PORT=5432 >> .env.local
echo NEXTAUTH_SECRET=your-secret-key-here >> .env.local
echo NEXTAUTH_URL=http://localhost:3002 >> .env.local

echo Step 1: Running PowerShell script to copy Handsontable files...
powershell -ExecutionPolicy Bypass -File copy-handsontable-files.ps1

echo.
echo Step 2: Installing dependencies...
cd ariesview-italy-v6
call npm install

echo.
echo Step 3: Starting the application...
echo.
echo The application will be available at: http://localhost:3002
echo To access the enhanced Excel editor, go to:
echo http://localhost:3002/operations-dashboard/ask-ai
echo.
echo Default login: admin@example.com / password123
echo.
echo Press Ctrl+C to stop the server when finished.
echo.
call npx next dev -p 3002

pause 