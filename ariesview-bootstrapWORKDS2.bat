@echo off
echo =========== Ariesview Complete Setup ===========

REM Check if Docker is running
echo Checking Docker status...
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Docker is not running. Please start Docker Desktop and try again.
  pause
  exit /b 1
)

REM Force cleanup existing containers
echo Forcing cleanup of existing containers...
docker stop ariesview51-postgres >nul 2>&1
docker rm -f ariesview51-postgres >nul 2>&1

REM Verify no containers with this name exist
docker ps -a --filter "name=ariesview51-postgres" --format "{{.Names}}" | findstr "ariesview51-postgres" >nul
if %ERRORLEVEL% EQU 0 (
  echo WARNING: Failed to remove existing container. Trying with force...
  docker rm -f ariesview51-postgres >nul 2>&1
)

REM Check if port 5432 is in use
echo Checking port availability...
set DB_PORT=5432
netstat -ano | findstr ":5432" | findstr "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
  echo Port 5432 is in use, using 5433 instead
  set DB_PORT=5433
) else (
  echo Port 5432 is available
)

REM Clear Next.js cache to avoid stale data
if exist ".next" (
  echo Clearing Next.js cache...
  rmdir /s /q .next
)

REM Start PostgreSQL container with specific name ariesview51-postgres
echo Starting PostgreSQL container (ariesview51-postgres)...
docker run --name ariesview51-postgres ^
  -e POSTGRES_USER=ariesview ^
  -e POSTGRES_PASSWORD=Ariesview123 ^
  -e POSTGRES_DB=ariesview ^
  -p %DB_PORT%:5432 ^
  -d postgres:15-alpine

REM Verify container is running
echo Verifying container is running...
timeout /t 3 /nobreak >nul
docker ps | findstr "ariesview51-postgres" >nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Container failed to start
  echo Docker container status:
  docker ps -a | findstr "ariesview51"
  echo Docker logs:
  docker logs ariesview51-postgres
  pause
  exit /b 1
)

REM Wait for PostgreSQL to be ready - with retries
echo Waiting for PostgreSQL to initialize...
set /a retryCount=0
set /a maxRetries=5

:retry_db_connection
timeout /t 3 /nobreak >nul
echo Checking database connection (attempt %retryCount% of %maxRetries%)...
docker exec ariesview51-postgres pg_isready -h localhost -U ariesview >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  set /a retryCount+=1
  if %retryCount% LSS %maxRetries% (
    echo Database not ready yet, waiting...
    goto retry_db_connection
  ) else (
    echo ERROR: Database failed to initialize after multiple attempts
    echo Docker logs:
    docker logs ariesview51-postgres
    pause
    exit /b 1
  )
)

echo Database is responding!

REM Create database schema
echo Creating database schema...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview -c "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), phone VARCHAR(50), created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, last_login TIMESTAMP WITH TIME ZONE);"
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Failed to create database schema
  pause
  exit /b 1
)

REM Create default admin user
echo Creating default admin user...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview -c "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('admin@example.com', '$2a$10$oqYI3ohV2zPRWLjH52xIQepL6a6k5Qi3xhGkJRYTKC8xzf8kxYEcK', 'Admin', 'User') ON CONFLICT (email) DO NOTHING;"
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Failed to create admin user
  pause
  exit /b 1
)

REM Display database connection information
echo.
echo [DATABASE INFO]
echo Container: ariesview51-postgres
echo Username: ariesview
echo Password: Ariesview123
echo Database: ariesview
echo Port: %DB_PORT%
echo.

REM Create .env.local file with correct settings
echo Creating .env.local file...
(
echo # Database Configuration
echo DB_HOST=localhost
echo DB_PORT=%DB_PORT%
echo DB_USER=ariesview
echo DB_PASSWORD=Ariesview123
echo DB_NAME=ariesview
echo # Authentication
echo NEXTAUTH_SECRET=your-secret-key-here
echo NEXTAUTH_URL=http://localhost:3002
echo # Environment
echo NODE_ENV=development
) > .env.local

REM Setup Excel integration components
echo Setting up Excel integration...

