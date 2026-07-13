from fastapi import APIRouter, UploadFile, File
from app.analysis import analyze_business
import os
from app.database import reports_collection
from bson import ObjectId
from app.schemas import ChatRequest
from app.ai import ask_beacon

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
@router.post("/chat")
async def chat(request: ChatRequest):

    report = reports_collection.find_one(
        {"_id": ObjectId(request.report_id)}
    )

    if not report:
        return {
            "error": "Report not found."
        }

    answer = ask_beacon(
        report["summary"],
        request.question
    )

    return {
        "answer": answer
    }

@router.get("/reports")
async def get_reports():
    reports_cursor = reports_collection.find({}, {"summary": 0, "metrics": 0})
    reports = []
    for doc in reports_cursor:
        reports.append({
            "id": str(doc["_id"]),
            "filename": doc.get("filename", "Unknown File")
        })
    return {"reports": reports}

@router.get("/reports/{report_id}")
async def get_report_by_id(report_id: str):
    report = reports_collection.find_one({"_id": ObjectId(report_id)})
    if not report:
        return {"error": "Report not found"}
    return {
        "report_id": str(report["_id"]),
        "filename": report.get("filename"),
        "analysis": report.get("metrics")
    }