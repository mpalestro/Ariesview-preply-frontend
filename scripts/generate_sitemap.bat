@echo off
echo Generating AriesView sitemap...
python "%~dp0\generate_sitemap.py"
if errorlevel 1 (
    echo Error generating sitemap
    pause
    exit /b 1
)
echo Sitemap generated successfully!
echo Opening CSV file...
start "" "site-map.csv"
pause 