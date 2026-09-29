# Competitive Intelligence Agent

Hackathon full-stack starter.

Frontend: React + Vite + Tailwind CSS + Recharts + Three.js
Backend: Python + FastAPI
Database: PostgreSQL
AI/Memory: AI Agent + Hindsight Cloud integration boundary

Run frontend:
cd frontend
npm install
npm run dev

Run backend:
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
