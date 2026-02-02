@echo off
echo Instalando Vercel CLI...
npm i -g vercel

echo.
echo Fazendo login na Vercel...
vercel login

echo.
echo Fazendo deploy...
vercel --prod

echo.
echo Deploy concluido! Nao esqueca de configurar a URL no Supabase.
pause
