# How to run the backend:
# 1.   cd backend venv\Scripts\activate
# 2. Install the dependencies:
# pip install -r requirements.txt
# 3. Run the backend:
# uvicorn main:app --reload


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend!"}