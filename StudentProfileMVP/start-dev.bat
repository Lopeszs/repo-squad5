@echo off
echo Iniciando Student Profile MVP - Desenvolvimento
echo.

REM Restaura dependências do .NET
echo Restaurando dependências do backend...
dotnet restore
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Falha ao restaurar dependências do .NET.
    pause
    exit /b 1
)

REM Instala dependências do frontend se necessário
if not exist "Views\node_modules" (
    echo Instalando dependências do frontend...
    cd Views
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERRO: Falha ao instalar dependências do frontend.
        cd ..
        pause
        exit /b 1
    )
    cd ..
)

echo.
echo Iniciando backend (.NET)...
start "Backend" cmd /k "dotnet run"

echo.
echo Aguardando 5 segundos para o backend inicializar...
timeout /t 5 /nobreak >nul

echo.
echo Iniciando frontend (React)...
cd Views
start "Frontend" cmd /k "npm start"
cd ..

echo.
echo Ambos os serviços foram iniciados!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause