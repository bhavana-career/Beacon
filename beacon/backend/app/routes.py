from fastapi import APIRouter, UploadFile, File
from app.analysis import analyze_business
from app.ai import ask_beacon
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

    ai_response = ask_beacon(
        analysis["summary"]
    )

    return {
        "filename": file.filename,
        "analysis": analysis["metrics"],
        "beacon": ai_response
    }