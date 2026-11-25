Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   DEPLOYING ONPHARNO CLIENT TO LIVE" -ForegroundColor Cyan
Write-Host "   URL: https://onpharno.alwaysdata.net/" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Step 1: Git Pull
Write-Host "`n[1/4] Pulling latest code from GitHub..." -ForegroundColor Yellow
git pull origin main

# Step 2: Build production bundle
Write-Host "`n[2/4] Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Build failed! Deployment aborted." -ForegroundColor Red
    exit 1
}

# Step 3: Archive dist folder
Write-Host "`n[3/4] Creating upload package..." -ForegroundColor Yellow
tar -czf onpharno-dist.tar.gz -C dist .

# Step 4: Upload and extract on Alwaysdata
Write-Host "`n[4/4] Uploading and extracting to Alwaysdata (/home/onpharno/www/)..." -ForegroundColor Yellow
Write-Host "When prompted, enter password: REDACTED_PASSWORD -ForegroundColor Green

scp onpharno-dist.tar.gz onpharno@ssh-onpharno.alwaysdata.net:/home/onpharno/
ssh onpharno@ssh-onpharno.alwaysdata.net "tar -xzf /home/onpharno/onpharno-dist.tar.gz -C /home/onpharno/www/ && rm -f /home/onpharno/onpharno-dist.tar.gz"

# Cleanup local archive
Remove-Item onpharno-dist.tar.gz -ErrorAction SilentlyContinue

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host "   DEPLOYMENT FINISHED SUCCESSFULLY! ✅" -ForegroundColor Green
Write-Host "   Check: https://onpharno.alwaysdata.net/" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
