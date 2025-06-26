from fastapi import APIRouter

from controllers.user_controller import user_router
from controllers.project_controller import project_router
from controllers.receipt_controller import receipt_router
from controllers.item_controller import item_router
from controllers.insight_controller import insight_router

app_router = APIRouter()

app_router.include_router(user_router, tags=["Users"])
app_router.include_router(project_router, tags=["Projects"])
app_router.include_router(receipt_router, tags=["Receipts"])
app_router.include_router(item_router, tags=["Items"])
app_router.include_router(insight_router, tags=["Insights"])

