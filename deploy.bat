REM Copy the built files to the NGINX html folder
xcopy /S /Y build\* C:\nginx-1.24.0\html

@REM REM Restart NGINX (adjust the command based on your server setup)
@REM C:\nginx-1.24.0\nginx.exe -s reload
