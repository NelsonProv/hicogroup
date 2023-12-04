REM Build your React application
npm run build

REM Copy the built files to the NGINX html folder
xcopy /S /Y build\* C:\nginx-1.24.0\html

REM Restart NGINX (adjust the command based on your server setup)
C:\nginx-1.24.0\nginx.exe -s reload
