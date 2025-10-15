@echo off
echo ========================================
echo   Liberando puertos 3000 y 4000
echo ========================================
echo.

echo Buscando procesos en puerto 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Matando proceso PID: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Buscando procesos en puerto 4000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000 ^| findstr LISTENING') do (
    echo Matando proceso PID: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo ========================================
echo   Puertos liberados!
echo ========================================
echo.
echo Ahora puedes ejecutar: start-dev.bat
echo.
pause
