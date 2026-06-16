from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import images, reports
import os

app = FastAPI(title="PDI Arteterapia API", version="1.0.0")

_frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
_allow_all = os.getenv("ALLOW_ALL_ORIGINS", "false").lower() == "true"

if _allow_all:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[_frontend_origin],
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(images.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok"}