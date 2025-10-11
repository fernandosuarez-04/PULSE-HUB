@echo off
echo ========================================
echo   PULSE HUB - Iniciando Desarrollo
echo ========================================
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
pause

