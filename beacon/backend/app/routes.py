from fastapi import APIRouter, UploadFile, File
from app.analysis import analyze_business
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    analysis = analyze_business(filepath)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "analysis": analysis,
        "message": "Upload successful!"
    }