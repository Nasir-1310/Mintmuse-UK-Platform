# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",            # local dev frontend
        "https://mintmusecouk.vercel.app"  # production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Root route
@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend!"}

# ✅ Example API route
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}
