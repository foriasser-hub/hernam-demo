# Lance la maquette Tranombarotra HERNAM + un tunnel ngrok public, avec redemarrage
# automatique si l'un des deux processus plante. A lancer dans SA PROPRE fenetre
# PowerShell (double-clic sur demo-en-ligne.bat), et a laisser ouverte.
#
# Astuce : reduisez la fenetre au lieu de la fermer. La fermer arrete la demo.

$ErrorActionPreference = 'SilentlyContinue'
Set-Location $PSScriptRoot

Write-Host "=== Demo Tranombarotra HERNAM ===" -ForegroundColor Green
Write-Host "Ne fermez pas cette fenetre pendant la duree de la demonstration." -ForegroundColor Yellow
Write-Host ""

$viteProc = $null
$ngrokProc = $null

function Start-Vite {
    Write-Host "$(Get-Date -Format 'HH:mm:ss') - Demarrage du serveur (Vite)..." -ForegroundColor Cyan
    return Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WindowStyle Hidden -PassThru
}

function Start-Ngrok {
    Write-Host "$(Get-Date -Format 'HH:mm:ss') - Demarrage du tunnel (ngrok)..." -ForegroundColor Cyan
    return Start-Process -FilePath "ngrok" -ArgumentList "http","5173","--log=stdout" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$PSScriptRoot\ngrok.log"
}

$viteProc = Start-Vite
Start-Sleep -Seconds 5
$ngrokProc = Start-Ngrok
Start-Sleep -Seconds 4

# Recupere et affiche le lien public
$publicUrl = $null
try {
    $tunnels = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 5
    $publicUrl = $tunnels.tunnels[0].public_url
} catch {}
if ($publicUrl) {
    Write-Host ""
    Write-Host "Lien a partager avec le client :" -ForegroundColor Green
    Write-Host "  $publicUrl" -ForegroundColor White -BackgroundColor DarkGreen
    $publicUrl | Out-File "$PSScriptRoot\lien-demo.txt" -Encoding utf8
    Write-Host ""
    Write-Host "(egalement enregistre dans lien-demo.txt)"
}

Write-Host ""
Write-Host "Surveillance active - verification toutes les 30 secondes." -ForegroundColor DarkGray
Write-Host ""

while ($true) {
    Start-Sleep -Seconds 30

    if ($viteProc -eq $null -or $viteProc.HasExited) {
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - Le serveur s'est arrete, redemarrage..." -ForegroundColor Red
        $viteProc = Start-Vite
        Start-Sleep -Seconds 5
    }
    if ($ngrokProc -eq $null -or $ngrokProc.HasExited) {
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - Le tunnel s'est arrete, redemarrage..." -ForegroundColor Red
        $ngrokProc = Start-Ngrok
        Start-Sleep -Seconds 4
        try {
            $tunnels = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 5
            $newUrl = $tunnels.tunnels[0].public_url
            if ($newUrl -ne $publicUrl) {
                $publicUrl = $newUrl
                Write-Host "Nouveau lien : $publicUrl" -ForegroundColor Yellow -BackgroundColor DarkRed
                $publicUrl | Out-File "$PSScriptRoot\lien-demo.txt" -Encoding utf8
            }
        } catch {}
    }
}
