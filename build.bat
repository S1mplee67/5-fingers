@echo off
setlocal
cd /d "%~dp0"

echo =========================================================
echo  5 F!NGERS by S1mplee67 - Compiling Desktop Executable
echo =========================================================

REM Locate 64-bit or 32-bit Microsoft.NET csc.exe
set "CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
if not exist "%CSC%" (
    set "CSC=C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe"
)

if not exist "%CSC%" (
    echo [ERROR] Could not find csc.exe compiler in Windows Microsoft.NET Framework.
    echo Please make sure .NET Framework 4.0+ is installed.
    pause
    exit /b 1
)

echo Using compiler: %CSC%
echo Compiling Launcher.cs into 5-FINGERS.exe ...

"%CSC%" /target:winexe /optimize+ /out:5-FINGERS.exe /reference:System.Windows.Forms.dll /reference:System.dll Launcher.cs

if %errorlevel% neq 0 (
    echo [ERROR] Compilation failed.
    pause
    exit /b %errorlevel%
)

echo [SUCCESS] 5-FINGERS.exe compiled successfully!
echo.
endlocal
