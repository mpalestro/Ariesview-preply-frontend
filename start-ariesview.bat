@echo off
echo =========== Ariesview with PostgreSQL ===========

REM Cleaning up existing containers
echo Cleaning up existing containers...
docker stop ariesview51-postgres 2>nul
docker rm ariesview51-postgres 2>nul

REM Check if port 5432 is in use and use an alternative if needed
echo Checking if port 5432
set DB_PORT=5432
netstat -ano | findstr "5432" | findstr "LISTENING" > nul
if %ERRORLEVEL% EQU 0 (
    echo Port 5432 is in use, using 5433 instead
    set DB_PORT=5433
) else (
    echo Port 5432 is available
)

REM Starting PostgreSQL database in Docker
echo Starting PostgreSQL database in Docker...
docker run --name ariesview51-postgres -e POSTGRES_USER=ariesview -e POSTGRES_PASSWORD=Ariesview123 -e POSTGRES_DB=ariesview -p %DB_PORT%:5432 -d postgres:15-alpine

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 5 /nobreak > nul

REM Verify database connection
echo Verifying database connection...
docker exec ariesview51-postgres pg_isready -h localhost -p 5432
if %ERRORLEVEL% NEQ 0 (
    echo Error: Database is not ready. Check the logs:
    docker logs ariesview51-postgres
    pause
    exit /b 1
)

REM Create the users table
echo Creating database tables...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview -c "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), phone VARCHAR(50), created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, last_login TIMESTAMP WITH TIME ZONE);"

REM Create default admin user
echo Creating default admin user...
docker exec -i ariesview51-postgres psql -U ariesview -d ariesview -c "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('admin@example.com', '$2a$10$oqYI3ohV2zPRWLjH52xIQepL6a6k5Qi3xhGkJRYTKC8xzf8kxYEcK', 'Admin', 'User') ON CONFLICT (email) DO NOTHING;"

echo Database is ready! Tables and users are set up.

REM Create or update .env.local file with the correct DB_PORT
echo Updating .env.local file...
(
    echo # Database Configuration
    echo DB_HOST=localhost
    echo DB_PORT=%DB_PORT%
    echo DB_USER=ariesview
    echo DB_PASSWORD=Ariesview123
    echo DB_NAME=ariesview
    echo # Authentication
    echo NEXTAUTH_SECRET=your-secret-key-here
    echo NEXTAUTH_URL=http://localhost:3000
    echo # Environment
    echo NODE_ENV=development
) > .env.local

REM Step 1: Set up Handsontable integration
echo Step 1: Running PowerShell script to copy Handsontable files...
echo Script running from: %CD%
echo Target directory: %CD%\ariesview-italy-v6

REM Create Handsontable components directory if it doesn't exist
if not exist "components\ui\excel" (
    mkdir components\ui\excel 2>nul
)

REM Create Handsontable integration helper file
echo Creating Handsontable integration helper file...
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

REM Create ExcelEditor component
echo Creating ExcelEditor component...
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

echo Process completed successfully!
echo The Excel functionality should now work using CDN-based Handsontable.

REM Step 2: Install dependencies if needed
echo Step 2: Installing dependencies...
call npm install

REM Step 3: Start the application
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