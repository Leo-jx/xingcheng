@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0.."
if not exist ".dev.vars" (
  if "%GLM_API_KEY%"=="" (
    echo [!] 请先把 .dev.vars.example 复制为 .dev.vars 并填入 GLM_API_KEY
    echo     或先执行：set GLM_API_KEY=你的智谱密钥
    echo.
    pause
    exit /b 1
  )
)
echo Starting local site + AI API on http://127.0.0.1:8788/ ...
node "tools\dev-server.mjs"
pause
