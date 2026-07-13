from pydantic import BaseModel


class ChatRequest(BaseModel):
    report_id: str
    question: str