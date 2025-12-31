@echo off
chcp 65001 >nul

REM PowerShellを使って日時を取得し、ファイルを作成
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $date = Get-Date -Format 'yyyyMMdd_HHmm'; $filename = $date + '.md'; $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path; $filepath = Join-Path $scriptDir $filename; if (Test-Path $filepath) { $overwrite = Read-Host ('ファイル ' + $filename + ' は既に存在します。上書きしますか？ (Y/N)'); if ($overwrite -ne 'Y' -and $overwrite -ne 'y') { Write-Host '処理をキャンセルしました。'; exit; } } New-Item -Path $filepath -ItemType File -Force | Out-Null; Write-Host ''; Write-Host ('ファイルを作成しました: ' + $filename); Write-Host ('パス: ' + $filepath); Write-Host ''; $open = Read-Host 'ファイルを開きますか？ (Y/N)'; if ($open -eq 'Y' -or $open -eq 'y') { Start-Process $filepath; } }"

pause
