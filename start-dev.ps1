# Script de PowerShell para iniciar PULSE HUB

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PULSE HUB - Iniciando Desarrollo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Limpiar puertos anteriores
Write-Host "[0/3] Limpiando puertos anteriores..." -ForegroundColor Yellow
Write-Host ""

# Liberar puerto 3000 (Frontend)
try {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($port3000) {
        foreach ($conn in $port3000) {
            $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "  Liberando puerto 3000 (PID: $($process.Id) - $($process.ProcessName))" -ForegroundColor Yellow
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
    }
} catch {
    # Puerto ya libre
}

# Liberar puerto 4000 (Backend)
try {
    $port4000 = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
    if ($port4000) {
        foreach ($conn in $port4000) {
            $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "  Liberando puerto 4000 (PID: $($process.Id) - $($process.ProcessName))" -ForegroundColor Yellow
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
    }
} catch {
    # Puerto ya libre
}

Write-Host "✓ Puertos liberados correctamente" -ForegroundColor Green
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
Write-Host "IMPORTANTE: Configura el email en apps\api\.env para probar el formulario" -ForegroundColor Yellow
Write-Host "  → Sigue: docs\guides\EMAIL-SETUP.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para detener: Cierra ambas ventanas de PowerShell" -ForegroundColor Yellow
Write-Host ""
