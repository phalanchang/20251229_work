@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM 現在のディレクトリを取得
set "SCRIPT_DIR=%~dp0"

REM PowerShellを使って日時を取得
for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd_HHmm'"') do set DATETIME=%%i

REM ファイル名を生成
set "FILENAME=%DATETIME%.md"
set "FILEPATH=%SCRIPT_DIR%%FILENAME%"

REM ファイルが既に存在するかチェック
if exist "%FILEPATH%" (
    echo.
    echo ファイル %FILENAME% は既に存在します。
    set /p OVERWRITE="上書きしますか？ (Y/N): "
    if /i not "!OVERWRITE!"=="Y" (
        echo 処理をキャンセルしました。
        pause
        exit /b
    )
)

REM 空のマークダウンファイルを作成
type nul > "%FILEPATH%"

REM 結果を表示
echo.
echo ファイルを作成しました: %FILENAME%
echo パス: %FILEPATH%
echo.

pause
