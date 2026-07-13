from fastapi import APIRouter, UploadFile, File
from app.analysis import analyze_business
import os
from app.database import reports_collection

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    analysis = analyze_business(filepath)

    result = reports_collection.insert_one({
        "filename": file.filename,
        "metrics": analysis["metrics"],
        "summary": analysis["summary"]
    })

    return {
        "message": "Business report stored successfully!",
        "report_id": str(result.inserted_id),
        "analysis": analysis["metrics"]
    }