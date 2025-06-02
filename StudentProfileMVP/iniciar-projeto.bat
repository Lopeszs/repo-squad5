@echo off
echo Iniciando Student Profile MVP - Desenvolvimento
echo.

REM Verifica se o dotnet está instalado
where dotnet >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: .NET SDK não encontrado. Por favor, instale o .NET SDK.
    pause
    exit /b 1
)

REM Verifica se o npm está instalado
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js/npm não encontrado. Por favor, instale o Node.js.
    pause
    exit /b 1
)

REM Restaura as dependências do .NET
echo Restaurando dependências do backend...
dotnet restore
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Falha ao restaurar dependências do .NET.
    pause
    exit /b 1
)

REM Verifica se a pasta Views existe
if not exist "Views" (
    echo ERRO: Pasta Views não encontrada.
    pause
    exit /b 1
)

REM Instala as dependências do frontend se necessário
echo Verificando dependências do frontend...
if not exist "Views\node_modules" (
    echo Instalando dependências do frontend...
    cd Views
    call npm install
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
echo Se o navegador não abrir automaticamente, acesse: http://localhost:3000
echo.
pause