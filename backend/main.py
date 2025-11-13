# How to run the backend:
# 1.   cd backend venv\Scripts\activate
# 2. Install the dependencies:
# pip install -r requirements.txt
# 3. Run the backend:
# uvicorn main:app --reload
# Or python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000



# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Configure CORS (allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",          # local dev frontend
        "https://your-frontend.vercel.app"  # add your real Vercel URL later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend!"}

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}
