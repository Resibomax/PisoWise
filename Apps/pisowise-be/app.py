from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from controllers import user_controller, project_controller, receipt_controller, insight_controller

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_controller.user_router)
app.include_router(project_controller.project_router)
app.include_router(receipt_controller.receipt_router)
app.include_router(insight_controller.insight_router)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Lambda! Testing CI/CD pipeline"}

handler = Mangum(app)
