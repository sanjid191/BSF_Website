@echo off
echo ========================================
echo BSF-GUB Backend Setup and Run
echo ========================================
echo.

echo Checking Java version...
java -version
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)
echo.

echo Checking Maven...
mvn -version
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven 3.6 or higher
    pause
    exit /b 1
)
echo.

echo ========================================
echo Building the project...
echo ========================================
call mvn clean install -DskipTests
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Starting the application...
echo ========================================
echo.
echo Backend will run on http://localhost:8080
echo.
echo Default Admin Credentials:
echo Email: admin@bsf.gub.edu.bd
echo Password: admin123
echo.
echo Press Ctrl+C to stop the server
echo.

call mvn spring-boot:run

pause
