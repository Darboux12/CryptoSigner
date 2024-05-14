echo Running Docker Compose...
docker-compose up --build
set DOCKER_EXIT_CODE=%ERRORLEVEL%

rem Checking if Docker Compose was successful
if %DOCKER_EXIT_CODE% neq 0 (
    echo Error during Docker Compose. Exit code: %DOCKER_EXIT_CODE%
    exit /b 1
) else (
    echo Docker Compose ran successfully.
)
