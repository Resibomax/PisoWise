import datetime
from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
import os
import uuid
from repositories.receipt_repository import ReceiptRepository
from repositories.s3_repository import S3Repository
from models.receipt import ReceiptCreate, ReceiptUpdate, ReceiptResponse
from typing import List, Dict, Union

class ReceiptUseCase:
    def __init__(self, db: Session):
        self.repo = ReceiptRepository(db)
        self.s3_repo = S3Repository()

    def create_receipt_usecase(self, receipt: ReceiptCreate) -> ReceiptResponse:
        return self.repo.create_receipt(receipt)

    def get_all_receipts_usecase(self) -> List[ReceiptResponse]:
        return self.repo.get_all_receipts()

    def get_receipts_by_project_id_usecase(self, project_id: str) -> List[ReceiptResponse]:
        receipts = self.repo.get_receipts_by_project_id(project_id)
        if not receipts:
            raise HTTPException(status_code=404, detail="No receipts found for this project")
        return receipts

    def get_receipt_by_id_usecase(self, receipt_id: str) -> ReceiptResponse:
        if not receipt_id:
            raise HTTPException(status_code=400, detail="Receipt ID is required")
        receipt = self.repo.get_receipt_by_id(receipt_id)
        if not receipt:
            raise HTTPException(status_code=404, detail="No receipt found with this ID")
        return receipt

    def update_receipt_usecase(self, receipt_id: str, updates: ReceiptUpdate) -> ReceiptResponse:
        return self.repo.update_receipt(receipt_id, updates)

    def delete_receipt_usecase(self, receipt_id: str) -> bool:
        receipt = self.repo.get_receipt_by_id(receipt_id)
        if receipt and receipt.image_url:
            try:
                key = receipt.image_url.split('.com/')[1]
                self.s3_repo.delete_file(key)
            except Exception:
                pass
        return self.repo.delete_receipt(receipt_id)

    async def upload_receipt_image_usecase(
        self, 
        file: UploadFile, 
        project_id: str, 
        create_receipt: bool = False
    ) -> Dict[str, Union[str, ReceiptResponse]]:
        try:
            if not file:
                raise HTTPException(status_code=400, detail="No file provided")
            file_content = await file.read()
            if not file_content:
                raise HTTPException(status_code=400, detail="File is empty")

            # Generate unique file ID and S3 key
            file_id = str(uuid.uuid4())
            file_extension = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
            s3_key = f"receipts/{file_id}{file_extension}"

            image_url = await self.s3_repo.upload_file(
                file_content=file_content,
                key=s3_key,
                content_type=file.content_type or "application/octet-stream",
                project_id=project_id
            )

            result = {"image_url": image_url}
            if create_receipt:
                receipt_data = ReceiptCreate(
                    project_id=project_id,
                    total_amount=0.0,
                    transaction_date=datetime.datetime.now().date(),
                    vendor_name=None,
                    image_url=image_url
                )
                receipt = self.repo.create_receipt(receipt_data)
                if receipt:
                    result["receipt"] = receipt

            return result

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")