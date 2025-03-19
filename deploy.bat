@echo off
echo TDEE Calculator - Deployment Script
echo ===============================

:: Build the project
echo Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo Build failed! Aborting deployment.
  pause
  exit /b %ERRORLEVEL%
)

echo Build successful!

:: Check if credentials file exists, if not create it
if not exist "deploy-credentials.txt" (
  echo FTP_HOST=your-ftp-host.godaddy.com> deploy-credentials.txt
  echo FTP_USER=your-username>> deploy-credentials.txt
  echo FTP_PASS=your-password>> deploy-credentials.txt
  echo.
  echo Created credentials file. Please edit deploy-credentials.txt with your FTP details.
  echo Then run this script again.
  echo.
  pause
  exit /b 1
)

:: Load credentials
for /f "tokens=1,* delims==" %%a in (deploy-credentials.txt) do (
  if "%%a"=="FTP_HOST" set FTP_HOST=%%b
  if "%%a"=="FTP_USER" set FTP_USER=%%b
  if "%%a"=="FTP_PASS" set FTP_PASS=%%b
)

echo Starting deployment to %FTP_HOST%...

:: Create temporary script for WinSCP
echo option batch abort> winscp_script.txt
echo option confirm off>> winscp_script.txt
echo open ftp://%FTP_USER%:%FTP_PASS%@%FTP_HOST%/>> winscp_script.txt
echo cd /public_html/>> winscp_script.txt
echo lcd %CD%\out>> winscp_script.txt
echo synchronize remote -delete>> winscp_script.txt
echo exit>> winscp_script.txt

:: Run WinSCP in batch mode
echo Uploading files to server...
"C:\Program Files (x86)\WinSCP\WinSCP.exe" /script=winscp_script.txt
if %ERRORLEVEL% NEQ 0 (
  echo Deployment failed!
) else (
  echo Deployment successful!
)

:: Clean up
del winscp_script.txt

echo.
echo Visit https://tdeecalculator.health to verify your deployment.
echo.
pause 