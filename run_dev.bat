@echo off
echo =====================================================================
echo    DRISHTI-NWIS: Drilling Risk Intelligence & Safety History Interface
echo    SIH 2026 Prototype
echo =====================================================================
echo.
echo Starting DRISHTI-NWIS FastAPI Backend (Port 8000)...
start "DRISHTI Backend" cmd /k "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting DRISHTI-NWIS Vite Frontend (Port 5173)...
start "DRISHTI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =====================================================================
echo    DRISHTI-NWIS is starting!
echo    Backend API: http://localhost:8000/docs
echo    Frontend UI: http://localhost:5173
echo =====================================================================
