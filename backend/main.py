from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Update CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",            # local dev
        "https://mintmusecouk.vercel.app"  # production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
