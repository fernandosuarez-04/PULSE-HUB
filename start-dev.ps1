# Script de PowerShell para iniciar PULSE HUB

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PULSE HUB - Iniciando Desarrollo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Compilar paquete compartido
Write-Host "[1/3] Compilando paquete compartido..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\packages\shared"
& npx tsc
Set-Location $PSScriptRoot
Write-Host "✓ Paquete compartido compilado" -ForegroundColor Green
Write-Host ""

Write-Host "[2/3] Iniciando Frontend y Backend..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Frontend: " -NoNewline; Write-Host "http://localhost:3000 (puede variar)" -ForegroundColor Green
Write-Host "Backend:  " -NoNewline; Write-Host "http://localhost:4000" -ForegroundColor Magenta
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\web'; Write-Host 'FRONTEND - Next.js' -ForegroundColor Cyan; npm run dev"

# Esperar 2 segundos
Start-Sleep -Seconds 2

# Iniciar Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\api'; Write-Host 'BACKEND - Express API' -ForegroundColor Magenta; npm run dev"

Write-Host "[3/3] Ambos servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "Abre tu navegador en:" -ForegroundColor Cyan
Write-Host "  → Frontend: La URL que aparezca en la ventana FRONTEND" -ForegroundColor Green
Write-Host "  → Backend API: http://localhost:4000/health" -ForegroundColor Magenta
Write-Host ""
Write-Host "Para detener: Cierra ambas ventanas de PowerShell" -ForegroundColor Yellow
Write-Host ""

