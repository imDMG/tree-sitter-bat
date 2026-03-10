@echo off
REM This is a test batch file
SET MYVAR=Hello
ECHO %MYVAR% World
IF EXIST C:\test.txt (
    ECHO File exists
) ELSE (
    ECHO File not found
)
FOR %%i IN (*.txt) DO ECHO %%i
GOTO :end
:end
ECHO Done
PAUSE
