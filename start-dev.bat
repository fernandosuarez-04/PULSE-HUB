@echo off
echo ========================================
echo   PULSE HUB - Iniciando Desarrollo
echo ========================================
echo.

echo [0/3] Limpiando puertos anteriores...
echo.

REM Matar procesos en puerto 3000 (Frontend)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Liberando puerto 3000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)

REM Matar procesos en puerto 4000 (Backend)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000') do (
    echo Liberando puerto 4000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)

echo Puertos liberados correctamente
echo.

echo [1/3] Compilando paquete compartido...
cd packages\shared
call npx tsc
cd ..\..
echo.

echo [2/3] Iniciando Frontend y Backend...
echo.
echo Frontend: http://localhost:3000 (puede variar)
echo Backend:  http://localhost:4000
echo.
echo Presiona Ctrl+C para detener ambos
echo ========================================
echo.

start "PULSE HUB - FRONTEND" cmd /k "cd apps\web && npm run dev"
start "PULSE HUB - BACKEND" cmd /k "cd apps\api && npm run dev"

echo.
echo [3/3] Ambos servidores iniciados en ventanas separadas
echo.
echo Abre tu navegador en:
echo  - Frontend: La URL que aparezca en la ventana FRONTEND
echo  - Backend API: http://localhost:4000/health
echo.
echo IMPORTANTE: Configura el email en apps\api\.env para probar el formulario
echo  - Sigue: docs\guides\EMAIL-SETUP.md
echo.
pause