REM Create directory if it doesn't exist
if not exist "components\ui\excel" (
  mkdir components\ui\excel 2>nul
)

REM Create helper file
echo Creating Handsontable helper...
(
echo // components/ui/excel/handsontable-helper.ts
echo export const loadHandsontable = ^(container: HTMLElement, data: any[][]^) =^> {
echo   if (typeof window !== 'undefined'^) {
echo     // Initialize Handsontable
echo     const Handsontable = (window as any^).Handsontable;
echo     if (Handsontable^) {
echo       return new Handsontable(container, {
echo         data: data,
echo         rowHeaders: true,
echo         colHeaders: true,
echo         licenseKey: 'non-commercial-and-evaluation',
echo         stretchH: 'all',
echo         width: '100%%',
echo         height: 400,
echo         contextMenu: true,
echo         manualColumnResize: true,
echo         manualRowResize: true
echo       }^);
echo     }
echo   }
echo   return null;
echo };
) > components\ui\excel\handsontable-helper.ts

REM Create Excel editor component
echo Creating Excel editor component...
(
echo // components/ui/excel/excel-editor.tsx
echo "use client";
echo import { useEffect, useRef, useState } from 'react';
echo import { loadHandsontable } from './handsontable-helper';
echo 
echo export default function ExcelEditor({ initialData }: { initialData?: any[][] }^) {
echo   const containerRef = useRef^(null^);
echo   const [hotInstance, setHotInstance] = useState^(null^);
echo   const defaultData = initialData || [
echo     ['', 'Q1', 'Q2', 'Q3', 'Q4'],
echo     ['2023', 10, 11, 12, 13],
echo     ['2024', 20, 11, 14, 13],
echo     ['2025', 30, 15, 12, 13]
echo   ];
echo 
echo   useEffect^(^(^) =^> {
echo     // Create script tag for Handsontable CSS
echo     const linkTag = document.createElement^('link'^);
echo     linkTag.rel = 'stylesheet';
echo     linkTag.href = 'https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css';
echo     document.head.appendChild^(linkTag^);
echo 
echo     // Create script tag for Handsontable JS
echo     const scriptTag = document.createElement^('script'^);
echo     scriptTag.src = 'https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js';
echo     scriptTag.async = true;
echo     
echo     // Initialize Handsontable after script loads
echo     scriptTag.onload = ^(^) =^> {
echo       if (containerRef.current^) {
echo         const hot = loadHandsontable^(containerRef.current, defaultData^);
echo         setHotInstance^(hot^);
echo       }
echo     };
echo     
echo     document.body.appendChild^(scriptTag^);
echo 
echo     // Cleanup function
echo     return ^(^) =^> {
echo       document.head.removeChild^(linkTag^);
echo       document.body.removeChild^(scriptTag^);
echo       if (hotInstance^) {
echo         (hotInstance as any^).destroy^(^);
echo       }
echo     };
echo   }, []^); // Empty dependency array means this runs once on mount
echo 
echo   return (
echo     ^<div className="w-full bg-white rounded-lg shadow overflow-hidden"^>
echo       ^<div className="p-4 border-b"^>
echo         ^<h3 className="text-xl font-semibold"^>Excel-like Editor^</h3^>
echo         ^<p className="text-gray-500"^>You can edit data just like in a spreadsheet^</p^>
echo       ^</div^>
echo       ^<div ref={containerRef} className="handsontable-container"^>^</div^>
echo     ^</div^>
echo   );
echo }
) > components\ui\excel\excel-editor.tsx

REM Install dependencies
echo Installing dependencies...
call npm install

REM Start the application
echo.
echo =======================================================================
echo   ARIESVIEW APPLICATION READY
echo =======================================================================
echo   - Frontend: http://localhost:3002
echo   - Database: PostgreSQL (ariesview51-postgres) on port %DB_PORT%
echo   - Default login: admin@example.com / password123
echo   - Excel functionality available at: /operations-dashboard/ask-ai
echo   - Press Ctrl+C to stop the application
echo =======================================================================
echo.

call npx next dev -p 3002 