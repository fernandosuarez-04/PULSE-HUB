Write-Host "🔍 Liberando puertos 3000 y 4000..." -ForegroundColor Yellow
Write-Host ""

# Liberar puerto 3000
try {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($port3000) {
        foreach ($conn in $port3000) {
            $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "❌ Matando proceso en puerto 3000: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Red
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
        Write-Host "✅ Puerto 3000 liberado" -ForegroundColor Green
    } else {
        Write-Host "✅ Puerto 3000 ya está libre" -ForegroundColor Green
    }
} catch {
    Write-Host "✅ Puerto 3000 ya está libre" -ForegroundColor Green
}

Write-Host ""

# Liberar puerto 4000
try {
    $port4000 = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
    if ($port4000) {
        foreach ($conn in $port4000) {
            $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "❌ Matando proceso en puerto 4000: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Red
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
        Write-Host "✅ Puerto 4000 liberado" -ForegroundColor Green
    } else {
        Write-Host "✅ Puerto 4000 ya está libre" -ForegroundColor Green
    }
} catch {
    Write-Host "✅ Puerto 4000 ya está libre" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Listo! Ahora puedes ejecutar .\start-dev.ps1" -ForegroundColor Cyan
