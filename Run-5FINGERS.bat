@echo off
cd /d "%~dp0"

echo Starting 5 F!NGERS by S1mplee67...

if exist "5-FINGERS.exe" (
    start "" "5-FINGERS.exe"
) else (
    if exist "build.bat" (
        call build.bat
        if exist "5-FINGERS.exe" (
            start "" "5-FINGERS.exe"
            exit /b 0
        )
    )
    REM Fallback to launching in default browser directly
    start "" "index.html"
)
exit /b 0
