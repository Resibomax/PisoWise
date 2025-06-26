from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from controllers.app_router import app_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(app_router)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Lambda! Testing CI/CD pipeline"}

handler = Mangum(app)

